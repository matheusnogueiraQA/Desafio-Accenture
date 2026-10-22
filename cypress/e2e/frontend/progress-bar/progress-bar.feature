#language: pt

Funcionalidade: Barra de progresso DemoQA

  Cenário: Parar antes de 25%, retomar até 100% e resetar a barra
    Dado que acesso a página inicial do DemoQA
    Quando seleciono Widgets
    E acesso o submenu Progress Bar
    E inicio a barra de progresso
    E paro a barra antes de atingir 25 por cento
    Então o progresso deve ser menor ou igual a 25 por cento
    E a barra deve permanecer parada
    Quando aperto Start novamente
    Então a barra deve atingir 100 por cento
    Quando reseto a barra de progresso
    Então o progresso deve voltar para zero
