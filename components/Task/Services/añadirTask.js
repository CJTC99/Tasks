const Dal = require("../TaskDal");


const agregar = async (nombre, estado_de_entrega, calificacion) => {
    let response = {};
    let status = 500;
    let duplicateTask = null;

    //  Busca si no hay tareas respetidas
    try {
        duplicateTask = await Dal.query("SELECT nombre FROM tareas WHERE nombre = ?", [nombre]);
    } catch (error) {
        response = {
            message: "Error al momento de agregar tarea",
            data: null,
        };
        status = 500;
        return {
            status, response
        }
    }

    //  En caso de no existir, insertara la tarea a la base de datos.
    if (duplicateTask?.length === 0) {
        try {
            const result = await Dal.query("INSERT INTO tareas (nombre, estado_de_entrega, calificacion) VALUES (?, ?, ?)",
                [nombre, estado_de_entrega, calificacion]);
            response = {
                message: "La tarea ha sido registrada exitosamente :D",
                data: {
                    no_tareas: result.insertId,
                    nombre: nombre,
                    estado_de_entrega: estado_de_entrega,
                    calificacion: calificacion,
                    
                }
            };
            status = 200;
        } catch (error) {
            response = {
                message: error.message,
                data: null,
            };
            status = 500;
        }
    } else {
        response = {
            message: `La tarea ${nombre} ya está registrada :(.`,
            data: null,
        };
        status = 400;
    }
    return {
        status, response,
    };
};
module.exports = agregar;