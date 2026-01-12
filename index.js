const fs = require('fs');
const readline = require('readline');

// Configuração do Readline para entrada de dados no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const FILE_PATH = './database.json';

// Função auxiliar para carregar dados
function carregarDados() {
    try {
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        return [];
    }
}

// Função auxiliar para salvar dados
function salvarDados(produtos) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(produtos, null, 2));
}

let produtos = carregarDados();

// Menu Principal
function menu() {
    console.log('\n=== AGILSTORE - GERENCIAMENTO DE INVENTÁRIO ===');
    console.log('1. Adicionar Produto');
    console.log('2. Listar Produtos');
    console.log('3. Atualizar Produto');
    console.log('4. Excluir Produto');
    console.log('5. Buscar Produto');
    console.log('0. Sair');
    
    rl.question('Escolha uma opção: ', (opcao) => {
        switch(opcao) {
            case '1': adicionarProduto(); break;
            case '2': listarProdutos(); break;
            case '3': atualizarProduto(); break;
            case '4': excluirProduto(); break;
            case '5': buscarProduto(); break;
            case '0': 
                console.log('Saindo e salvando dados...');
                rl.close(); 
                break;
            default:
                console.log('Opção inválida!');
                menu();
        }
    });
}

// 1. Adicionar Produto
function adicionarProduto() {
    console.log('\n--- Novo Produto ---');
    rl.question('Nome do Produto: ', (nome) => {
        rl.question('Categoria: ', (categoria) => {
            rl.question('Quantidade em Estoque: ', (qtd) => {
                rl.question('Preço: ', (preco) => {
                    const novoProduto = {
                        id: Date.now().toString(), // Gera ID único baseado no tempo
                        nome: nome,
                        categoria: categoria,
                        quantidade: parseInt(qtd),
                        preco: parseFloat(preco)
                    };
                    
                    if (isNaN(novoProduto.quantidade) || isNaN(novoProduto.preco)) {
                        console.log('Erro: Quantidade e Preço devem ser números.');
                    } else {
                        produtos.push(novoProduto);
                        salvarDados(produtos);
                        console.log('Produto adicionado com sucesso!');
                    }
                    menu();
                });
            });
        });
    });
}

// 2. Listar Produtos
function listarProdutos() {
    console.log('\n--- Lista de Produtos ---');
    if (produtos.length === 0) {
        console.log('Nenhum produto cadastrado.');
    } else {
        console.table(produtos);
    }
    menu();
}

// 3. Atualizar Produto
function atualizarProduto() {
    rl.question('Digite o ID do produto para atualizar: ', (id) => {
        const index = produtos.findIndex(p => p.id === id);
        
        if (index === -1) {
            console.log('Produto não encontrado!');
            return menu();
        }

        const produtoAtual = produtos[index];
        console.log(`Editando: ${produtoAtual.nome} (Deixe em branco para manter o atual)`);

        rl.question(`Novo Nome (${produtoAtual.nome}): `, (nome) => {
            rl.question(`Nova Categoria (${produtoAtual.categoria}): `, (cat) => {
                rl.question(`Nova Quantidade (${produtoAtual.quantidade}): `, (qtd) => {
                    rl.question(`Novo Preço (${produtoAtual.preco}): `, (preco) => {
                        
                        // Atualiza apenas se o usuário digitou algo
                        produtos[index].nome = nome || produtoAtual.nome;
                        produtos[index].categoria = cat || produtoAtual.categoria;
                        produtos[index].quantidade = qtd ? parseInt(qtd) : produtoAtual.quantidade;
                        produtos[index].preco = preco ? parseFloat(preco) : produtoAtual.preco;

                        salvarDados(produtos);
                        console.log('Produto atualizado com sucesso!');
                        menu();
                    });
                });
            });
        });
    });
}

// 4. Excluir Produto
function excluirProduto() {
    rl.question('Digite o ID do produto para excluir: ', (id) => {
        const index = produtos.findIndex(p => p.id === id);
        
        if (index === -1) {
            console.log('Produto não encontrado!');
            return menu();
        }

        console.log(`Produto encontrado: ${produtos[index].nome}`);
        rl.question('Tem certeza que deseja excluir? (s/n): ', (resp) => {
            if (resp.toLowerCase() === 's') {
                produtos.splice(index, 1);
                salvarDados(produtos);
                console.log('Produto removido!');
            } else {
                console.log('Operação cancelada.');
            }
            menu();
        });
    });
}

// 5. Buscar Produto
function buscarProduto() {
    rl.question('Digite o ID ou parte do nome para buscar: ', (termo) => {
        const resultados = produtos.filter(p => 
            p.id === termo || p.nome.toLowerCase().includes(termo.toLowerCase())
        );

        if (resultados.length > 0) {
            console.log('\n--- Resultados Encontrados ---');
            console.table(resultados);
        } else {
            console.log('Nenhum produto encontrado.');
        }
        menu();
    });
}

// Iniciar Aplicação
menu();