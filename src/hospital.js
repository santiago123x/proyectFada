
function hospital() {

    const [turnosEf, setTurnosEf] = useState([]);
    const [horas, setHoras] = useState();
  
  
  
    let turnos = [
      { Proc: 'Proc1', HoraI: '0:00', HoraF: '8:30' },
      { Proc: 'Proc2', HoraI: '5:00', HoraF: '12:00' },
      { Proc: 'Proc3', HoraI: '11:00', HoraF: '21:30' },
      { Proc: 'Proc4', HoraI: '12:00', HoraF: '24:00' },
      { Proc: 'Proc5', HoraI: '22:00', HoraF: '24:00' }
    ];

    
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
      //console.log(ordenar(entrada))
      return ordenar(entrada)
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
    if (parseFloat(soloM) > 0){
      m = 0.5;
    }
    
    return (parseFloat(soloH) + m );
  }
/*   
  Urgencias[salas+1][horafinal] 
  
  
      for j = 0 to horafinal-1
  
          Urgencias[0],[j] = 0
  
      for i = 0 to salas
          for j = 0 to horafinal
  
          if(Sacarhorafinal(Procedimientos[i]) <= t  )
              Urgencias[i][j] = max(duracionprocedimiento[i] + Urgencias[salas-1],[horafinalizacion(i)], )
   */
  
  function Calcular1(salas, t) {

    console.log('*************************************************************************************');
  
    console.log('Solucionando el problema con las salas : ', salas);
    console.log('Tiempo limite : ' + t);
  
    if (salas.length == 0) {
      return 0;
    } else {
      let salasAuxiliar = [];
      salasAuxiliar = salas;
      let ultimaSala = salasAuxiliar.slice(salas.length - 1, salas.length);
      
      if (sacarHoraComple(ultimaSala[0].HoraF) <= t) {
        console.log('Beneficio de la sala actual :' + (sacarHoraComple(ultimaSala[0].HoraF) - sacarHoraComple(ultimaSala[0].HoraI)));
        return Math.max(
          (sacarHoraComple(ultimaSala[0].HoraF) - sacarHoraComple(ultimaSala[0].HoraI)) + Calcular1(salas.slice(0, salas.length - 1), sacarHoraComple(ultimaSala[0].HoraI)),
          Calcular1(salas.slice(0, salas.length - 1), t));
      } else {
  
        return Calcular1(salas.slice(0, salas.length - 1), t);
      }
    }
  }
    
  
  
    function horasTotal(array) {
      let totalH = 0;
      let totalM = 0;
      for (let i = 0; i < array.length; i++) {
        let hora = sacarHora(array[i].HoraF) - sacarHora(array[i].HoraI);
        let min = sacarMinutos(array[i].HoraF) - sacarMinutos(array[i].HoraI);
        if (min < 0) {
          hora -= 1;
          min = 30;
        }
        totalH += hora;
        totalM += min;
        if (totalM === 60) {
          totalH += 1;
          totalM = 0;
        }
      }
      if (totalH < 10) {
        totalH = '0' + totalH;
      }
      if (totalM < 10) {
        totalM = '0' + totalM;
      }
      return `Tiempo de uso de la sala: ${totalH}:${totalM}`
    }
  
  }
  
  
  
  
  