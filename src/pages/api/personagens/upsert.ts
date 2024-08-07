import { prisma } from "../../../../lib/prisma";

export default async function handler(req: any, res: any) {

    const { data } = req.body;

    try {
        const result = await prisma.personagens.upsert({
            where: { 
                id_personagem: data.id_personagem
            },
            update: {
                nome_personagem: data.nome_personagem,
                apelido: data.apelido,
                id_jogador: data.id_jogador,
                titulo: data.titulo,
                profissao: data.profissao,
                raca: data.raca,
                sexo_genero: data.sexo_genero,
                idade: data.idade,
                altura: data.altura,
                peso: data.peso,
                dir_foto: '',
                classe: data.classe,
                subclasse: data.subclasse,
                data_update: (new Date()).toISOString(),
                status: data.status,
            },
            create: {
                nome_personagem: data.nome_personagem,
                apelido: data.apelido,
                id_criador: data.id_jogador,
                id_jogador: data.id_jogador,
                profissao: data.profissao,
                titulo: data.titulo,
                raca: data.raca,
                sexo_genero: data.sexo_genero,
                idade: data.idade,
                altura: data.altura,
                peso: data.peso,
                dir_foto: '',
                classe: data.classe,
                subclasse: data.subclasse,
                data_insert: (new Date()).toISOString(),
                data_update: (new Date()).toISOString(),
                status: true,
            },
        });

        res.status(200).json({ message: "Character upserted successfully" });
    } catch (error) {
        console.error("Upsert Error:", error);
        res.status(500).json({ message: "Error upserting Character" });
    } 
}