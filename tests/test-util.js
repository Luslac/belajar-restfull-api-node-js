import { prisma } from "../source/application/database"
import bcrypt from "bcrypt"
export const deleteUserAfterCreate = async () => {
    await prisma.user.deleteMany({
        where: {
            username: "Kim Dokja"
        }
    })
}

export const createTestingUser = async () => {
    await prisma.user.create({
        data: {
            username: "Kim Dokja",
            password: await bcrypt.hash("rahasia123", 10),
            name: "Dokja",
            token: "test"
        }
    })
}