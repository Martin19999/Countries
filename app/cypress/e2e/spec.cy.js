const url = 'http://localhost:3000'  // change the url when in deployment

describe('Loading', () => {
  it('Be able to visit website', () => {
    cy.visit(url)
  })
})

describe("UI", () => {
  beforeEach(() => {
      cy.visit(url)
  })

  it("Title exists", () => {
      cy.get('h1').should("have.text", "DISCOVER THE WORLD");
  })

  it("Round button for sliding", () => {
    cy.get('#questionMark').should("exist");
  })

  it("search box exists", () => {
    cy.get('#searchBox').should("exist");
  })

  it("two buttons", () => {
    cy.get('button').should("exist").should('have.length', 2);
  })

  

})

describe("Redirects", () => {
  beforeEach(() => {
    cy.visit(url)
  })

  it("form submission and redirect", () => {
    cy.get('#searchBox').type("ireland");
    cy.get('form').submit();
    cy.url().should('include', '/result');
  })
})
