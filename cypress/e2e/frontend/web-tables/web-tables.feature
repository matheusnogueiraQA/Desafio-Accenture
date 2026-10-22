# language: pt

Funcionalidade: Gerenciamento de registros na tabela Web Tables

  Cenário: Cadastrar um novo registro
    Dado que acesso a página Web Tables
    Quando cadastro um novo registro com dados válidos
    Então o registro deve ser exibido na tabela

  Cenário: Editar o departamento de um registro
    Dado que acesso a página Web Tables
    Quando cadastro um novo registro com dados válidos
    E altero o departamento do registro cadastrado
    Então o departamento atualizado deve ser exibido na tabela