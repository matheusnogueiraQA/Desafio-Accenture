
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import accountApi from "../../pages/api/accountApi";

let userName;
let password;
let userId;
let token;

let createUserResponse;
let tokenResponse;
let authorizationResponse;
let userResponse;

Given("que desejo criar um novo usuário", () => {
  userName = `qa_${faker.string.alphanumeric(10)}`;

  // Garante maiúscula, minúscula, número e caractere especial.
  password = `Acc!${faker.string.alphanumeric(10)}a1`;

  cy.log(`Usuário de teste: ${userName}`);
});

When("envio os dados para criação da conta", () => {
  accountApi.createUser(userName, password).then((response) => {
    createUserResponse = response;

    if (response.status === 201) {
      userId = response.body.userID;
    }
  });
});

Then("a API deve criar o usuário com sucesso", () => {
  expect(createUserResponse.status).to.eq(201);
  expect(createUserResponse.body).to.have.property("userID");
  expect(createUserResponse.body.username).to.eq(userName);

  expect(userId).to.be.a("string").and.not.be.empty;
});

When("solicito um token de autenticação", () => {
  accountApi.generateToken(userName, password).then((response) => {
    tokenResponse = response;

    if (response.status === 200) {
      token = response.body.token;
    }
  });
});

Then("devo receber um token válido", () => {
  expect(tokenResponse.status).to.eq(200);
  expect(tokenResponse.body.status).to.eq("Success");
  expect(token).to.be.a("string").and.not.be.empty;
});

When("verifico a autorização do usuário", () => {
  accountApi.authorize(userName, password).then((response) => {
    authorizationResponse = response;
  });
});

Then("o usuário deve estar autorizado", () => {
  expect(authorizationResponse.status).to.eq(200);
  expect(authorizationResponse.body).to.eq(true);
});

When("consulto os dados do usuário", () => {
  accountApi.getUser(userId, token).then((response) => {
    userResponse = response;
  });
});

Then(
  "os dados retornados devem corresponder ao usuário criado",
  () => {
    expect(userResponse.status).to.eq(200);
    expect(userResponse.body.userId).to.eq(userId);
    expect(userResponse.body.username).to.eq(userName);
  }
);


