import type { ListenOptions } from "net";
import { initializeApp, httpServer, log } from "./app";

(async () => {
  const app = await initializeApp();

  // Setup Vite in development
  if (process.env.NODE_ENV !== "production") {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5001 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5001", 10);
  const startServer = (allowReusePort: boolean) => {
    const listenOptions: ListenOptions & { reusePort?: boolean } = {
      port,
      host: "0.0.0.0",
    };

    if (allowReusePort) {
      listenOptions.reusePort = true;
    }

    const handleError = (err: NodeJS.ErrnoException) => {
      if (err.code === "ENOTSUP" && allowReusePort) {
        log("Port reuse unsupported; retrying without reusePort");
        startServer(false);
        return;
      }

      throw err;
    };

    httpServer.once("error", handleError);
    httpServer.listen(listenOptions, () => {
      httpServer.off("error", handleError);
      log(`serving on port ${port}`);
    });
  };

  startServer(true);
})();
