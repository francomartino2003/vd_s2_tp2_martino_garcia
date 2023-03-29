d3.csv('astronautas.csv', d3.autoType).then(data => {
  let data2 = d3.groups(data, d => d.anio_mision);
  
  let dataFinal = [];
  
  for (let index = 0; index < data2.length; index++) {
    const element = data2[index];
    let aux = d3.groups(element[1], d => d.nacionalidad)
        .map(d=>{
          return{
            anio: element[0],
            nacionalidad: d[0],
            tot_hs: d3.sum(d[1], d=> d.mision_hs)
          }
        })
        dataFinal = dataFinal.concat(aux);
  }

  dataFinal.sort((x, y) => x.anio - y.anio);

  console.log(dataFinal);

  let chart = Plot.plot({
    line:true,
    color:{
      type: "categorical",
      legend:true,
      range: ["green", "purple", "orange", "yellow", "blue", "pink", "brown", "grey", "lightgreen", "lavender", "lightblue", "red", "black"]
    },
    marks: [
      Plot.line(dataFinal, {
        x: 'anio',
        y: 'tot_hs',
        stroke: 'nacionalidad'
      })
    ]
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
