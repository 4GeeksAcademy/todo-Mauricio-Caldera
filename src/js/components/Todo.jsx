import React, { useEffect, useState } from "react";

function Todo() {
  const USERNAME = "mauricio";
  const BASE_URL = "https://playground.4geeks.com/todo";

  //tareas como objetos por la base de datos
  const [tarea, setTarea] = useState({
    label: "",
    is_done: false,
  });

  const [listaTareas, setListaTareas] = useState([]); //manejo de la lista

  //metodo post que crea tarea en el servidor
  const manejarEnter = async (e) => {
    if (e.key === "Enter" && tarea.label.trim() !== "") {
      try {
        const response = await fetch(`${BASE_URL}/todos/${USERNAME}`, {
          method: "POST",
          body: JSON.stringify(tarea),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          getAllTask();
          setTarea({ label: "", is_done: false });
        }
      } catch (error) {
        console.log("Error creando tarea", error);
      }
    }
  };

  const getAllTask = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${USERNAME}`);
      if (!response.ok) {
        console.log("Error de conexión o usuario no existe");
        return;
      }
      // Convertimos la respuesta a JSON
      const data = await response.json();

      setListaTareas(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  const borrarTarea = async (idABorrar) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${idABorrar}`, {
        method: "DELETE",
      });

      if (response.ok) {
        getAllTask();
      }
    } catch (error) {
      console.log("Error borrando tarea:", error);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <div className="w-50">
        <h1
          className="text-center"
          style={{ color: "black", fontSize: "80px", fontWeight: "100" }}
        >
          todos
        </h1>

        <div className="card shadow-sm rounded-0">
          <div className="card-header bg-white border-0 p-0">
            <input
              type="text"
              className="form-control border-0 fs-4 py-3 px-4"
              placeholder="What needs to be done?"
              value={tarea.label}
              onChange={(e) => setTarea({ ...tarea, label: e.target.value })}
              onKeyDown={manejarEnter}
              style={{ boxShadow: "none", outline: "none" }}
            />
          </div>

          <ul className="list-group list-group-flush">
            {listaTareas.length === 0 ? (
              <li
                className="list-group-item text-secondary fs-5 py-3 px-4"
                style={{ backgroundColor: "#f9f9f9" }}
              >
                No hay tareas, añadir tareas
              </li>
            ) : (
              listaTareas.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center fs-5 py-3 px-4 tarea-item"
                >
                  {item.label}
                  <span
                    className="text-danger icono-eliminar"
                    onClick={() => borrarTarea(item.id)}
                  >
                    ✖
                  </span>
                </li>
              ))
            )}
          </ul>

          <div
            className="card-footer bg-white text-muted py-2 px-4"
            style={{ fontSize: "14px", borderTop: "1px solid #e6e6e6" }}
          >
            {listaTareas.length} item{listaTareas.length !== 1 ? "s" : ""} left
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
