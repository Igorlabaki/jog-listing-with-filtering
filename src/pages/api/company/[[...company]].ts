import { Console } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'

export default async function Post(req:NextApiRequest,resp: NextApiResponse){
  
    if(req.method === 'GET'){

        const {company} = req.query
  
        if(company){

            if(company[0] === 'getCompanyById'){
                const companyFind = await prisma.company.findFirst({
                    where:{
                        id: company[1]
                    },
                    include:{
                        Jobs:{
                            include:{
                            Skills:{
                                include:{
                                skill: true
                                }
                            },
                            City: true,
                            area: true,
                            Country: true,
                            level:true,
                            period:true
                            } 
                        },
                        City: true,
                        Country: true,
                    }
                })
                return resp.status(200).json(companyFind)
            }else if(company[0] === 'getCompanyByEmail'){
                console.log('UNICO')
                const companyFind = await prisma.company.findFirst({
                    where:{
                        email: company[1]
                    },
                    include:{
                        Jobs:{
                            include:{
                            Skills:{
                                include:{
                                skill: true
                                }
                            },
                            City: true,
                            area: true,
                            Country: true,
                            level:true,
                            period:true
                            } 
                        },
                        City: true,
                        Country: true,
                    }
                })
                return resp.status(200).json(companyFind)
            }
        }

        const user = await prisma.company.findMany({
            include:{
                Jobs:{
                    include:{
                    Skills:{
                        include:{
                        skill: true
                        }
                    },
                    City: true,
                    area: true,
                    Country: true,
                    level:true,
                    period:true
                    } 
                },
                City: true,
                Country: true,
            }
        })
        return resp.status(200).json(user)
    }


    if(req.method === 'POST'){

        const {email,password,username,userType} = req.body
        const company = await prisma.company.create({
        data:{
            email: email,
            password: password,
            name: username,
            userType:userType,
            },
            include:{
            City:true,
            Country:true,
            Jobs:{
                include:{
                Skills:{
                    include:{
                    skill: true
                    }
                },
                City: true,
                area: true,
                Country: true,
                level:true,
                period:true
                } 
            }
            }    
        })

        return resp.status(200).json(company)
    }

    
    if(req.method === 'PUT'){

        const {email,password,username,about,city,country, avatar} = req.body

        if(avatar){
            const company = await prisma.company.update({
                where: {
                    email: email
                },
            data:{
                avatar: avatar
                },
                include:{
                City:true,
                Country:true,
                Jobs:{
                    include:{
                    Skills:{
                        include:{
                        skill: true
                        }
                    },
                    City: true,
                    area: true,
                    Country: true,
                    level:true,
                    period:true
                    } 
                }
                }    
            })
            return resp.status(200).json(company)
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
                        Company:{
                         connect:{
                             email: email
                         }
                     }
                    }
                  })  
             }else{
                 const cityCreated = await prisma.city.create({
                     data:{
                         name: city,
                         Company: {
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
                     Company:{
                         connect:{
                             email: email
                         }
                     }
                    }
                  })  
             }else{
            
                 const countryCreated = await prisma.country.create({
                     data:{
                         name: country.country,
                         Company: {
                             connect:{
                                 email: email
                             }
                         }
                     }
                  })
             }
         }

        const company = await prisma.company.update({
            where: {
                email: email
            },
        data:{
            email: email,
            password: password,
            name: username,
            about:about,
            },
            include:{
            City:true,
            Country:true,
            Jobs:{
                include:{
                Skills:{
                    include:{
                    skill: true
                    }
                }
                } 
            }
            }    
        })

        return resp.status(200).json(company)
    }

}