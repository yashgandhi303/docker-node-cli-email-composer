import express from "express";
import http from "http";
import cors from "cors";
import apolloServer from "./graphql";

var port = process.env.PORT || "4000";
const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = http.createServer(app);

apolloServer.applyMiddleware({ app, path: "/graphql" });
apolloServer.installSubscriptionHandlers(server);

server.listen(port, () => console.log("Server started!"));
server.on("error", (err) => console.error(err));
server.on("listening", () => {
  console.log(`listening to server on port" ${port}`);
});
