import models from '../models';



// exporta funciones y objetos, clases o expresiones hacia fuera
export default {
    // exporto funciones que van a llevar funciones

    // añade una categoria,
    add: async(req,res,next) =>{
        // primer argumentp = solicitus de http de agregar
        // Res = argument de respuesta
        // Next = devolución de llamada a la función de middleware
        try {
           // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
           const reg = await models.Categoria.create(req.body);
           res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message:'Error al crear una categoria'
                // muestro el error con morgan
            });
            next(e);
        }
    },  
    query: async(req,res,next) =>{ // consulta una categoria y devuelve esa categoria como respuesta
        try {
            // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
            const reg = await models.Categoria.findOne({_id:req.query._id}); // param id = request_id que recibe de query. utilizamos el findOne de mongoose (asíq ue el objeto busca el documento con la id que recibrd en la query por el id)
            if (!reg){  // si no existe la categoria 
                res.status(404).send({ // 404 not found
                    message:'El registro no existe'                    
                })
            }else{
                res.status(200).send(reg); // si exite devuelves el registro
            }
         } catch (e) {
             res.status(500).send({
                 message:'Ocurio un error al crear una categoria'
                 // muestro el error con morgan
             });
             next(e);
         }      
    },
    list:async(req,res,next) =>{
         // lista     
         try {
            // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
            const reg = await models.Categoria.find({}); // utilizamos el findOne de mongoose
            res.status(200).json(reg);
         } catch (e) {
             res.status(500).send({
                 message:'Ocurio un error al listar categorias'
                 // muestro el error con morgan
             });
             next(e);
         }      
    },
    update:async(req,res,next) =>{ // modifica
        try {
            // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre}, {descripcion: req.body.descripcion}); // 1º busqueda y 2º valores que cambiaras en ese registro
            res.status(200).json(reg);
         } catch (e) {
             res.status(500).send({
                 message:'Ocurio un error al actualizar una categoria'
                 // muestro el error con morgan
             });
             next(e);
         }      
    },    
    // elima en mongo 
    remove:async(req,res,next) =>{ 
        try {
            // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id}); // utilizamos el findOne de mongoose
            res.status(200).json(reg);
         } catch (e) {
             res.status(500).send({
                 message:'Ocurio un error al eliminar una categoria'
                 // muestro el error con morgan
             });
             next(e);
         }        
    },
    
    activate:async(req,res,next) =>{
        try {
            // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:1}); // utilizamos el findOne de mongoose
            res.status(200).json(reg);
         } catch (e) {
             res.status(500).send({
                 message:'Ocurio un error al crear una categoria'
                 // muestro el error con morgan
             });
             next(e);
         }        
    }, 
    deactivate:async(req,res,next) =>{ // desactiva categorias
        try {
            // create es una funcion de mongoose que envía una petición por por el body para almacenar ese objeto como un documento en la cateoria
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:0}); // utilizamos el findOne de mongoose
            res.status(200).json(reg);
        } catch (e) {
             res.status(500).send({
                 message:'Ocurio un error al crear una categoria'
                 // muestro el error con morgan
             });
             next(e);
        }   
    } // las desactiva 
}