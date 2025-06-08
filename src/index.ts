import express ,{Request, Response} from "express";
import path from "path";
import cookieParser from 'cookie-parser';
import ejsLayouts from "express-ejs-layouts";

import home from "./routes/home";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"/client")));
app.use(cookieParser());



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(ejsLayouts); 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("layout", "layout");

app.use(home);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
