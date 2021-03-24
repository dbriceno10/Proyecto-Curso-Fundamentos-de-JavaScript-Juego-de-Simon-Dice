const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }
    inicializar() {
        btnEmpezar.classList.add('hide')//esto va a ocultar el botón de empezar
        this.nivel = 10
        this.colores = {
            // celeste: celeste,
            // violeta: violeta,
            // naranja: naranja,
            // verde: verde
            //nota, en javascript si creamos un objeto y en el queremos guardar el valor de una variable (que ya estaba creada), podemos "poner directamente" la variable dentro del objeto, para ahorrar, ya que llevarian el mismo nombre 
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    generarSecuencia() {
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
        //recordad que el n dentro de map realmente es un 0 (cero)
    }

    siguienteNivel() {
        this.iluminarSecuencia()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return "celeste";
            case 1:
                return "violeta";
            case 2:
                return "naranja";
            case 3: 
                return "verde";
            //en estos casos no hace caso colocar un "break" debido a que este jamás se va a ejecutar
        }
    }

    iluminarSecuencia() {//recorreremos el array para la seciencia que vamos a estar ilumiando 
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i);//necesitamos que pase un intervalo de tiempo en cada llamado de la función, de lo contrario va a parecer que todos los colores se llaman al mismo tiempo y preden de manera muy rápida, eso lo vamos a lograr colocando un "setTimeout". Como tiempo vamos a agregar 1000ms (1s) y lo vamos a multiplicar por i, esto nos dará un intervalo de un segundo entre cada repeticición del ciclo, como el valor inicial de i es 0 en en primer ciclo, en ese caso este se va a iluminar de inmediato
            // setTimeout (() => {
            //     console.log(color)
            //     this.iluminarColor(color)
            // }, 1000 * i)

        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add("light");//el botón que tenga este color. "classList" me va a dar toda la lista de clases que tienen un elemento en particular, luego ".add" le va a agaregar una clase de CSS
        setTimeout( () => this.apagarColor(color), 350);//Como el color se quedaría encendido siempre y necesitamos que parpadee solamente, vamos a definir una función apagar color la cual va a eliminar nuestra clase "ligth" a nuetro botón, y usando el "setTimeout" controlaremos en cuanto tiempo queremos que eso ocurra
    }

    apagarColor(color) {
        this.colores[color].classList.remove("light");
    }

}

function empezarJuego() {
    window.juego = new Juego()
    console.log(juego)
}