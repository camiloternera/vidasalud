// Variable para la botones
const btnAddMedico = document.getElementById('addMedico'),
      btnUpdateMedico = document.getElementById('updateMedico'),
      btnDeleteMedico = document.getElementById('deleteMedico');
// Validar checkbox seleccionado
const allCheck = document.getElementById('allCheck');
var check = document.querySelectorAll('.check');
// Capturar campos de textos
const form = document.querySelector('.form');
// Capturar input oculto
var accion = document.getElementById('accion');
// Ventana
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
// tbody de la tabla
const rowMedico = document.getElementById('rowMedico');
// Variable para capturar el campo e imprimir valores
const cedula = document.getElementById('cedula'),
      nameMedico = document.getElementById('name'),
      lastname = document.getElementById('lastname'),
      ages = document.getElementById('ages'),
      address = document.getElementById('address'),
      cellphone = document.getElementById('cellphone'),
      email = document.getElementById('email'),
      sex = document.getElementById('sex'),
      specialty = document.getElementById('specialty'),
      collegiate = document.getElementById('collegiate');
// URL
const url = "../../backend/functions/crud_medico.php";

/** Funciones addEventListener */
function eventListener() {
    // Seleccion multiple
    allCheck.addEventListener('click', selectMultiple);
    // Abrir ventana modal Crear
    btnAddMedico.addEventListener('click', openWindowModalAdd);
    // Abrir ventana modal Actualizar
    btnUpdateMedico.addEventListener('click', openWindowModalUpdate)
    // Eliminar medico
    btnDeleteMedico.addEventListener('click', deleteRowSelect);

    // Cerrar ventana modal Crear / Actualizar
    closeModal.addEventListener('click', closeWindowModal);
}
// Ejecutar eventListener();
eventListener();

// Seleccion multiple
function selectMultiple() {
    if (allCheck.checked === true) {
        check.forEach(select => {
            select.checked = true;
            checkSelect = select.checked;
        });
    } else {
        check.forEach(select => {
            select.checked = false;
            checkSelect = select.checked;
        });
    }
}

// Abrir ventana modal
function openWindowModalAdd() {
    // Mostrar la ventana modal
    modal.style.display = 'flex';
    // Pasarle un valor al input oculto
    accion.value = 'crear';
    // Ejecutar funcion form, que trae el evento submit.
    form.addEventListener('submit', actionForm);
}
function openWindowModalUpdate() {
    check.forEach(list => {
        if (list.checked) {
            // Abrir la ventana modal
            modal.style.display = 'flex';
            // Pasarle un valor al input oculto
            accion.value = 'update';
            // Ejecutar funcion form, que trae el evento submit
            form.addEventListener('submit', actionForm);

            // Fila para obtener los datos
            const row = list.parentElement.parentElement;

            // Imprimir los datos de la fila en los campos
            cedula.value = parseInt(row.childNodes[3].textContent);
            cedula.setAttribute("disabled", ""); // Deshabilitar input
            nameMedico.value = row.childNodes[5].textContent;
            lastname.value = row.childNodes[7].textContent;
            ages.value = parseInt(row.childNodes[9].textContent);
            address.value = row.childNodes[11].textContent;
            cellphone.value = parseInt(row.childNodes[13].textContent);
            email.value = row.childNodes[15].textContent;
            sex.value = row.childNodes[17].innerText;
            specialty.value = row.childNodes[19].textContent;
            collegiate.value = parseInt(row.childNodes[21].textContent);
            collegiate.setAttribute("disabled", "");

        }
    })     
}
// Cerrar ventana modal
function closeWindowModal() {
    modal.style.display = 'none';
    // Vaciar los check
    check.forEach(list => {
        list.checked = false;
    });
}

