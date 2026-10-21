class AccountApi {
    createUser(userName, password) {
        return cy.request({
            method: "POST",
            url: "/Account/v1/User",
            body: {
                userName,
                password,
            },
            failOnStatusCode: false,
        });
    }

    generateToken(userName, password) {
        return cy.request({
            method: "POST",
            url: "/Account/v1/GenerateToken",
            body: {
                userName,
                password,
            },
            failOnStatusCode: false,
        });
    }

    authorize(userName, password) {
        return cy.request({
            method: "POST",
            url: "/Account/v1/Authorized",
            body: {
                userName,
                password,
            },
            failOnStatusCode: false,
        });
    }

    getUser(userId, token) {
        return cy.request({
            method: "GET",
            url: `/Account/v1/User/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false,
        });
    }
}

module.exports = new AccountApi();