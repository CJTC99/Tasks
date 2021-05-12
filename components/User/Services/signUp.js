const Dal = require("../UserDal");
const {hashPassword, generateJwt} = require("../../../libs/utils");

const signUp = async(nombre,correo,contraseña,no_tareas) =>{
    let response = {};
    let status = 500;
    let duplicateUser = null;

    /**
     * Buscar si el usuario ya esta registrado T n T
     */
    try {

        duplicateUser = await Dal.query("SELECT correo FROM alumno WHERE correo =?", [correo]);

    } catch (error) {

        response = {

            message: "No es posible registrar al usuario", 
            data: null,

        };

        status = 500;
        return{
            status, response
        }
        
    }

    /**
     * Inserción de usuario en caso de que no esta en la base de datos :'v
     */
    if (duplicateUser?.length=== 0) {

        try {

            const result = await Dal.query("INSERT INTO alumno (nombre,correo,contraseña,no_tareas) VALUES (?,?,?,?)",
             [nombre,correo,hashPassword(contraseña),no_tareas]);
             response = {

                 message: "Felicidades, registro completado :)",

                 data: {

                     id_alumno: result.insertId,
                     nombre: nombre,
                     correo: correo,
                     no_tareas: no_tareas,

                     token: generateJwt({
                        id_alumno: result.insertId,
                        correo: correo,

                     }),

                 },
             };
             status = 200;

        } catch (error) {
            
            response = {
                message:  error.message,
                data: null,

            };
            status = 500;
        }
        
        
    }else{

        response = {
            message: `El correo de:  ${correo} ya esta en uso :c `,
            data: null,

        };

        status = 400;
    }
    return{
        status, 
        response,
    };


};

module.exports = signUp;

