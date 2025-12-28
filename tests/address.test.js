import { web } from "../source/application/web"; 
import supertest from "supertest";
import { prisma } from "../source/application/database";
import { logger } from "../source/application/logging";
import { deleteUserAfterCreate, createTestingUser, getTestUser, 
        deleteAllTestContactAfterCreate, createTestContact, 
        getTestContact, createManyTestContact, deleteAllAddressTesting, 
        createAddressTesting,
        getAddressTesting} 
        from "./test-util";



describe("POST /api/contacts/:contactId/addresses", () => {
    beforeEach(async () => {
        await createTestingUser()
        await createTestContact()
    })
    afterEach(async () => {
        await deleteAllAddressTesting()
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })

    it("Should Create Address For Contact Username: 'Kim Dokja'", async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
        .post(`/api/contacts/${testContact.id}/addresses`)
        .set("Authorization", "test")
        .send({
            country: "Indonesia",
            province: "Banten",
            city: "Cilegon",
            street: "Grogol",
            postal_code: "12-213"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.country).toBe("Indonesia")
        expect(result.body.data.province).toBe("Banten")
        expect(result.body.data.city).toBe("Cilegon")
        expect(result.body.data.street).toBe("Grogol")
        expect(result.body.data.postal_code).toBe("12-213")
    })

    it("Should reject create new address", async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
        .post(`/api/contacts/${123123123}/addresses`)
        .set("Authorization", "test")
        .send({
            country: "Indonesia",
            province: "Banten",
            city: "Cilegon",
            street: "Grogol",
            postal_code: "12-213"
        })

        expect(result.status).toBe(404)
    })
})

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await createTestingUser()
        await createTestContact()
        await createAddressTesting()

    })
    afterEach(async () => {
        await deleteAllAddressTesting()
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })

    it("Should Get Info from contact address", async () => {
        const testContact = await getTestContact()
        const testAddress = await getAddressTesting()
        const result = await supertest(web)
        .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
        .set("Authorization", "test")

        expect(result.status).toBe(200)
        expect(result.body.data.country).toBe("Indonesia")
        expect(result.body.data.province).toBe("Banten")
        expect(result.body.data.city).toBe("Cilegon")
        expect(result.body.data.street).toBe("Grogol")
        expect(result.body.data.postal_code).toBe("12-213")
    })

    it("Should Reject Get Info from contact because contact id invalid", async () => {
        const testContact = await getTestContact()
        const testAddress = await getAddressTesting()
        const result = await supertest(web)
        .get(`/api/contacts/${testContact.id + 10}/addresses/${testAddress.id}`)
        .set("Authorization", "test")

        expect(result.status).toBe(404)
    })

    it("Should Reject Get Info from contact because address id invalid", async () => {
        const testContact = await getTestContact()
        const testAddress = await getAddressTesting()
        const result = await supertest(web)
        .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 12}`)
        .set("Authorization", "test")

        expect(result.status).toBe(404)
    })
})

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await createTestingUser()
        await createTestContact()
        await createAddressTesting()

    })
    afterEach(async () => {
        await deleteAllAddressTesting()
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })

    it("Should Update Info from address", async () => {
        const testContact = await getTestContact()
        const testAddress = await getAddressTesting()
        const result = await supertest(web)
        .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
        .set("Authorization", "test")
        .send({
            country: "Indonesia"
        })

        expect(result.status).toBe(200)
        expect(result.body.data.country).toBe("Indonesia")
        expect(result.body.data.province).toBe("Banten")
        expect(result.body.data.city).toBe("Cilegon")
        expect(result.body.data.street).toBe("Grogol")
        expect(result.body.data.postal_code).toBe("12-213")
    })
})

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async () => {
        await createTestingUser()
        await createTestContact()
        await createAddressTesting()

    })
    afterEach(async () => {
        await deleteAllAddressTesting()
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })

    it("Should Remove Info from address", async () => {
        const testContact = await getTestContact()
        let testAddress = await getAddressTesting()
        const result = await supertest(web)
        .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
        .set("Authorization", "test")

        expect(result.status).toBe(200)
        testAddress = await getAddressTesting()
        expect(testAddress).toBe(null)
        
    })
})

describe("GET /api/contacts/:contactId/addresses", () => {
    beforeEach(async () => {
        await createTestingUser()
        await createTestContact()
        await createAddressTesting()

    })
    afterEach(async () => {
        await deleteAllAddressTesting()
        await deleteAllTestContactAfterCreate()
        await deleteUserAfterCreate()
    })

    it("Should get list Info from address", async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
        .get(`/api/contacts/${testContact.id}/addresses`)
        .set("Authorization", "test")

        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(1)
        
    })
})