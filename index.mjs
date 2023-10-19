import Express from 'express';
import bodyParser from 'body-parser';
import Boom from '@hapi/boom';
// Tareas
import { startConnection } from './src/mongo/index.mjs';
import FiltersRouter from './src/handlers/filters/index.mjs';
import { PORT } from './src/commons/env.mjs';
import buildContainer from './src/container/buildContainer.mjs';

const app = Express();

app.use(bodyParser.json());
//
app.use(buildContainer);

// const upload = multer({ dest: "uploads/" }); // Define la carga de archivos en la carpeta

// Se borro const PORT = 3000;
app.get('/', (req, res) => {
  res.send('OK');
});

// Endpoint POST para recibir form data con files[] y filters

app.use('/images', FiltersRouter);

app.use((error, req, res, next) => {
  if (error) {
    const err = Boom.isBoom(error) ? error : Boom.internal(error);
    const { statusCode } = err.output;
    const { payload } = err.output;
    const response = { ...payload, stack: err.stack };
    return res.status(statusCode).json(response);
  }

  return next();
});

const startServer = async () => {
  await startConnection();

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

startServer();
