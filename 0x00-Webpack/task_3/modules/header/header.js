import $ from 'jquery';
import './header.css';

console.log('Init header');

const logo = $('<img>').attr('src', 'path/to/logo.png');
const h1 = $('<h1>').text('Holberton Dashboard');

$('header').append(logo, h1);
