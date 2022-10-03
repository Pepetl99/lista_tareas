import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

function App() {
  // Declaración de los arrays que se necesitan
  const [tareas, setTareas] = React.useState([]); // Array para la lista de tareas completa
  const [tarea, setTarea] = React.useState(""); // Array para cada tarea
  const [editarTarea, setEditarTarea] = React.useState(null); // Array para poder editar una tarea
  const [texto, setTexto] = React.useState(""); // Array para el texto
  const [fecha, setFecha] = React.useState(""); // Array para la fecha

  // Función flecha para convertir la lista de tareas en cadena de texto como JSON
  React.useEffect(() => {
    const json = localStorage.getItem("tareas");
    const loadedTareas = JSON.parse(json);
    if (loadedTareas) {
      setTareas(loadedTareas);
    }
  }, []);

  // Función flecha para ir actualizando la lista de tareas
  React.useEffect(() => {
    const json = JSON.stringify(tareas);
    localStorage.setItem("tareas", json);
  }, [tareas]);

  // Función flecha para agregar la tarea con los datos del formulario
  function agregar(e) {
    e.preventDefault();
    const nuevaTarea = {
      id: new Date().getTime(),
      text: tarea,
      date: fecha,
      completada: false,
    };
    setTareas([...tareas].concat(nuevaTarea));
    setTarea("");
    setFecha("");
  }

  // Función flecha para marcar una tarea como completada
  function tareaCompletada(id) {
    let actualizaTareas = [...tareas].map((tarea) => {
      if (tarea.id === id) {
        tarea.completada = !tarea.completada;
      }
      return tarea;
    });
    setTareas(actualizaTareas);
  }

  // Función flecha para editar una tarea de la lista
  function editar(id) {
    const actualizaTareas = [...tareas].map((tarea) => {
      if (tarea.id === id) {
        tarea.text = texto;
      }
      return tarea;
    });
    setTareas(actualizaTareas);
    setEditarTarea(null);
  }

  // Lo que se muestra en pantalla
  return (
    <div className="App">
      <h1>Bienvenido a tu Lista de Tareas</h1>
      <header className="App-header">
      <div className='container col-6'>
      <br/>
      <div className="container col-6">
        <form onSubmit={agregar}>
          <div className='form-group'>
            <label> Tarea:  </label>
            <input type="text" onChange={(e) => setTarea(e.target.value)} value={tarea} className="form-control"
            placeholder='Ingrese la tarea' required/>
          </div>
          <div className='form-group'>
            <label> Fecha de Inicio:  </label>
            <input type="date" onChange={(e) => setFecha(e.target.value)} value={fecha} className='form-control' 
            required min="2022-10-01"/>
          </div>
          <br/>
          <div className='form-group' align="center">
            <button type="submit" className='btn btn-success'>  Agregar Tarea </button>
          </div>
        </form>
      </div>
        <br/>
        <h3 align="center">  Lista de Tareas:  </h3>
        <ul className='list-group'>
          <li className='list-group-item list-group-item-dark' align="center">
          {tareas.map((tarea) => (
          <div key={tarea.id} className="list-group-item">
              <input type="checkbox" id="completada" checked={tarea.completada} onChange={() => tareaCompletada(tarea.id)}
              className="form-check-input"/>
              {tarea.id === editarTarea ? (
                <input type="text" onChange={(e) => setTexto(e.target.value)} className="form-control"/>
              ) : (
                <div> {tarea.text}  / Fecha:  {tarea.date}  </div>
              )}
              {tarea.id === editarTarea ? (
                <button onClick={() => editar(tarea.id)} className="btn btn-success">  Guardar </button>
              ) : (
                <button onClick={() => setEditarTarea(tarea.id)} className="btn btn-primary">  Editar</button>
              )}
          </div>
        ))}
          </li>
        </ul>
    </div>
      </header>
    </div>
  );
}

export default App;
