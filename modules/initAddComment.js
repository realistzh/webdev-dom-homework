import { postComment } from './api.js';
import { loadComments } from './loadComments.js';

export function initAddComment() {
  const formElement = document.querySelector('.add-form');
  const loadingElement = document.querySelector('.add-form-loading');
  const nameInput = document.querySelector('.add-form-name');
  const textInput = document.querySelector('.add-form-text');
  const buttonElement = document.querySelector('.add-form-button');

  buttonElement.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (name === '' || text === '') {
      return;
    }

    formElement.style.display = 'none';
    loadingElement.style.display = 'block';

    postComment(name, text)
      .then(() => loadComments())
      .then(() => {
        nameInput.value = '';
        textInput.value = '';
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        formElement.style.display = '';
        loadingElement.style.display = 'none';
      });
  });
}