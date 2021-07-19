/*
Copyright (c) 2021, JOSÉ FRANCISCO CRUZ CORRO <josefranciscocruzcorro@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

export default{
    frances(capital,interes,meses) {
        capital = parseFloat(capital);
        interes = parseFloat(interes);
        meses = parseInt(meses);
        let interes_0 = interes;

        let msaux = 0;
        let reuxaux = meses;

        while (parseInt(reuxaux) > 0) {
            if (parseInt(reuxaux) - 12 >= 0 || parseInt(reuxaux) % 12 != 0) {
                msaux= parseInt(msaux) + 12;
                reuxaux= parseInt(reuxaux) - 12;
            }
        }

        if (parseInt(msaux) == 0) {
            return [];
        }

        interes_0 = parseFloat(interes_0) / parseInt(msaux);

        let cuota = parseFloat(capital) * ( (parseFloat(interes_0)/100) / (1 - ( 1 / (Math.pow( (1 + (parseFloat(interes_0)/100)),parseInt(meses)) ) ) ) );

        let resultado = [
            [
                0,//AÑO
                0,//ANUALIDAD
                0,//AMORT CAPITAL
                0,//INTERES
                0,//CAP AMORT
                capital,//CAP PENDIENTE
            ],
        ];

        let amo = 0;
        for (let index = 1; index <= parseInt(meses); index++) {
            let ik = parseFloat(resultado[index-1][5]) * parseFloat(interes_0) / 100;
            let ak = parseFloat(cuota) - parseFloat(ik);
            amo = parseFloat(amo) + parseFloat(ak);

            resultado.push([
                parseFloat(index).toFixed(2),//AÑO
                parseFloat(cuota).toFixed(2),//ANUALIDAD
                parseFloat(ak).toFixed(2),//AMORT CAPITAL
                parseFloat(ik).toFixed(2),//INTERES
                parseFloat(amo).toFixed(2),//CAP AMORT
                parseFloat(parseFloat(capital) - parseFloat(amo)).toFixed(2),//CAP PENDIENTE
            ]);
        }

        return resultado;
    }
}