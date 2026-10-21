# language: pt

Funcionalidade: Gerenciamento de conta pela API DemoQA

  Cenário: Criar usuário, autenticar e consultar seus dados
    Dado que desejo criar um novo usuário
    Quando envio os dados para criação da conta
    Então a API deve criar o usuário com sucesso
    Quando solicito um token de autenticação
    Então devo receber um token válido
    Quando verifico a autorização do usuário
    Então o usuário deve estar autorizado
    Quando consulto os dados do usuário
    Então os dados retornados devem corresponder ao usuário criado
