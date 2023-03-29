let chart
let data
let selectElement = d3.select('#input')
let valuesDomainX;

d3.csv('astronautas.csv', d3.autoType).then(dataChart => {
  data = dataChart;
  valuesDomainX = [d3.min(data, d => d.edad_mision), d3.max(data, d => d.edad_mision)]
  let initYear = selectElement.attr('value');
  changeValueInput(initYear)
  createChart(initYear) 
})

selectElement.on('input', event => {
  let yearSelected = event.target.value
  changeValueInput(yearSelected)
  createChart(yearSelected)
})

function changeValueInput(value) {
  const resultado = document.querySelector('#value-input')
  resultado.textContent = value
}

function createChart(yearSelected) {
  let dataFilter = data.filter(d => d.anio_mision == yearSelected);
  let menor = d3.min(dataFilter, d=> d.edad_mision);
  let mayor = d3.max(dataFilter, d=> d.edad_mision);
  let dataFilter2 = dataFilter.filter(d => d.edad_mision == menor || d.edad_mision == mayor);

  for(let i = 0; i < dataFilter2.length; i++){
    if(dataFilter2[i]["edad_mision"] == menor){
      dataFilter2[i]["menor_o_mayor"] = "menor";
    }  
    if(dataFilter2[i]["edad_mision"] == mayor){
      dataFilter2[i]["menor_o_mayor"] = "mayor";
    }
  }

  console.log(dataFilter2);
  
  chart = Plot.plot({
    line:true,
    grid:true,
    nice: true,
    color: {
      legend: true,
    },
    x: {
      domain: valuesDomainX,
    },
    marks: [
      Plot.dot(dataFilter2, {
        x: 'edad_mision',
        fill: 'menor_o_mayor',
        r: 15,
        title: (d) =>
          `${d.nombre}
          Nacionalidad: ${d.nacionalidad}
          Ocupacion: ${d.ocupacion}
          Status: ${d.status}`,
      })
    ]
  })

  d3.select('#chart figure').remove()
  d3.select('#chart').append(() => chart)
}
