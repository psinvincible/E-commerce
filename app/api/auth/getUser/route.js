const { getUserFromCookie } = require("@/lib/getUser");

export async function GET() {
    const user = await getUserFromCookie();
    
    if(!user){
        return Response.json(null, { status: 401});
    }

    return Response.json(user);
    
}