const amarillo = document.getElementById('amarillo')
const azul = document.getElementById('azul')
const rojo = document.getElementById('rojo')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ultimo_Nivel = 10

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 1000)
    }
    
    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()//será como un switch que nos permitirá ocultar nuestro botón de comenzar por medio de retirar o agregar una clase
        this.nivel = 1
        this.colores = {
            amarillo,
            azul,
            rojo,
            verde
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains("hide")) {
            btnEmpezar.classList.remove("hide")
        } else {
            btnEmpezar.classList.add("hide")
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ultimo_Nivel).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subNivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return "amarillo"
            case 1:
                return "azul"
            case 2:
                return "rojo"
            case 3: 
                return "verde"
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case "amarillo":
                return 0
            case "azul":
                return 1
            case "rojo":
                return 2
            case "verde": 
                return 3
        }
    }

    iluminarSecuencia() { 
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add("light")
        setTimeout( () => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove("light")
    }
    
    agregarEventosClick() {
        this.colores.amarillo.addEventListener("click", this.elegirColor)
        this.colores.verde.addEventListener("click", this.elegirColor)
        this.colores.azul.addEventListener("click", this.elegirColor)
        this.colores.rojo.addEventListener("click", this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.amarillo.removeEventListener("click", this.elegirColor)
        this.colores.verde.removeEventListener("click", this.elegirColor)
        this.colores.azul.removeEventListener("click", this.elegirColor)
        this.colores.rojo.removeEventListener("click", this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subNivel]) {//verificar si el color elegido es igual al del primer subnivel
            this.subNivel++
            if(this.subNivel === this.nivel) {//pasar al siguiente nivel
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ultimo_Nivel + 1)) {//El usuario ha superado el último nivel  ganó
                    this.ganoElJuego()

                } else {
                    setTimeout(this.siguienteNivel, 1500)//El usuario avanza al siguiendo nivel
                }
            } 
        } else {//el usuario se equivocó de botón, así que pierde
            this.perdioElJuego()

        }
    // }
    // ganoElJuego() {
    //     swal("Platzi","Ganaste el juego!", "success")//devuelve una promesa
    //     .then(this.inicializar)
    // }
    // perdioElJuego() {
    //     swal("Platzi", "Lo siento, perdiste el juego", "error")
    //     .then(() => {
    //         this.eliminarEventosClick()
    //         this.inicializar()
    //     })
    }
}

function empezarJuego() {
    window.juego = new Juego()
    console.log(juego)
}