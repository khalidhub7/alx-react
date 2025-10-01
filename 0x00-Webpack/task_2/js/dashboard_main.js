import $ from 'jquery';
import _ from 'lodash';
import '../css/main.css'

const body = document.getElementsByTagName("body")[0];
const div =  document.createElement('div');
const p1 = document.createElement('p');
const p2 = document.createElement('p');
const button = document.createElement('button');
const p3 = document.createElement('p');
const p4 = document.createElement('p');

div.setAttribute('id','logo');
p1.innerHTML = "Holberton Dashboard";
p2.innerHTML = "Dashboard data for the students";
button.innerHTML = "Click here to get started";
p3.setAttribute('id', 'count');
p4.innerHTML = "Copyright - Holberton School";

body.append(div, p1, p2, button, p3, p4)

let counter = 0;

const updateCounter = () => {
  counter++;
  $("#count").html(`${counter} clicks on the button`);
};

$('button').on('click', _.debounce(updateCounter));
