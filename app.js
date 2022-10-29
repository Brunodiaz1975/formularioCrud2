const nombreUI = document.querySelector('#nombre');
const puestoUI = document.querySelector('#puesto');
const btnUI = document.querySelector('#btn');
const tableBodyUI = document.querySelector('#tableBody');
const formularioUI = document.querySelector('#formulario');
const btnUI2 = document.querySelector('#btn2');
let referencia = "";


btnUI.addEventListener("click", enviar);
btnUI2.addEventListener("click", actualizar2);
document.addEventListener("DOMContentLoaded", pintar);



function enviar(){
    
    let objEmpleado = {
        nombre : nombreUI.value,
        puesto : puestoUI.value,
        activo : document.querySelector('#activo:checked').value,
        id : Date.now(),
    };

    let arreglo =JSON.parse(localStorage.getItem('DB'));

    if (arreglo === null) {
        arreglo = []
        arreglo.push(objEmpleado);
        localStorage.setItem("DB", JSON.stringify(arreglo));
    } else {
        arreglo.push(objEmpleado);
        localStorage.setItem("DB", JSON.stringify(arreglo));
    }
    
    pintar();
}

function pintar(){
    let datos = JSON.parse(localStorage.getItem("DB"));

  if (datos != null) {
    tableBodyUI.innerHTML = "";

    datos.forEach((element) => {
      tableBodyUI.innerHTML =
        tableBodyUI.innerHTML +
        `
            <tr class='tr' key=${element.id}>
                <td>${element.nombre}</td>
                <td>${element.puesto}</td>
                <td><button onclick='eliminar(event)'>elminar</button><button onclick='actualizar(event)'>actualizar</button></td>
                <td style='display:none'>${element.id}</td>
            </tr>
            `;
    });
  }

}

function eliminar(e) {
    // console.log(e.path[2].childNodes[7].innerHTML);
    // console.log(e.path[2].getAttribute('key'));
    let buscarElemento = e.path[2].childNodes[7].innerHTML;
  
    let datos = JSON.parse(localStorage.getItem("DB"));
    let index = datos.findIndex((element) => element.id == buscarElemento);
  
    datos.splice(index, 1);
  
    localStorage.setItem("DB", JSON.stringify(datos));
  
    pintar();
  
    formularioUI.reset();
  }

  function actualizar(e) {
    let buscarElemento = e.path[2].childNodes[7].innerHTML;
    let datos = JSON.parse(localStorage.getItem("DB"));
    let index = datos.findIndex((element) => element.id == buscarElemento);
  
    nombreUI.value = datos[index].nombre;
    puestoUI.value = datos[index].puesto;
  
    btnUI.style.display = "none";
    btnUI2.style.display = "block";
  
    referencia = datos[index].id;
  }

  function actualizar2() {
    let objEmpleado = {
      nombre: nombreUI.value,
      puesto: puestoUI.value,
      activo: document.querySelector("#activo:checked").value,
      id: referencia,
    };
  
    let datos = JSON.parse(localStorage.getItem("DB"));
    let index = datos.findIndex((element) => element.id == objEmpleado.id);
  
    datos.splice(index, 1, objEmpleado);
  
    localStorage.setItem("DB", JSON.stringify(datos));
  
    pintar();
  
    btnUI.style.display = "block";
    btnUI2.style.display = "none";
  
    formularioUI.reset();
  }