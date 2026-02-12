import JWT from "jsonwebtoken";

export function generateToken(user){
    return JWT.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET, {expiresIn: "1d"}
)
}
