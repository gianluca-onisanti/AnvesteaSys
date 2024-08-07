import { prisma } from "../../../../lib/prisma";

export default async (req : any, res: any) => {
    
    let idPersonagem = Number(req.query.idPersonagem)
    let idJogador = Number(req.query.idJogador)
    let nomePersonagem = req.query.nomePersonagem
    let statusPersonagem = req.query.statusPersonagem

    const data = req.body;
    try {
        const result = await prisma.personagens.findMany({
            where: {
                status: statusPersonagem !== undefined ? !!+statusPersonagem : undefined,
                id_personagem: idPersonagem? idPersonagem : undefined,
                OR: [
                    { nome_personagem: { contains: nomePersonagem? nomePersonagem : '', mode: 'insensitive' } }, // Busca por nome
                    { apelido: { contains: nomePersonagem? nomePersonagem : '', mode: 'insensitive' } }, // Busca por apelido
                    { id_criador: idJogador ? idJogador : undefined },
                    { id_jogador: idJogador ? idJogador : undefined },
                ],
            },
            select: {
                id_personagem: true,
                id_criador: true,
                id_jogador: true,
                nome_personagem: true,
                apelido: true,
                idade: true,
                peso: true,
                altura: true,
                sexo_genero: true,
                data_insert: true,
                data_update: true,
                classe: true,
                subclasse: true,
                status: true,
                titulo: true,
                profissao: true,
                raca: true,
                dir_foto: true,
                jogador: {
                    select: {
                        nome_jogador: true,
                        apelido_jogador: true,
                    }
                },
                criador: {
                    select: {
                        nome_jogador: true,
                        apelido_jogador: true,
                    }
                },
                this_raca: {
                    select: {
                        nome: true,
                        nome_alt: true,
                    }
                }
            },
            orderBy: [
                {status: 'desc'},
                {nome_personagem: 'asc'},
            ]
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(403).json({ err: "Ocorreu um erro." })
    }
}