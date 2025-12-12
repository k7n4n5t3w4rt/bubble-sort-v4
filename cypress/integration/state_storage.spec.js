/// <reference types="cypress" />

context("Params UI behavior", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000/");
  });
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("slider changes update output values", () => {
    cy.get("#cols").invoke("val", 9).trigger("input");
    cy.get("#colsOutput").should("contain", "9");

    cy.get("#scaleX").invoke("val", 20).trigger("input");
    cy.get("#scaleXOutput").should("contain", "20");
  });
});
