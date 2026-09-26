import { createServer } from "node:http";

export const server = createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write(
    "<h1>Weather Rewind</h1>" +
    "<p>Explore weather data from the past, by location and date.</p>" +
    "<p>Foo</p>" +
    "<p>Bar</p>" +
    "<p>Baz</p>"
  );
  response.end();
});
