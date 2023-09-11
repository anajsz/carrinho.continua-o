const produtos = [
    {
        id: "1",
        nome: "Informática para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/1.png",
    },
    {
        id: "2",
        nome: "Gestão de conteúdo Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/3.png",  
    }

    //Na parte do código acima criamos uma array chamado PRODUTOS, onde haverá objetos representando diferentes produtos.
    // Cada objeto tem várias propriedades que descrevem o produto, como id, nome, prof, preco_de, preco_por, descricao do produto, e imagem do produto.//
];
function renderizaProdutos(){
    let html = "";
    for(let i = 0; i < produtos.length; i++){
        html = html + criarProduto(produtos[i], i);
    }
    return html;
}

// Esta função cria uma representação HTML de todos os produtos disponíveis.
// Ele percorre a lista de produtos e, para cada produto, chama outra função para criar a parte HTML desse produto. 
//O HTML gerado é armazenado em uma variável e finalmente todo o HTML do produto é combinado e retornado como uma única string HTML que pode ser usada para exibir todos os produtos na página.

function criarProduto(produto, index) {
    return `
    <div class = "curso">
    <img class = 'inicio' title="t" src="${produto.imagem}" />
    <div class = "curso-info">
      <h4>${produto.nome}</h4>
      <h4>${produto.prof}</h4>
      <h4>${produto.descricao}</h4>
      </div>
      <div class = "curso-preco">
      <span class="preco-de">R$${produto.preco_de}</span>
      <span class="preco-por">R$${produto.preco_por}</span>
      <button class="btncar btn-add" data-index="${index}"></button>
      </div>
      </div>
      `;
}

// A função criarProduto cria uma representação HTML dos itens no carrinho de compras. 
//Este recurso cria uma representação visual dos produtos do carrinho de compras com todas essas informações e um botão de exclusão.
// Ele pega um objeto de produto como entrada e gera uma string HTML que exibe o nome do produto,
// preço unitário, quantidade selecionada do produto e valor total do item no carrinho de compras.

const container = document.querySelector("#container")
container.innerHTML = renderizaProdutos();
const carrinhoItens = {};

//Em relação a parte do container, estamos pegando o elemento com ID containerna página HTML e preenchendo seu conteúdo com a representação HTML dos produtos, que é gerado pela função renderizaProdutos(). 
//Portanto, essa parte do código insere os produtos na página, exibindo-os no elemento com o ID container.

function renderizaCarrinho () {
    let html = '';
    for (let produtoId in carrinhoItens) {
        html = html + criaItemCarrinho(carrinhoItens[produtoId]);
    }
    document.querySelector('.carrinho_itens').innerHTML = html;
}
//Esta parte do código atualiza dinamicamente o carrinho de compras na página, 
//preenchendo-o com os produtos que foram acrescentados a ele.
// Isso é feito chamando a função criaItemCarrinho para cada item no carrinho e atualizando o conteúdo do elemento HTML com a classe carrinho_itens com o HTML gerado.

function criaItemCarrinho(produto){
    return  `
    <div class = "carrinho_compra">
    <h4>${produto.nome}</h4>
    <p>Preço unidade: ${produto.preco_por} | Quantidade: ${produto.quantidade}</p>
    <p>Valor: R$: ${produto.preco_por*produto.quantidade}</p>
    <button data-produto-id="${produto.id}" class="btn-remove"> </button>
    </div>
    `;
}

//Essa função cria um bloco de HTML que representa um item no carrinho de compras,
// incluindo o nome do produto, o preço unitário, a quantidade, o valor total e um botão de remoção associado a esse produto. 
//Isso é usado para exibir cada item no carrinho de compras na página.

function criaCarrinhoTotal (){
    let total = 0;
    for (let produtoId in carrinhoItens) {
        total = total + carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].quantidade;
    }
    document.querySelector('.carrinho_total').innerHTML = `
    <h4>Total: <strong> R$${total} </strong</h4>
    <a href ="#" target="_blank">
    <ion-icon name="card-outline"></ion-icon>
    <strong>Comprar Agora</strong
    </a>
    `;}

    //Essa função calcula o valor total de todos os itens no carrinho e exibe esse valor na página, juntamente com um link "Comprar Agora".
    // Isso fornece ao usuário uma maneira de ver o custo total de sua compra no carrinho
   
    function adicionaItemNoCarrinho(produto){
        if (!carrinhoItens[produto.id]) {
            carrinhoItens[produto.id] = produto;
            carrinhoItens[produto.id].quantidade = 0;
        }++carrinhoItens[produto.id].quantidade;
        renderizaCarrinho();
        criaCarrinhoTotal();}
       
        document.body.addEventListener('click' , function (event){
            const elemento = event.target;
            if(elemento.classList.contains('btn-add')) {
                const index = parseInt(elemento.getAttribute('data-index'), 10);
                const produto = produtos[index];

                adicionaItemNoCarrinho(produto);
            }
            if (elemento.classList.contains('btn-remove')) {
                const produtoId = elemento.getAttribute('data-produto-id');
                if(carrinhoItens[produtoId].quantidade <= 1) {
                    delete carrinhoItens[produtoId];
                } else {
                    --carrinhoItens[produtoId].quantidade;
                }
                renderizaCarrinho();
                criaCarrinhoTotal();
            }
        });
       //Esta parte do código trata da interação do usuário ao adicionar e remover produtos do carrinho de compras. 
       //Quando o usuário clica no botão 'Adicionar ao carrinho', a função adicionaItemNoCarrinho é chamada para adicionar o produto ao carrinho e atualizar a exibição.
       // Se o usuário clicou no botão ‘Remover’ no carrinho, o código remove o produto correspondente do carrinho e atualiza a exibição do carrinho

    