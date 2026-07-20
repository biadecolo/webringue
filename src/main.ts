import * as BunnySDK from "@bunny.net/edgescript-sdk";
import type { OriginRequestContext } from "@bunny.net/edgescript-sdk";
import { app } from "./app";

const ORIGIN = "https://webringue.b-cdn.net/";

const onOriginRequest = async (ctx: OriginRequestContext) => {
  const res = await app.fetch(ctx.request);
  if (res.status === 404) return ctx.request;
  return res;
};

BunnySDK.net.http
  .servePullZone({ url: ORIGIN })
  .onOriginRequest(
    onOriginRequest as (ctx: OriginRequestContext) => Promise<Response>,
  );
