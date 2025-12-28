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

export const getTestUser = async () => {
    return prisma.user.findFirst({
        where: {
            username: "Kim Dokja"
        }
    })
}

export const deleteAllTestContactAfterCreate = async () => {
    return prisma.contact.deleteMany({
        where: {
            username: "Kim Dokja"
        }
    })
}

export const createTestContact = async () => {
    return prisma.contact.create({
        data: {
            firstName: "Sangah",
            lastName: "Yo",
            email: "sukadokja@gmail.com",
            phone: "0858",
            username: "Kim Dokja"
        }
    })
}

export const createManyTestContact = async () => {
    for (let i = 0; i < 15; i++) {
        await prisma.contact.create({
            data: {
                firstName: `Testing ${i+1}`,
                lastName: "Yo",
                email: `sukadokja${i+1}@gmail.com`,
                phone: `0858${i}${i+231}`,
                username: "Kim Dokja"
            }
        })
    }
}

export const getTestContact = async () => {
    return prisma.contact.findFirst({
        where: {
            username: "Kim Dokja"
        }
    })
}

export const deleteAllAddressTesting = async () => {
    const contact_id = await getTestContact()
    await prisma.address.deleteMany({
        where: {
            contact: {
                username: "Kim Dokja",
            }
        }
    })
} 

export const createAddressTesting = async () => {
    const contact = await prisma.contact.findFirst({
        where: {
            username: "Kim Dokja"
        }
    });

    if (!contact) throw new Error("Contact not found for testing address");


    await prisma.address.create({
        data: {
            contact_id: contact.id,
            country: "Indonesia",
            province: "Banten",
            city: "Cilegon",
            street: "Grogol",
            postal_code: "12-213"
        }
    });
}

export const getAddressTesting = async () => {
    return prisma.address.findFirst({
        where: {
            contact: {
                username: "Kim Dokja"
            }
        }
    })
}