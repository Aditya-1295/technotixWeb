 describe('my first test', function (){
   it('visit app', function (){
     cy.visit('https://frozen-everglades-94154.herokuapp.com/')
     cy.contains('Login').click({force:true})

     cy.get('.in').contains('username').type('jadmin')
     cy.get('.in').contains('password').type('admin@password')
     cy.contains('Login').click({force:true})


   })
 })
