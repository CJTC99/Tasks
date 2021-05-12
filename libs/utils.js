const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const utils = {
    /**
     * Encriptrar contraseñas :c
     * @param {string} password encripta la contraseña
     * @returns {string} regresa la contraseña encriptada
     */
    hashPassword: (password) =>
        bcrypt.hashSync(password, parseInt(process.env.COST_FACTOR)),

    /**
     * Genera un nuevo Jwt
     * @param {object} data
     * @returns {string} JWT
     */
    generateJwt: (data) =>
        jwt.sign(data, process.env.JWT_PASSWORD, { expiresIn: "7d" }),


    /**
* Esta función verifica que las contraseñas coincidan
* @param {string} password Contraseña sin encriptar
* @param {string} encryptedPassword Contraseña encriptada
* @returns {boolean} True = si la comparación es correcta
*/
    verifyPassword: (password, encryptedPassword) =>
        bcrypt.compareSync(password, encryptedPassword),

    /**
      * Verifica que el token sea valido
      * @param {string} token Web Token
      * @returns JWT desencriptado o un error que se debe catchear
      */
    verifyJwt: (token) =>
        jwt.verify(token, process.env.JWT_PASSWORD)

};



module.exports = utils;
