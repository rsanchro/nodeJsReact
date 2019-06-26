import models from "../models";

// exporta funciones y objetos, clases o expresiones hacia fuera
export default {
  // exporto funciones que van a llevar funciones

  // añade una Articulo,
  add: async (req, res, next) => {
    // primer argumentp = solicitus de http de agregar
    // Res = argument de respuesta
    // Next = devolución de llamada a la función de middleware
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Articulo.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Error al crear un Articulo" // muestro el error con morgan
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    // consulta una Articulo y devuelve esa Articulo como respuesta
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Articulo.findOne({ _id: req.query._id })
      .populate('categoria',{nombre:1}) // sirve para relacionar, 1ºparam modelo, y 2º filtros (que quieres que te traiga); // param id = request_id que recibe de query. utilizamos el findOne de mongoose
      if (!reg) {
        // si no existe el Articulo
        res.status(404).send({
          // 404 not found
          message: "El registro no existe"
        });
      } else {
        res.status(200).send(reg); // si exite devuelves el registro
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al crear una Articulo"
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
      const reg = await models.Articulo.find({$or:[{'nombre': new RegExp(valor,'i')},{'descripcion': new RegExp(valor,'i')}]},{createdAt:0}) // el RegExp sería como el like de sql ( ej: http://localhost:3000/api/Articulo/list?valor=cien)
      .populate('categoria',{nombre:1}) // sirve para relacionar, 1º modelo, y 2º param filtros (que quieres que te traiga)
      .sort({'nombre':1}); // utilizamos el findOne de mongoose, por parámetros puede enviar (el 1º es la busqueda y 2º las que quieres ver) ordenados por nombre de manera descendete con 1 es asc
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al listar Articulos"
        // muestro el error con morgan
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    // modifica
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Articulo.findByIdAndUpdate(
        { _id: req.body._id },
        { categoria: req.body.categoria },
        { codigo: req.body.codigo },
        { nombre: req.body.nombre },
        { descripcion: req.body.descripcion },
        { precio_venta: req.body.precio_venta },
        { stock: req.body.stock },
      ); // 1º busqueda y 2º valores que cambiaras en ese registro
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al actualizar una Articulo"
        // muestro el error con morgan
      });
      next(e);
    }
  },
  // elima en mongo
  remove: async (req, res, next) => {
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Articulo.findByIdAndDelete({
        _id: req.body._id
      }); // utilizamos el findOne de mongoose
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al eliminar un Articulo"
        // muestro el error con morgan
      });
      next(e);
    }
  },

  activate: async (req, res, next) => {
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Articulo.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      ); // utilizamos el findOne de mongoose
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al crear un Articulo"
        // muestro el error con morgan
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    // desactiva Articulos
    try {
      // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
      const reg = await models.Articulo.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      ); // utilizamos el findOne de mongoose
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurio un error al crear un Articulo"
        // muestro el error con morgan
      });
      next(e);
    }
  } // las desactiva
};