/** Accion que hara el medico */
function actionForm(e) {
    // Evitar que realice la accion de recargar pagina
    e.preventDefault();

    const dataForm = new FormData();

    dataForm.append('cedula_medico', cedula.value);
    dataForm.append('nombre', nameMedico.value);
    dataForm.append('apellido', lastname.value);
    dataForm.append('edad', ages.value);
    dataForm.append('direccion', address.value);
    dataForm.append('telefono', cellphone.value);
    dataForm.append('correo', email.value);
    dataForm.append('sexo', sex.value);
    dataForm.append('especialidad', specialty.value);
    dataForm.append('n_colegiado', collegiate.value);
    dataForm.append('accion', accion.value);
    
    if (accion.value === 'crear') {
        // Crearemos nuevo medico
        ajaxCreateMedico(dataForm);
    } else {
        // Editar / Actualizar medico
        ajaxUpdateMedico(dataForm);
    }
}

/** Eliminar medico */ 
function deleteRowSelect() {
    check.forEach(list => {
        if (list.checked) {
            const rowDelete = list.parentElement.parentElement;
            // Pasamos por argumento de la funcion la id y la fila a eliminar
            ajaxDeleteMedico(list.id, rowDelete);
        }
    });
}

/** Tecnologia AJAX */
function ajaxCreateMedico(data) { // Crear medico
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200 || this.status === 201) {
                const response = JSON.parse(this.responseText);
                // Inserta un nuevo elemento a la tabla
                const newMedico = document.createElement('tr');
                newMedico.classList.add('userSelect');

                newMedico.innerHTML = `
                    <th><input type="checkbox" class="check" id="${response.data.cedula_medico}"></th>
                    <td>${response.data.cedula_medico}</td>
                    <td>${response.data.nombre}</td>
                    <td>${response.data.apellido}</td>
                    <td>${response.data.edad}</td>
                    <td>${response.data.direccion}</td>
                    <td>${response.data.telefono}</td>
                    <td>${response.data.correo}</td>
                    <td>${response.data.sexo}</td>
                    <td>${response.data.especialidad}</td>
                    <td>${response.data.n_colegiado}</td>
                `;
                // Agregar fila(registro) a la tabla
                rowMedico.appendChild(newMedico);
                check = document.querySelectorAll('.check');
                form.reset();
                closeWindowModal();
            }
        }
    };
    xhttp.send(data);
}
function ajaxUpdateMedico(data) { // Editar / Actualizar medico
    /** Editando/Actualizando datos a la base de datos via Ajax */
    // LLamado AJAX - Creando objeto
    const xhttp = new XMLHttpRequest();
    // Abrir la conexion
    xhttp.open('POST', url, true);
    // Leer la respuesta
    xhttp.onload = function () {
        if (this.readyState === 4) {
            if (this.status === 200 || this.status === 201) {
                const response = JSON.parse(this.responseText);                
                // Capturar id
                const id = document.getElementById(`${response.data.cedula_medico}`);
                // Capturar la fila
                const row = id.parentElement.parentElement;

                // Imprimir datos en el DOM HTML
                row.children[2].innerText = response.data.nombre;
                row.children[3].innerText = response.data.apellido;
                row.children[4].innerText = response.data.edad;
                row.children[5].innerText = response.data.direccion;
                row.children[6].innerText = response.data.telefono;
                row.children[7].innerText = response.data.correo;
                row.children[8].innerText = response.data.sexo;
                row.children[9].innerText = response.data.especialidad;

                closeWindowModal();
            }
        }
    }
    xhttp.send(data);
}
function ajaxDeleteMedico(id, rowDelete) { // Eliminar medico
    // Validamos que este seguro de eliminar un user
    const confirmDelete = confirm('¿Estás Seguro (a) ?');
    
    if (confirmDelete) {
        /** Eliminando datos a la base de datos via Ajax */
        // LLamado AJAX - Creando objeto
        const xhttp = new XMLHttpRequest();
        // Abrir la Conexion
        xhttp.open('GET', `${url}?id=${id}&accion=delete`, true);
        // Leer la respuesta
        xhttp.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200 || this.status === 201) {
                    const response = JSON.parse(xhttp.responseText);

                    if (response.respuesta === 'Successful') {
                        // Eliminar el registro del DOM
                        rowDelete.remove();
                        check = document.querySelectorAll('.check');
                    }else {

                    }
                }
            }
        }
        // Enviar la peticion
        xhttp.send();
    }
}
