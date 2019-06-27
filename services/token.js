import jwt from 'jsonwebtoken';
import models from '../models'; // referencia al index con todos los modelos

// compruebo que el token que tiene el cliente es antiguo y puedo generar un token nuevo para validar al usuario
async function checkToken(token){
    let __id = null;

    try{
        const {_id} = await jwt.decode(token); // obtengo el id del token del cliente
        __id = _id;
    }catch(e){
        return false;
    }
    const user = await models.Usuario.findOne({_id:__id, estado:1});
    if (user){
        const token = jwt.sign({id:__id}, '!clavesecretamuyloca!#parageneralmitoken',{expiresIn: '1h'});
        return {token, rol:user.rol};
    }else{ // si el usuario no existe
        return false;
    }

}

export default{
    // genero el token con el id del user
    encode: async (_id) =>{
        const token = jwt.sign({_id:_id}, '!clavesecretamuyloca!#paragenerareltoken',{expiresIn: '1d'}); // 1º param, id recibido, 2º clave secreta apra generar el token, 3º tiempo de duracion del token
        return token;
    },
    // determina si el token es correcto
    decode: async (token) =>{
        try{
            // obtengo solo la propiedad _id del objeto completo
            const {_id} = await jwt.verify(token,'!clavesecretamuyloca!#paragenerareltoken');
            const user = await models.Usuario.findOne({_id, estado:1}); // buscamos  ese id y si está activo
            if (user){
                return user;
            }else{
                return false;
            }
        }catch(e){
            // en caso de eeror al decodificar, es posible que el token ya expirara y le devuelvo el token que estás recibiendo
            const newToken = await checkToken(token); // envía el token que recibes del cliente para chequear
            return newToken;
        }
    }
}