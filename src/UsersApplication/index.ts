import express from 'express';

const app = express();

app.use(express.json());
// app.use("/users", userRouter);
app.listen(process.env.PORT, () => console.log("Server Started"));
