describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Alejandro',
      username: 'adecora',
      password: '12345'
    })
  })

  it('Login form is show', function () {
    cy.contains('log in to application')

    cy.get('[name="Username"]')
    cy.get('[name="Password"]')

    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[name="Username"]').type('adecora')
      cy.get('[name="Password"]').type('12345')
      cy.contains('login').click()

      cy.contains('Alejandro logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('[name="Username"]').type('adecora')
      cy.get('[name="Password"]').type('wrong')
      cy.contains('login').click()

      cy.contains('wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'adecora',
        password: '12345'
      })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('[name="Title"]').type('freeCodeCamp')
      cy.get('[name="Author"]').type('Quincy Larson')
      cy.get('[name="Url"]').type('https://www.freecodecamp.org/')
      cy.get('#create-blog').click()

      cy.contains('a new blog freeCodeCamp by Quincy Larson added')
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.showAlways')
        .should('contain', 'freeCodeCamp Quincy Larson')

      cy.get('.showWhenDetail')
        .should('contain', 'https://www.freecodecamp.org/')
        .and('contain', 'Alejandro')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createNote({
          title: 'freeCodeCamp',
          author: 'Quincy Larson',
          url: 'https://www.freecodecamp.org/'
        })
      })

      it('blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.get('#like-blog').click()
        cy.contains('likes 1')
      })

      it('blog can be delete', function () {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('html')
          .should('not.contain', 'freeCodeCamp Quincy Larson')
          .and('not.contain', 'https://www.freecodecamp.org/')
      })
    })

    describe('a blog from another user exits', function () {
      beforeEach(function () {
        cy.createNote({
          title: 'freeCodeCamp',
          author: 'Quincy Larson',
          url: 'https://www.freecodecamp.org/'
        })
        cy.createUser({
          name: 'admin',
          username: 'admin',
          password: '12345'
        })
        cy.login({
          username: 'admin',
          password: '12345'
        })
      })

      it('user can not delete a post from another owner', function () {
        cy.contains('view').click()

        cy.get('.showWhenDetail')
          .should('not.contain', 'remove')
          .find('button')
          .then(($buttons) => {
            expect($buttons).to.have.length(1)
          })
      })

    })
  })
})