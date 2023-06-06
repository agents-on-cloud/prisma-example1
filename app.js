


async function createUser(name, email) {
    const prisma = new PrismaClient();

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });

        console.log("Created user:", user);
    } catch (error) {
        console.error("Failed to create user:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// createUser("John Doe", "john@example.com");
