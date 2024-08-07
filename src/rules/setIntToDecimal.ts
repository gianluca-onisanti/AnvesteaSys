export default function setIntToDecimal(numero?: number): string {
    
    const numeroEmString = numero?.toString() || '';
    const tamanho = numeroEmString.length;

    if (tamanho <= 2) {
        return `0,${numeroEmString}`; // Adiciona '0,' se houver apenas dois dígitos
    } else {
        const parteInteira = numeroEmString.slice(0, tamanho - 2);
        const ultimosDoisDigitos = numeroEmString.slice(tamanho - 2);
        return `${parteInteira},${ultimosDoisDigitos}`;
    }
}