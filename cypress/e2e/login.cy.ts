describe('Admin Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login#');
  });

  it('should display login form elements', () => {
    cy.get('#input_email').should('exist');
    cy.get('#input_password').should('exist');
    cy.get('button[type=submit]').should('exist');
  });

  it('should show error on submitting empty form', () => {
    cy.get('button[type=submit]').click();
    cy.get('body', { timeout: 5000 }).find('.alert-danger').should('contain', 'Please fill in all required fields.');
  });

  it('should show error with wrong credentials', () => {
    cy.get('#input_email').type('wronguser@example.com');
    cy.get('#input_password').type('wrongpassword');
    cy.get('button[type=submit]').click();
    cy.contains('Invalid email or password').should('exist');
  });

  it('should login successfully with correct credentials', () => {
    cy.get('#input_email').type(Cypress.env('adminEmail'));
    cy.get('#input_password').type(Cypress.env('adminPassword'));
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
