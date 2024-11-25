import express from "express";
import path from "path";
import cron from "node-cron";
import { sendBirthdayEmails } from "./cron-jobs/sendBirthdayEmails.js";

const app = express();

app.use("/build", express.static(path.join(process.cwd(), "build", "server")));

cron.schedule("* * * * *", async () => {
  await sendBirthdayEmails();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
