import { describe, test, expect } from "@jest/globals";
import { add } from "../../utils/add.js";
describe("add", () => {
    test("should return the sum of two numbers", () => {
        expect(add(1,2)).toBe(3);
    });
    test("should return the sum of negative numbers", () => {
        expect(add(-1,-2)).toBe(-3);
    });
});