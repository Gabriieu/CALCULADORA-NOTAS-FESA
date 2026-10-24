export const NOTA_MAXIMA = 10;

interface INotasMediaFinal {
  n1b1: number;
  n2b1: number;
  n1b2: number;
  formativa: number;
}

// A média só "chega a 5" pelo valor exibido, com 1 casa decimal (como nos componentes
// out-media-*), então 4,95 já conta como 5,0.
export function mediaChegaA5(media: number): boolean {
  return Number(media.toFixed(1)) >= 5;
}

// menor N2 (em passos de 0,1) cuja média exibida é >= 5; null se nem a nota máxima basta
function menorN2ParaMedia5(mediaComN2: (n2: number) => number): number | null {
  for (let decimos = 0; decimos <= NOTA_MAXIMA * 10; decimos++) {
    const n2 = decimos / 10;
    if (mediaChegaA5(mediaComN2(n2))) return n2;
  }
  return null;
}

// mesma conta do out-media-1b
export function n2MinimaPrimeiroBimestre(n1: number): number | null {
  return menorN2ParaMedia5((n2) => n1 * 0.4 + n2 * 0.6);
}

// mesma conta do out-media-final
export function mediaFinal({
  n1b1,
  n2b1,
  n1b2,
  n2b2,
  formativa,
}: INotasMediaFinal & { n2b2: number }): number {
  return (
    (n1b1 * 0.4 + n2b1 * 0.6 + (((n1b2 + formativa) / 2) * 0.4 + n2b2 * 0.6)) /
    2
  );
}

// N2 do 2º bimestre para a média final chegar a 5
export function n2MinimaMediaFinal(notas: INotasMediaFinal): number | null {
  return menorN2ParaMedia5((n2b2) => mediaFinal({ ...notas, n2b2 }));
}
