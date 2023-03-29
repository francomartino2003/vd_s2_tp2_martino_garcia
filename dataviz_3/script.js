d3.csv('astronautas.csv', d3.autoType).then(data => {
  data = data.filter(d => d.nacionalidad == "U.S.S.R/Rusia" || d.nacionalidad =="EE.UU.");
  data = d3.groups(data, d => d.nacionalidad)
      .map(d => {
        return {
          nacionalidad: d[0],
          horas_eva_totales: d3.sum(d[1], d => d.eva_mision_hs),
        }
      }); 

  console.log(data);

  let chart = Plot.plot({
    height : 440,
    nice: true,
    color:{
      type: "categorical",
      range: ["rgba(50,69,138,1)", "rgba(228,61,63,0.9)"],
    },
    x:{
      label: "",
      tickFormat: null,
      tickSize:0,
      inset: 50
    },
    r:{
      range: [0,200],
    },
    marks: [
      Plot.dot(data, {
        x: 'nacionalidad',
        r: ('horas_eva_totales'),
        fill: 'nacionalidad',
      }),
    ]
  })
 
  d3.select('#chart').append(() => chart)
})

