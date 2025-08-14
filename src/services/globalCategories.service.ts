import { type Category, TransactionType } from "@prisma/client";
import prisma from "../config/prisma";

type GlobalCategoryInput = Pick<Category, "name" | "color" | "type">;

const globalCategories: GlobalCategoryInput[] = [
	// Despesas
	{ name: "Alimentação", color: "#FF5733", type: TransactionType.expense },
	{ name: "Transporte", color: "#33A8FF", type: TransactionType.expense },
	{ name: "Moradia", color: "#33FF57", type: TransactionType.expense },
	{ name: "Saúde", color: "#F033FF", type: TransactionType.expense },
	{ name: "Educação", color: "#FF3366", type: TransactionType.expense },
	{ name: "Lazer", color: "#FFBA33", type: TransactionType.expense },
	{ name: "Compras", color: "#33FFF6", type: TransactionType.expense },
	{ name: "Outros", color: "#B033FF", type: TransactionType.expense },

	// Receitas
	{ name: "Salário", color: "#33FF57", type: TransactionType.income },
	{ name: "Freelance", color: "#33A8FF", type: TransactionType.income },
	{ name: "Investimentos", color: "#FFBA33", type: TransactionType.income },
	{ name: "Outros", color: "#B033FF", type: TransactionType.income },
];

export const initializeGlobalCategories = async (): Promise<void> => {
	try {
		const existingCategories = await prisma.category.findMany({
			where: {
				OR: globalCategories.map((category) => ({
					name: category.name,
					type: category.type,
				})),
			},
			select: {
				name: true,
				type: true,
			},
		});

		const existingSet = new Set(
			existingCategories.map((c) => `${c.name}:${c.type}`),
		);

		const categoriesToCreate = globalCategories.filter(
			(category) => !existingSet.has(`${category.name}:${category.type}`),
		);

		if (categoriesToCreate.length > 0) {
			await prisma.category.createMany({
				data: categoriesToCreate,
			});
			console.log(
				`Criadas ${categoriesToCreate.length} novas categorias globais.`,
			);
		}

		console.log("Categorias globais inicializadas com sucesso!");
	} catch (err) {
		console.error("Erro ao inicializar categorias globais:", err);
		// Em um cenário real, talvez você queira parar a aplicação se as categorias forem essenciais.
		// process.exit(1);
	}
};
