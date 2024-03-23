export async function GET() {
    const url: string | undefined = process.env.SERVER_URL
    const first = await fetch(`${url}/styles`, {
        cache: "no-cache",
    });
    const second = await first.json();
    console.log(second)
    return Response.json({ data: second.response.data })
}