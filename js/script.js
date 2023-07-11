"use strict";

const startDate = document.getElementById("start-date");
const startDateBtn = document.querySelector(".date1");
const endDate = document.getElementById("end-date");
const endDateBtn = document.querySelector(".date2");
const forPlayback = document.getElementById("forPlayback");
const restartBtn = document.querySelector(".restart");
const calculBtn = document.getElementById("calculate-btn");
const inputResult = document.getElementById("result");
const optionsDays = document.getElementById("options");
const measurementsSelect = document.getElementById("measurements");
const history = document.getElementById("history");

document.addEventListener("DOMContentLoaded", checkingLocalStorage);
startDateBtn.addEventListener("click", setStartDateToLocalStorage);
endDateBtn.addEventListener("click", setEndDateToLocalStorage);
restartBtn.addEventListener("click", restart);
calculBtn.addEventListener("click", calcul);

function checkingLocalStorage() {
	renderDataFromLocalStorage();
}

function setStartDateToLocalStorage() {
  if (startDate.value.length < 1) {
    alert("Введіть початкову дату");
  } else {
    localStorage.setItem("startDate", JSON.stringify(startDate.value));
    forPlayback.classList.remove("hidden");
  }
}

function setEndDateToLocalStorage() {
  if (endDate.value.length < 1) {
    alert("Введіть кінцеву дату");
  } else if (startDate.value > endDate.value) {
    alert("Кінцева дата менша за початкову");
    endDate.value = "";
  } else {
    startDate.disabled = 1;
    localStorage.setItem("endDate", JSON.stringify(endDate.value));
  }
}

function restart() {
  startDate.value = "";
  endDate.value = "";
  startDate.disabled = 0;
  forPlayback.classList.add("hidden");
}

function calcul(num1, num2, dimension = "month", calculDays = "all") {
  if (startDate.value.length < 1 || endDate.value.length < 1) {
    return alert("Введені не всі данні");
  }
  num1 = new Date(startDate.value).getTime();
  num2 = new Date(endDate.value).getTime();
  dimension = measurementsSelect.value;
  calculDays = optionsDays.value;
  const intermediateResult = unitOfMeasurement(num1, num2, dimension).split(
    " "
  );

  switch (calculDays) {
    case "all":
      inputResult.textContent = intermediateResult.join(" ");
    case "weekdays":
      intermediateResult[0] = ((intermediateResult[0] * 5) / 7).toFixed();
      inputResult.textContent = intermediateResult.join(" ");
    case "weekends":
      intermediateResult[0] = ((intermediateResult[0] * 2) / 7).toFixed();
      inputResult.textContent = intermediateResult.join(" ");
  }
  savingResultsToLocalStorage(
    startDate.value,
    endDate.value,
    inputResult.textContent
  );

  localStorage.setItem("startDate", "");
  localStorage.setItem("endDate", "");
}

function unitOfMeasurement(num1, num2, dimension) {
  dimension = measurementsSelect.value;
  const subtraction = (num2 - num1) / 1000;

  switch (dimension) {
    case "seconds":
      return Math.abs(subtraction) + " seconds";
    case "minutes":
      return Math.abs(subtraction / 60) + " minutes";
    case "hours":
      return Math.abs(subtraction / 60 / 60) + " hours";
    case "days":
      return Math.abs(subtraction / 60 / 60 / 24).toFixed() + " days";
    case "week":
      return Math.abs(subtraction / 60 / 60 / 24 / 7).toFixed() + " week";
    case "month":
      return Math.abs(subtraction / 60 / 60 / 24 / 30).toFixed() + " month";
  }
}

function savingResultsToLocalStorage(num1, num2, result) {
  let savedData 
  let savedDataElement = [num1, num2, result];

  if (localStorage.getItem("savedData") == null) {
    savedData = [];
  } else {
    savedData = JSON.parse(localStorage.getItem("savedData"));
  }

  if (savedData.length > 9) {
    savedData.shift();
  }

  savedData.push(savedDataElement);

  localStorage.setItem("savedData", JSON.stringify(savedData));
  renderDataFromLocalStorage();
}

function renderDataFromLocalStorage() {
	if (localStorage.getItem("savedData") == null) {
		return
	}
  const outputData = JSON.parse(localStorage.getItem("savedData")).reverse();
  outputData.forEach((DataElement) => {
    createOutpudData(DataElement);
  });
}

function createOutpudData(DataElement) {
	const tr = document.createElement('tr')
	tr.innerHTML = `
	<th>${DataElement[0]}</th>
	<th>${DataElement[1]}</th>
	<th>${DataElement[2]}</th>`
	tr.className = 'element-history'
	
	history.appendChild(tr)
}
