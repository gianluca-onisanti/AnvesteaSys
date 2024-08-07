import { prisma } from "../../../../lib/prisma";

export default async function handler(req: any, res: any) {

    const { data } = req.body;

    try {
        const result = await prisma.jogadores.upsert({
            where: { 
                id_jogador: data.id_jogador
            },
            update: {
                nome_jogador: data.nome_jogador,
                apelido_jogador: data.apelido_jogador,
                data_update: (new Date()).toISOString(),
                status: data.status,
            },
            create: {
                nome_jogador: data.nome_jogador,
                apelido_jogador: data.apelido_jogador,
                data_insert: (new Date()).toISOString(),
                data_update: (new Date()).toISOString(),
                status: data.status,
            },
        });

        res.status(200).json({ message: "User upserted successfully" });
    } catch (error) {
        console.error("Upsert Error:", error);
        res.status(500).json({ message: "Error upserting user" });
    } 
}