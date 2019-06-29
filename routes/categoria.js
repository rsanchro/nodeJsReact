// express-promise-router  (para que devuelva promesas desde el middleware
import routerx from "express-promise-router";
import categoriaController from "../controllers/CategoriaController";
// restringimos para que solo puedan utilizar los categorías los almaceneros
import auth from "../middlewares/auth";


// En la funcion verifyAlmacenerotenemos puesto qeu tanto un admin como un Alamcenera puedan utilizar estas rutas

const router = routerx();
// método post - metodo del controlador al que hacemos referencia
router.post('/add',auth.verifyAlmacenero, categoriaController.add);
router.get('/query', auth.verifyAlmacenero, categoriaController.query);
router.get('/list', auth.verifyAlmacenero, categoriaController.list);
router.put('/update', auth.verifyAlmacenero, categoriaController.update);
router.delete('/remove', auth.verifyAlmacenero, categoriaController.remove);
router.put('/activate', auth.verifyAlmacenero, categoriaController.activate);
router.put('/deactivate', auth.verifyAlmacenero, categoriaController.deactivate);

export default router;