import shortDest from "@/utils/shortDest"
import { NextRequest } from "next/server"

export async function GET() {
    const first = await fetch(`${process.env.SERVER_URL}/categories`)
    const second = await first.json()
    const data = shortDest(second)
    return Response.json(data)
}

export async function POST(req: NextRequest) {
    const trans = await req.json()
    const body = JSON.stringify(trans)
    const first = await fetch(`${process.env.SERVER_URL}/categories/create`, { headers: { "Content-Type": "application/json" }, body, method: "POST" })
    const second = await first.json()
    const data = shortDest(second)
    return Response.json(data)
}
export async function PUT(req: NextRequest) {
    const trans = await req.json()
    console.log(trans)
    const body = JSON.stringify({ name: trans.name })
    const first = await fetch(`${process.env.SERVER_URL}/categories/${trans.id}`, { headers: { "Content-Type": "application/json" }, body, method: "PUT" })
    const second = await first.json()
    const data = shortDest(second)
    return Response.json(data)
}


export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const value = searchParams.values().next().value
    console.log(value)
    const api = `${process.env.SERVER_URL}/categories/${value}`
    const first = await fetch(api, { method: "DELETE" })
    const second = await first.json()
    const data = shortDest(second)
    return Response.json(data)
}