// index.ts
import express from "express";
import bodyParser from "body-parser";
import urlRoutes from "./routes/urlRoutes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
