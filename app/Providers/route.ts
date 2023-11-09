import type { NextApiRequest, NextApiResponse } from 'next'
import providerdata from './providerlist';


export async function GET(request: Request) {
  return Response.json({ providerdata })
}