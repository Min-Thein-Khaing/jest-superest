import prisma from "../lib/prisma.js";


export const UserService = {
    // 1. Create User
    create: async (name: string, email: string) => {
        try {
            const newUser = await prisma.user.create({
                data: { name, email },
            });

            // Cache ကို ဖျက်ချင်ရင် (Optional)
            // await prisma.$accelerate.invalidate({ tags: ["users"] });

            return newUser;
        } catch (error) {
            console.error("Create error:", error);
            throw error;
        }
    },

    // 2. Get All Users
    getAll: async () => {
        return await prisma.user.findMany({
            cacheStrategy: {
                ttl: 60,
                swr: 60,
                tags: ["users"]
            }
        });
    }
}