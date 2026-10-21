
class BookStoreApi {
  getBooks() {
    return cy.request({
      method: "GET",
      url: "/BookStore/v1/Books",
      failOnStatusCode: false,
    });
  }

  reserveBooks(userId, token, isbns) {
    return cy.request({
      method: "POST",
      url: "/BookStore/v1/Books",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        userId,
        collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
      },
      failOnStatusCode: false,
    });
  }
}

module.exports = new BookStoreApi();