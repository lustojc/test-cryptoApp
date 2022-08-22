describe('Work with my currency App', () => {
  beforeEach('visit my app', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  it('check that modal close by esc, black background, and closeBtn', () => {
    //close btn
    cy.get('.header-portfolio').click();
    cy.get('.modal-block__content-closeBtn').click();

    // esc keyboard button
    cy.get('.header-portfolio').click();
    cy.get('body').trigger('keydown', { keyCode: 27 });

    // black background
    cy.get('.header-portfolio').click();
    cy.get('.modal-block').click({ force: true });
  });

  it('cheking an empty input, and when click Add button we have error Alert', () => {
    cy.get('.crypto-block__btn:first').click();

    // check that we have an empty input
    cy.get('input').should('have.value', '');

    // check that we have a button with 'Add' text
    cy.get('.modal-block__content-items__container button').should('have.text', 'Add').click();

    // we get alert with message Incorrect value
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Incorrect value');
    });

    // once again check that the intut is empty
    cy.get('input').should('have.value', '');
  });

  it('if write incorrect value in input', () => {
    cy.get('.crypto-block__btn:first').click();

    // try to write 0
    cy.get('input').should('have.value', '').type('0');

    // get error message
    cy.get('.modal-block__content-items div:last').should(
      'have.text',
      'You entered an invalid value!',
    );

    cy.get('input').clear();

    // try to write 0.00
    cy.get('input').should('have.value', '').type('0.00');

    // get error message
    cy.get('.modal-block__content-items div:last').should(
      'have.text',
      'You entered an invalid value!',
    );
  });

  it('if write correct value in input', () => {
    cy.get('.crypto-block__btn:first').click();

    // trying to write a valid value
    cy.get('input').should('have.value', '').type('0.01');

    // get a favorable message
    cy.get('.modal-block__content-items div:last').should('have.text', 'The value is correct!');
  });

  it("can't write anything but numbers in input", () => {
    cy.get('.crypto-block__btn:first').click();

    // trying to write something other than numbers
    cy.get('input').should('have.value', '').type('sdsfgsdgsg,*/');

    // get empty input
    cy.get('.modal-block__content-items div input').should('have.text', '');
  });

  it('correct add and remove coins in portfolio', () => {
    //open modal and add 1 coin to user's portfolio
    cy.get('.crypto-block__btn:first').click();
    cy.get('input').should('have.value', '').type('1');
    cy.get('.modal-block__content-items__container button').click();

    // open portfolio and see our coin
    cy.get('.header-portfolio').click();
    cy.get('.portfolio-wrapper').find('.portfolio-block').should('have.length', 1);
    cy.get('.portfolio-block__count').contains('1.00');

    // try to delete our coin from portfolio
    cy.get('.portfolio-block__deleteBtn').click();
    cy.on('window:confirm', () => true);
    cy.get('.portfolio-wrapper').find('.portfolio-block').should('not.exist');

    // Make sure the price in the header has changed
    cy.get('.modal-block__content-closeBtn').click();
    cy.get('.header-portfolio__price').contains('0.00 USD');
  });

  it('open random coin and compare names', () => {
    cy.get('.crypto-block__info')
      // get random coin on page
      .then(() => Cypress._.random(0, 9))
      .then((k) => {
        cy.get('.crypto-block__title')
          .eq(k)
          .click()
          .then(($name) => {
            // write the name of the coin you clicked into a variable
            let coinName = $name.text();

            // waiting for chart load
            cy.wait(1000);

            // Check
            cy.get('.info-block__name').contains(`Name: ${coinName}`);
            cy.visit('/');
          });
      });
  });

  it('user can add different coins', () => {
    //open modal and add 1 coin to user's portfolio
    cy.get('.crypto-block__btn:first').click();
    cy.get('input').should('have.value', '').type('1');
    cy.get('.modal-block__content-items__container button').click();

    // open portfolio and see our coin
    cy.get('.header-portfolio').click();
    cy.get('.portfolio-wrapper').find('.portfolio-block').should('have.length', 1);
    cy.get('.portfolio-block__count').contains('1.00');

    // close modal
    cy.get('.modal-block__content-closeBtn').click();

    // get another coin
    cy.get('.crypto-block__btn').eq(2).click();
    cy.get('input').should('have.value', '').type('240');
    cy.get('.modal-block__content-items__container button').click();

    // check modal with 2 different coins in user's portfolio
    cy.get('.header-portfolio').click();
    cy.get('.portfolio-wrapper').find('.portfolio-block').should('have.length', 2);
  });

  it('add one coin several times', () => {
    //open modal and add 1 coin to user's portfolio
    cy.get('.crypto-block__btn:first').click();
    cy.get('input').should('have.value', '').type('1');
    cy.get('.modal-block__content-items__container button').click();

    // get the same coin
    cy.get('.crypto-block__btn:first').click();
    cy.get('input').should('have.value', '').type('4');
    cy.get('.modal-block__content-items__container button').click();

    // check modal with user's coins
    cy.get('.header-portfolio').click();
    cy.get('.portfolio-wrapper').find('.portfolio-block').should('have.length', 1);
    cy.get('.portfolio-block__count').contains('5.00');
    cy.visit('/');
  });
});
