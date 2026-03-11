import React, { useState } from "react";

function Todo() {
  //Estados
  const [tarea, setTarea] = useState("");
  const [listaTareas, setListaTareas] = useState([]);
  const manejarEnter = (e) => {
    if (e.key === "Enter" && tarea.trim() !== "") {
      setListaTareas([...listaTareas, tarea]);
      setTarea("");
    }
  };

  const borrarTarea = (indexABorrar) => {
    const nuevaLista = listaTareas.filter((_, index) => index !== indexABorrar);
    setListaTareas(nuevaLista);
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
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
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
              listaTareas.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center fs-5 py-3 px-4 tarea-item"
                >
                  {item}
                  <span
                    className="text-danger icono-eliminar"
                    onClick={() => borrarTarea(index)}
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
