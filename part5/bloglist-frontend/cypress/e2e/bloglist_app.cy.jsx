describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'gabi3',
        username: 'gabi',
        password: 'secret1'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Login')
    })
  
    it('user can login', function() {
      cy.contains('Login to blog list').click()
      cy.get('#username').type('gabi3')
      cy.get('#password').type('secret1')
      cy.get('#login-button').click()
  
      cy.contains('Blogs')
    })
  
    it('fails with wrong credentials', function() {
      cy.contains('Login to blog list').click()
      cy.get('#username').type('gabb1')
      cy.get('#password').type('secret1')
      cy.get('#login-button').click()
  
      cy.get('.error').should('contain', 'Error: wrong credentials')
    })
  
    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('gabi3')
        cy.get('#password').type('secret1')
        cy.get('#login-button').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('blog1')
        cy.get('#author').type('gabi')
        cy.get('#url').type('abc.com')
        cy.contains('create').click()
        cy.contains('blog1')
        cy.contains('gbai')
      })
  
      describe('and a blog exists', function() {
        beforeEach(function() {
          cy.contains('new blog').click()
          cy.get('#title').type('blog1')
          cy.get('#author').type('gabi')
          cy.get('#url').type('abc.com')
          cy.contains('create').click()
        })
  
        it('user can like a blog', function() {
          cy.contains('blog1').contains('view').click()
          cy.get('#likebutton').click()
          cy.contains('blog1').contains('1')
        })
  
        it('user can delete their own blog', function() {
          cy.contains('blog1').contains('view').click()
          cy.get('#deletebutton').click()
          cy.get('html').should('not.contain', 'gabi')
        })
  
        describe('multiple blogs', function() {
          beforeEach(function() {
            cy.contains('new blog').click()
            cy.get('#title').type('blog2')
            cy.get('#author').type('gabi')
            cy.get('#url').type('abc.com')
            cy.contains('create').click()
  
            cy.contains('blog2').contains('view').click()
            cy.get('#likebutton').click()
          })
  
          it('blogs are ordered according to likes', function() {
            cy.get('.blog').eq(0).should('contain', 'blog2')
            cy.get('.blog').eq(1).should('contain', 'blog1')
          })
        })
      })
    })
  })