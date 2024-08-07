import { prisma } from "../../../../lib/prisma";

export default async (req : any, res: any) => {
    
    let idJogador = Number(req.query.idJogador)
    let nomeJogador = req.query.nomeJogador
    let statusJogador = req.query.statusJogador

    const data = req.body;
    try {
        const result = await prisma.jogadores.findMany({
            where: {
                OR: [
                    { nome_jogador: { contains: nomeJogador? nomeJogador : '', mode: 'insensitive' } }, // Busca por nome
                    { apelido_jogador: { contains: nomeJogador? nomeJogador : '', mode: 'insensitive' } }, // Busca por apelido
                  ],
                id_jogador: idJogador? idJogador : undefined,
                status: statusJogador !== undefined ? !!+statusJogador : undefined,
            },
            select: {
                id_jogador: true,
                nome_jogador: true,
                apelido_jogador: true,
                data_insert: true,
                data_update: true,
                status: true,
            },
            orderBy: [
                {status: 'desc'},
                {nome_jogador: 'asc'},
            ]
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(403).json({ err: "Ocorreu um erro." })
    }
}