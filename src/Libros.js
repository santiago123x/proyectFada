import './App.css';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, ButtonGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Libros() {
    const [nom, setNom] = useState('');
    const [pag, setPag] = useState('');
    const [esc, setEsc] = useState(0);
    const [love, setLove] = useState(0);
    const [arreglo, setArreglo] = useState([]);
    const[indiceKey, setKey] = useState(0);

    const [arrayLibros, setArrLib] = useState([]);

    let libros = [
        { Nombre: 'Libro1', Paginas: 103 },
        { Nombre: 'Libro2', Paginas: 203 },
        { Nombre: 'Libro3', Paginas: 343 },
        { Nombre: 'Libro4', Paginas: 53 },
        { Nombre: 'Libro5', Paginas: 130 },
        { Nombre: 'Libro6', Paginas: 90 }
    ]



    function prom(array, escrit) {
        let totalP = null;
        for (let i = 0; i < array.length; i++) {
            totalP += array[i].Paginas;
        }
        let cadau = totalP / escrit;
        //console.log(cadau)
        return (cadau);

    }

    function asignar(escrit, array, cadau) {
        let viejoarray = [];
        viejoarray = array;
        let nuevoarray = [];
        for (let i = 1; i <= escrit; i++) {
            let debeser = 0;
            let arrayx = [];
            if (i < escrit) {
                while (viejoarray.length !== 0 && cadau >= debeser) {
                    if (arrayx.length === 0 && viejoarray[0].Paginas > cadau) {
                        debeser += viejoarray[0].Paginas;
                        let libro = {
                            Nombre: viejoarray[0].Nombre, Paginas: viejoarray[0].Paginas
                        }
                        viejoarray.splice(0, 1);
                        arrayx.push(libro);
                        //console.log(i + ' If: ')
                        //console.log(debeser)
                        //console.log(arrayx)


                    } else if ((debeser + viejoarray[0].Paginas) < (cadau * 1.07)) {
                        debeser += viejoarray[0].Paginas;
                        let libro = {
                            Nombre: viejoarray[0].Nombre, Paginas: viejoarray[0].Paginas
                        }
                        viejoarray.splice(0, 1);
                        arrayx.push(libro);
                        /*console.log(i + ' else If: ')
                        console.log(debeser)
                        console.log(arrayx)*/

                    }
                    else {
                        debeser = cadau + 1
                        /*console.log(i + ' else: ')
                        console.log(debeser)
                        console.log(arrayx)*/

                    }
                }

            } else {
                arrayx = viejoarray
            }
            nuevoarray.push(arrayx);
        }
        setArrLib(nuevoarray);


    }

    function imprimir() {
        let noe = ''
        noe += maxDias(arrayLibros) + ' Dias ----> '
        for (var j = 0; j < arrayLibros.length; j++) {
            for (var i = 0; i < arrayLibros[j].length; i++) {
                //noe += `\nEscritor #:  ${j} Libro: ${arrayLibros[j][i].Nombre} # Paginas: ${arrayLibros[j][i].Paginas}\n`
                noe += 'Escritor #:  ' + j + ', Nombre: ' + arrayLibros[j][i].Nombre + ', # Paginas: ' + arrayLibros[j][i].Paginas + ' ------> '
            }
        }

        return noe;

    }

    function refrescar() {
        setLove(love + 1)
    }

    function maxDias(array) {
        let maxPag = 0;
        for (let i = 0; i < array.length; i++) {
            let contador = 0;

            for (let y = 0; y < array[i].length; y++) {
                contador += array[i][y].Paginas;
                if (contador > maxPag) {
                    maxPag = contador;

                }
            }
        }
        return maxPag;
    }

    function agregarLib() {
        let nomP = nom;
        let pagi = parseInt(pag);


        let Lib = { key: indiceKey, Nombre: nomP, Paginas: pagi };
        setKey(indiceKey + 1)
        let arri = [];
        arri = arreglo;

        arri.push(Lib);

        setArreglo(arri);
    }

    function borrar(i){
        var arri = arreglo;
        arri.splice(i,1);
       setArreglo(arri);
        return 0;
      }

    return (
        <div className="App">
            <div className='contene'>
            <div><h2>Copia de Libros - Voraz</h2></div>
                <div className='formu'>
                    <Form>
                        <FormGroup>
                            <Label for='nom'>Nombre del Libro: </Label>
                            <Input onChange={e => setNom(e.target.value)} name='nom' id='nom' placeholder='Nombre del Libro' type='text'>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='pag'>Numero de Paginas: </Label>
                            <Input onChange={e => setPag(e.target.value)} name='pag' id='pag' placeholder='Numero de Paginas' type='text'>
                            </Input>
                        </FormGroup>


                    </Form>
                    <ButtonGroup className='botones'>
                    <Button className='mb-2 ' color='primary' onClick={() => agregarLib()}><b>Agregar Procedimiento</b></Button>
                    <Button className='btn' color='secondary' onClick={() => refrescar()}><i class="fa fa-refresh" aria-hidden="true"></i></Button>
                </ButtonGroup>
                </div>

                <div className='select'>
      <Table size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del Libro</th>
                <th>Numero de Paginas</th>
                <th>Opción</th>
              </tr>
            </thead>
            <tbody>
              {arreglo.map((tur, i) =>
                <tr>
                  <th scope="row">{i+1}</th>
                  <td>{tur.Nombre}</td>
                  <td>{tur.Paginas}</td>
                  <td><Button color='danger' onClick={() => borrar(i)}><i class="fa fa-trash" aria-hidden="true"></i></Button></td>
                </tr>
              )}
              
            </tbody>
          </Table>
      </div>
                <FormGroup style={{width: '60%'}} >
                            <Label for='esc'>Numero de Escritores </Label>
                            <Input onChange={e => setEsc(e.target.value)} name='esc' id='esc' placeholder='Numero de Escritores' type='number'>
                            </Input>
                        </FormGroup>
                <Button style={{width: '20%'}} className='mb-2' color='primary' onClick={() => asignar(esc, arreglo, prom(arreglo, esc))}><b>Libros</b></Button><br />
                
                <div className='conteneTabla'>
                    <p><b>{imprimir()}</b></p>
                </div>
            </div>


        </div>
    );
}

export default Libros;