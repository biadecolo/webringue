import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { app } from "./app";

app.get("/", serveStatic({ path: "./webringue.html" }));

app.use("/assets/*", serveStatic({ root: "./" }));

const port = Number(process.env.PORT) || 3000;

serve({ fetch: app.fetch, port }, ({ port }) => {
  console.log(`webringue rodando em http://localhost:${port}`);
});
