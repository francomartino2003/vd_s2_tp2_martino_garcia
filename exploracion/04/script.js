d3.csv('astronautas.csv', d3.autoType).then(data => {
  // Guardamos el svg generado en la variable chart

  let chart = Plot.plot({
    line:true,
    color: {
      legend: true,
      range: ["pink", "steelblue"]
    },
    marks: [
      Plot.dot(data, {
        x: 'anio_mision',
        y: 'mision_hs',
        fill: 'genero',
      })
    ]
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
