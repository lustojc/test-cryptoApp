/// <reference types="cypress" />

describe('Work with my currency App', () => {
  beforeEach('visit my app', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  it('check that modal close by esc, black background, and closeBtn', () => {
    //close btn
    cy.get('[data-cy="header-portfolio"]').click();
    cy.get('[data-cy="closeBtn"]').click();

    // esc keyboard button
    cy.get('[data-cy="header-portfolio"]').click();
    cy.get('body').trigger('keydown', { keyCode: 27 });

    // black background
    cy.get('[data-cy="header-portfolio"]').click();
    cy.get('[data-cy="modal-block"]').click({ force: true });
  });

  it('cheking an empty input, and when click Add button we have error Alert', () => {
    cy.get('[data-cy="addBtn"]:first').click();

    // check that we have an empty input
    cy.get('[data-cy="input"]').should('have.value', '');

    // check that we have a button with 'Add' text
    cy.get('[data-cy="addCoinsBtn"]').should('have.text', 'Add').click();

    // we get alert with message Incorrect value
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Incorrect value');
    });

    // once again check that the intut is empty
    cy.get('[data-cy="input"]').should('have.value', '');
  });

  it('if write incorrect value in input', () => {
    cy.get('[data-cy="addBtn"]:first').click();

    // try to write 0
    cy.get('[data-cy="input"]').should('have.value', '').type('0');

    // get error message
    cy.get('[data-cy="errorMessage"]:last').should('have.text', 'You entered an invalid value!');

    cy.get('[data-cy="input"]').clear();

    // try to write 0.00
    cy.get('[data-cy="input"]').should('have.value', '').type('0.00');

    // get error message
    cy.get('[data-cy="errorMessage"]:last').should('have.text', 'You entered an invalid value!');
  });

  it('if write correct value in input', () => {
    cy.get('[data-cy="addBtn"]:first').click();

    // trying to write a valid value
    cy.get('[data-cy="input"]').should('have.value', '').type('0.01');

    // get a favorable message
    cy.get('[data-cy="errorMessage"]:last').should('have.text', 'The value is correct!');
  });

  it("can't write anything but numbers in input", () => {
    cy.get('[data-cy="addBtn"]:first').click();

    // trying to write something other than numbers
    cy.get('[data-cy="input"]').should('have.value', '').type('sdsfgsdgsg,*/');

    // get empty input
    cy.get('[data-cy="input"]').should('have.text', '');
  });

  it('correct add and remove coins in portfolio', () => {
    //open modal and add 1 coin to user's portfolio
    cy.get('[data-cy="addBtn"]:first').click();
    cy.get('[data-cy="input"]').should('have.value', '').type('1');
    cy.get('[data-cy="addCoinsBtn"]').click();

    // open portfolio and see our coin
    cy.get('[data-cy="header-portfolio"]').click();
    cy.get('[data-cy="portfolio"]').find('[data-cy="portfolio-item"]').should('have.length', 1);
    cy.get('[data-cy="portfolio-item-count"]').contains('1.00');

    // try to delete our coin from portfolio
    cy.get('[data-cy="portfolio-deleteBtn"]').click();
    cy.on('window:confirm', () => true);
    cy.get('[data-cy="portfolio"]').find('[data-cy="portfolio-item"]').should('not.exist');

    // Make sure the price in the header has changed
    cy.get('[data-cy="closeBtn"]').click();
    cy.get('[data-cy="header-price"]').contains('0 USD');
  });

  it('open random coin and compare names', () => {
    cy.get('[data-cy="crypto-block-info"]')
      // get random coin on page
      .then(() => Cypress._.random(0, 9))
      .then((k) => {
        cy.get('[data-cy="crypto-block-title"]')
          .eq(k)
          .click()
          .then(($name) => {
            // write the name of the coin you clicked into a variable
            let coinName = $name.text();

            // waiting for chart load
            cy.wait(1000);

            // Check
            cy.get('[data-cy="info-block-name"]').contains(`Name: ${coinName}`);
            cy.screenshot({ overwrite: true });
            cy.visit('/');
          });
      });
  });

  it('user can add different coins', () => {
    //open modal and add 1 coin to user's portfolio
    cy.get('[data-cy="addBtn"]:first').click();
    cy.get('[data-cy="input"]').should('have.value', '').type('1');
    cy.get('[data-cy="addCoinsBtn"]').click();

    // open portfolio and see our coin
    cy.get('[data-cy="header-portfolio"]').click();
    cy.get('[data-cy="portfolio"]').find('[data-cy="portfolio-item"]').should('have.length', 1);
    cy.get('[data-cy="portfolio-item-count"]').contains('1.00');

    // close modal
    cy.get('[data-cy="closeBtn"]').click();

    // get another coin
    cy.get('[data-cy="addBtn"]').eq(2).click();
    cy.get('[data-cy="input"]').should('have.value', '').type('240');
    cy.get('[data-cy="addCoinsBtn"]').click();

    // check modal with 2 different coins in user's portfolio
    cy.get('[data-cy="header-portfolio"]').click();
    cy.get('[data-cy="portfolio"]').find('[data-cy="portfolio-item"]').should('have.length', 2);
  });

  it('add one coin several times', () => {
    //open modal and add 1 coin to user's portfolio
    cy.get('[data-cy="addBtn"]:first').click();
    cy.get('[data-cy="input"]').should('have.value', '').type('1');
    cy.get('[data-cy="addCoinsBtn"]').click();

    // get the same coin
    cy.get('[data-cy="addBtn"]:first').click();
    cy.get('[data-cy="input"]').should('have.value', '').type('4');
    cy.get('[data-cy="addCoinsBtn"]').click();

    // check modal with user's coins
    cy.get('[data-cy="header-portfolio"]').click();
    cy.get('[data-cy="portfolio"]').find('[data-cy="portfolio-item"]').should('have.length', 1);
    cy.get('[data-cy="portfolio-item-count"]').contains('5.00');
    cy.visit('/');
  });
});
