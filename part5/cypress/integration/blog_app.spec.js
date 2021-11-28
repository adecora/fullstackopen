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
          likes: 0,
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
          likes: 0,
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

    describe('and several blog exits', function () {
      let checkBlogOrder

      beforeEach(function () {
        checkBlogOrder = () => {
          cy.get('.blog')
            .then(($blogs) => {
              const blogs = Array.from($blogs.map((_, el) =>
                Number(el.innerHTML.match(/<div>likes (\d+)<button/)[1])
              ))

              if (JSON.stringify(blogs) !== JSON.stringify(blogs.sort((a, b) => b - a))) {
                throw new Error('Blogs are not ordered by likes')
              }
            })
        }

        cy.createNote({
          title: 'freeCodeCamp',
          author: 'Quincy Larson',
          likes: 105,
          url: 'https://www.freecodecamp.org/'
        })
        cy.createNote({
          title: 'The Odin Project',
          author: 'Erik Trautman',
          likes: 104,
          url: 'https://www.theodinproject.com/about'
        })
        cy.createNote({
          title: 'nixCraft',
          author: 'Vivek Gite',
          likes: 103,
          url: 'https://www.cyberciti.biz/'
        })
      })

      it('blogs are ordered by number of likes', function () {
        checkBlogOrder()

        cy.get('.blog').contains('nixCraft').as('nixCraft')
        cy.get('@nixCraft')
          .contains('view')
          .click()

        cy.get('@nixCraft')
          .parent()
          .contains('like')
          .as('likeButton')

        cy.get('@likeButton').click()
        cy.get('@nixCraft').parent().should('contain', 'likes 104')
        cy.get('@likeButton').click()
        cy.get('@nixCraft').parent().should('contain', 'likes 105')
        cy.get('@likeButton').click()
        cy.get('@nixCraft').parent().should('contain', 'likes 106')

        checkBlogOrder()
      })
    })
  })
})