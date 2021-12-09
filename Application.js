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
    constructor(statusLogin) {
        this.statusLogin = statusLogin
    }
}

class Produto {
    constructor(titulo, preco) {
        this.titulo = titulo
        this.preco = preco
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

var carrinho = Array()

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
        window.open('index.html')
    } else {
        document.getElementById('warningLoginText').innerHTML = ''
        document.getElementById('warningLoginText').innerHTML = 'Ocorreu um erro! Por favor tente novamente.'
    }
}

function adicionarItemCarrinho() {
    var titulo = document.getElementById('titulo').innerHTML
    var preco = document.getElementById('preco').innerHTML

    var itemCarrinho = new Produto(titulo, preco)

    carrinho.push(itemCarrinho)

    let texto_carrinho = JSON.stringify(carrinho)
    localStorage.setItem("carrinho", texto_carrinho)
    listaCarrinho()
}

function listaCarrinho() {
    var textoArmazenado = localStorage.getItem("carrinho")
    var listaCarrinho = JSON.parse(textoArmazenado)
    var lista = document.getElementById('carrinhoCompras')

    lista.innerHTML = ''

    for (let i = 0; i < listaCarrinho.length; i++) {
        lista.innerHTML += `
            <div class="card mb-3 ms-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="img/iphone.webp" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${listaCarrinho[i]["titulo"]}</h3>
                            <h5>${listaCarrinho[i]["preco"]}</h5>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}