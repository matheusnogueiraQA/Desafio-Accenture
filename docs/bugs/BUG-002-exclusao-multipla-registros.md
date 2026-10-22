# A exclusão de um registro remove todos os registros criados

## Resumo:
Ao excluir um registro recém-cadastrado na página Web Tables, todos os registros criados durante o teste desaparecem da tabela. Os registros padrão do sistema permanecem visíveis.

## Ambiente:
- DemoQA — Web Tables
- URL: https://demoqa.com/webtables
- Navegador: Google Chrome
- Data da ocorrência: 22/10/2026

## Pré-condições
- Acessar a página Web Tables.
- Cadastrar 12 registros com dados válidos e distintos.
- Confirmar que os 12 registros aparecem na tabela.

## Passos para reproduzir

1. Acessar a página Web Tables.
2. Cadastrar 12 registros dinamicamente.
3. Pesquisar e confirmar a presença de cada registro.
4. Pesquisar um dos registros criados.
5. Clicar no ícone de exclusão desse registro.
6. Pesquisar os outros registros criados.

## Resultado esperado:
Somente o registro selecionado deve ser excluído. Os outros 11 registros criados devem continuar disponíveis na tabela.

## Resultado atual:
Após excluir um dos registros criados, todos os registros criados durante o teste deixam de aparecer. Os usuários padrão do sistema continuam visíveis.

## Evidências
![Falha ao excluir os registros dinamicamente](../../cypress/screenshots/web-tables.feature/excluir%20registros.png)
