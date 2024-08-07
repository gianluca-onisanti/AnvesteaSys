import { prisma } from "../../../../lib/prisma";

export default async (req : any, res: any) => {

    let jogadorId = Number(req.query.jogadorId)
    
    try {
        const result = await prisma.jogadores.findMany({
            where: {
                status: true,
            },
            select:{
                id_jogador: true,
                nome_jogador: true,
                apelido_jogador: true
            },
            orderBy: [
                {nome_jogador: 'asc'},
            ]
        });

        /// Mapeie os mapas para dar Match nos atributos [key e value] dos componentes
        const mappedResult = result.map(item => ({
            key: item.id_jogador,
            value: item.nome_jogador + ' (' + item.apelido_jogador + ')',
          }))

        res.status(200).json(mappedResult);
    } catch (err) {
        console.log(err)
        res.status(403).json({ err: "Ocorreu um erro." })
    }
}