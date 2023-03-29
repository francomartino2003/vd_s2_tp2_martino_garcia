d3.csv('astronautas.csv', d3.autoType).then(data => {
  let data2 = d3.groups(data, d => d.ocupacion)
      .map(d => {
        return {
          ocupacion: d[0],
          horas_totales: d3.sum(d[1], d => d.eva_mision_hs),
        }
      })   
  
  let chart = Plot.plot({
    line:true,
    height: 200,
    marginLeft: 150,
    marks: [
      Plot.barX(data2, {
        x: 'horas_totales',
        y: 'ocupacion',
        fill: 'ocupacion',
      })
    ],
    y: {
      domain: d3.sort(data2, (a, b) => d3.descending(a.horas_totales, b.horas_totales)).map(d => d.ocupacion),
    },
    x: {
      grid: true,
    }
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
