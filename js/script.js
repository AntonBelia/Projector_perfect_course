"use strict";

const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const calculBtn = document.getElementById("calculate-btn");
const inputResult = document.getElementById("result");
const optionsDays = document.getElementById("options");
const measurementsSelect = document.getElementById("measurements");
const history = document.getElementById("history");
const addMonthBtn = document.getElementById("month");
const addWeekBtn = document.getElementById("week");

document.addEventListener("DOMContentLoaded", checkingLocalStorage);
startDate.addEventListener("change", setStartDate);
endDate.addEventListener("change", setEndDate);
calculBtn.addEventListener("click", calcul);
addMonthBtn.addEventListener("click", addMonth);
addWeekBtn.addEventListener("click", addWeek);

function checkingLocalStorage() {
  renderDataFromLocalStorage();
}

const date = new Date()
const timeMonth = 2594159720
const timeWeek = 606959720

function removeAttribute () {
  endDate.removeAttribute('disabled')
  calculBtn.removeAttribute('disabled')
}

function createNewDate () {
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}

function addMonthToNewDate (date) {
  const datePlusMonth = new Date(date.getTime() + timeMonth)
  return `${datePlusMonth.getFullYear()}-${("0" + (datePlusMonth.getMonth() + 1)).slice(-2)}-${("0" + datePlusMonth.getDate()).slice(-2)}`
}

function addWeekToNewDate (date) {
  const datePlusMonth = new Date(date.getTime() + timeWeek)
  return `${datePlusMonth.getFullYear()}-${("0" + (datePlusMonth.getMonth() + 1)).slice(-2)}-${("0" + datePlusMonth.getDate()).slice(-2)}`
}

function addMonth () {
  if (startDate.value === '') {
    startDate.value = createNewDate ()
    endDate.value = addMonthToNewDate (date)
    removeAttribute ()
  } else if (startDate.value !== '') {
    endDate.value = addMonthToNewDate (new Date(startDate.value))
    removeAttribute ()
  }
}

function addWeek () {
  if (startDate.value === '') {
    startDate.value = createNewDate ()
    endDate.value = addWeekToNewDate (date)
    removeAttribute ()
  } else if (startDate.value !== '') {
    endDate.value = addWeekToNewDate (new Date(startDate.value))
    removeAttribute ()
  }
  
}

function setStartDate() {
  console.log(new Date(startDate.value).getTime())
    endDate.setAttribute('min', startDate.value)
    endDate.removeAttribute('disabled')
  }

function setEndDate() {
    startDate.setAttribute('max', endDate.value);
    calculBtn.removeAttribute('disabled')
  }

function calcul(num1, num2, dimension = "days", calculDays = "all") {
  num1 = new Date(startDate.value).getTime();
  num2 = new Date(endDate.value).getTime();
  dimension = measurementsSelect.value;
  calculDays = optionsDays.value;
  const intermediateResult = unitOfMeasurement(num1, num2, dimension).split(" ");
  
  switch (calculDays) {
    case "all":
      inputResult.textContent = intermediateResult.join(" ")
      savingResultsToLocalStorage(startDate.value, endDate.value, inputResult.textContent);
      return inputResult.textContent;
    case "weekdays":
      intermediateResult[0] = ((intermediateResult[0] * 5) / 7).toFixed();
      inputResult.textContent = intermediateResult.join(" ");
      savingResultsToLocalStorage(startDate.value, endDate.value, inputResult.textContent);
      return inputResult.textContent;
    case "weekends":
      intermediateResult[0] = ((intermediateResult[0] * 2) / 7).toFixed();
      inputResult.textContent = intermediateResult.join(" ");
      savingResultsToLocalStorage(startDate.value, endDate.value, inputResult.textContent);
      return inputResult.textContent;
  }
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
  }
}

function savingResultsToLocalStorage(num1, num2, result) {
  let savedData;
  let savedDataElement = [num1, num2, result];

  if (localStorage.getItem("savedData") === null) {
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
  if (localStorage.getItem("savedData") === null) {
    return;
  }
  history.innerHTML = "";
  const outputData = JSON.parse(localStorage.getItem("savedData")).reverse();
  outputData.forEach((DataElement) => {
    createOutpudData(DataElement);
  });
}

function createOutpudData(DataElement) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
	<th>${DataElement[0]}</th>
	<th>${DataElement[1]}</th>
	<th>${DataElement[2]}</th>`;
  tr.className = "element-history";

  history.appendChild(tr);
}
