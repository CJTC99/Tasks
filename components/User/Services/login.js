const Dal = require("../UserDal");
const { generateJwt, verifyPassword } = require("../../../libs/utils");


const login = async (correo, contraseña) => {
    let response = {};
    let status = 500;
    let Users;

    try {
        
        
        Users = await Dal.query("SELECT * FROM alumno WHERE correo =?", [correo]);
        
    } catch (error) {

        

        response = {

            message: "Ha ocurrido un error :(",
            data: null

        };

        status = 500;
        return {
            status, response
        }
    }
    
    //validar constraseña nueva con la vieja 
    if (Users?.length) {
        console.log("Hoolaaaxd");
        const user = Users[0];
        if (verifyPassword(contraseña, user.contraseña)) {
            response = {
                message: "Usuario identificado",
                data: {
                    id: user.id_alumno,
                    email: user.correo,
                    token: generateJwt({
                        id: user.id_alumno,
                        email: user.correo,

                    }),
                },
            }
            status = 200;
        } else {
            response = {
                message: "Usuario o contraseña incorrecta",
                data: null,
            };
            status = 400;

        };


    } else {
        response = {
            message: "Usuario o contraseña incorrecta.",
            data: null,
        };
        status = 400;

    };

    return {
        status,
        response
    }
};

module.exports = login;



