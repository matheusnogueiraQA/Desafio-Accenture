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

  Cenário: Excluir um registro
    Dado que acesso a página Web Tables
    Quando cadastro um novo registro com dados válidos
    E excluo o registro cadastrado
    Então o registro excluído não deve ser exibido na tabela

  Cenário: Cadastrar e excluir 12 registros dinamicamente
    Dado que acesso a página Web Tables
    Quando cadastro 12 registros dinamicamente
    Então os 12 registros devem ser exibidos na tabela
    Quando excluo todos os 12 registros criados
    Então nenhum dos 12 registros deve permanecer na tabela
