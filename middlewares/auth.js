import tokenService from '../services/token';

export default{
    // Verifica que un usuario esté logueado correctamente (da igual que rol tenga)
    // El back genera el token y esa revisión pasa por el middleware (si existe el token evalua si está ok)
    verifyUsuario: async (req, res,next) => {
        if (!req.headers.token){ // si no existe el token
            return res.status(404).send({
               message: 'No token'
            });
        }
        // reviso si el token es válido
        const response=await tokenService.decode(req.headers.token); // la respuesta me da el usuario con todas sus propiedades
        if (response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero'){
            next();
        }else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    // verifica solo usuarios adminis
    verifyAdministrador: async (req, res,next) => {
        if (!req.headers.token){ // si no existe el token
            return res.status(404).send({
               message: 'No token'
            });
        }
        // reviso si el token es válido
        const response = await tokenService.decode(req.headers.token); // la respuesta me da el usuario con todas sus propiedades
        console.log(response)
        if (response.rol == 'Administrador'){
            next();
        }else{
            return res.status(403).send({
                message: 'No autorizado No party'
            });
        }
    },
    verifyAlmacenero: async (req, res,next) => {
        if (!req.headers.token){ // si no existe el token
            return res.status(404).send({
               message: 'No token'
            });
        }
        // reviso si el token es válido
        const response=await tokenService.decode(req.headers.token); // la respuesta me da el usuario con todas sus propiedades
        if (response.rol == 'Almacenero' || response.rol == 'Administrador'){
            next();
        }else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },
    verifyVendedor: async (req, res,next) => {
        if (!req.headers.token){ // si no existe el token
            return res.status(404).send({
               message: 'No token'
            });
        }
        // reviso si el token es válido
        const response=await tokenService.decode(req.headers.token); // la respuesta me da el usuario con todas sus propiedades
        if (response.rol == 'Vendedor' || response.rol == 'Administrador'){
            next();
        }else{
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    }
}