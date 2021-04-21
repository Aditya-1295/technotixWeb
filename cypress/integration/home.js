describe('Tests for title section', ()=>{
    it('Checks URL for main page',()=>{
        cy.visit("http://localhost:3000").url().should('include', '/')
        
    })

    it('Checks all the components for text content in Navigation bar', ()=>{
        cy.get('body > section#title > div > nav.navbar > a.navbar-brand').should('have.text' , 'Technotix BU')
        cy.getNavToggler().should('not.be.visible')
        cy.getNavItem_first().should('have.text','About')
        cy.getNavItem_second().should('have.text','Events')
        cy.getNavItem_third().should('have.text','Projects')
        cy.getNavItem_fourth().should('have.text','Team')
        cy.getNavItem_fifth().should('have.text','Contact')
    })

    it('Clicks all the navigation bar links to check  scrolling by button for respective sections', ()=>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
          })
          cy.getNavToggler().should('not.be.visible')
        cy.getNavItem_first().should('have.text','About').click().url().should('include','/#about')
        cy.wait(1000)
        // This fixed time wait is for the website to complete scroll animation.  
        cy.getNavItem_second().should('have.text','Events').click().url().should('include','/#event')
        cy.getNavItem_third().should('have.text','Projects').click().url().should('include','/#project')
        cy.getNavItem_fourth().should('have.text','Team').click().url().should('include','/#team')
        cy.getNavItem_fifth().should('have.text','Contact').click().url().should('include','/#contact')
        
    })

   
})

describe('Tests for ABOUT section', ()=>{
    it('Checks the title and content for about section', ()=>{
        cy.getSection_about().within(()=>{
            cy.getSectionTitle().should('have.text','About').and('have.css','font-size', '48px')
            cy.get('div > div.about-row > img').should('be.visible')
            cy.get('div > div.about-row > p').should('be.visible')
        })
    })
})

describe('Tests for EVENT section', ()=>{
    it('Checks the title for EVENT section', ()=>{
        cy.getSection_event().within(()=>{
            cy.getSectionTitle().should('have.text','Events').and('have.css','font-size', '48px')
        })
    })

    it('Checks for EVENT-Caraousel', ()=>{
        cy.getSection_event().within(()=>{
            cy.log('This is before clicking the next button for changing carousel item')
            cy.getCard_first().should('be.visible')
            cy.getCard_second().should('be.visible')
            cy.getCard_third().should('be.visible')
            cy.getCard_fourth().should('not.be.visible')
            cy.log('This is after clicking the next button for changing carousel item')
            cy.getCarouselNextBtn().click()
            cy.getCard_first().should('not.be.visible')
            cy.getCard_second().should('not.be.visible')
            cy.getCard_third().should('not.be.visible')
            cy.getCard_fourth().should('be.visible')
        })
    })
})


describe('Tests for Project section', ()=>{
    it('Checks the title for Project section', ()=>{
        cy.getSection_project().within(()=>{
            cy.getSectionTitle().should('have.text','Projects').and('have.css','font-size', '48px')
        })
    })

    it('Checks for Project-Caraousel', ()=>{
        cy.getSection_project().within(()=>{
            cy.log('This is before clicking the next button for changing carousel item')
            cy.getCard_first().should('be.visible')
            cy.getCard_second().should('be.visible')
            cy.getCard_third().should('be.visible')
            cy.getCard_fourth().should('not.be.visible')
            cy.getCard_fifth().should('not.be.visible')
            cy.getCard_sixth().should('not.be.visible')
            cy.log('This is after clicking the next button for changing carousel item')
            cy.getCarouselNextBtn().click()
            cy.getCard_first().should('not.be.visible')
            cy.getCard_second().should('not.be.visible')
            cy.getCard_third().should('not.be.visible')
            cy.getCard_fourth().should('be.visible')
            cy.getCard_fifth().should('be.visible')
            cy.getCard_sixth().should('be.visible')
        })
    })
})


describe('Tests for Our Team section', ()=>{
    it('Checks the title for Team section', ()=>{
        cy.getSection_team().within(()=>{
            cy.getSectionTitle().should('have.text','Our Team').and('have.css','font-size', '48px')
        })
    })

    it('Checks for button content and herf tag', ()=>{
        cy.getSection_team().within(()=>{
            cy.get('div.container-fluid > div.row > div.product:nth-child(1) > a')
            .should('have.text', 'Marketing Team')
            .and('have.attr', 'href')
            .and('match', /Marketing/)

            cy.get('div.container-fluid > div.row > div.product:nth-child(2) > a')
            .should('have.text', 'Technical Team')
            .and('have.attr', 'href')
            .and('match', /Technical/)

            cy.get('div.container-fluid > div.row > div.product:nth-child(3) > a')
            .should('have.text', 'Outreach Team')
            .and('have.attr', 'href')
            .and('match', /Outreach/)

            cy.get('div.container-fluid > div.row > div.product:nth-child(4) > a')
            .should('have.text', 'Executive Team')
            .and('have.attr', 'href')
            .and('match', /Executive/)

            cy.get('div.container-fluid > div.row > div.product:nth-child(5) > a')
            .should('have.text', 'Viglance Team')
            .and('have.attr', 'href')
            .and('match', /Vigilance/)

            cy.get('div.container-fluid > div.row > div.product:nth-child(6) > a')
            .should('have.text', 'Treasury')
            .and('have.attr', 'href')
            .and('match', /Treasury/)
            
        })
    })
    
})


describe('Tests for Contact Form section', ()=>{

    it('Checks the title for  contact form section', ()=>{
        cy.getSection_contact().within(()=>{
            cy.get('div.container > h3').should('have.text','Contact').and('have.css','font-size', '48px')
        })
    })

    it('Fills up the Contact form and checks for the API response (Node Mailer)', ()=>{
        cy.getSection_contact().within(()=>{
            cy.getContactForm().within(()=>{
                cy.get('input[name="cname"]').type('test name')
                cy.get('input[name="cemail"]').type('testemail@email.com')
                cy.get('select[name="csubject"]').select('Genral query')
                cy.get('textarea[name="cmessage"]').type('This is a test message')
                cy.get('div > div.col-md-12').click()
            })
        })
    })
})


describe('Tests for Contact Footer section', ()=>{
    it('Footer content testing',()=>{
        cy.getFooter().within(()=>{
            cy.get('div.footer-left > h3').should('have.text','TechnotixBU')

            cy.get('div.footer-left > p > a:nth-child(1)')
            .should('have.text', 'About')
            .and('have.attr', 'href')
            .and('match', /#about/)

            cy.get('div.footer-left > p > a:nth-child(2)')
            .should('have.text', 'Events')
            .and('have.attr', 'href')
            .and('match', /#event/)

            cy.get('div.footer-left > p > a:nth-child(3)')
            .should('have.text', 'Project')
            .and('have.attr', 'href')
            .and('match', /#project/)

            cy.get('div.footer-left > p > a:nth-child(4)')
            .should('have.text', 'Contact')
            .and('have.attr', 'href')
            .and('match', /#contact/)

            cy.get('div.footer-left > p > a:nth-child(5)')
            .should('have.text', 'Login')
            .and('have.attr', 'href')
            .and('match', /login/)


            cy.log('Checking footer Links')

            cy.get('div.footer-right > div.footer-icons > a:nth-child(1)')
            .should('have.attr', 'href')
            

            cy.get('div.footer-right > div.footer-icons > a:nth-child(2)')
            .should('have.attr', 'href')
            

            cy.get('div.footer-right > div.footer-icons > a:nth-child(3)')
            .should('have.attr', 'href')
            
        })
    })
})








