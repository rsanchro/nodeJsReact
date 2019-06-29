import models from '../models';
export default {
  // son los proovedores y clientes
    add: async (req,res,next) =>{
        try {
            const reg = await models.Persona.create(req.body);
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // http://localhost:3000/api/persona/query?_id=5d17910017500604ec6487ee
    query: async (req,res,next) => {
        try {
            const reg=await models.Persona.findOne({_id:req.query._id});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else{
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    // Lista y busca por nombre e imail http://localhost:3000/api/persona/listProveedores?valor=Cor
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Persona.find({$or:[{'nombre':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}]},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    listClientes: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Persona.find({$or:[{'nombre':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}],'tipo_persona':'Cliente'},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    listProveedores: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Persona.find({$or:[{'nombre':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}],'tipo_persona':'Proveedor'},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    // es un PUT cuidadín se le tiene que enviar el _id para indicar a quien quieres modificar
    update: async (req,res,next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},{tipo_persona:req.body.tipo_persona,nombre:req.body.nombre,tipo_documento:req.body.tipo_documento,num_documento:req.body.num_documento,direccion:req.body.direccion,telefono:req.body.telefono,email:req.body.email});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Persona.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}
