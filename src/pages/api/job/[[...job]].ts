import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'

export default async function Post(req:NextApiRequest,resp: NextApiResponse){
  if(req.method === 'POST'){
    try {

    } catch (error) {
        return resp.json(error)
    } 
  }
}