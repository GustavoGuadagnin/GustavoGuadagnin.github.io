const links = document.querySelectorAll("a[href^='#']");

function scroll(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    section.scrollIntoView({
        block: 'start',
        behavior: "smooth",
    });
}

links.forEach((item) => {
    item.addEventListener("click", scroll);
});

const cards = document.querySelectorAll(".card");
let n;

function redirecionar() {
    const link = this.querySelector("a");
    window.location.href = link;
}

const sections = document.querySelectorAll("section");
const windowMetade = window.innerHeight * 0.6;

function animaScroll() {
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top - windowMetade;
        if (sectionTop < 0) {
            section.classList.add("ativo");
        }
    });
}

let valor = 1;
const ul = document.querySelectorAll(".nav-bar ul li");
const menu = document.querySelector(".menu");
const nav_bar = document.querySelector(".barra-menu");
const close = document.querySelector(".close");
const li = nav_bar.querySelectorAll("li");
const botao = document.querySelector(".verMais");
const botaoVerMenos = document.querySelector(".verMenos");
const body = document.querySelector("body");


function cardsVisiveis(valor) {
    cards.forEach((item, index) => {
        if (index < n * valor) {
            item.classList.remove("inativo");
        }else{
            item.classList.add("inativo");
        }
        console.log(valor)
    });
}

function carregar() {
    valor++;
    cardsVisiveis(valor);
    if (valor > 1) {
        botao.innerHTML = "MORE";
        botaoVerMenos.classList.remove("inativo");
    }
    if(valor==((cards.length/3).toFixed())){
        botao.classList.add("inativo")
    }
}

function esconder() {
    valor = 1;
    cardsVisiveis(valor);
    botao.innerHTML = "MORE PROJECTS";
    botaoVerMenos.classList.add("inativo");
    botao.classList.remove("inativo")
}

function mostrar() {
    nav_bar.classList.toggle("inativo");
}

function onMouseOver(){
    const h1 = this.querySelector(".sub_tittle");
    this.querySelector("img:last-child").setAttribute("src","/img/img/"+h1.innerHTML+".png");
    this.querySelector("img:last-child").classList.toggle("inativo");
    this.querySelector(".preview-text").classList.toggle("inativo");
}

if (window.innerWidth >= 700) {

    cards.forEach((item)=>{
        item.addEventListener("mouseover",onMouseOver);
        item.addEventListener("mouseout",onMouseOver);
        item.addEventListener("click",redirecionar)
    })

    n = 6;
    valor = 1;
    cardsVisiveis(valor);
    botao.addEventListener("click", carregar);
    botaoVerMenos.addEventListener("click", esconder);

    if (cards.length > n) {
        botao.classList.remove("inativo");
    }
} else {
    n = 3;
    valor = 1;
    cardsVisiveis(valor);
    menu.classList.remove("inativo");
    menu.addEventListener("click", mostrar);
    botao.addEventListener("click", carregar);
    close.addEventListener("click", mostrar);
    botaoVerMenos.addEventListener("click", esconder);
    body.addEventListener("click", teste);

    ul.forEach((li) => {
        li.classList.add("inativo");
    });

    li.forEach((item) => {
        item.addEventListener("click", mostrar);
    });

    if (cards.length > 2) {
        botao.classList.remove("inativo");
    }

    function teste(event) {
        if (event.pageX > 250) {
            nav_bar.classList.add("inativo");
        }
    }
    const ratingImg = document.querySelectorAll(".rating");
    ratingImg.forEach((item)=>{
        item.classList.add("inativo");
    })
    const see = document.querySelectorAll(".see")
    see.forEach((item)=>{
        item.classList.remove("inativo");
    })
}
animaScroll();
window.addEventListener("scroll", animaScroll);
