import { prisma } from "../application/database.js"
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.get("Authorization")
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
    } 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
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

