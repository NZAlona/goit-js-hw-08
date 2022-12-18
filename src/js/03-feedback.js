import throttle from 'lodash.throttle';

const formData = {};

const form = document.querySelector('.feedback-form');

const inputEmail = document.querySelector('input');

const inputTextarea = document.querySelector('textarea');

inputTextarea.addEventListener('input', throttle(onTextareaInput, 500));

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value;
});

form.addEventListener('submit', onFormSubmit);

fillFormWithValues();

function onTextareaInput() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(formData);
}

function fillFormWithValues() {
  const savedValues = localStorage.getItem('feedback-form-state');

  if (savedValues) {
    const parsedObject = JSON.parse(savedValues);
    inputTextarea.value = parsedObject.message;
    inputEmail.value = parsedObject.email;
  }
}
