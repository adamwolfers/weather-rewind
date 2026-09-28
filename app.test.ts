import { test, after } from "node:test";
import assert from "node:assert/strict";
import { server } from "./app.ts";

server.listen(0);
after(() => server.close());

test("serves the homepage", async () => {
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const { port } = address;
  const response = await fetch(`http://localhost:${port}/`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /charset=utf-8/);
  assert.match(await response.text(), /Weather Rewind/);
});
