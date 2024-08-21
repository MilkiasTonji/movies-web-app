


import { UserType } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

const url = process.env.NEXT_PUBLIC_BASE_URL


const loginHandler = async({email, password}: UserType) => {

    const response: any = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password}),
      })

      return response
    
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {email, password} = req.body

    console.log("data: ", email, password)
    const result = await loginHandler({email, password})
    res.status(200).json({ result })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}