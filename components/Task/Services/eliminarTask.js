const Dal = require("../TaskDal");

const eliminar = async(nombre) =>{

    let response = {};
    let status = 500;

    let quitar;

    // Buscar si la tarea a eliminar existe 
    try {

        quitar = await Dal.query("SELECT nombre FROM tareas WHERE nombre=?", [nombre]);

    } catch (error) {
        
        response = {

            message: "No se ha podido eliminar la tarea :'c",
            data: null,

        };

        status = 500;
        return{
            status,
            response
        };

    }

    //En caso de que la tarea existe
    if (eliminar?.length) {

        try {

            const result = await Dal.query("DELETE FROM tareas WHERE nombre=?", [nombre]);
            response = {

                message: `La tarea ${nombre} fue eliminda XD`,
                data: null,
            };

            status = 200;
            
        } catch (error) {
            response = {

                message: error.message,
                data: null,

            };
            status = 500;

        }
        
    }else{
        response = {

            message: `La tarea ${nombre} no existe :'(`,
            data: null,

        };

        status = 400;

    }
    return{
        status,
        response
    };

};

module.exports = eliminar;