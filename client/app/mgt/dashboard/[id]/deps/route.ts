import { styleObjectType } from "@/types";
import shortDest from "@/utils/shortDest";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.values().next().value
    const first = await fetch(`${process.env.SERVER_URL}/styles/${id}`)
    const second = await first.json()
    const data = shortDest(second)
    return Response.json(data)
}

export async function PUT(req: NextRequest) {
    const body = await req.json()
    const api = `${process.env.SERVER_URL}/styles/${body._id}`
    const first = await fetch(api, {headers:{"Content-Type":"application/json"}, method: "PUT", body: JSON.stringify(body) })
    const second = await first.json()
    const data = shortDest(second)
    console.log(data)
    return Response.json(data)
}