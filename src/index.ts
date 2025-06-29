import express from "express";
import path from "path";
import cookieParser from 'cookie-parser';
import ejsLayouts from "express-ejs-layouts";

import home from "./routes/home";
import embedding from "./routes/embeding";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(ejsLayouts); 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("layout", "layout");

app.use("/",home);
app.use("/api/embedding", embedding);

app.listen(port,"0.0.0.0", () => {
  console.log(`Server listening at http://localhost:${port}`);
});
