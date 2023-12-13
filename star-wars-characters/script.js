import './avataars.js';
//declarando elementos usados mais de uma fez como globais 
const cardArea = document.querySelector(".cards");
const paginas = document.querySelector(".paginas");
const info = document.querySelector(".informacoes");
let nPagina = 1;
let ultimaChamada = puxarDados("https://swapi.dev/api/people/?page="+1);
const main = document.querySelector("main");

const btn = document.querySelector(".voltar-info");
btn.addEventListener("click",trocarConteudo)
const links = document.querySelectorAll(".paginas li a")
links.forEach((item,index)=>{
    item.classList.add("pagina"+index)
    item.addEventListener("click",trocarPagina);
})
//funcao para ajustar a respansividade
function ajustarRespansividade() {
  if (window.innerWidth <= 950) {
    links.forEach((item, index) => {
      if (index == 0 || index == 10) {
      } else {
        if(window.innerWidth<=950){
          item.classList.add("inativo");
        }else{
          item.classList.remove("inativo"); 
        }
      }
    });
  } else {
    links.forEach((item, index) => {
      if (index == 0 || index == 10) {
      } else {
        item.classList.remove("inativo");
      }
    });
  }
}
function paginaAtual(){
  const paginaAtual = document.querySelector(".atual");
  paginaAtual.innerHTML = nPagina+"/9";
}
paginaAtual();

window.addEventListener("resize", ajustarRespansividade);
window.addEventListener("orientationchange", ajustarRespansividade);

ajustarRespansividade();

//funcao para tirar cards da tela
async function limparCards() {
  cardArea.innerHTML = "";
}
//fazendo troca de conteudo entre detalhes do personagem e pagina principal
function trocarConteudo(event){
  event.preventDefault();
  const paginaAtual = document.querySelector(".atual");
  const listaInfo = document.querySelectorAll(".lista-info li,.name");
  const div = document.querySelector(".coluna-1 div")
  div.remove()
  listaInfo.forEach((item)=>{
      item.remove();
  })
  btn.classList.toggle("inativo");
  info.classList.toggle("inativo");
  cardArea.classList.toggle("inativo");
  paginas.classList.toggle("inativo");
  main.classList.toggle("width-info")
  paginaAtual.classList.toggle("inativo");
}

//funcao para trocar de pagina e editar os estilos da lista de paginas
function trocarPagina(event){
  event.preventDefault();

  if(this.classList == "pagina0"){
      if(+nPagina>1){
          nPagina -=1;
      }
  }
  else if(this.classList == "pagina10"){
      if(+nPagina<9){
          nPagina +=1;
      }
  }
  else if(this.classList !="pagina0"  && this.classList != "pagina10"){
      nPagina = +event.target.innerHTML
  }
  links.forEach((item,index)=>{
      item.classList.remove("naPagina")
      if(index == nPagina){
          item.classList.add("naPagina")
      }
  })
  ultimaChamada = puxarDados("https://swapi.dev/api/people/?page="+nPagina);
  paginaAtual();
}

//puxando os avateres
function puxarAvatar(dadosJson){
  let corPele = "pale";
  let estiloCabelo = "Default";
  let barba = "beardLight";
  let hairColor = dadosJson.hair_color
  let camiseta = "default";
  if (hairColor.length > 7) {
    hairColor = hairColor.split(",")[0];
  }
  if(dadosJson.skin_color==="gold"){
    barba = "none"
    corPele = "yellow"
  }
  if(dadosJson.hair_color==="n/a" ){
    estiloCabelo = "sides";
    camiseta = "shirtCrewNeck"
    barba = "none"
  }
  if(dadosJson.hair_color==="none" ){
    hairColor="black"
  }
  if(dadosJson.gender == "female"){
    hairColor = "black";
    estiloCabelo = "straight01";
    barba = "none"
  }
  var avatar = Avataaars.create({
    skin:corPele,
    eyes: "surprise",
    clothing: camiseta,
    top: estiloCabelo,
    hairColor: hairColor,
    facialHair: barba,
    facialHairColor: hairColor,
});
  return avatar;
}

//salvando dados dos card no sessionStorage para nao precisa requisitar a api a todo momento,pq a cada requisicao demora 3.5s 
function salvarSession(objeto){
  const atributo = "pagina"+(nPagina-1).toString();
  sessionStorage[atributo] = JSON.stringify(objeto);
}
//funcao que verifica se a pagina ja esta salva no session
function verificar(){
  if(sessionStorage.hasOwnProperty("pagina"+(nPagina-1).toString())){
    return true
  }else{
    return false
  }
}

