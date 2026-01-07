import JWT from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
}

  try {
    return JWT.verify(token, process.env.JWT_SECRET);
  } catch(error) {
    return Response.json({error});
  }
}
