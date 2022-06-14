/// <reference types="cypress" />

const { eq } = require("lodash")

describe('our first suite', () => {
    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

     //Types of locators:
      
        cy.get('input')

        cy.get('#inputEmail1')

        cy.get('.input-full-width')

        cy.get('[placeholder]')

        cy.get('[placeholder="Email"]')

        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        cy.get('input[placeholder="Email"]')

        cy.get('[placeholder="Email"][type="email"]')

        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    })

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]', 'Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form')
            .find('[type = "email"]')
    })

    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })

        })

    })

    it('Invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        // cy.contains('nb-card', 'Basic form')
        //     .find('nb-checkbox')
        //     .click()
        //     .find('.custom-checkbox')
        //     .invoke('attr', 'class')
        //     .should('contain', 'checked')

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })


    })

    it('Assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'May 17, 2022')
        })
    })

    it('Radio button', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radiobuttons => {
            cy.wrap(radiobuttons)
                .first()
                .check({ force: true })
                .should('be.checked')

            cy.wrap(radiobuttons)
                .eq(1)
                .check({ force: true })

            cy.wrap(radiobuttons)
                .first()
                .should('not.be.checked')

            cy.wrap(radiobuttons)
                .eq(2)
                .should('be.disabled')
        })

    })

    it('Check boxes', () => {

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({ force: true })
        cy.get('[type="checkbox"]').eq(0).click({ force: true })
        cy.get('[type="checkbox"]').eq(1).check({ force: true })


    })

    it('Lists and dropdowns', () => {

        cy.visit('/')

        //#1
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        //#2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index < 3) {
                    cy.wrap(dropdown).click()
                }
            })
        })

    })

    it('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //#1
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        //#2
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Olga')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Mrdja')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Olga')
            cy.wrap(tableColumns).eq(3).should('contain', 'Mrdja')
        })

        //#3
        cy.get('thead [placeholder="Age"]').type('20')
        cy.wait(500)
        cy.get('tbody tr').each(tableRow => {
            cy.wrap(tableRow).find('td').eq(6).should('contain', '20')
        })
        //#4
        const age = [20, 30, 40, 200]
        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if (age == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it('Tooltip', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })

    it('Dialog box', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //#1
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', confirm => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        //#2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    })
})

describe('My first suite', () => {

  //in this test, I wrote my own examples for some of the codes from 'Our first suite':
  
    it('find button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
      
        cy.contains('nb-card', 'Block form',).find('button').should('contain', 'Submit')
    })

    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Block form').then(form => {
            const firstNameLabel = form.find('[for="inputFirstName"]').text()
            const lastNameLabel = form.find('[for="inputLastName"]').text()
            expect(firstNameLabel).to.equal('First Name')
            expect(lastNameLabel).to.equal('Last Name')

            expect(firstNameLabel).to.equal('First Name')
            cy.wrap(form).find('[for="inputFirstName"]').should('contain', 'First Name')
        })

        cy.contains('nb-card', 'Block form').then(form => {
            const firstNameInput = form.find('#inputFirstName')
            expect(firstNameInput).to.have.attr('placeholder', 'First Name')

            cy.wrap(form).find('#inputFirstName').should('have.attr', 'placeholder', "First Name")
        })
    })

    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        //invoke with 'should' assertion:
        cy.contains('nb-card', 'Inline form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')

        //invoke with function and 'expect' assertion:
        cy.contains('nb-card', 'Inline form')
            .find('[placeholder="Email"]')
            .invoke('attr', 'placeholder')
            .then(attr => {
                expect(attr).to.equal('Email')
            })

    })

    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        //picking random range in Datepicker:
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.get('nb-calendar-day-picker').contains('25').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'May 17, 2022 - May 25, 2022')
        })
    })

    it('Radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //playing with radiobuttons with check method:
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .eq(0)
                .check({ force: true })
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({ force: true })
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(0)
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })
    })

    it('Check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        //checking Check boxes with click and check method:
        cy.get('[type="checkbox"]').eq(0).click({ force: true })
        cy.get('[type="checkbox"]').eq(1).check({ force: true })

    })

    it('Lists and dropdowns', () => {

        cy.visit('/')

        //changing themes in Dropdown menu:
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index < 3) {
                    cy.wrap(dropdown).click()
                }
            })
        })
    })

    it.only('Web tables', () => {

        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //typing Smith instead of Black for Last name:
        cy.get('tbody').contains('tr', 'Barbara').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Last Name"]').clear().type('Smith')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(3).should('contain', 'Smith')
        })

        //adding new row in table:
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Olga')
            cy.wrap(tableRow).find('[placeholder="Username"]').type('Goga')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').eq(0).find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Olga')
            cy.wrap(tableColumns).eq(4).should('contain', 'Goga')
        })





    })

    it('Tooltip', () => {

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Primary').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

})
