import express from "express";
import compression from "compression";
import morgan from "morgan";
import cron from "node-cron";
import { sendBirthdayEmails } from "./cron-jobs/sendBirthdayEmails.js";

const BUILD_PATH = "./build/server/index.js";
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression());
app.disable("x-powered-by");

if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer = await import("vite").then(vite => 
    vite.createServer({
      server: {middlewareMode: true},
    })
  )
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts");
      return await source.app(req, res, next);
    }catch(error) {
      if(typeof error === 'object' && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  })
} else {
  console.log("Starting  production server");
  app.use("/assets", express.static("./build/client/assets", { immutable: true, maxAge: "1y" }));
  app.use(express.static("./build/client", { maxAge: "1h"}));
  app.use(await import(BUILD_PATH).then(module => module.app));
}

app.use(morgan("tiny"));

cron.schedule("* * * * *", async () => {
  await sendBirthdayEmails();
});


app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
