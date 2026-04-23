import request from "supertest";
import app from "../../app.js";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import {execSync} from "child_process";
import { PrismaClient } from "../../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
describe("POST /users E2E testing ", () => {
    beforeAll(() => {
        execSync("npx prisma migrate reset --force");
    });
    afterAll(async() => {
        await prisma.$disconnect();
    })
    describe("POST /users", () => {
        it("should create a new user", async () => {
            const response = await request(app).post("/users").send({
                name: "sankyitone",
                email: "sankyitone@gmail.com",
            });
            expect(response.status).toBe(201);
            expect(response.body.user.name).toBe("sankyitone");
            expect(response.body.user.email).toBe("sankyitone@gmail.com");
        });
    });
});