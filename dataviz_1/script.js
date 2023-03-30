d3.csv('astronautas.csv', d3.autoType).then(data => {
  for (let i = 0; i < data.length; i++) {
    let pais = "otros";
    if (data[i]["nacionalidad"] == "EE.UU." || data[i]["nacionalidad"] == "U.S.S.R/Rusia"){
      pais = data[i]["nacionalidad"];
    }
    data[i]["nacionalidad"] = pais;
  }
  
  data = d3.groups(data, d => d.anio_mision);
  
  let dataFinal = [];
  
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let aux = d3.groups(element[1], d => d.nacionalidad)
        .map(d=>{
          return{
            anio: element[0],
            nacionalidad: d[0],
            tot_hs: (d3.sum(d[1], d=> d.mision_hs))/1000
          }
        })
        dataFinal = dataFinal.concat(aux);
  }

  dataFinal.sort((x, y) => x.anio - y.anio);

  let chart = Plot.plot({
    grid:true,
    nice: true,
    color:{
      type: "categorical",
      range: ["#32458A",  "#E43D3F","#ABABAB"]
    },
    x:{
      label: "",
      tickFormat: d3.format("#.0f")
    },
    y:{
      label: "Miles de Hs",
    },
    marks: [
      Plot.line(dataFinal, {
        x: 'anio',
        y: 'tot_hs',
        stroke: 'nacionalidad',
        strokeWidth: 1.8,
      }),
      Plot.dot(dataFinal, {
        x: "anio",     
        y: "tot_hs",     
        fill: "nacionalidad",  
      }),
      Plot.text(dataFinal, {
        x: "anio",     
        y: "tot_hs",
        text: (d) => ((d.nacionalidad == 'otros' && d.anio == 2014) ? "resto de paises (*)" : ""),
        dy: 14,
        fontSize: 11,       
      })
    ]
  })
 
  d3.select('#chart').append(() => chart)
})


