/* eslint-disable */


// PREVIOUS VERSION OF SHOWALERT
// type is 'success' or 'error'
// export const showAlert = (type, msg, time = 7) => {
// hideAlert();
// const markup = `<div class="alert alert--${type}">${msg}</div>`;
// document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
// window.setTimeout(hideAlert, time * 1000);
// };


export const showAlert = (type, msg, time=5) => {
hideAlert();

let title =''

if (type == 'error') {
  title = '<h3>Ocorreu um erro</h3>'
} else {
    title = '<h3>Tudo OK!</h3>'
}

const markup = `<div class="alert alert-${type}">${title}<p>${msg}<p></div>`;
// document.querySelector('.outlet-container').insertAdjacentHTML('beforebegin', markup);
document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
window.setTimeout(hideAlert, time * 1000);
};

export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  };
  