import { UsersSkills } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
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
                        }
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
                }
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
            userType:userType
            },    
            include:{
                Skills: {
                    include:{
                        skill: true
                    }
                }
            }
        })
        return resp.status(200).json(user)
    }


    if(req.method === 'PUT'){

        const {id,avatar,bio,area,email,level,username,skillsList} = req.body

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
                     }
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
                    }
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


             skillsList.map(async (skill: string) => {
                const findSkill = allSkills.find((item) => item.text.toLocaleLowerCase() === skill.toLocaleLowerCase())
                 
                const userSkillsMap = userSkills?.map((item) => item.skill.text)

                const findMissSkill = userSkillsMap?.filter((item) => {
                    return !skillsList?.includes(item)
                })

                const teste = userSkills?.filter((item) => {
                    return !skillsList?.includes(item.skill.text)
                })
          
                  if(findSkill && findMissSkill.includes(findSkill.text)){
                     try {
                         const userSkills = await prisma.usersSkills.create({
                             data:{
                                 fk_id_skill: findSkill.id,
                                 fk_id_user: id,
                             }
                         })
                     } catch (error) {                        
                     }
                  }else if(findMissSkill.length > 0){
                     try {
                        teste.map(async (item : any) => {
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
                  }else{
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