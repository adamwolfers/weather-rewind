import { createServer } from "node:http";

export const server = createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write(
    "<h1>Weather Rewind</h1>" +
    "<p>Explore weather data from the past, by:</p>" +
    "<ul><li>Location</li><li>Date</li></ul>"
  );
  response.end();
});
