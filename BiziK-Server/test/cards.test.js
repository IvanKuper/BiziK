const test = require("node:test");
const assert = require("node:assert");

process.env.secretKey = "test-secret";
const { Card } = require("../models/Card");
const jwt = require("jsonwebtoken");

let selected;
Card.find = () => ({
  select: (fields) => {
    selected = fields;
    return Promise.resolve([{ business_name: "Cafe" }]);
  },
});
const app = require("../server");
let server, base;

test.before(async () => {
  await new Promise((r) => (server = app.listen(0, r)));
  base = `http://127.0.0.1:${server.address().port}/api/cards`;
});
test.after(() => server.close());

test("GET /api/cards is public and hides the owner id", async () => {
  const res = await fetch(base);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), [{ business_name: "Cafe" }]);
  assert.match(selected, /-user_id/);
});

test("creating, reading my cards and deleting still need a token", async () => {
  for (const [method, path] of [
    ["POST", ""],
    ["GET", "/my-cards"],
    ["DELETE", "/abc"],
  ]) {
    const res = await fetch(base + path, { method });
    assert.equal(res.status, 401, `${method} ${path}`);
  }
});

test("a regular (non-business) account cannot create a card", async () => {
  const token = jwt.sign({ _id: "u1", biz: false }, process.env.secretKey);
  const res = await fetch(base, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: "{}",
  });
  assert.equal(res.status, 403);
});

test("GET /api/health answers without a token and reports the database state", async () => {
  const res = await fetch(base.replace("/cards", "/health"));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, db: false });
});
