import { Console } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'
import { JobContext } from "../../../Context/jobContext";

export default async function Post(req:NextApiRequest,resp: NextApiResponse){

    if(req.method === 'GET'){

        const {job} = req.query

        if(job){
            if(job[0] === 'getCompanyJobsId'){
                const companyFind = await prisma.job.findMany({
                    where:{
                        Company: {
                            id: job[1]
                        }
                    },
                    include:{
                        Company: true,
                        Skills:{
                            include:{
                                skill: true
                            }
                        },
                        area: true,
                        City: true,
                        Country: true,
                        level:true,
                        period:true
                    }
                })
                return resp.status(200).json(companyFind)
            }
            if(job[0] === 'getJobById'){
                const companyFind = await prisma.job.findFirst({
                    where:{
                     id:job[1]
                    },
                    include:{
                        Company: true,
                        Skills:{
                            include:{
                                skill: true
                            }
                        },
                        area: true,
                        City: true,
                        Country: true,
                        level:true,
                        period:true
                    }
                })
                console.log(companyFind)
                return resp.status(200).json(companyFind)
            }
        }

        const jobs = await prisma.job.findMany({
            include:{
                Company: true,
                Skills:{
                    include:{
                        skill: true
                    }
                },
                area: true,
                City: true,
                Country: true,
                level:true,
                period:true
            }
          })
          return resp.status(200).json(jobs)
    
    }

    if(req.method === 'DELETE'){
        const {job} = req.query

        const deleteJOb = await prisma.job.delete({
            where:{
                id: job?.toString()
            }
        })

        return resp.status(200).json(deleteJOb)
    }


  if(req.method === 'POST'){

    const {user,area,level,country,city,skillsList,period,about, avatar} = req.body


    const job = await prisma.job.create({
        data:{
          about: about,
          avatar: avatar,
          Company:{
            connect:{
                id: user.id
            }
          }
        },
        include:{
            Company: true,
            Skills:{
                include:{
                    skill: true
                }
            },
            area: true,
            City: true,
            Country: true,
            level:true,
            period:true
        }
      })
       
       if(skillsList){
        const allSkills = await prisma.skill.findMany()
       
    
        skillsList.map(async (skill: string) => {
           const findSkill = allSkills.find((item) => item.text.toLocaleLowerCase() === skill.toLocaleLowerCase())
    
           if(findSkill ){
               try {
                   const userSkills = await prisma.jobsSkills.create({
                   data:{
                       fk_id_skill: findSkill.id,
                       fk_id_job: job.id,
                       }
                   })
               } catch (error) {                        
               }
           }else if(!findSkill){
               const skillCreate = await prisma.skill.create({
                   data:{
                       text: skill
                   }
               })
               const jobsSkills = await prisma.jobsSkills.create({
                   data:{
                       fk_id_skill: skillCreate.id,
                       fk_id_job: job.id,
                   }
               })
           }
      })}

           
    const areaFind = await prisma.area.findFirst({
        where:{
            name: area
        }
     })

     if(areaFind){        
         const x = await prisma.area.update({
             where:{
                 id: areaFind.id
             },
            data:{
             jobs:{
                connect: {
                    id: job.id
                }
             }
            }
          })  
     }else{
         const cityCreated = await prisma.area.create({
             data:{
                 name: area,
                 jobs: {
                     connect:{
                         id: job.id
                     }
                 }
             }
          })
     }

     const periodFind = await prisma.period.findFirst({
        where:{
            name: period
        }
     })

     if(periodFind){        
         const x = await prisma.period.update({
             where:{
                 id: periodFind.id
             },
            data:{
             jobs:{
                connect: {
                    id: job.id
                }
             }
            }
          })  
     }else{
         const cityCreated = await prisma.period.create({
             data:{
                 name: period,
                 jobs: {
                     connect:{
                         id: job.id
                     }
                 }
             }
          })
     }

     const levelFind = await prisma.level.findFirst({
        where:{
            name: level
        }
     })

     if(levelFind){        
         const x = await prisma.level.update({
             where:{
                 id: levelFind.id
             },
            data:{
             jobs:{
                connect: {
                    id: job.id
                }
             }
            }
          })  
     }else{
         const cityCreated = await prisma.level.create({
             data:{
                 name: level,
                 jobs: {
                     connect:{
                         id: job.id
                     }
                 }
             }
          })
     }

     
    if(city && country){

            
      const findCity = await prisma.city.findFirst({
          where:{
              name: city
          }
       })

       const findCountry = await prisma.country.findFirst({
          where:{
             name: country.country
          }
       })

       if(findCity){        
           const x = await prisma.city.update({
               where:{
                   id: findCity.id
               },
              data:{
                job: {
                    connect:{
                        id: job.id
                    }
                }
              }
            })  
       }else{
           const cityCreated = await prisma.city.create({
               data:{
                   name: city,
                   job: {
                    connect:{
                        id: job.id
                    }
                }
               }
            })
       }

       if(findCountry){        
           const x = await prisma.country.update({
               where:{
                   id: findCountry.id
               },
              data:{
                job: {
                    connect:{
                        id: job.id
                    }
                }
              
              }
            })  
       }else{
      
           const countryCreated = await prisma.country.create({
               data:{
                   name: country.country,
                   job: {
                    connect:{
                        id: job.id
                    }
                }
               }
            })
       }
   }

    return resp.status(200).json(user)
}


if(req.method === 'PUT'){

    const {id,avatar,bio,area,email,level,username,skillsList,city,country,linksList} = req.body


    
    if(city && country){

        
         const findCity = await prisma.city.findFirst({
             where:{
                 name: city
             }
          })

          const findCountry = await prisma.country.findFirst({
             where:{
                name: country.country
             }
          })

          if(findCity){        
              const x = await prisma.city.update({
                  where:{
                      id: findCity.id
                  },
                 data:{
                  user:{
                      connect:{
                          id: id
                      }
                  }
                 }
               })  
          }else{
              const cityCreated = await prisma.city.create({
                  data:{
                      name: city,
                      user: {
                          connect:{
                              email: email
                          }
                      }
                  }
               })
          }

          if(findCountry){        
              const x = await prisma.country.update({
                  where:{
                      id: findCountry.id
                  },
                 data:{
                  user:{
                      connect:{
                          id: id
                      }
                  }
                 }
               })  
          }else{
         
              const countryCreated = await prisma.country.create({
                  data:{
                      name: country.country,
                      user: {
                          connect:{
                              email: email
                          }
                      }
                  }
               })
          }
      }

       if(id && email && level){
           const user = await prisma.user.update({
               where:{
                   id: id
               },
               data:{
                   avatar: avatar,
                   bio: bio,
                   email: email,
                   level: level,
                   username: username,
                   area: area
               },
               include:{
                   Skills: {
                       include:{
                           skill: true
                       }
                   },
                   City: true,
                   Country: true,
                   Link: true
               }
           })
           return resp.status(200).json(user)
       }

       if(avatar){
          const user = await prisma.user.update({
              where:{
                  id: id
              },
              data:{
                  avatar: avatar,
              },
              include:{
                  Skills: {
                      include:{
                          skill: true
                      }
                  },
                  City: true,
                  Country: true,
                  Link: true
                
              }
          })
          return resp.status(200).json(user)
      }

       if(skillsList){
           const allSkills = await prisma.skill.findMany()
           const userSkills = await prisma.usersSkills.findMany({
              where:{
                  fk_id_user:id
              },
              include:{
                  skill: true
              }
           })

           const findMissSkill = userSkills?.filter((item) => {
              return !skillsList?.includes(item.skill.text)
          })

          if(findMissSkill){
              try {
                  findMissSkill.map(async (item : any) => {
                      const deletedSkill = await prisma.usersSkills.delete({
                          where:{
                              fk_id_skill_fk_id_user: {
                                  fk_id_skill: item.skill.id,
                                  fk_id_user: id
                              }
                          }
                      })               
                  })
              } catch (error) {       
              }
            }


           skillsList.map(async (skill: string) => {
              const findSkill = allSkills.find((item) => item.text.toLocaleLowerCase() === skill.toLocaleLowerCase())

              const userSkillsMap = userSkills?.map((item) => item.skill.text)

              const teste = userSkillsMap?.filter((item) => {
                  return !skillsList?.includes(item)
              })

              if(findSkill && !teste.includes(skill)){
                  try {
                      const userSkills = await prisma.usersSkills.create({
                      data:{
                          fk_id_skill: findSkill.id,
                          fk_id_user: id,
                          }
                      })
                  } catch (error) {                        
                  }
              }else if(!findSkill){
                  const skillCreate = await prisma.skill.create({
                      data:{
                          text: skill
                      }
                  })
                  const userSkills = await prisma.usersSkills.create({
                      data:{
                          fk_id_skill: skillCreate.id,
                          fk_id_user: id,
                      }
                  })
              }
         })
         return resp.status(200).json({})
      }
}
}