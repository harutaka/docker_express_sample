import { describe, expect, test } from "vitest";
import { createToken } from "../src/libs/utils.js";

describe("createToken", () => {
  test("10桁", () => {
    expect(createToken(10)).toMatch(/[a-zA-Z0-9]{10}/);
  });

  test("5桁", () => {
    expect(createToken(5)).toMatch(/[a-zA-Z0-9]{5}/);
  });

  test("桁指定なし", () => {
    expect(createToken()).toMatch(/[a-zA-Z0-9]{10}/);
  });
});
