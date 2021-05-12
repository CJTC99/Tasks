const Dal = require("../TaskDal");

const actualizar = async (nombre, estado_de_entrega, calificacion) => {

    let response = {};
    let status = 500;
    let modficar;

    // Buscar si la tarea a modificar existe
    try {

        modficar = await Dal.query("SELECT nombre FROM tareas WHERE nombre =?", [nombre]);

    } catch (error) {
        response = {

            message: "No se ha podido buscar la tarea :'( ",
            data: null,

        };

        status = 500;
        return {
            status,
            response,
        };
    }
    if (modficar?.length) {

        try {

            const result = await Dal.query("UPDATE tareas SET nombre=?, estado_de_entrega=?, calificacion=? WHERE nombre=?",
                [nombre, estado_de_entrega, calificacion, nombre]);

            response = {

                message: `La tarea ${nombre} fue actualizada OwO :3 `,
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

            message: "Esta tarea esta actualizada! UnU",
            data: null,

        };

        status = 400;
    }

    return {

        status,
        response,
    }
};

module.exports = actualizar;