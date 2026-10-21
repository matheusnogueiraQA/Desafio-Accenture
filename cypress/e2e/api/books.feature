
# language: pt

Funcionalidade: Reserva de livros pela API DemoQA

  Cenário: Consultar livros e reservar dois para o usuário
    Dado que tenho um usuário autenticado
    Quando consulto os livros disponíveis
    Então a API deve retornar uma lista de livros
    Quando reservo dois livros para o usuário
    Então a reserva deve conter os dois livros selecionados
    Quando consulto novamente os dados do usuário
    Então os dois livros devem constar na conta