//puxando dados e verificando se o precisa fazer outro fetch ou puxar do session
async function puxarDados(url) {
  if(verificar()==true){ 
    const valor = sessionStorage["pagina"+(nPagina-1).toString()]
    const valorJson = JSON.parse(valor);

    valorJson.forEach((item, index) => {
      listar(item, index);
  });
  return valorJson;
  }else{
      const resposta = await fetch(url, {
        method: "GET"
    });
    const objeto = await resposta.json();
    salvarSession(objeto.results)
    objeto.results.forEach((item, index) => {
        listar(item, index);
    });
    links[nPagina].classList.add("naPagina")
    return objeto;
  }
}

//fetch do homeworld
async function homeworld(url) {
  const resposta = await fetch(url, {
      method: "GET"
  });
  const objeto = await resposta.json();
  return objeto.name;
}

//listando os cards na tela, criando os elementos html
async function listar(dadosJson,index) {
    if(index==0){
        limparCards();
    }
    const divSvg = document.createElement("div");
    const li = document.createElement("li");
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    divSvg.innerHTML = puxarAvatar(dadosJson);
    divSvg.style.height = "100px";
    divSvg.style.width = "120px";

    h1.innerHTML = dadosJson.name;
    p.innerHTML = "homeworld: "
    div.classList.add("detalhes");
    li.classList.add("card");
    cardArea.appendChild(li);
    li.appendChild(divSvg);
    li.appendChild(div);
    div.appendChild(h1);
    div.appendChild(p);
    const loading = document.querySelector("main img")
    loading.classList.add("inativo");
    p.innerHTML+=await homeworld(dadosJson.homeworld)
    li.addEventListener("click",()=>adicionarConteudo(index))
}
//adicionando o conteudo de detalhes
async function adicionarConteudo(indice) {
    const dadosJson= (await ultimaChamada)
    let dados;
    console.log(dadosJson)
    console.log(dadosJson.lenght)
    if(dadosJson.hasOwnProperty("results")){
      dados = (dadosJson.results[indice]);
    }else{
      dados = (dadosJson[indice])
    }

    const arrayFilms = [];
    const atributos = document.querySelector(".atributos");
    const valores = document.querySelector(".valores");

    const coluna1 = document.querySelector(".coluna-1");
    const h1 = document.createElement("h1");
    const div = document.createElement("div");
    div.innerHTML = puxarAvatar(dados);
    h1.innerHTML = dados.name.toUpperCase();
    h1.classList.add("name");
    coluna1.appendChild(div);
    div.appendChild(h1);

    const propriedadesDescartadas = ["name", "species", "vehicles", "starships", "created", "edited", "url","homeworld","films"];

    const propriedadesFetch = ["homeworld","films"];

    for(const dado in dados) {
        if(propriedadesFetch.includes(dado)){
            if(dado === "homeworld"){
                const li = document.createElement("li")
                li.innerHTML = dado.charAt(0).toUpperCase() + dado.slice(1)+":";
                atributos.appendChild(li)
                const liValores = document.createElement("li")
                const dadosFetch =  await fetch(dados[dado]);
                const dadosJson = await dadosFetch.json();
                liValores.innerHTML = dadosJson.name;
                valores.appendChild(liValores)
            }
            else{
                const li = document.createElement("li")
                li.innerHTML = dado.charAt(0).toUpperCase() + dado.slice(1)+":";
                atributos.appendChild(li)
                Array.prototype.forEach.call(dados[dado],async (item,i,array)=>{
                    arrayFilms.push(item);
                    const liValores = document.createElement("li")
                    fetch(item.toString(), { 
                        method: "GET" 
                      }).then(async function (resposta) {
                        var objeto = await resposta.json();
                        liValores.innerHTML = objeto.title;
                      });
                    valores.appendChild(liValores)
                })
            }
        }
        if(!propriedadesDescartadas.includes(dado)){
            const li = document.createElement("li")
            li.innerHTML = dado.charAt(0).toUpperCase() + dado.slice(1)+":";
            atributos.appendChild(li)
            const liValores = document.createElement("li")
            liValores.innerHTML = dados[dado];
            liValores.classList.add(dado);
            valores.appendChild(liValores)
        }
    }
    const paginaAtual = document.querySelector(".atual");
    paginaAtual.classList.toggle("inativo");
    main.classList.toggle("width-info")
    btn.classList.toggle("inativo");
    info.classList.toggle("inativo");
    cardArea.classList.toggle("inativo");
    paginas.classList.toggle("inativo");
}



