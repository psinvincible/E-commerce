export async function POST() {
   
    return new Response(JSON.stringify({message: "Logged Out!"}),
    {
        status: 200,
        headers: {
            "Set-Cookie": `token=; Path=/; HttpOnly; Max-Age=0`,
        }
    }
)
}