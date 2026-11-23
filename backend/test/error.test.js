import assert from "assert";
import test from "node:test";
import { errorMiddleware } from "../middlewares/error.js";
import { cookieOptions } from "../utils/cookieOptions.js";

const run = (err) => {
  const out = {};
  const res = {
    status(code) {
      out.status = code;
      return this;
    },
    json(body) {
      out.body = body;
      return this;
    },
  };
  errorMiddleware(err, {}, res, () => {});
  return out;
};

test("duplicate keys return 400 instead of crashing", () => {
  const out = run({ code: 11000, keyValue: { email: "x" } });
  assert.strictEqual(out.status, 400);
  assert.match(out.body.message, /Duplicate email/);
});

test("invalid ids return 400 instead of crashing", () => {
  const out = run({ name: "CastError", path: "_id" });
  assert.strictEqual(out.status, 400);
  assert.match(out.body.message, /Invalid _id/);
});

test("cross-site cookies are secure only when enabled", () => {
  delete process.env.COOKIE_CROSS_SITE;
  assert.strictEqual(cookieOptions().secure, false);
  process.env.COOKIE_CROSS_SITE = "true";
  assert.deepStrictEqual(
    [cookieOptions().secure, cookieOptions().sameSite],
    [true, "none"]
  );
  delete process.env.COOKIE_CROSS_SITE;
});
