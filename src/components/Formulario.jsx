import { useState } from "react";
import Swal from "sweetalert2";

const Formulario = ({addTodo}) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    state: "pendiente",
    priority: false,
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    // utilizando el callback
    setTodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description } = todo;

    // pequeña validación
    if (!title.trim() || !description.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Titulo y descripcion obligatorios!'
      })
      setError(true);
      return;
    } else {
      setError(false);
    }

    addTodo({
      id: Date.now(),
      ...todo,
      state: todo.state === 'completado'
    })
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Todo agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  };

  const PintarError = () => (
    <div className="alert alert-danger">Todos los campos obligatorios</div>
  );

  return (
    <div className="mt-2">
      
      {error && <PintarError />}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Ingrese un TODO"
          name="title"
          value={todo.title}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          type="text"
          placeholder="Ingrese un TODO"
          name="description"
          value={todo.description}
          onChange={handleChange}
        />
        <select
          className="form-control mb-2"
          name="state"
          value={todo.state}
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            checked={todo.priority}
            onChange={handleChange}
            name="priority"
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          >
            Dar prioridad
          </label>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default Formulario;