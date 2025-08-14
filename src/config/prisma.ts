import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
	try {
		await prisma.$connect();
		console.log("BD conectado com sucesso!");
	} catch (err) {
		console.error("Falha ao conectar ao BD", err);
	}
};

export default prisma;
