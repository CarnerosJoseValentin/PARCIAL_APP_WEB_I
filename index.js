document.addEventListener("DOMContentLoaded", function() {
  cargarTareas();
});

function agregarTarea(event) {
  event.preventDefault();

  const titulo = document.querySelector("#titulo").value;
  const descripcion = document.querySelector("#descripcion").value;
  const fecha_limite = document.querySelector("#fecha_limite").value;
  const estado = document.querySelector("#estado").checked;

  const tarea = {
    titulo,
    descripcion,
    fecha_limite,
    estado,
  };

  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.push(tarea);

  localStorage.setItem("tareas", JSON.stringify(tareas));

  document.querySelector("form").reset();

  cargarTareas();
}

function cargarTareas() {
  const listaTareas = document.getElementById("listaTareas");
  listaTareas.innerHTML = "";

  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<strong>${tarea.titulo}</strong><br>${tarea.descripcion}<br>Fecha límite: ${tarea.fecha_limite}
      <br>Estado: ${tarea.estado ? "Activa" : "Inactiva"}
      <br><button class="btn btn-success" onclick="cambiarEstado(${index})">Cambiar Estado</button>
      <button class="btn btn-danger" onclick="eliminarTarea(${index})">Eliminar Tarea</button>`;
    listaTareas.appendChild(li);
  });
}

function cambiarEstado(index) {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas[index].estado = !tareas[index].estado;

  localStorage.setItem("tareas", JSON.stringify(tareas));

  cargarTareas();
}

function eliminarTarea(index) {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.splice(index, 1);

  localStorage.setItem("tareas", JSON.stringify(tareas));

  cargarTareas();
}

