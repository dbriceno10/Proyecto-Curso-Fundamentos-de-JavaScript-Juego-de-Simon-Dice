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
    //ZONA DE DECLARACIÓN DE FUNCIONES Y MÉTODOS
    inicializar() {
        this.elegirColor = this.elegirColor.bind(this);//el uso del método "bind" (atadura) pasandole "this" como parpametro, va a garantizar el el this usado al utilizar el método más adelante, el this siempre aga referencia al del principio, es decir al del juego, al que también se hace es crear una variable llamada _this ó selft y asignarle a this como valor y luego parsar esa variable creada como parámetro de bind, es una manera de hacer que la referencia sea un poco más entendible al momento de leer el código. Esto es algo raro del lenguaje JavaScript
        btnEmpezar.classList.add('hide');//esto va a ocultar el botón de empezar
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
        //necesitamos una manera de saber si los cliks que el usuario da son correctos o no, así que vamos a agregar un input para saberlo, que va a escuchar los click
        this.agregarEventosClick()
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
    
    agregarEventosClick() {//esta es una función que se va a ejecutar asíncronamemte, tiene un escuchador de eventos y se va a llamar cada vez que se le deun click a uno de los botones de colores, cuando javascript se queda sin tareas, empieza a ejecutar estas funciones en el orden que se vayan llamando. Estos métodos se suelen llamar con un parámetro, que generalmente se le asigna el nombre "ev"
        // this.colores.celeste.addEventListener("click", this.elegirColor.bind(this));
        // this.colores.verde.addEventListener("click", this.elegirColor.bind(this));
        // this.colores.violeta.addEventListener("click", this.elegirColor.bind(this));
        // this.colores.naranja.addEventListener("click", this.elegirColor.bind(this));
        this.colores.celeste.addEventListener("click", this.elegirColor);
        this.colores.verde.addEventListener("click", this.elegirColor);
        this.colores.violeta.addEventListener("click", this.elegirColor);
        this.colores.naranja.addEventListener("click", this.elegirColor);
    }

    elegirColor(ev) {//se pieder un poco el contexto de lo que es this
        // console.log(ev)
        console.log(this)
    }

    //TERMINA ZONA DE FUNCIONES Y MÉTODOS
}

function empezarJuego() {
    window.juego = new Juego()
    console.log(juego)
}