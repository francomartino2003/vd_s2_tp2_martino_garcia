d3.csv('astronautas.csv', d3.autoType).then(data => {
  console.log(data)
  let data2 = d3.groups(data, d => d.nacionalidad)
      .map(d => {
        return {
          nacionalidad: d[0],
          horas_totales: d3.sum(d[1], d => d.mision_hs),
        }
      }) 
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    line:true,
    height: 400,
    marginLeft: 130,
    marks: [
      Plot.barX(data2, {
        x: 'horas_totales',
        y: 'nacionalidad',
        fill:'nacionalidad'
      })
    ],
    y: {
      domain: d3.sort(data2, (a, b) => d3.descending(a.horas_totales, b.horas_totales)).map(d => d.nacionalidad),
    },
    x: {
      grid: true,
    }
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
