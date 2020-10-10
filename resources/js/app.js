const projects = document.querySelectorAll('.project');
projects.forEach((el,i) => {
    el.style.marginLeft = `${(i)*10 + 10}vw`;
    console.log(el);
});

function slideIn(el) {
    projects.forEach(e => {
        const current = el.pageY + window.innerHeight;
        console.log(current, e.offsetTop + 1/2 * e.offsetHeight);
        if(current > e.offsetTop + 1/2 * e.offsetHeight)
            e.style.transform = `translateX(0)`;
        else
        e.style.transform = ``;
    });
}

window.addEventListener('scroll', slideIn);