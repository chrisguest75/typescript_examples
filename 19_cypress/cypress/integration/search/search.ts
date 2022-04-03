/// <reference types="cypress" />

describe('search google', () => {
  beforeEach(() => {
    cy.visit('https://www.duckduckgo.com')
    //cy.debug()
  })

  it('search google', () => {
    cy.get('#search_form_input_homepage').type('trint')
    cy.get('#search_form_homepage').submit()

    cy.get('#links').get('.result__url__domain').first().should('have.text', 'https://trint.com')
  })
})
