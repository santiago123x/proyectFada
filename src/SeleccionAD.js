import './App.css';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Table, ButtonGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Procedimiento() {
  const [turnosEf, setTurnosEf] = useState([]);
  const [love, setLove] = useState(0);
  const [horas, setHoras] = useState();
  const [arreglo, setArreglo] = useState([]);
  const [nom, setNom] = useState('');
  const [Hi, setHi] = useState('');
  const [Hf, setHf] = useState('');

  const [indiceKey, setKey] = useState(0);


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

    return ordenar(entrada)
  }


  function merge(izq, der) {
    let nuevoArray = []

    while (izq.length && der.length) {

      if (sacarHora(izq[0].HoraF) > sacarHora(der[0].HoraF)) {
        nuevoArray.push(izq.shift())
      } else if (sacarHora(izq[0].HoraF) < sacarHora(der[0].HoraF)) {
        nuevoArray.push(der.shift())
      } else {
        if (sacarMinutos(izq[0].HoraF) > sacarMinutos(der[0].HoraF)) {
          nuevoArray.push(izq.shift())

        } else {
          nuevoArray.push(der.shift())
        }
      }
    }

    return [...nuevoArray, ...izq, ...der]
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

  function sacarHoraComple(hora) {
    let soloM = null;
    let soloH = null;
    let m = 0.0;
    if (hora.length === 5) {
      soloH = hora.substr(0, 2)
      soloM = hora.substr(3, 2)
    } else {
      soloM = hora.substr(2, 2)
      soloH = hora.substr(0, 1)
    }
    if (parseFloat(soloM) > 0) {
      m = 0.5;
    }

    return (parseFloat(soloH) + m);
  }

  function CalcularMatrizAux(salas, t) {
    let C = [];
    let X = [];

    let H = [];
    let W = [];
    for (let p = 0; p < salas.length; p++) {
      H = [];
      W = [];
      for (let i = 0; i < t; i++) {
        H[i] = 'a';
        W[i] = 'a';
      }

      C[p] = H;
      X[p] = W;
    }

    for (let j = 0; j < t; j++) {
      if (sacarHoraComple(salas[0].HoraI) * 2 < j) {
        C[0][j] = 0;
        X[0][j] = 0;
      } else {
        C[0][j] = sacarHoraComple(salas[0].HoraF) - sacarHoraComple(salas[0].HoraI);
        X[0][j] = 1;
      }
    }

    for (let i = 1; i < salas.length; i++) {
      for (let j = 0; j < t; j++) {
        if (sacarHoraComple(salas[i].HoraI) * 2 < j) {
          C[i][j] = C[i - 1][j];
          X[i][j] = 0;
        } else {
          if (C[i - 1][j] > (sacarHoraComple(salas[i].HoraF) - sacarHoraComple(salas[i].HoraI)) + C[i - 1][sacarHoraComple(salas[i].HoraF) * 2]) {
            C[i][j] = C[i - 1][j];
            X[i][j] = 0;
          } else {
            C[i][j] = (sacarHoraComple(salas[i].HoraF) - sacarHoraComple(salas[i].HoraI)) + C[i - 1][sacarHoraComple(salas[i].HoraF) * 2];
            X[i][j] = 1;
          }
        }
      }
    }
    setHoras(C[salas.length - 1][0]);
    //console.log(X)
    return X;
  }

  function SolucionD(A, X, salas, t){
    setTurnosEf([]);
    console.log(A)
    console.log(X)
    console.log(salas)
    console.log(t)
    let arre = [];
    arre = solucion(A, X, salas, t);
    let arri = [];
    for(let i = 0;i<salas.length;i++){
      if(arre[i]===1){
        arri.push(salas[i]);
      }
    }
    console.log(arre)
    setTurnosEf(arri);

    
  }
  
function solucion(A,X,salas,t){
    
  if(salas.length   === 1){
    console.log((salas.length-1)+' - '+sacarHoraComple(salas[salas.length -1].HoraI)+' - '+t)
    X[salas.length -1 ] = A[salas.length -1][t]
  }else{
    
    if(A[salas.length -1][t] === 1){
      X[salas.length -1 ] = 1;
      
      console.log((salas.length-1)+' - '+sacarHoraComple(salas[salas.length -1].HoraF)+' - '+t);
      solucion(A,X,salas.slice(0, salas.length - 1),sacarHoraComple(salas[salas.length -1].HoraF)* 2);
    }else{
      X[salas.length -1] = 0;
      
      solucion(A,X,salas.slice(0, salas.length - 1),t);
    }

  }
  return X; 
}

  function agregarPro() {
    let nomP = nom;
    let hI = Hi;
    let hF = Hf;

    let Proc = { key: indiceKey, Proc: nomP, HoraI: hI, HoraF: hF };
    setKey(indiceKey + 1)
    let arri = [];
    arri = arreglo;

    arri.push(Proc);

    setArreglo(arri);

    console.log(arreglo)
  }

  function borrar(i) {
    var arri = arreglo;
    arri.splice(i, 1);
    setArreglo(arri);
    return 0;
  }

  function refrescar() {
    setLove(love + 1)
  }

  return (
    <div className="App">

      <div className='contene'>
        <div><h2>Listado de Procedimientos - Hospital Dinamico</h2></div>
        <div className='formu'>
          <Form>
            <FormGroup>
              <Label for='nomP'>Nombre del Procedimiento: </Label>
              <Input onChange={e => setNom(e.target.value)} name='nomP' id='nomP' placeholder='Nombre del Procedimiento' type='text'>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='hI'>Hora Inicial del Procedimiento: </Label>
              <Input onChange={e => setHi(e.target.value)} name='hI' id='hI' placeholder='Hora Inicial' type='text'>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='hF'>Hora Final del Procedimiento: </Label>
              <Input onChange={e => setHf(e.target.value)} name='hF' id='hF' placeholder='Hora Final' type='text'>
              </Input>
            </FormGroup>

          </Form>
        </div>
        <ButtonGroup className='botones'>
          <Button className='mb-2 ' color='primary' onClick={() => agregarPro()}><b>Agregar Procedimiento</b></Button>
          <Button className='btn' color='secondary' onClick={() => refrescar()}><i class="fa fa-refresh" aria-hidden="true"></i></Button>
        </ButtonGroup>

        <div className='select'>
          <Table size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Procedimiento</th>
                <th>Hora Inicial</th>
                <th>Hora Final</th>
                <th>Opción</th>
              </tr>
            </thead>
            <tbody>
              {arreglo.map((tur, i) =>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{tur.Proc}</td>
                  <td>{tur.HoraI}</td>
                  <td>{tur.HoraF}</td>
                  <td><Button color='danger' onClick={() => borrar(i)}><i class="fa fa-trash" aria-hidden="true"></i></Button></td>
                </tr>
              )}

            </tbody>
          </Table>
        </div>
        <Button className='mb-2' color='primary' onClick={()=> SolucionD(CalcularMatrizAux(ordenados(arreglo),49),[],ordenados(arreglo),0)}><b>Ordenar los Turnos</b></Button><br />
        <div className='conteneTabla'>
          <h4>Numero de Horas de uso de la Sala: {horas}</h4>
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
                  <th scope="row">{i + 1}</th>
                  <td>{tur.Proc}</td>
                  <td>{tur.HoraI}</td>
                  <td>{tur.HoraF}</td>
                </tr>
              )}

            </tbody>
          </Table>
        </div>
      </div>


    </div>
  );
}

export default Procedimiento;