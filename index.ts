import express from "express";
import http from "node:http";
import path from "node:path";
import { ExegesisContext, middleware } from "exegesis-express";

const app = express();

app.use(
  "/root",
  await middleware(path.resolve("./openapi.yaml"), {
    controllers: {
      rootController: {
        getRoot: (ctx: ExegesisContext) => {
          ctx.res.json({
            reqUrl: ctx.req.url,
            // Servers should be populated
            servers: ctx.api.openApiDoc.servers,
            // serverObject maybe undefined now that I think about it
            // Given that ctx.req.url is /
            serverObject: ctx.api.serverObject,
          });
        },
      },
    },
  })
);

const server = http.createServer(app);

server.listen(3000, () => console.log(`Server Listening`));
