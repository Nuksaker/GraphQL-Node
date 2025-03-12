import jwt from "jsonwebtoken";

const SECRET_KEY = "your-secret-key";

export const authenticate = (token: string | undefined) => {
    if (!token) {
        throw new Error("Unauthorized: No token provided.");
    }
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error("Unauthorized: Invalid token.");
    }
};
