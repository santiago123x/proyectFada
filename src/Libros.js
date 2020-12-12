import './App.css';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Libros() {

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
        for (var j = 0; j < arrayLibros.length; j++) {
            for (var i = 0; i < arrayLibros[j].length; i++) {
                //noe += `\nEscritor #:  ${j} Libro: ${arrayLibros[j][i].Nombre} # Paginas: ${arrayLibros[j][i].Paginas}\n`
                noe += 'Escritor #:  '+j+', Nombre: '+arrayLibros[j][i].Nombre+ ', # Paginas: ' +arrayLibros[j][i].Paginas +' ------> '
            }
        }
       
        return noe;
        
    }


    return (
        <div className="App">
            <div className='contene'>
                <Button className='mb-2' color='primary' onClick={() => asignar(5, libros, prom(libros, 5))}><b>Libros</b></Button><br />
                <div className='conteneTabla'>
                    <p><b>{imprimir()}</b></p>
                </div>
            </div>


        </div>
    );
}

export default Libros;