import throttle from 'lodash.throttle';

const formData = {};
const LOCALSTORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

fillFormWithValues();

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(formData);
}

function fillFormWithValues() {
  const savedValues = localStorage.getItem(LOCALSTORAGE_KEY);
  let parsedObject;
  try {
    parsedObject = JSON.parse(savedValues);
  } catch (error) {
    console.log(error.message);
  }

  if (savedValues) {
    for (const key in parsedObject) {
      let inputHTML = form.querySelector(`[name="${key}"]`);
      inputHTML.value = parsedObject[key];
    }
  }
}
