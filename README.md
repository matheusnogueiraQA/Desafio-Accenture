# Desafio Accenture — Automação de Testes QA

Projeto de automação de testes para os fluxos da aplicação [DemoQA](https://demoqa.com), desenvolvido com Cypress e cenários BDD em português usando Cucumber.

## Tecnologias

- Cypress
- Cucumber (`@badeball/cypress-cucumber-preprocessor`)
- JavaScript
- Puppeteer Core, usado para validar a abertura de uma janela real do navegador
- Mochawesome Reporter, para gerar relatórios HTML e JSON

## Pré-requisitos

- Node.js e npm
- Google Chrome instalado para executar o cenário Browser Windows

O caminho do Chrome usado pelo Puppeteer está definido em `cypress.config.js` como `C:\Program Files\Google\Chrome\Application\chrome.exe`. Se o Chrome estiver instalado em outro local, atualize `CHROME_PATH` nesse arquivo.

## Instalação

Clone o repositório, entre na pasta e instale as dependências:

```bash
git clone https://github.com/matheusnogueiraQA/Desafio-Accenture.git
cd Desafio-Accenture
npm ci
```

## Executar os testes

```bash
# Abrir o Cypress interativo
npm run cy:open

# Executar todos os cenários
npm run cy:run

# Executar somente os testes de API
npm run cy:api

# Executar somente os testes de interface
npm run cy:frontend

# Executar o cenário Browser Windows no Chrome visível
npm run cy:browser-windows

# Executar todos os cenários e gerar relatório
npm run cy:report
```

Para executar um único arquivo de cenário:

```bash
npx cypress run --spec "cypress/e2e/frontend/sortable/sortable.feature"
```

Substitua o caminho pelo arquivo `.feature` desejado.

## Cenários cobertos

### Interface

- **Practice Form:** preenchimento e envio do formulário, incluindo validação dos dados exibidos.
- **Web Tables:** cadastro, edição e exclusão de registros, incluindo a criação dinâmica de 12 registros.
- **Browser Windows:** abertura de uma nova janela, validação do conteúdo e encerramento da janela.
- **Progress Bar:** pausa antes de 25%, retomada até 100% e reset da barra.
- **Sortable:** reorganização de itens por drag and drop e validação da ordem crescente.

### API

- **Account:** cenários da API de contas do Book Store.
- **Books:** cenários da API de livros do Book Store.

Os arquivos `.feature` e suas implementações estão organizados em `cypress/e2e`.

## Relatórios e evidências

- Relatório HTML: `cypress/reports/index.html` (gerado com `npm run cy:report`)
- Relatório JSON: `cypress/reports/index.json`
- Vídeos das execuções: `cypress/videos`
- Screenshots de falhas e evidências: `cypress/screenshots`

Relatórios e vídeos gerados localmente são ignorados pelo Git. As evidências selecionadas podem ser mantidas no repositório em `cypress/screenshots`.

## Bugs identificados

Os problemas encontrados na aplicação DemoQA estão documentados em `docs/bugs`:

- [BUG-001 — Botão Close não fecha o modal de confirmação](docs/bugs/BUG-001-modal-close.md)
- [BUG-002 — A exclusão de um registro remove todos os registros criados](docs/bugs/BUG-002-exclusao-multipla-registros.md)
