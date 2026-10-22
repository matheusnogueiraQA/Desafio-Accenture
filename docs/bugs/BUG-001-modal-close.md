# Botão Close não fecha o modal de confirmação

## Resumo:
O botão Close do modal de confirmação do formulário Practice Form não fecha o modal depois que é clicado.

## Ambiente:
- DemoQA — Practice Form
- URL: https://demoqa.com/automation-practice-form

## Pré-condições
- Acessar o Practice Form.
- Preencher os campos obrigatórios e enviar o formulário.
- Confirmar que o modal de confirmação foi exibido.

## Passos para reproduzir

1. Enviar o formulário Practice Form com dados válidos.
2. Esperar até que o modal de confirmação apareça.
3. Clicar no botão Close do modal.

## Resultado esperado:
O modal de confirmação deve fechar após clicar no botão Close.

## Resultado atual:
O modal de confirmação continua aberto após o clique. O console do navegador exibe o erro: Lr.findDOMNode is not a function

## Evidências
![Falha ao fechar o modal](../../cypress/screenshots/practice-form.feature/fechar%20modal.png)
  