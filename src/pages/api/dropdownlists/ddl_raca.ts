import { prisma } from "../../../../lib/prisma";

export default async (req : any, res: any) => {

    try {
        const result = await prisma.racas.findMany({
            where: {
                status: true,
            },
            select:{
                id: true,
                nome: true,
                nome_alt: true
            },
            orderBy: [
                {nome: 'asc'},
            ]
        });

        /// Mapeie os mapas para dar Match nos atributos [key e value] dos componentes
        const mappedResult = result.map(item => ({
            key: item.id,
            value: item.nome + (item.nome_alt ? (' (' + item.nome_alt + ')') : ''),
          }))

        res.status(200).json(mappedResult);
    } catch (err) {
        console.log(err)
        res.status(403).json({ err: "Ocorreu um erro." })
    }
}