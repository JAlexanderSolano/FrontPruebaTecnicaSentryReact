import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Tareas = () => {
    const base_URL = 'https://localhost:44396/api/';
    const [tareas, setTareas] = useState([]);
    const [nombreTarea, setNombreTarea] = useState('');
    const [resultPost, setResultPost] = useState([]);
    const [resultPut, setResultPut] = useState([]);
    useEffect(() => {
        getTareas();
    }, []);

    const guardarTarea = async () => {
        await fetch(base_URL + 'Tareas/GuardarTarea', {
            method: 'POST',
            body: JSON.stringify({
                title: nombreTarea,
                isCompete: 0
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then((response) => response.json())
            .then((json) => setResultPost(json));
        let _result = resultPost[0]['result'];

        if (_result == "Tarea registrada con exito") {
            Swal.fire({
                title: 'Exito',
                text: _result,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            }).then((_result) => {
                if (_result.isDismissed) {
                    setNombreTarea('');
                    getTareas();
                }
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: _result,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            });
            setNombreTarea('');
        }

    }
    const getTareas = () => {
        fetch(base_URL + 'Tareas/ObtenerTareas')
            .then((response) => response.json())
            .then((json) => setTareas(json))
    }

    const envioDatos = (event: any) => {
        event.preventDefault();
        guardarTarea();
    }

    const ActualizarTarea = async (idTarea:any) =>{
        await fetch(base_URL +'Tareas/ActualizarTarea?id='+idTarea, {
            method:'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then((response)=> response.json())
        .then((json)=> setResultPut(json))
        let _result = resultPut[0]['result'];
        if (_result == "Tarea actualizada con exito") {
            Swal.fire({
                title: 'Exito',
                text: _result,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            }).then((_result) => {
                if (_result.isDismissed) {
                    getTareas();
                }
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: _result,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            });
        }


    }

    return (
        <div className="card">
            <div className="card-body">
                <h1 className="text-center text-primary">Listado de tareas</h1>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr className="bg-primary text-light">
                                <th scope="col">Id</th>
                                <th scope="col">Tarea</th>
                                <th scope="col">Completado</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               tareas.map((tarea, id)=>{
                                return(
                                    <tr key={id}>
                                        <td>{tarea.id}</td>
                                        <td>{tarea.title}</td>
                                        <td>{tarea.estado}</td>
                                        <td><button className="btn btn-primary" onClick={ () => ActualizarTarea(tarea.id) }>Accion</button> </td>
                                    </tr>
                                )
                               })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={envioDatos}>
                        <div className="mb-2">
                            <label className="text-primary">Titulo</label>
                            <input type="text" className="form-control" value={nombreTarea}
                                onChange={(e) => setNombreTarea(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <button className="btn btn-primary">Guardar Tarea</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Tareas