import Express from "express";
import bodyParser from "body-parser";
import { startConnection } from "./src/mongo/index.mjs";
import FiltersRouter from "./src/handlers/filters/index.mjs";
import Boom from "@hapi/boom";
import { PORT } from "./src/commons/env.mjs";
import multer from "multer"; 

const app = Express();
app.use(bodyParser.json());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("OK");
});


app.post("/images", upload.single("file"), (req, res) => {
 
  res.send("Archivo cargado correctamente");
});

app.use("/images", FiltersRouter);

app.use((error, req, res, next) => {
  if (error) {
    let err = Boom.isBoom(error) ? error : Boom.internal(error);
    const statusCode = err.output.statusCode;
    const payload = err.output.payload;
    return res.status(statusCode).json(payload);
  }

  return next;
});

const startServer = async () => {
  await startConnection();
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

startServer();
