# ProjetoNavers
 Desafio de back-end

## Instale as dependências e as bibliotecas

1. npm install --save express
2. npm install --save express-handlebars
3. npm install --save body-parser
4. npm install --save mongoose

**Instale o mongoDB**

## Foi utilizado
* Express.js - framework para aplicações web para Node.js 
* MongoDB - um banco de dados distribuído de propósito geral baseado em documento.
* Handlebars - processador de templates que gera a tela HTML dinamicamente.
* Mongoose - conecta ao banco de dados mongodb
* body-parser - usado para receber dados de formularios dentro do express

## Como rodar projeto
* Abra a pasta onde está o arquivo app.js
* Abra o terminal cmd e execute o comando 'node app.js' 
* Em outro terminal cmd execute o banco de dados mongo
* Digitando 'mongo' no cmd, caso o caminho já esteja configurado
* se não estiver configurando siga as instruções
* Abra o gerenciador de arquivos -> clique com o botao direito em 'Este computador'
* va em propriedades -> configuracoes avançadas do sistema -> variaveis de ambiente
* clique em path -> editar e depois em novo
* por fim cole o diretório da pasta bin do mongoDB
* exemplo: C:\Program Files\MongoDB\Server\4.4\bin
* depois clique em OK e digite mongo no cmd

## Funcionalidades

* Rota para criação dos funcionários (Navers) 
* Rota para listagem dos funcionários (Navers) 
* Rota para edição dos dados dos funcionários (Navers) 
* E possivel informar, listar e editar os projetos em que o funcionário participou 
 
* Rota de Criação de Projeto 
* Rota para listagem dos Projetos 
* Rota para edição dos Projetos 
* informações do projeto e quais foram os funcionarios(navers) que participaram 


