

d3.csv('astronautas.csv', d3.autoType).then(data => {

  let mujeresUSA = data.filter(d => d.nacionalidad == "EE.UU.");
  mujeresUSA = mujeresUSA.filter(d => d.genero == "femenino");

  var radio = 200;
  var angulo = (2 * Math.PI) / 16;
  for (let i = 0; i < mujeresUSA.length; i++) {
    var x = Math.round(500 / 2 + radio * Math.cos(i * angulo));
    var y = Math.round(500 / 2 + radio * Math.sin(i * angulo));
    mujeresUSA[i]["x"] = x;
    mujeresUSA[i]["y"] = y;
  }

  // Buscar el objeto con nacionalidad "U.S.S.R/Rusia" y género "femenino"
  let mujeresRUS = data.filter(d => d.nacionalidad == "U.S.S.R/Rusia");
  mujeresRUS = mujeresRUS.filter(d => d.genero == "femenino");
  mujeresRUS[0]["x"] = 500/2;
  mujeresRUS[0]["y"] = 500/2;

  let text = [{"x": mujeresRUS[0]["x"], "y": mujeresRUS[0]["y"], "text": "1", "nacionalidad": "U.S.S.R/Rusia"}, 
              {"x": mujeresUSA[12]["x"], "y": mujeresUSA[12]["y"], "text": "16", "nacionalidad": "EE.UU."}];
  

  // Agregar el objeto central (si existe) al arreglo de objetos a graficar
  let marks = [];
    marks.push(
      Plot.dot(mujeresRUS, {
        x: 'x',
        y: 'y',
        fill: 'nacionalidad',
        r: 15,
        title: (d) =>
          `${d.nombre}
          Ocupacion: ${d.ocupacion}
          Status: ${d.status}
          Edad mision: ${d.edad_mision}
          Año mision: ${d.anio_mision}`,
      })
    );

    marks.push(
      Plot.text(text, {
        x: 'x',
        y: 'y',
        dy: -35,
        text:"text",
        fontSize: 30,
        fill: "nacionalidad"
      })
    );
  
  marks.push(
    Plot.dot(mujeresUSA, {
      x: 'x',
      y: 'y',
      fill: 'nacionalidad',
      r: 15,
      title: (d) =>
        `${d.nombre}
        Ocupacion: ${d.ocupacion}
        Status: ${d.status}
        Edad mision: ${d.edad_mision}
        Año mision: ${d.anio_mision}`,
    })
  );

  let chart = Plot.plot({
    marginLeft: 30,
    height: 370,
    width: 370,
    color: {
      range: ["#32458A", "#E43D3F"],
    },
    y: {
      label: "",
      ticks: 0,
    },
    x: {
      label: "",
      ticks: 0,
    },
    marks: marks,
  });

  d3.select('#chart').append(() => chart);

});

function createChart() {
  
}
