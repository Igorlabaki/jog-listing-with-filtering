import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'

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

         if(skillsList){
             const allSkills = await prisma.skill.findMany()
    
             skillsList.map(async (skill: string) => {
    
                 const findSkill = allSkills.find((item) => item.text === skill)
    
                 if(findSkill){
                     const userSkills = await prisma.usersSkills.create({
                         data:{
                             fk_id_skill: findSkill.id,
                             fk_id_user: id,
                         }
                     })
                     return
                 }
    
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
                 return
             })
         }
         console.log('porra')
        return resp.status(200)
    }
}