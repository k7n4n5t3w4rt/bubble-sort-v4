/// <reference types="cypress" />

context("BubbleSort Caches Page (placeholder)", () => {
  beforeEach(() => {
    // Use root route since BubbleSort currently only defines '/'
    cy.visit("http://localhost:4000/");
  });
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("Renders BubbleSort container at /", () => {
    cy.get("#bubble-sort").should("exist");
  });

  it("Has parameter sliders", () => {
    cy.get("#cols").should("exist");
    cy.get("#rows").should("exist");
    cy.get("#speed").should("exist");
  });
});
