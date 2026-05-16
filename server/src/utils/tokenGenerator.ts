import jwt from "jsonwebtoken";
import { secretAToken } from "../config/env.js";

interface payloadInterface {
    id: string
}

export const generateAccessTokens = (payload:payloadInterface) => {
    const token = jwt.sign(payload, secretAToken, {
        expiresIn: "1d"
    });

    return token;
}