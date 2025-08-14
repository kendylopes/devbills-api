import "dotenv/config";
import app from "./app";

import { prismaConnect } from "./config/prisma";

import { initializeGlobalCategories } from "./services/globalCategories.service";

const PORT = Number(process.env.PORT);

const startServer = async () => {
	try {
		await prismaConnect();

		await initializeGlobalCategories();

		await app.listen({ port: PORT });
		console.log(`Servidor rodando na porta ${PORT}`);
	} catch (err) {
		console.error(err);
	}
};

startServer();
