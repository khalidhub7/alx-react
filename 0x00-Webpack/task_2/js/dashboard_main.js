import $ from 'jquery';
import debounce from 'lodash/debounce';

$(document).ready(function() {
	$('<p>').text('Holberton Dashboard').appendTo('body');
	$('<p>').text('Dashboard data for the students').appendTo('body');
	$('<button>').text('Click here to get started').appendTo('body');
	$('<p>').attr('id', 'count').appendTo('body');
	$('<p>').text('Copyright - Holberton School').appendTo('body');

	let count = 0;
	const countParagraph = $('#count');

	function updateCounter() {
		count++;
		countParagraph.text(`${count} clicks on the button`);
	}

	const button = $('button');
	button.on('click', debounce(updateCounter, 300));
});
