  fetch("https://api.openweathermap.org/data/2.5/weather?q=Curitiba&appid=dedb38d0cad809057b615e136cbfa5e8", { 
    method: "GET" 
  }).then(async function (resposta) {
    var objeto = await resposta.json();
    listarProdutos(objeto);
  });
  alert('**IMPORTANT**\nI used a API to take the data in real-time,so the weather-data showed is real,')
  function listarProdutos(lista){
    var conteudo='';
    var humidity='';
    var wind='';
    var pressure='';
    var desc='';
    var degrees='';
    conteudo+=''
    conteudo+='<div class="nome">'+lista.name+','+lista.sys.country+'</div>';
    desc+='<div class="nome">'+lista.weather[0].description+'</div>';
    degrees+='<div class="nome">'+parseInt(lista.main.temp-273.15)+'°</div>';
    humidity+='<div class="nome">'+lista.main.humidity+'%</div>';
    wind+='<div class="nome">'+lista.wind.speed+'</div>';
    pressure+='<div class="nome">'+lista.main.pressure+'</div>';
    document.getElementById("city").innerHTML+=conteudo;
    document.getElementById("desc").innerHTML+=desc;
    document.getElementById("degrees").innerHTML+=degrees;
    document.getElementById("humidity").innerHTML+=humidity;
    document.getElementById("wind").innerHTML+=wind;
    document.getElementById("pressure").innerHTML+=pressure;
  }
