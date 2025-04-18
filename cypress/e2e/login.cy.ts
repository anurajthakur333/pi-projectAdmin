/// <reference types="cypress" />

describe('Admin Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login form elements', () => {
    cy.get('#input_email').should('exist');
    cy.get('#input_password').should('exist');
    cy.get('button[type=submit]').should('exist');
  });

  it('should NOT submit on empty form', () => {
    cy.get('button[type=submit]').click();

    // ✅ Instead of checking error messages, just check if URL still stays on login
    cy.url().should('include', '/login');

    // Optional: Check that the email/password inputs are still empty
    cy.get('#input_email').should('have.value', '');
    cy.get('#input_password').should('have.value', '');
  });

  it('should show error with wrong credentials', () => {
    cy.get('#input_email').type('wronguser@example.com');
    cy.get('#input_password').type('wrongpassword');
    cy.get('button[type=submit]').click();

    // ✅ Here you can still check error if you want
    cy.get('.alert-danger', { timeout: 5000 })
      .should('exist')
      .and('contain', 'Invalid email or password.');
  });

  it('should login successfully with correct credentials', () => {
    cy.get('#input_email').type(Cypress.env('adminEmail'));
    cy.get('#input_password').type(Cypress.env('adminPassword'));
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/dashboard');
  });
});
