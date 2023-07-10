"use strict"

const startDate =  document.getElementById('start-date')
const startDateBtn =  document.querySelector('.date1')
const endDate =  document.getElementById('end-date')
const endDateBtn =  document.querySelector('.date2')
const forPlayback =  document.getElementById('forPlayback')
const restartBtn =  document.querySelector('.restart')
const calculBtn =  document.getElementById('calculate-btn')

document.addEventListener('DOMContentLoaded', checkingLocalStorage)
startDateBtn.addEventListener('click', setStartDateToLocalStorage)
endDateBtn.addEventListener('click', setEndDateToLocalStorage)
restartBtn.addEventListener('click', restart)
calculBtn.addEventListener('click', calcul)

function checkingLocalStorage() {}

function setStartDateToLocalStorage () {
	if (startDate.value.length < 1) {
		alert('Введіть початкову дату')
	} else {
		localStorage.setItem('startDate', JSON.stringify(startDate.value))
		forPlayback.classList.remove('hidden')
	}
}

function setEndDateToLocalStorage() {
	if (endDate.value.length < 1) {
		alert('Введіть кінцеву дату')
	} else if (startDate.value > endDate.value) {
		alert('Кінцева дата менша за початкову')
		endDate.value = ''
	}else {
		startDate.disabled = 1
		localStorage.setItem('endDate', JSON.stringify(endDate.value))
	}
}

function restart() {
	startDate.value = ''
	endDate.value = ''
	startDate.disabled = 0
	forPlayback.classList.add('hidden')
}


function calcul(dateStart = localStorage.getItem('startDate'), dateEnd = localStorage.getItem('endDate'), dimension) {
// console.log(dateStart)
// 	let subtraction = (new Date(dateEnd).getTime() - new Date(dateStart).getTime()) / 1000;
// 	switch (dimension) {
// 		case 'seconds':
// 			return Math.abs(subtraction) + " seconds";
// 		case 'minutes':
// 			return Math.abs(subtraction / 60) + ' minutes';
// 		case 'hours':
// 			return Math.abs(subtraction / 60 / 60) + ' hours';
// 		case 'days':
// 			return Math.abs(subtraction / 60 / 60 / 24).toFixed() + ' days';
// 		default:
// 			return Math.abs(subtraction)*1000 + " milliseconds";
// 	}
};

