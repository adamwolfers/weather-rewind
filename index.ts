import { server } from "./app.ts";

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
