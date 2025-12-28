import { web } from "../source/application/web"; 
import supertest from "supertest";
import { prisma } from "../source/application/database";
import { logger } from "../source/application/logging";
import { deleteUserAfterCreate, createTestingUser, getTestUser, deleteAllTestContactAfterCreate, createTestContact, getTestContact, createManyTestContact } from "./test-util";
import { email } from "zod";




describe("POST /api/contacts", () => {
    beforeEach(async () => {
        await createTestingUser()
    })
    afterEach(async () => {
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })
    it('Should can create contact', async () => {
        const result = await supertest(web)
        .post("/api/contacts")
        .set('Authorization', "test")
        .send({
            firstName: "Sangah",
            lastName: "Yo",
            email: "sukadokja@gmail.com",
            phone: "0858"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.firstName).toBe("Sangah")
    })

    it('Should reject if request is INVALID create contact', async () => {
        const result = await supertest(web)
        .post("/api/contacts")
        .set('Authorization', "test")
        .send({ // firstName ga ada, invalid di validasi zod
            lastName: "Yo",
            email: "sukadokja@gmail.com",
            phone: ""
        })

        expect(result.status).toBe(400)
        expect(result.body.data).toBeUndefined()
    })
})

describe("GET /api/contacts", () => {
    beforeEach(async () => {
        await createTestingUser()
        await createTestContact()
    })
    afterEach(async () => {
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })

    it("Should can GET Contact Info By ID", async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
        .get("/api/contacts/" + testContact.id )
        .set("Authorization", "test")
        
        console.log(JSON.stringify(result.body, null, 2))

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.firstName).toBe(testContact.firstName)
        expect(result.body.data.lastName).toBe(testContact.lastName)
    })

    it("Should ERROR 404 If Contact ID is Invalid", async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
        .get("/api/contacts/" + 999)
        .set("Authorization", "test")
        
        console.log(JSON.stringify(result.body, null, 2))

        expect(result.status).toBe(404)
        
    })
})

describe("PUT /api/contacts", () => {
    beforeEach(async () => {
        await createTestingUser()
        await createTestContact()
    })
    afterEach(async () => {
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })

    it("Should UPDATE existing contact", async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
        .put("/api/contacts/" + testContact.id)
        .set("Authorization", "test")
        .send({
            firstName: "penyuka",
            lastName: "sawit",
            phone: "0830131003",
            email: "sawitlovers@gmail.com"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.firstName).toBe("penyuka")
    })

    it("Should'nt UPDATE existing contact cause ID Invalid", async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
        .put("/api/contacts/" + 231123231)
        .set("Authorization", "test")
        .send({
            firstName: "penyuka",
            lastName: "sawit",
            phone: "0830131003",
            email: "sawitlovers@gmail.com"
        })

        expect(result.status).toBe(404)
    })
})

describe("DELETE /api/contacts", () => {
    beforeEach(async () => {
        await createTestingUser()
        await createTestContact()
    })
    afterEach(async () => {
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })

    it("Should Delete existing contact", async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
        .delete("/api/contacts/" + testContact.id)
        .set("Authorization", "test")
        
        expect(result.status).toBe(200)
        expect(result.body.data.firstName).toBe(testContact.firstName)
    })
})

describe("GET /api/contacts", () => {
    beforeEach(async () => {
        await createTestingUser()
        await createManyTestContact()
    })
    afterEach(async () => {
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })

    it("Should search contact that exist without query", async () => {

        const result = await supertest(web)
        .get("/api/contacts")
        .set("Authorization", "test")

        expect(result.status).toBe(200)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })

    it("Should search contact that exist in page 2", async () => {

        const result = await supertest(web)
        .get("/api/contacts")
        .query({
            page: 2
        })
        .set("Authorization", "test")

        expect(result.status).toBe(200)
        expect(result.body.paging.page).toBe(2)
        expect(result.body.data.length).toBe(5)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)

    })

    it("Should search contact that exist with query name", async () => {

        const result = await supertest(web)
        .get("/api/contacts")
        .query({
            name: "Testing"
        })
        .set("Authorization", "test")

        expect(result.status).toBe(200)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)

        console.log(JSON.stringify(result.body, null, 2))
    })

    it("Should search contact that exist with phone", async () => {

        const result = await supertest(web)
        .get("/api/contacts")
        .query({
            phone: "08"
        })
        .set("Authorization", "test")

        expect(result.status).toBe(200)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })
})