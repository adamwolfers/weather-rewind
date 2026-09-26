import { test, after } from "node:test";
import assert from "node:assert/strict";
import { server } from "./app.js";

server.listen(0);
after(() => server.close());

test("serves the homepage", async () => {
  const { port } = server.address();
  const response = await fetch(`http://localhost:${port}/`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /charset=utf-8/);
  assert.match(await response.text(), /Weather Rewind/);
});
