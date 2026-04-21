import request from "supertest";
import app from "../../app.js";
import { UserService } from "../../services/userService.js";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";


beforeEach(()=>{
    jest.clearAllMocks();
})
describe("POST /users", () => {
    //input htae like tae a kar
    const inputData = {
        name: "John Doe",
        email: "alice@gmail.com"
    }
    //dar ka output ya mae har
    const createUser = {
        id: 4, 
        name: "John Doe",
        email: "alice@gmail.com"
    }
    
    //success path
    describe('Success Path', () => {
        //1.beforeEach ka test tay ma run khin mr run dr 
        //2.logic ka UserService htae ka create like yin out put ka createUser ya ya ml 

        beforeEach(() => {
            // ES Modules မှာ ပိုမိုအဆင်ပြေစေရန် spyOn ကို အသုံးပြုပါတယ်
            jest.spyOn(UserService, "create").mockResolvedValue(createUser);
        })

        test("should return 201 and created user", async () => {
            const response = await request(app)
                .post("/users")
                .send(inputData)
                .set("Accept", "application/json");

            expect(response.status).toBe(201);
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body.user).toEqual(createUser);
            expect(UserService.create).toHaveBeenCalledTimes(1)
            expect(UserService.create).toHaveBeenCalledWith(inputData.name,inputData.email)
        })
    })
    describe("Error Path", () => {
        beforeEach(() => {
            jest.spyOn(UserService, "create").mockRejectedValue(new Error("Failed to create user"))
        })

        test("should return 500 and error message when service fails", async () => {
            const response = await request(app)
                .post("/users")
                .send(inputData) // Send valid data to reach the service
                .set("Accept", "application/json");

            expect(response.status).toBe(500);
            expect(response.body.error).toBe("Failed to create user");
            expect(UserService.create).toHaveBeenCalledTimes(1)
           
        })
        
    })
    describe("validation path",()=> {
            test("should return 400 when name is missing", async () => {
                const response = await request(app)
                    .post("/users")
                    .send({email:"alice@gmail.com"})
                    .set("Accept", "application/json");
                expect(response.status).toBe(400);
                expect(response.body.message).toEqual("Name is required");
                expect(response.body).toHaveProperty("message","Name is required")
                expect(UserService.create).not.toHaveBeenCalled()
            
        })
    })

})