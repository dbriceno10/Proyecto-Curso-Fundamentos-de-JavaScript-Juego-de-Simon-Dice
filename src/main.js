const amarillo = document.getElementById("amarillo")
const azul = document.getElementById("azul")
const rojo = document.getElementById("rojo")
const verde = document.getElementById("verde")
const nota_do = document.getElementById('sound_do')
const nota_re = document.getElementById('sound_re')
const nota_mi = document.getElementById('sound_mi')
const nota_fa = document.getElementById('sound_fa')
const btnEmpezar = document.getElementById("btnEmpezar")
const puntaje = document.getElementById("puntos")
const item = localStorage.getItem("puntos")
const counter = document.getElementById("counter")
let c1 = 0 // contador para ir llevando la puntuación en tiempo real
let ultimo_Nivel
puntaje.innerHTML = item

const capturar = () => {
    const niv = parseInt(document.getElementById("level").value)
    return niv
}
class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 1000)
    }
    
    inicializar() {
        
        this.maxPuntaje = localStorage.getItem("puntos")
        if (this.maxPuntaje != null) {
            puntaje.innerHTML = this.maxPuntaje
        }
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()//será como un switch que nos permitirá ocultar nuestro botón de comenzar por medio de retirar o agregar una clase
        this.nivel = 1
        this.puntos = 0
        this.colores = {
            amarillo,
            azul,
            rojo,
            verde
        }
        this.sonido = {
            nota_do,
            nota_re,
            nota_mi,
            nota_fa
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains("hide")) {
            btnEmpezar.classList.remove("hide")
        } else {
            btnEmpezar.classList.add("hide")
        }
        // if (dificultad.classList.contains("hide")) {
        //     dificultad.classList.remove("hide")
        // } else {
        //     dificultad.classList.add("hide")
        // }
        ultimo_Nivel = capturar()
        console.log(`El último nivel es ${ultimo_Nivel}`)
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

    sonidoDeColor(color) {
        switch(color) {
            case "amarillo":
                this.sonido.nota_do.play()
            break
            case "azul":
                this.sonido.nota_re.play()
            break
            case "rojo":
                this.sonido.nota_mi.play()
            break
            case "verde":
                this.sonido.nota_fa.play()
            break
        }
    }

    iluminarSecuencia() { 
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 800 * i)
            setTimeout(() => this.sonidoDeColor(color), 800 * i)
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

    nivelSuperado() {
        swal(`¡Nivel ${this.nivel - 1} superado!`, `Tu puntuación: ${this.puntos}`, "./fonts/logo-next_level.png")
    .then(() => setTimeout(this.siguienteNivel, 1000))
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        this.sonidoDeColor(nombreColor)
        c1 = c1 + 1
        counter.innerHTML=""
        counter.innerHTML=c1
        if (numeroColor === this.secuencia[this.subNivel]) {//verificar si el color elegido es igual al del primer subnivel
            this.subNivel++
            this.puntos++
            if(this.subNivel === this.nivel) {//pasar al siguiente nivel
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ultimo_Nivel + 1)) {//El usuario ha superado el último nivel  ganó
                    this.ganoElJuego()

                } else {
                    // setTimeout(this.siguienteNivel, 1500)//El usuario avanza al siguiendo nivel
                    this.nivelSuperado()
                }
            } 
        } else {//el usuario se equivocó de botón, así que pierde
            this.perdioElJuego()

        }
    }
    ganoElJuego() {
        //swal("Platzi","Ganaste el juego!", "success")//devuelve una promesa
        if (this.puntos > this.maxPuntaje) {
            localStorage.setItem('puntos', this.puntos)
        }
        // swal("!Felicitaciones, ganas el juego¡", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
        // .then(this.inicializar)
        if (ultimo_Nivel === 5) {
            swal("!Felicitaciones¡ Ganas en modo Fácil, no está mal para practicar.", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
        .then(this.inicializar)
        } else if (ultimo_Nivel === 10) {
            swal("!Felicitaciones¡ Ganas en modo Normal, ya estás listo/a para ir por un verdadero reto. ¿No te parece?", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
        .then(this.inicializar)
        } else if (ultimo_Nivel === 15) {
            swal("!Felicitaciones¡ Ganas en modo Medio, te estás volviendo bueno/a en esto. Pero ¿Medio de qué? Mejor sigue avanzando.", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
        } else if (ultimo_Nivel === 25) {
            swal("!Felicitaciones¡ Ganas en modo Difícil, si que estás adquiriendo maestía, que impresionante.", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
        } else if (ultimo_Nivel === 40) {
            swal("!Felicitaciones¡ Ganas en modo Experto, ya eres todo un experto, sin embargo, sigue avanzando y encontrarás sorpresas.", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
        } else if (ultimo_Nivel === 50) {
            swal("!Felicitaciones¡ Ganas en modo Épico. ¿Quién lo pensaría? Te acercas a descubir secretos.", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
        } else if (ultimo_Nivel === 100) {
            swal("!Felicitaciones¡ Ganas en modo Legendario, tu hazaña será recordada en la historia. ¿Estás listo, para conocer el secreto de la inmortalidad?...", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
        } else if (ultimo_Nivel === 999) {
            swal("!Felicitaciones¡ Ganas en modo Superviviencia, no creímos que nadie pudiera jamás. Sin embargo la inmortalidad es algo de gran valor, completa el reto una vez más y se te será revelado el secreto.", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
        }
        else {//el caso de que hubiera un error con el número del último nivel
            swal("!Felicitaciones, ganas el juego¡", `Tu puntucación: ${this.puntos}`,"./fonts/logo-win_the_game.png")
            .then(this.inicializar)
        }
        c1 = 0
        counter.innerHTML = 0
    }
    perdioElJuego() {
        
        //swal("Platzi", "Lo siento, perdiste el juego", "error")
        if (this.puntos > this.maxPuntaje) {
            localStorage.setItem('puntos', this.puntos)
        }
        swal("Lo siento, pierdes esta vez, mejor suerte la próxima", `Tu puntucación: ${this.puntos}`,"./fonts/logo-game_over.png")
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
        c1 = 0
        counter.innerHTML = 0
    }
}

const empezarJuego = () => {
    window.juego = new Juego()
}