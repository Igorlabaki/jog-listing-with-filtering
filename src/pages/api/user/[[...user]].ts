import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'

export default async function Post(req:NextApiRequest,resp: NextApiResponse){
  
  if(req.method === 'GET'){
    const { user } = req.query
    if(user){
      try {
        const users = await prisma.user.findUnique({
          where:{
            id: user.toString()
          },
          include:{
            City: true,
            Country: true,
            Link: true,
            LocationInteresting:true,
            Skills:{
              include:{
                skill: true
              }
            },
          }
        })
  
        return resp.status(200).json(users)
      } catch (error) {
          return resp.json(error)
      } 
    }else{
      try {
        const users = await prisma.user.findMany({
          include:{
            City: true,
            Country: true,
            Link: true,
            LocationInteresting:true,
            Skills:{
              include:{
                skill: true
              }
            },
          }
        })
  
        return resp.status(200).json(users)
      } catch (error) {
          return resp.json(error)
      } 
    }
  }

}