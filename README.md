# AgilStore - Gerenciamento de Inventário

Aplicação de linha de comando (CLI) desenvolvida para a AgilStore visando otimizar o controle de inventário de eletrônicos.

## Funcionalidades

- **Adicionar Produto:** Cadastro com ID automático, nome, categoria, quantidade e preço.
- **Listar Produtos:** Visualização em tabela de todo o inventário.
- **Atualizar Produto:** Edição de campos específicos de um produto existente.
- **Excluir Produto:** Remoção segura mediante confirmação.
- **Buscar Produto:** Pesquisa por ID ou nome.
- **Persistência de Dados:** Os dados são salvos automaticamente no arquivo `database.json`.

## Tecnologias Utilizadas

- **JavaScript (Node.js)**
- Módulo nativo `readline` para interação via terminal.
- Módulo nativo `fs` (File System) para persistência de dados JSON.

## Como Rodar o Projeto

### Pré-requisitos
Necessário ter o [Node.js](https://nodejs.org/) instalado na máquina.

### Passo a Passo
1. Clone este repositório ou baixe os arquivos.
2. Abra o terminal na pasta do projeto.
3. Execute o comando:
   ```bash
   node index.js