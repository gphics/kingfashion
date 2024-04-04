import shortDest from "@/utils/shortDest"
import { NextRequest } from "next/server"

export async function GET() {
    const first = await fetch(`${process.env.SERVER_URL}/styles/sort`)
    const second = await first.json()
    const final = shortDest(second)
    return Response.json(final)
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const { value } = searchParams.values().next()
    const api = `${process.env.SERVER_URL}/styles/${value}`
    const first = await fetch(api, { method: "DELETE" })
    const second = await first.json()
    console.log(second)
    const data = shortDest(second)
    return Response.json(data)
}