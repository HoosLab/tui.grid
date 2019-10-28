// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-plugin-tab';
import './commands';
import { isSubsetOf } from '../helper/compare';
import { cls } from '@/helper/dom';

chai.use(_chai => {
  _chai.Assertion.addMethod('subset', function(options) {
    new _chai.Assertion(isSubsetOf(options, this._obj)).to.be.true;
  });

  _chai.Assertion.addMethod('cellData', function(cellData) {
    const table = this._obj[0];

    new _chai.Assertion(table).to.be.exist;

    const actual = [...table.querySelectorAll('tr')].map(row =>
      [...row.getElementsByClassName(cls('cell-content'))].map(cell => cell.textContent)
    );

    new _chai.Assertion(actual).to.be.eql(cellData);
  });
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
