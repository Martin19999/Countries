import React from 'react'
import Search from './Search'
import {BrowserRouter as Router} from 'react-router-dom'


describe('<Search />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    <Router>
      cy.mount(<Search />)
    </Router>
    
  })
})