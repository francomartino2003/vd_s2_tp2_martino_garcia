if(typeof chart == 'undefined'){
var chart;
var data;
var comandante;
var comandanteInput = d3.select('#Comandante');
}else{
  chart = null;
  data = null;
  comandante = null;
  comandanteInput = d3.select('#Comandante');
}

d3.csv('astronautas.csv', d3.autoType).then(dataChart => {
  data = dataChart;
  comandante = comandanteInput.property("checked");
  createChart(comandante); 
})


comandanteInput.on('change', event => {
  comandante = comandanteInput.property("checked");
  createChart(comandante);
})

function createChart(comandante) {
  let dataFilter = data.filter(d => d.nacionalidad == "U.S.S.R/Rusia" || d.nacionalidad =="EE.UU.");

  if(comandante){
    dataFilter = dataFilter.filter(d => d.ocupacion == 'comandante');
  }

  dataFilter.sort((x, y) => x.anio_mision - y.anio_mision);

  let xUSA = 0;
  let yUSA = 0;
  let xRUS = 0;
  let yRUS = 0;
  let USAlen = 0;
  let RUSlen = 0;
  for(let i = 0; i < dataFilter.length; i++){
    if(dataFilter[i]["nacionalidad"] == "EE.UU."){
      dataFilter[i]["x"] = xUSA;
      dataFilter[i]["y"] = yUSA;
      dataFilter[i]["text"] = "";
      xUSA++;
      if(xUSA > 9){
        yUSA++;
        xUSA = 0;
      }
      USAlen++;
    }
    if(dataFilter[i]["nacionalidad"] == "U.S.S.R/Rusia"){
      dataFilter[i]["x"] = xRUS + 10;
      dataFilter[i]["y"] = yRUS;
      dataFilter[i]["text"] = "";
      xRUS++;
      if(xRUS > 9){
        yRUS++;
        xRUS = 0;
      }
      RUSlen++;
    } 
  }

  let numeros = [];
  numeros.push({"x":xUSA+USAlen*0.015-0.14, "y": yUSA, "num":USAlen, "nacionalidad": "EE.UU."});
  numeros.push({"x":xRUS+10+RUSlen*0.015-0.14, "y": yRUS, "num":RUSlen, "nacionalidad": "U.S.S.R/Rusia"});

  chart = Plot.plot({
    marginLeft: 15,
    height : 320,
    color: {
      range: ["#32458A",  "#E43D3F"]
    },
    y:{
      domain: [7,6,5,4,3,2,1,0],
      label: "",
      ticks: 0,
      tickSize:0,
      tickPadding:20
    },
    x:{
      label: "",
      ticks: 0,
    },
    text:{
      range: [1,10],
    },
    marks: [
      Plot.dot(dataFilter, {
        x: 'x',
        y: 'y',
        fill: 'nacionalidad',
        r: 10,
        title: (d) =>
          `${d.nombre}
          Ocupacion: ${d.ocupacion}
          Status: ${d.status}
          Edad: ${d.edad_mision}
          Año mision: ${d.anio_mision}`,
      }),
      Plot.text(numeros, {
        x: 'x',
        y: 'y',
        text: 'num',
        fill: 'nacionalidad',
        fontSize: (d) => (d.num*0.7+25),
        dy: -8
      })
    ]
  })

  d3.select('#chart svg').remove();
  d3.select('#chart').append(() => chart);
}
