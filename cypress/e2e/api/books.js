
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import accountApi from "../../pages/api/accountApi";
import bookStoreApi from "../../pages/api/bookStoreApi";

let userName;
let password;
let userId;
let token;
let availableBooks;
let selectedIsbns;
let reservationResponse;
let userResponse;

Given("que tenho um usuário autenticado", () => {
  userName = `qa_${faker.string.alphanumeric(10)}`;
  password = `Acc!${faker.string.alphanumeric(10)}a1`;

  accountApi.createUser(userName, password).then((createResponse) => {
    expect(createResponse.status).to.eq(201);

    userId = createResponse.body.userID;

    accountApi.generateToken(userName, password).then((tokenResponse) => {
      expect(tokenResponse.status).to.eq(200);
      expect(tokenResponse.body.status).to.eq("Success");

      token = tokenResponse.body.token;
      expect(token).to.be.a("string").and.not.be.empty;
    });
  });
});

When("consulto os livros disponíveis", () => {
  bookStoreApi.getBooks().then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.books).to.be.an("array").and.not.be.empty;

    availableBooks = response.body.books;
  });
});

Then("a API deve retornar uma lista de livros", () => {
  expect(availableBooks).to.be.an("array");
  expect(availableBooks.length).to.be.greaterThan(1);

  selectedIsbns = availableBooks
    .slice(0, 2)
    .map((book) => book.isbn);

  expect(selectedIsbns).to.have.length(2);
  expect(selectedIsbns[0]).to.not.eq(selectedIsbns[1]);
});

When("reservo dois livros para o usuário", () => {
  bookStoreApi
    .reserveBooks(userId, token, selectedIsbns)
    .then((response) => {
      reservationResponse = response;

      cy.log(JSON.stringify(response.body));
      console.log("Resposta da reserva:", response.body);
    });
});

Then("a reserva deve conter os dois livros selecionados", () => {
  expect(reservationResponse.status).to.eq(201);

  const reservedIsbns = reservationResponse.body.books.map(
    (book) => book.isbn
  );

  expect(reservedIsbns).to.have.length(2);

  selectedIsbns.forEach((isbn) => {
    expect(reservedIsbns).to.include(isbn);
  });
});

When("consulto novamente os dados do usuário", () => {
  accountApi.getUser(userId, token).then((response) => {
    userResponse = response;
  });
});

Then("os dois livros devem constar na conta", () => {
  expect(userResponse.status).to.eq(200);
  expect(userResponse.body.userId).to.eq(userId);

  const userIsbns = userResponse.body.books.map((book) => book.isbn);

  selectedIsbns.forEach((isbn) => {
    expect(userIsbns).to.include(isbn);
  });
});