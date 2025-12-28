import { web } from "../source/application/web"; 
import supertest from "supertest";
import { prisma } from "../source/application/database";
import { logger } from "../source/application/logging";
import { deleteUserAfterCreate, createTestingUser, getTestUser } from "./test-util";
import bcrypt from "bcrypt"


describe('POST /api/users', () => {

    afterEach(async () => {
        await deleteUserAfterCreate()
    })

    it("Should Register New User", async () => {
        
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: "Kim Dokja",
                password: "rahasia123",
                name: "Dokja"
            });
        

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("Kim Dokja");
        expect(response.body.data.name).toBe("Dokja");
        
        expect(response.body.data.password).toBeUndefined();
    });


    it("Should CAN'T Register New User", async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: "",
                password: "",
                name: ""
            });
        
        logger.info(response.body.data)

        expect(response.status).toBe(400);
        expect(response.body.data).toBeUndefined();
    });


    it("Should NOT Because 'Username Already Exist'Register New User", async () => {
        await prisma.user.create({
            data: {
                username: "Kim Dokja",
                password: "passwordLama", 
                name: "Dokja Asli"
            }
        });

        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: "Kim Dokja",
                password: "rahasia123",
                name: "Dokja"
            });
        

        expect(response.status).toBe(400);

    });

});


describe('POST /api/users/login', () => {
    beforeEach(async () => {
            await createTestingUser()
        })
    afterEach(async () => {
            await deleteUserAfterCreate()
        })


    it("Should Login Succesfully", async () => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: "Kim Dokja",
            password: "rahasia123"
        })

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("Kim Dokja");
        expect(result.body.data.token).not.toBe("test")
    });

    it("Should Can't Login If Request Invalid", async () => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: "",
            password: ""
        })

        expect(result.status).toBe(400);
        expect(result.body.data).toBeUndefined();
    });

    it("Should Can't Login If Password Invalid", async () => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: "",
            password: "rahasia123"
        })

        expect(result.status).toBe(400);
        expect(result.body.data).toBeUndefined();
    });


})


describe('GET /api/users/current', () => {
    afterEach(async () => {
        await deleteUserAfterCreate()
    })

    beforeEach(async () => {
        await createTestingUser()
    })
    
    it("Should Get Info User (username & name)", async () => {
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization', "test")

        console.log(JSON.stringify(result.body, null, 2));
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("Kim Dokja");
    })

    it("Should DO NOT Get Info User, INVALID TOKEN", async () => {
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization', "test 101")

        console.log(JSON.stringify(result.body, null, 2));
        expect(result.status).toBe(401);
        expect(result.body.data).toBeUndefined()
    })
})

describe('PATCH /api/users/current', () => {
    afterEach(async () => {
        await deleteUserAfterCreate()
    })

    beforeEach(async () => {
        await createTestingUser()
    })

    it("Should Update Info User", async () => {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            name: "Demon King Of Salvations",
            password: "Uglies King"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe("Demon King Of Salvations")
        const user = await getTestUser()
        expect(await bcrypt.compare("Uglies King", user.password))
    })


    it("Should Update Info User Without Password (zod Check Up)", async () => {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            name: "Demon King Of Salvations",
        })

        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe("Demon King Of Salvations")
    })

    it("Should Update Info User JUST Password", async () => {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            password: "Uglies King"
        })

        expect(result.status).toBe(200)
        const user = await getTestUser()
        expect(await bcrypt.compare("Uglies King", user.password))
    })

    it("Should Reject If Request INVALID", async () => {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "test")
        .send({
            name: "D",
            password: ""
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
        const user = await getTestUser()
        expect(await bcrypt.compare("Uglies King", user.password)).toBe(false)
    })

    it("Should Reject Update Info User Cause TOKEN INVALID", async () => {
        const result = await supertest(web)
        .patch("/api/users/current")
        .set("Authorization", "jir")
        .send({})

        expect(result.status).toBe(401)
        
    })
})

describe('DELETE /api/users/logout', () => {
    afterEach(async () => {
        await deleteUserAfterCreate()
    })

    beforeEach(async () => {
        await createTestingUser()
    })

    it("Should LogOut Account From User", async () => {
        const result = await supertest(web)
        .delete("/api/users/logout")
        .set("Authorization", "test")

        console.log(JSON.stringify(result.body, null, 2));
        
        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")
        const user = await getTestUser()
        expect(user.token).toBe(null)
    })
})