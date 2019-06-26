import models from "../models";
// Utilizo el modulo de npm bcryptjs para encriptar la contraseña que añadan
import bcrypt from 'bcryptjs';
// exporta funciones y objetos, clases o expresiones hacia fuera
export default {
  // exporto funciones que van a llevar funciones

  // añade un Usuario,
  add: async (req, res, next) => {
    // primer argumentp = solicitus de http de agregar
    // Res = argument de respuesta
    // Next = devolución de llamada a la función de middleware
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      req.body.password = await bcrypt.hash(req.body.password,10);
      const reg = await models.Usuario.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Error al crear una Usuario"
        // muestro el error con morgan
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    // consulta un Usuario y devuelve ese Usuario como respuesta
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Usuario.findOne({ '_id': req.query._id }); // param id = request_id que recibe de query. utilizamos el findOne de mongoose (asíq ue el objeto busca el documento con la id que recibrd en la query por el id)
      if (!reg) {
        // si no existe el Usuario
        res.status(404).send({
          // 404 not found
          message: "El registro no existe"
        });
      } else {
        res.status(200).send(reg); // si exite devuelves el registro
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al crear una Usuario"
        // muestro el error con morgan
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    // lista
    try {
      let valor = req.query.valor; // filtros de búsquedas ( ordenando con sort y ocultando los datos que no queires que te traiga como el createdAt)
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria (busca en la propiedad nombre pero si no lo encuentra busca en la descripcion)
      const reg = await models.Usuario.find({$or:[{'nombre': new RegExp(valor,'i')},{'email': new RegExp(valor,'i')}]},{createdAt:0}) // el RegExp sería como el like de sql ( ej: http://localhost:3000/api/Usuario/list?valor=cien)
      .sort({'nombre':1}); // utilizamos el findOne de mongoose, por parámetros puede enviar (el 1º es la busqueda y 2º las que quieres ver) ordenados por nombre de manera descendete con 1 es asc
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al listar Usuarios"
        // muestro el error con morgan
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    // modifica
    try {
      let pas = req.body.password;
      // si el usuario tiene menos de 64caractreres es que ha cambiado al contraseña, porque un pass encriptado tiene 64caracteres
      if (pas.length<64) {
        req.body.password = await bcrypt.hash(req.body.password,10);
      }
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        { rol: req.body.rol },
        { nombre: req.body.nombre },
        { tipo_documento: req.body.tipo_documento },
        { num_documento: req.body.num_documento },
        { direccion: req.body.direccion },
        { telefono: req.body.telefono },
        { email: req.body.email },
        { password: req.body.password }
      ); // 1º busqueda y 2º valores que cambiaras en ese registro
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al actualizar una Usuario"
        // muestro el error con morgan
      });
      next(e);
    }
  },
  // elima en mongo
  remove: async (req, res, next) => {
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Usuario.findByIdAndDelete({
        _id: req.body._id
      }); // utilizamos el findOne de mongoose
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al eliminar una Usuario"
        // muestro el error con morgan
      });
      next(e);
    }
  },

  activate: async (req, res, next) => {
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      ); // utilizamos el findOne de mongoose
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al crear una Usuario"
        // muestro el error con morgan
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    // desactiva Usuarios
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      ); // utilizamos el findOne de mongoose
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al crear una Usuario"
        // muestro el error con morgan
      });
      next(e);
    }
  }, // las desactiva
  login: async (req,res,next) =>{
    try {
      let user = await models.Usuario.findOne({email:req.body.email});
      if (user){ // si existe un usuaro con ese email verifico contraseña correcta
        let match = await bcrypt.compare(req.body.password, user.password); // comprar contraseñas, si true = ok
        if (match){
           res.json('Password correcto');
        }else{
          res.status(404).send({
            message:'PAssword incorrecto'
          });
        }
      }else{
        req.status(404).send({
          message: 'No existe el usuario'
        })
      }
    } catch (e) {
    
    }
  }
};
