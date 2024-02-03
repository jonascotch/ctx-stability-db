import express from 'express'
import cors from 'cors'
import { router as medicineRouter } from './routes/medicineRouter.js'

import config from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`)
);

app.use('/api/v1/medicines', medicineRouter)

app.get("/", (req, res) => {
  res.json({message: "Hello!"});
});
