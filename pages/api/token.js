// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getToken } from "next-auth/jwt"

export default async function handler(req, res) {
    const token = await getToken({ req })
    console.log("JSON Web Token", token)
    res.status(201).json({ token: token })
}
