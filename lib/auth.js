import JWT from "jsonwebtoken";

const generateToken = (user) => {
    return JWT.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET, {expiresIn: "1d"}
)
}

export default generateToken;