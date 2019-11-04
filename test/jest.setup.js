import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'babel-polyfill';
const nock = require('nock')

configure({ adapter: new Adapter() });

