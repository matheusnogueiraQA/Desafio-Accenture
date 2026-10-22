# language: pt

Funcionalidade: Janelas do navegador DemoQA

  Cenário: Abrir, validar e fechar uma nova janela
    Quando solicito a abertura de uma nova janela com o texto "This is a sample page"
    Então devo visualizar o texto "This is a sample page"
    E devo confirmar que a nova janela foi fechada