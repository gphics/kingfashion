export async function GET() {
    const first = await fetch(`${process.env.SERVER_URL}/styles/sort`, { cache:"no-cache"})
    const second = await first.json()
    
    return Response.json({ data: second.response.data })
} 