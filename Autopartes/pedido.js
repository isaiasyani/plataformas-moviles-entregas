var autopartesSeleccionadas = [];

function consultarAutoparte(autoparteId) {
    var apiUrl = "https://isaiasyani.github.io/plataformas-moviles-entregas/Autopartes/listado.json";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var autoparte = data.find(item => item.id == autoparteId);
            if (autoparte) {
                autopartesSeleccionadas.push(autoparte);
                alert(`Autoparte agregada a la lista.`);
            } else {
                alert(`No selecciono ninguna autoparte`);
            }
        })
        .catch(error => {
            console.error("Error al obtener datos de la API:", error);
            alert("Error al obtener datos de la API. Inténtalo nuevamente.");
        });
}

function mostrarAutopartes() {
    var resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h5>Productos Seleccionados:</h5>";

    if (autopartesSeleccionadas.length > 0) {
        var totalPrecio = 0;

        autopartesSeleccionadas.forEach((autoparte, index) => {
            resultadoDiv.innerHTML += `
                <p>Nombre: ${autoparte.nombre}</p>
                <p>Precio: ${autoparte.precio}</p>
                <button class="btn btn-danger" onclick="eliminarAutoparte(${index})">Eliminar</button>
                <hr>
            `;

            //totalPrecio += autoparte.precio;
        });

        resultadoDiv.innerHTML += `<p><strong>Total: ${totalPrecio}</strong></p>`;

        var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        myModal.show();
    } else {
        resultadoDiv.innerHTML += "<p>No se han seleccionado autopartes.</p>";
    }
}

function eliminarAutoparte(index) {
    autopartesSeleccionadas.splice(index, 1);
    mostrarAutopartes();
}