import { withAccelerate } from "@prisma/extension-accelerate";
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL as string,
}).$extends(withAccelerate());

async function main() {
  try {
    const allUsers = await prisma.user.create({
       data:{
        name:"John Doee",
        email:"doee@gmail.com"
       }
    });
    console.log("Users:", allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();