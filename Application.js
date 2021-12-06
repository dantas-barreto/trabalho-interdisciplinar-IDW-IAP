class Cliente {
    constructor(email, senha) {
        this.email = email
        this.senha = senha
    }

    validarCadastro() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Carrinho {
    constructor(statusLogin, cliente, item) {
        this.statusLogin = statusLogin
        this.cliente = cliente
        this.item = item
    }
}

class DB {
    
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosCadastros() {

        let clientes = Array()
        let id = localStorage.getItem('id')

        for (let i = 0; i < id; i++) {
            let cliente = JSON.parse(localStorage.getItem(i))
            if (cliente === null) {
                continue
            }
            clientes.id = i
            clientes.push(cliente)
        }
        return clientes
    }
}

let db = new DB()

let carrinhoCompras = new DB()

function cadastroCliente() {
   
    let email = document.getElementById('email')
    let senha = document.getElementById('senha')

    let cliente = new Cliente(
        email.value,
        senha.value
    )

    if(cliente.validarCadastro()) {
        db.gravar(cliente)

        window.open('signin.html')

        email.value = ''
        senha.value = ''

    } else {
        document.getElementById('warningText').innerHTML = ''
        document.getElementById('warningText').innerHTML = 'Ocorreu um erro! Por favor tente novamente.'
    }
}

function loginCliente() {
    
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    let clienteCadastrado = new Cliente(email, senha)

    if (clienteCadastrado.validarCadastro()) {
        //carrinho de compras

    } else {
        document.getElementById('warningLoginText').innerHTML = ''
        document.getElementById('warningLoginText').innerHTML = 'Ocorreu um erro! Por favor tente novamente.'
    }
}