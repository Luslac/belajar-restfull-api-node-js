import { web } from "../source/application/web"; 
import supertest from "supertest";
import { prisma } from "../source/application/database";
import { logger } from "../source/application/logging";
import { deleteUserAfterCreate, createTestingUser } from "./test-util";


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