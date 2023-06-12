"use strict"
document.querySelector('.date1').onclick = myClick1;
function myClick1() {
	console.log('work');
	let a = document.querySelector('#start-date').value;
	console.log(a);
	console.log(typeof a);
};
