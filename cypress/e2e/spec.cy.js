describe("Dashboard Validation", () => {
  it("Test if side menu exists", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button:first").click();
    cy.get('*[class^="offcanvas"]').should("be.visible");
    cy.get('*[class^="offcanvas-header"]').should("be.visible");
    cy.get('*[class^="offcanvas-title"]').should("be.visible");
    cy.get('*[class^="offcanvas-body"]').should("be.visible");
    cy.get('*[class^="list-group"]').should("be.visible");
  });

  it("Test if side menu contains dashboard link", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button:first").click();
    cy.get('*[class^="list-group"]').should("be.visible");
    cy.get("a:first")
      .should("be.visible")
      .location("href")
      .should("include", "/");
  });

  it("Test if input works and do the search", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input").should("be.visible");
    cy.get("input").type("2015");
    cy.get("button").eq(1).click();
  });

  it("Test if all tables exists", () => {
    cy.visit("http://localhost:3000/");
    cy.get("table").eq(0).should("be.visible");
    cy.get("table").eq(1).should("be.visible");
    cy.get("table").eq(2).should("be.visible");
    cy.get("table").eq(3).should("be.visible");
    cy.get("table").eq(4).should("be.visible");
  });
});

describe("Movie List Validation", () => {
  it("Test movie list open", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button:first").click();
    cy.get("a").eq(1).click();
    cy.url().should("include", "/movielist");
  });

  it("Test if the table exists", () => {
    cy.visit("http://localhost:3000/movielist");
    cy.get("table").eq(0).should("be.visible");
  });

  it("Test if the components exists", () => {
    cy.visit("http://localhost:3000/movielist");
    cy.get("input").eq(0).should("be.visible");
    cy.get("button").eq(1).should("be.visible");
    cy.get("button").eq(2).should("be.visible");
    cy.get('*[class^="pagination"]').should("be.visible");
  });

  it("Test if input works and do the search", () => {
    cy.visit("http://localhost:3000/movielist");
    cy.get("input").should("be.visible");
    cy.get("input").type("2015");
    cy.get("button").eq(1).click();
  });

  it("Test if status select works", () => {
    cy.visit("http://localhost:3000/movielist");
    cy.get("button").eq(2).should("be.visible");
    cy.get("button").eq(2).click();
    cy.get("a").eq(1).should("be.visible");
    cy.get("a").eq(1).click();
  });
});
