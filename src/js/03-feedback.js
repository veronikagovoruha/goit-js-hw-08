import localStoragyApi from './localstorage';
import throttle from 'lodash.throttle';

const feedBackForm = document.querySelector('.feedback-form');
const CONTACT_FORM_LOCAL_STORAGE_KEY = 'formData';
let formData = localStoragyApi.load(CONTACT_FORM_LOCAL_STORAGE_KEY) || {};

const fillContactFormEl = form => {
  const formDataFromLocalStorage = localStoragyApi.load(CONTACT_FORM_LOCAL_STORAGE_KEY);
  const formElements = form.elements;

  for (const key in formDataFromLocalStorage) {
    if (formDataFromLocalStorage.hasOwnProperty(key)) {
      formElements[key].value = formDataFromLocalStorage[key];
    }
  }
};

fillContactFormEl(feedBackForm);

const onChange = throttle(event => {
  const { target } = event;

  const contactFormValue = target.value;
  const contactFormName = target.name;

  formData[contactFormName] = contactFormValue;
  localStoragyApi.save(CONTACT_FORM_LOCAL_STORAGE_KEY, formData);
}, 500);

const onContactFormSubmit = event => {
  event.preventDefault();
  console.log(formData);

  localStoragyApi.remove(CONTACT_FORM_LOCAL_STORAGE_KEY);
  event.currentTarget.reset();
  formData = {};
};

feedBackForm.addEventListener('input', onChange);
feedBackForm.addEventListener('submit', onContactFormSubmit);
