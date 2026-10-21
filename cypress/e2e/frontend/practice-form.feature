# language: pt

Funcionalidade: Formulário de prática DemoQA

  Cenário: Preencher e enviar o formulário com sucesso
    Dado que acesso o formulário de prática
    Quando preencho todos os campos obrigatórios
    E envio o formulário
    Então devo visualizar o modal de confirmação
    E os dados exibidos devem corresponder aos dados enviados
    Quando fecho o modal de confirmação
    Então o modal deve ser fechado
