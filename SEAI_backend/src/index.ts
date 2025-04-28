import express,{Express} from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Airesponserouter from "./routes/Airesponseroute";




dotenv.config();

const app: Express = express();
const port=3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: `${process.env.FRONTENDURL}`,
}));




  app.use(Airesponserouter);

app.listen(port, () => {
});

