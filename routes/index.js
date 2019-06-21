import routerx from 'express-promise-router';
import categoriaRouter from './categoria';

const router=routerx();

// cuando se haga referencia a la url de abajo, que este controle/gestione las rutas con el archivo categoriasjs
router.use('/categoria',categoriaRouter);
export default router;