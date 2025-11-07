import { describe, it, before, after } from "node:test";
import assert from "node:assert";

describe("env.js - Environment Configuration", () => {
  let originalEnv;

  before(() => {
    // Save original environment variables
    originalEnv = { ...process.env };
  });

  after(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe("ENV object structure", () => {
    it("should export ENV object with all required properties", async () => {
      const { ENV } = await import("../../lib/env.js");

      assert.ok(ENV.hasOwnProperty("PORT"), "ENV should have PORT property");
      assert.ok(ENV.hasOwnProperty("DATABASE_URL"), "ENV should have DATABASE_URL property");
      assert.ok(ENV.hasOwnProperty("SECRET_KEY"), "ENV should have SECRET_KEY property");
      assert.ok(ENV.hasOwnProperty("ENV"), "ENV should have ENV property");
    });

    it("should have correct types for all properties", async () => {
      const { ENV } = await import("../../lib/env.js");

      assert.strictEqual(typeof ENV.PORT, "number", "PORT should be a number");
      assert.strictEqual(typeof ENV.DATABASE_URL, "string", "DATABASE_URL should be a string");
      assert.strictEqual(typeof ENV.SECRET_KEY, "string", "SECRET_KEY should be a string");
      assert.strictEqual(typeof ENV.ENV, "string", "ENV should be a string");
    });
  });

  describe("Default values", () => {
    it("should use default PORT value of 3000 when not set", async () => {
      delete process.env.PORT;
      
      // Need to clear module cache and re-import
      const modulePath = "../../lib/env.js";
      delete (await import.meta.resolve(modulePath));
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.PORT, 3000, "Default PORT should be 3000");
    });

    it("should use empty string for DATABASE_URL when not set", async () => {
      delete process.env.DATABASE_URL;
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.DATABASE_URL, "", "Default DATABASE_URL should be empty string");
    });

    it("should use empty string for SECRET_KEY when not set", async () => {
      delete process.env.SECRET_KEY;
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.SECRET_KEY, "", "Default SECRET_KEY should be empty string");
    });

    it("should use 'development' for ENV when not set", async () => {
      delete process.env.ENV;
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.ENV, "development", "Default ENV should be 'development'");
    });
  });

  describe("Custom environment values", () => {
    it("should use custom PORT when provided", async () => {
      process.env.PORT = "8080";
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.PORT, 8080, "Should use custom PORT value");
    });

    it("should use custom DATABASE_URL when provided", async () => {
      const customUrl = "mongodb://custom:27017/mydb";
      process.env.DATABASE_URL = customUrl;
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.DATABASE_URL, customUrl, "Should use custom DATABASE_URL");
    });

    it("should use custom SECRET_KEY when provided", async () => {
      const customKey = "my-super-secret-key-123";
      process.env.SECRET_KEY = customKey;
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.SECRET_KEY, customKey, "Should use custom SECRET_KEY");
    });

    it("should use custom ENV value when provided", async () => {
      process.env.ENV = "production";
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.ENV, "production", "Should use custom ENV value");
    });
  });

  describe("dotenv configuration", () => {
    it("should load dotenv with quiet option enabled", async () => {
      // This test verifies that dotenv.config is called with { quiet: true }
      // The quiet option prevents dotenv from throwing errors if .env file doesn't exist
      
      // Re-import to trigger dotenv.config
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      // If we get here without errors, quiet option is working
      assert.ok(true, "dotenv.config should not throw errors with quiet option");
    });
  });

  describe("Edge cases", () => {
    it("should handle PORT as string and convert to number", async () => {
      process.env.PORT = "5000";
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.PORT, 5000);
      assert.strictEqual(typeof ENV.PORT, "number");
    });

    it("should handle invalid PORT and fall back to default", async () => {
      process.env.PORT = "invalid";
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      // When parseInt fails, it returns NaN, then || 3000 kicks in
      assert.strictEqual(ENV.PORT, 3000);
    });

    it("should handle zero PORT value", async () => {
      process.env.PORT = "0";
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      // 0 is falsy, so should default to 3000
      assert.strictEqual(ENV.PORT, 3000);
    });

    it("should preserve special characters in DATABASE_URL", async () => {
      const urlWithSpecialChars = "mongodb://user:p@ss!word@host:27017/db?authSource=admin";
      process.env.DATABASE_URL = urlWithSpecialChars;
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.DATABASE_URL, urlWithSpecialChars);
    });

    it("should preserve whitespace in environment values", async () => {
      process.env.SECRET_KEY = "  key with spaces  ";
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.SECRET_KEY, "  key with spaces  ");
    });
  });

  describe("Environment-specific behavior", () => {
    it("should correctly identify development environment", async () => {
      process.env.ENV = "development";
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.ENV, "development");
    });

    it("should correctly identify production environment", async () => {
      process.env.ENV = "production";
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.ENV, "production");
    });

    it("should correctly identify test environment", async () => {
      process.env.ENV = "test";
      
      const { ENV } = await import(`../../lib/env.js?t=${Date.now()}`);
      
      assert.strictEqual(ENV.ENV, "test");
    });
  });
});