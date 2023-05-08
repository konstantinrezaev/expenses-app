const LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "всё хорошо";
const STATUS_ON_LIMIT = "на грани";
const STATUS_OUT_OF_LIMIT = "всё плохо";
const STATUS_ON_LIMIT_CLASSNAME = "status_orange";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const inputNode = document.getElementById("expensesInput");
const addButtonNode = document.getElementById("addExpensesBtn");
const historyNode = document.getElementById("history");
const sumNode = document.getElementById("total");
const limitNode = document.getElementById("limit");
const statusNode = document.getElementById("status");

const expenses = [];

init(expenses);

addButtonNode.addEventListener("click", function () {
  const expense = getExpanseFromUser();

  if (!expense) {
    return;
  }

  trackExpanse(expense);

  render(expenses);
});

function init() {
  limitNode.innerText = LIMIT;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpanses(expenses);
}

function trackExpanse(expense) {
  expenses.push(expense);
}

function getExpanseFromUser() {
  if (!inputNode.value) {
    return null;
  }
  const expense = parseInt(inputNode.value);
  clearInput();
  return expense;
}

function clearInput() {
  inputNode.value = "";
}

function calculateExpanses(expenses) {
  let sum = 0;
  expenses.forEach((element) => {
    sum += element;
  });
  return sum;
}

function render(expenses) {
  const sum = calculateExpanses(expenses);

  renderHistory(expenses);
  renderSum(sum);
  renderStatus(sum);
}

function renderHistory(expenses) {
  let expensesListHTML = "";
  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
  });
  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
  sumNode.innerText = sum;
}

function renderStatus(sum) {
  if (sum < LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else if (sum === LIMIT) {
    statusNode.innerText = STATUS_ON_LIMIT;
    statusNode.classList.add(STATUS_ON_LIMIT_CLASSNAME);
  } else {
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}
