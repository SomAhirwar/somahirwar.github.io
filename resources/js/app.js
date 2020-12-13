const projects = document.querySelectorAll(".project");
const burger = document.querySelector(".burger");

function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function slideIn(el) {
  projects.forEach((e) => {
    const current = window.scrollY + window.innerHeight;
    if (current > e.offsetTop + (1 / 5) * e.offsetHeight)
      e.style.transform = `translateX(0)`;
    else e.style.transform = ``;
  });
}

function displayDropbox() {
  const dropbox = document.querySelector("nav ul");

  if (dropbox.style.transform === `translateX(100%)`)
    dropbox.style.transform = `translateX(0)`;
  else dropbox.style.transform = `translateX(100%)`;
}

window.addEventListener("scroll", debounce(slideIn));
burger.addEventListener("click", displayDropbox);
