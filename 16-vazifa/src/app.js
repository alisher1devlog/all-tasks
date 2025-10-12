import expres from "express"
import morgan from "morgan";
import authrouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import boardRouter from "./routes/board.routes.js";
import taskRouter from "./routes/task.routes.js";
import columnRouter from "./routes/column.routes.js";

const app = expres();

app.use(expres.json());
app.use(morgan("tiny"));

app.use("/", authrouter);
app.use("/", userRouter);
app.use("/",boardRouter)
app.use("/",taskRouter);
app.use("/",columnRouter)

export  {app} ;