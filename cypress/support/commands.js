// These are custom commands


// Get first navbar item
Cypress.Commands.add('getNavItem_first',() =>{
    cy.get('body > section#title > div > nav.navbar > div > ul > li:nth-child(1) > a')
})

// Get second navbar item
Cypress.Commands.add('getNavItem_second',() =>{
    cy.get('body > section#title > div > nav.navbar > div > ul > li:nth-child(2) > a')
})

// Get third navbar item
Cypress.Commands.add('getNavItem_third',() =>{
    cy.get('body > section#title > div > nav.navbar > div > ul > li:nth-child(3) > a')
})

// Get fourth navbar item
Cypress.Commands.add('getNavItem_fourth',() =>{
    cy.get('body > section#title > div > nav.navbar > div > ul > li:nth-child(4) > a')
})

// Get fifth navbar item
Cypress.Commands.add('getNavItem_fifth',() =>{
    cy.get('body > section#title > div > nav.navbar > div > ul > li:nth-child(5) > a')
})



// Get about section
Cypress.Commands.add('getSection_about',() =>{
    cy.get('body > section#about')
})
// Get events section
Cypress.Commands.add('getSection_event',() =>{
    cy.get('body > section#event')
})
// Get project section
Cypress.Commands.add('getSection_project',() =>{
    cy.get('body > section#project')
})
// Get team section
Cypress.Commands.add('getSection_team',() =>{
    cy.get('body > section#team')
})
// Get contact section
Cypress.Commands.add('getSection_contact',() =>{
    cy.get('body > section#contact')
})
// Get footer section
Cypress.Commands.add('getFooter', ()=>{
    cy.get('body > footer')
})



// get Title when used within a getSection_*section_name* command
Cypress.Commands.add('getSectionTitle', ()=>{
    cy.get('div.container-fluid > div.sec-title > h3')
})



//Get Specific cards in carousel

Cypress.Commands.add('getCard_first', ()=>{
    cy.get('div > section > div.container > div > div.col-12 > div > div > div.carousel-item:nth-child(1) > div.row > div.col-md-4:nth-child(1)')
})
Cypress.Commands.add('getCard_second', ()=>{
    cy.get('div > section > div.container > div > div.col-12 > div > div > div.carousel-item:nth-child(1) > div.row > div.col-md-4:nth-child(2)')
})
Cypress.Commands.add('getCard_third', ()=>{
    cy.get('div > section > div.container > div > div.col-12 > div > div > div.carousel-item:nth-child(1) > div.row > div.col-md-4:nth-child(3)')
})
Cypress.Commands.add('getCard_fourth', ()=>{
    cy.get('div > section > div.container > div > div.col-12 > div > div > div.carousel-item:nth-child(2) > div.row > div.col-md-4:nth-child(1)')
})
Cypress.Commands.add('getCard_fifth', ()=>{
    cy.get('div > section > div.container > div > div.col-12 > div > div > div.carousel-item:nth-child(2) > div.row > div.col-md-4:nth-child(2)')
})
Cypress.Commands.add('getCard_sixth', ()=>{
    cy.get('div > section > div.container > div > div.col-12 > div > div > div.carousel-item:nth-child(2) > div.row > div.col-md-4:nth-child(3)')
})



// Get the button to slide carousel to next slide

Cypress.Commands.add('getCarouselNextBtn', ()=>{
    cy.get('div > section > div.container > div > div.text-right > a:nth-child(2)')
})

// Get the button to slide carousel to previous slide
Cypress.Commands.add('getCarouselPrevBtn', ()=>{
    cy.get('div > section > div.container > div > div.text-right > a:nth-child(1)')
})


//Get Contact Form
Cypress.Commands.add('getContactForm', ()=>{
    cy.get('div > div > div > div > form')
})


// Get toggler button only visible in phone view !!
Cypress.Commands.add('getNavToggler', ()=>{
    cy.get('div.container-fluid > nav.navbar > button')
})







