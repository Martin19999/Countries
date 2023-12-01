import React from 'react'
import ToHome from './ToHome'
import {BrowserRouter as Router} from 'react-router-dom'


describe('<ToHome />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    <Router>
      cy.mount(<ToHome />)
    </Router>
    
  })
})