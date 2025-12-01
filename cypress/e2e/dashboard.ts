import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { APP_URL } from "../../src/mocks/tradesConst";

Given("I am on the Dashboard page", () => {
  cy.visit(APP_URL + "trades"); // Assuming your login page is at /login
});

Then("I should be shown Trades List", () => {
  cy.get(".MuiDataGrid-root").should("be.visible");
});

Then("I should see Trade Dashboard Header", () => {
  cy.get('[data-cy="tradeGridHeader"]').should("be.visible");
});
