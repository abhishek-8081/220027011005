import { Log } from "./logger";

(async () => {
  await Log("backend", "error", "handler", "received string, expected bool");
})();
