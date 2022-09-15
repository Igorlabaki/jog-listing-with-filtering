import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'

export default async function Auth(req:NextApiRequest,resp: NextApiResponse){
    if(req.method === 'POST'){
        const {token,userId,expire} = req.body
        const session = await prisma.session.create({
           data:{
            expires: expire,
            sessionToken: token,
            user:{  
                connect:{
                    id: userId
                }
            }
           }
        })
        return resp.status(200).json(session)
    }

    if(req.method === 'PUT'){
        const {token} = req.body
        const session = await prisma.session.update({
         where:{
            sessionToken: token
         },
         data:{
            sessionToken: token
         }
        })
        return resp.status(200).json(session)
    }
}