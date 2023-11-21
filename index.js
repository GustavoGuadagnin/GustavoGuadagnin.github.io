const links = document.querySelectorAll("a[href^='#']");
function scroll(event){
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href)
    section.scrollIntoView({
        block: 'start',
        behavior: "smooth",
    })
}

links.forEach((item)=>{
    item.addEventListener("click",scroll);
})
