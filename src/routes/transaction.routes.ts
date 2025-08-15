import type { FastifyInstance } from "fastify";
import createTransaction from "../controller/transactions/createTransaction.controller";

const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {
	fastify.route({
		method: "POST",
		url: "/",
		schema: {},
		handler: createTransaction,
	});
};

export default transactionRoutes;
