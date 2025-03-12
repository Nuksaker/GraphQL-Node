import { ApolloServer, gql } from "apollo-server";
import { connectDB } from "./config/db"; // เชื่อมต่อกับ MongoDB
import { typeDefs, resolvers } from "./schema"; // โหลด Schema และ Resolvers

const startServer = async () => {
    try {
        // เชื่อมต่อฐานข้อมูล MongoDB
        await connectDB();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            cors: {
                origin: "*", // อนุญาตทุกโดเมน
                credentials: true,
            },
        });

        // เริ่มต้นเซิร์ฟเวอร์
        server.listen({ port: 4000 }).then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();
