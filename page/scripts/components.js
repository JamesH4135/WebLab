/**
 *  WebLab Theme
 *  Copyright 2025 James H. Houck. All rights reserved.
 */

/* Bulma navbar display */

document.querySelector('#burger').addEventListener('click', displayNavbar);

function displayNavbar () {
    let elm = document.querySelector('#burger');
    let target = elm.dataset.target;
    let targetElm = document.getElementById(target);
    elm.classList.toggle('is-active');
    targetElm.classList.toggle('is-active');
}

/* Katex render math */

document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
      delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError : false
    });
});

