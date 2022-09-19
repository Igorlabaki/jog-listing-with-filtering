import { Link, UsersSkills } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { IoMdTennisball } from "react-icons/io";
import { prisma } from '../../../../lib/prisma'
import SelectItemsComponent from "../../../Components/util/selectItems";

export default async function Auth(req:NextApiRequest,resp: NextApiResponse){

    if(req.method === 'GET'){

        const {auth} = req.query
        
        if(auth){
            if(auth[0] === 'getAuthById'){
                const user = await prisma.user.findFirst({
                    where:{
                        id: auth[1]
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
        }

        const user = await prisma.user.findFirst({
            where:{
                email: auth?.toString()
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


    if(req.method === 'POST'){

        const {email,password,username,userType,areaType,levelType} = req.body

        const user = await prisma.user.create({
           data:{
            email: email,
            password: password,
            username: username,
            level: levelType,
            area: areaType,
            userType:userType,
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


    if(req.method === 'PUT'){

        const {id,avatar,bio,area,email,level,username,skillsList,city,country,linksList} = req.body



        if(linksList){
            const userLinks = await prisma.link.findMany({
                where:{
                    fk_id_user:id
                },
             })

             const linkListMap = linksList.map((item: Link) => item.name)

             const findMissLinks = userLinks?.filter((item: Link) => {
                return !linkListMap?.includes(item.name)
            })
      
             if(findMissLinks){
                findMissLinks.map(async (item: Link)=> {
                    const findLink = await prisma.link.delete({
                        where:{
                            name: item.name,
                        }
                    })
                })
             }


             linksList.map(async (Link: Link) => {

                 const findLink = await prisma.link.findFirst({
                     where:{
                         name: Link.name,
                         fk_id_user: id
                     }
                 })
                
                 if(!findLink){
                     const findLink = await prisma.link.create({
                         data:{
                             name: Link.name,
                             fk_id_user: id
                         }
                     })
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

              console.log(findCity,findCountry)

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