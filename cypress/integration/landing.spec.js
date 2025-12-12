/// <reference types="cypress" />

context("BubbleSort Landing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000/");
  });
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("Route / renders BubbleSort container and params", () => {
    cy.get("#bubble-sort").should("exist");
    cy.get("#params-container").should("exist");
    cy.get("#cols").should("exist");
    cy.get("#rows").should("exist");
    cy.get("#speed").should("exist");
  });

  it("Params UI updates outputs on change", () => {
    cy.get("#cols").invoke("val", 7).trigger("input");
    cy.get("#colsOutput").should("contain", "7");

    cy.get("#rows").invoke("val", 6).trigger("input");
    cy.get("#rowsOutput").should("contain", "6");

    cy.get("#speed").invoke("val", 3).trigger("input");
    cy.get("#speedOutput").should("contain", "3");
  });
});
