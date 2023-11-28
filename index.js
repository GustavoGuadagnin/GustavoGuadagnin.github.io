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

const cards = document.querySelectorAll(".card");

cards.forEach((item)=>{
    item.addEventListener("click",redirecionar);
})

function redirecionar(){
   const link = this.querySelector("a");
   window.location.href=link;
}

const sections = document.querySelectorAll("section");
const windowMetade = window.innerHeight * 0.6;
function animaScroll(){
    sections.forEach((section)=>{
        const sectionTop = section.getBoundingClientRect().top - windowMetade;
        if(sectionTop<0){
            section.classList.add("ativo")
        }
    })
}

if(window.innerWidth>=700){
    let valor = 1
    const menu = document.querySelector(".menu");
    const nav_bar = document.querySelector(".barra-menu");
    const close = document.querySelector(".close");
    const li = nav_bar.querySelectorAll("li");
    const cards = document.querySelectorAll(".card");
    const botao = document.querySelector(".verMais");
    const botaoVerMenos = document.querySelector(".verMenos");
    if(cards.length>6){
        botao.classList.remove("inativo");
    }
    function cardsVisiveis(valor){
        if(cards.length>=6*valor){
            cards.forEach((item,index)=>{
                if(index>=6*valor){ 
                    item.classList.toggle("inativo");
                }
            })
        }
    }

    cardsVisiveis(valor)
    botao.addEventListener("click",carregar);
    close.addEventListener("click",mostrar)
    botaoVerMenos.addEventListener("click",esconder);
    function carregar(){
        cardsVisiveis(valor);
        valor++;
        if(valor>1){
            botao.innerHTML="MORE";
            botaoVerMenos.classList.remove("inativo");
        }

    }
    function esconder(){
        valor = 1;
        cardsVisiveis(valor);
        botao.innerHTML="MORE PROJECTS";
        botaoVerMenos.classList.add("inativo");
    }

    function mostrar(){
        nav_bar.classList.toggle("inativo")
    }

    cards.forEach((item)=>{
        item.addEventListener("mouseover",onMouseOver);
        item.addEventListener("mouseout",onMouseOver);
    })
    
    function onMouseOver(){
        const h1 = this.querySelector(".sub_tittle");
        this.querySelector("img:last-child").setAttribute("src","/img/img/"+h1.innerHTML+".png");
        this.querySelector("img:last-child").classList.toggle("inativo");
        this.querySelector(".preview-text").classList.toggle("inativo");

    }
}
else{
    let valor = 1
    const ul = document.querySelectorAll(".nav-bar ul li");
    const menu = document.querySelector(".menu");
    const nav_bar = document.querySelector(".barra-menu");
    const close = document.querySelector(".close");
    const li = nav_bar.querySelectorAll("li");
    const cards = document.querySelectorAll(".card");
    const botao = document.querySelector(".verMais");
    const botaoVerMenos = document.querySelector(".verMenos");
    const body = document.querySelector("body");
    body.addEventListener("click",teste)
    if(cards.length>2){
        botao.classList.remove("inativo");
    }
    function teste(event){
        if(event.pageX>250){
            nav_bar.classList.add("inativo")
        }
    }
    function cardsVisiveis(valor){
        if(cards.length>=3*valor){
            cards.forEach((item,index)=>{
                if(index>=3*valor){ 
                    item.classList.toggle("inativo");
                }
            })
        }
    }

    cardsVisiveis(valor)
    menu.classList.remove("inativo");

    menu.addEventListener("touchstart",mostrar)
    botao.addEventListener("touchstart",carregar);
    close.addEventListener("touchstart",mostrar)
    botaoVerMenos.addEventListener("touchstart",esconder);
    function carregar(){
        cardsVisiveis(valor);
        valor++;
        if(valor>1){
            botao.innerHTML="MORE";
            botaoVerMenos.classList.remove("inativo");
        }

    }
    function esconder(){
        valor = 1;
        cardsVisiveis(valor);
        botao.innerHTML="MORE PROJECTS";
        botaoVerMenos.classList.add("inativo");
    }

    function mostrar(){
        nav_bar.classList.toggle("inativo")
    }

    ul.forEach((li)=>{
        li.classList.add("inativo");
    })

    li.forEach((item)=>{
        item.addEventListener("click",mostrar);
    })

}
function atualizarPagina(){
    location.reload();
}
animaScroll();
window.addEventListener("scroll",animaScroll);
// window.addEventListener("resize",atualizarPagina);
