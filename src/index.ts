import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import friends from "../amigues.json" with { type: "json" };

const app = new Hono();

app.get("/", serveStatic({ path: "./webringue.html" }));

app.use("/assets/*", serveStatic({ root: "./" }));

app.get("/:name/proximo", (ctx) => {
  const i = friends.findIndex((x) => x.name === ctx.req.param("name"));
  if (i === -1) return ctx.notFound();
  return ctx.redirect(friends[(i + 1) % friends.length].url);
});

app.get("/:name/anterior", (ctx) => {
  const i = friends.findIndex((x) => x.name === ctx.req.param("name"));
  if (i === -1) return ctx.notFound();
  return ctx.redirect(friends[(i - 1 + friends.length) % friends.length].url);
});

app.get("/:name/aleatorio", (ctx) => {
  const i = friends.findIndex((x) => x.name === ctx.req.param("name"));
  if (i === -1) return ctx.notFound();
  const others = friends.filter((_, index) => index !== i);
  const target =
    others[Math.floor(Math.random() * others.length)] || friends[i];
  return ctx.redirect(target.url);
});

const port = Number(process.env.PORT) || 3000;

serve({ fetch: app.fetch, port }, ({ port }) => {
  console.log(`webringue rodando em http://localhost:${port}`);
});
