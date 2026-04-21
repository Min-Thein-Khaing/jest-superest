import { describe, test, expect } from "@jest/globals";
import {  isValidatorEmail } from "../../utils/validator.js";

describe("isValidatorEmail", () => {
    test("should return false for non-string input", () => {
        expect(isValidatorEmail(123 as any)).toBe(false);
        expect(isValidatorEmail(null as any)).toBe(false);
        expect(isValidatorEmail(undefined as any)).toBe(false);
        expect(isValidatorEmail("invalid-email")).toBe(false);
    });
    test("should return true for valid email", () => {
        expect(isValidatorEmail("test@example.com")).toBe(true);
    });
    
});


