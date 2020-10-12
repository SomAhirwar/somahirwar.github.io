const projects = document.querySelectorAll('.project');
projects.forEach((el,i) => {
    el.style.marginLeft = `${(i)*10 + 10}vw`;
    console.log(el);
});

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

function slideIn(el) {
    console.log(el);
    projects.forEach(e => {
        const current = window.scrollY + window.innerHeight;
        console.log(current, e.offsetTop + 1/2 * e.offsetHeight);
        if(current > e.offsetTop + 1/2 * e.offsetHeight)
            e.style.transform = `translateX(0)`;
        else
        e.style.transform = ``;
    });
}

window.addEventListener('scroll', debounce(slideIn));