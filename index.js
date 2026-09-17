import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Weather Rewind");
  res.write("\n");
  res.write("Weather Rewind");
  res.end();
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
