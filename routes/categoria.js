// express-promise-router  (para que devuelva promesas desde el middleware
import routerx from "express-promise-router";
import categoriaController from "../controllers/CategoriaControllers";

const router = routerx();
// método post - metodo del controlador al que hacemos referencia
router.post('/add',categoriaController.add);
router.get('/query', categoriaController.query);
router.get('/list',categoriaController.list);
router.put('/update',categoriaController.update);
router.delete('/remove',categoriaController.remove);
router.put('/activate',categoriaController.activate);
router.put('/deactivate',categoriaController.deactivate);


export default router;
