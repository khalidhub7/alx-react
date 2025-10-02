import $ from 'jquery';
import _ from 'lodash';
import './body.css';

const button = $('<button>').text('Click here to get started');
const counter = $('<p>').attr('id', 'count');

$('body').append(button, counter);
