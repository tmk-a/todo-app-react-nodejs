import { app } from "./app";
import { ENV, PORT } from "./env";
import {
  connectToMongoose,
  disconnectToMongoose,
} from "./database/mongooseClient";

app.listen(PORT, async () => {
  console.log(`[server]: listening at http://localhost:${PORT} in ${ENV} mode`);
  try {
    await connectToMongoose();
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
});

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await disconnectToMongoose();
  process.exit(0);
});
