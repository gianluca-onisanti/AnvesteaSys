export default function getGender(e: number, tipo? : 'abv' | 'full' | 'abv') {
    switch (e) {
        case 0:
            return tipo === 'abv' ? 'F' : 'Feminino'
        case 1:
            return tipo === 'abv' ? 'M' : 'Masculino'
        case 2:
            return tipo === 'abv' ? 'N/D' : 'Não Definido'
    }
}