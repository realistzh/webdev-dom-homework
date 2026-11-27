const PERSONAL_KEY = 'zelimkhan-khazhmuradov';
const BASE_URL = `https://wedev-api.sky.pro/api/v1/${PERSONAL_KEY}/comments`;

function request(options) {
  return fetch(BASE_URL, options).catch(() => {
    throw new Error('Нет подключения к интернету');
  });
}

export function fetchComments() {
  return request()
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить комментарии');
      }
      return response.json();
    })
    .then((data) => data.comments);
}

export function postComment(name, text) {
  let status;

  return request({
    method: 'POST',
    body: JSON.stringify({ name, text }),
  })
    .then((response) => {
      status = response.status;
      return response.text();
    })
    .then((body) => {
      if (status === 201) {
        return;
      }
      if (status === 400) {
        throw new Error(JSON.parse(body).error);
      }
      throw new Error('Сервер недоступен, попробуйте позже');
    });
}