# language: pt

Funcionalidade: Ordenação de itens DemoQA

  Cenário: Organizar os itens em ordem crescente por arrastar e soltar
    Dado que acesso a página inicial do DemoQA
    Quando seleciono Interactions
    E acesso o submenu Sortable
    E desordeno a lista com três movimentos de drag and drop
    Quando ordeno os elementos em ordem crescente com drag and drop
    Então os itens devem estar em ordem crescente
