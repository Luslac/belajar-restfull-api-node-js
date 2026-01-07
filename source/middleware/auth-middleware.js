import { prisma } from "../application/database.js"
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    let token = req.query.token || req.get("Authorization")

    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
        return
    } 
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findFirst({
            where: {
                username: decoded.username
            }
        });

        if (!user) {
            res.status(401).json({ errors: "Unauthorized" }).end();
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ errors: "Unauthorized" }).end();
    }
}

