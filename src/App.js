import './App.css';
import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //const [texto, setTexto] = useState([]);
  const [turnosEf, setTurnosEf] = useState([]);
  const [horas, setHoras] = useState();

  

  let turnos = [
    { Proc: 'Proc1', HoraI: '0:00', HoraF: '8:30' },
    { Proc: 'Proc2', HoraI: '5:00', HoraF: '12:00' },
    { Proc: 'Proc3', HoraI: '11:00', HoraF: '21:30' },
    { Proc: 'Proc4', HoraI: '12:00', HoraF: '24:00' },
    { Proc: 'Proc5', HoraI: '22:00', HoraF: '24:00' }
  ];


  function ordenar(entrada) {

    if (entrada.length <= 1) {
      return entrada;
    }
    const mitad = Math.floor(entrada.length / 2);

    const izq = entrada.slice(0, mitad);
    const der = entrada.slice(mitad);

    return merge(
      ordenar(izq), ordenar(der)
    );

  }

  function ordenados(entrada) {
    //setTexto(ordenar(entrada));
    //console.log(ordenar(entrada));
    console.log(hospitalVoraz(ordenar(entrada)))
    return ordenar(entrada)
  }


  function merge(izq,der){
    let nuevoArray = []
     
      while (izq.length && der.length) {
         
          if (sacarHora(izq[0].HoraF) < sacarHora(der[0].HoraF)) {
            nuevoArray.push(izq.shift())  
          } else if(sacarHora(izq[0].HoraF) > sacarHora(der[0].HoraF)) {
            nuevoArray.push(der.shift()) 
          }else{
            if (sacarMinutos(izq[0].HoraF) < sacarMinutos(der[0].HoraF)) {
              nuevoArray.push(izq.shift())  
              
            } else {
              nuevoArray.push(der.shift()) 
            }
          }
      }
      
      return [ ...nuevoArray, ...izq, ...der ]
  }


  

  function sacarHora(hora) {
    let soloH = null;
    if (hora.length === 5) {
      soloH = hora.substr(0, 2)
    } else {
      soloH = hora.substr(0, 1)
    }
    return parseInt(soloH);
  }

  function sacarMinutos(hora) {
    let soloM = null;
    if (hora.length === 5) {
      soloM = hora.substr(3, 2)
    } else {
      soloM = hora.substr(2, 2)
    }
    return parseInt(soloM);
  }

  function hospitalVoraz(entrada) {
    let TurnosEficientes = [];
    setTurnosEf([]);
    let turnoI = entrada[0];
    TurnosEficientes.push(turnoI);

    for (let i = 1; i < entrada.length; i++) {

      if (sacarHora(turnoI.HoraF) === sacarHora(entrada[i].HoraI)) {
        if (sacarMinutos(turnoI.HoraF) <= sacarMinutos(entrada[i].HoraI)) {
          turnoI = entrada[i];
          TurnosEficientes.push(turnoI);
        }        
      }else if (sacarHora(turnoI.HoraF) < sacarHora(entrada[i].HoraI)){
        turnoI = entrada[i];
        TurnosEficientes.push(turnoI);
      }
    }
    setTurnosEf(TurnosEficientes);
    setHoras(horasTotal(TurnosEficientes));
  }

  function horasTotal (array){
    let totalH = 0;
    let totalM = 0 ;
    for (let i = 0; i < array.length; i++){
      let hora = sacarHora(array[i].HoraF) - sacarHora(array[i].HoraI);
      let min = sacarMinutos(array[i].HoraF) - sacarMinutos(array[i].HoraI);
      if (min < 0){
        hora -= 1;
        min = 30; 
      }
      totalH += hora;
      totalM += min;
      if (totalM === 60){
        totalH += 1;
        totalM = 0;
      }
    }
    if(totalH<10){
      totalH = '0'+totalH;
    }
    if(totalM<10){
      totalM = '0'+totalM;
    }
    return `Tiempo de uso de la sala: ${totalH}:${totalM}`
  }


  return (
    <div className="App">
      <div className='contene'>
        <Button className='mb-2' color='primary' onClick={() => hospitalVoraz(ordenados(turnos))}><b>Ordenar los Turnos</b></Button><br />
        <div className='conteneTabla'>
          <h4>{horas}</h4>
          <Table size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Procedimiento</th>
                <th>Hora Inicial</th>
                <th>Hora Final</th>
              </tr>
            </thead>
            <tbody>
              {turnosEf.map((tur, i) =>
                <tr>
                  <th scope="row">{i}</th>
                  <td>{tur.Proc}</td>
                  <td>{tur.HoraI}</td>
                  <td>{tur.HoraF}</td>
                </tr>
              )}
              
            </tbody>
          </Table>
        </div>
      </div>
      <input type="file" id='entrada' />
      <h3>Contenido del archivo:</h3>
      <pre id="contenido-archivo"></pre>

    </div>
  );
}

export default App;



  
    
  
  /*
  function merge(izq, der) {
    let nuevoArray = [], izqIndex = 0, derIndex = 0;

    while (izqIndex < izq.length && derIndex < der.length) {
      if (sacarHora(izq[izqIndex].HoraF) < sacarHora(der[izqIndex].HoraF)) {
        
        nuevoArray.push(izq[izqIndex]);
        console.log('<: ');
        console.log(nuevoArray)
        izqIndex++;
      } else if (sacarHora(izq[izqIndex].HoraF) > sacarHora(der[izqIndex].HoraF)) {
        nuevoArray.push(der[derIndex]);
        console.log('>: ');
        console.log(nuevoArray)
        derIndex++;
      }
      else {
        if (sacarMinutos(izq[izqIndex].HoraF) < sacarMinutos(der[izqIndex].HoraF)) {
          nuevoArray.push(izq[izqIndex]);
          izqIndex++;
        } else {
          nuevoArray.push(der[derIndex]);
          derIndex++;
        }
      }
    }
    
    return nuevoArray.concat(izq.slice(izqIndex)).concat(der.slice(derIndex));
  }
*/