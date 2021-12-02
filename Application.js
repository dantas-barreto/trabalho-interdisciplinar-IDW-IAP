class Cliente {
    constructor(nome, email, senha) {
        this.nome = nome
        this.email = email
        this.senha = senha
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
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

        for (let i = 1; i <= id; i++) {
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

function cadastroCliente() {
    
    let nome = document.getElementById('nome')
    let email = document.getElementById('email')
    let senha = document.getElementById('senha')

    let cliente = new Cliente(
        nome.value,
        email.value,
        senha.value
    )

    if(cliente.validarDados()) {
        db.gravar(cliente)

        nome.value = ''
        email.value = ''
        senha.value = ''

        //mudança de pagina
    } else {
        document.getElementById('warningText').innerHTML = ''
        document.getElementById('warningText').innerHTML = 'Ocorreu um erro! Por favor tente novamente.'
    }
}

