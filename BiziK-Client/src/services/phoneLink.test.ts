import { phoneLink } from "./phoneLink";

test("keeps digits and a leading plus only", () => {
  expect(phoneLink("050-123 4567")).toBe("tel:0501234567");
  expect(phoneLink("+972 (50) 123-4567")).toBe("tel:+972501234567");
});
