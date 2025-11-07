import { describe, it, before, after, mock } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";

// Mock the ENV module before importing db.js
const mockEnv = {
  DATABASE_URL: "mongodb://localhost:27017/test-db",
  PORT: 3000,
  SECRET_KEY: "test-secret",
  ENV: "test",
};

// We need to mock the env module
mock.module("../../lib/env.js", {
  namedExports: { ENV: mockEnv },
});

describe("db.js - Database Connection", () => {
  let originalConnect;
  let originalExit;

  before(() => {
    // Save original functions
    originalConnect = mongoose.connect;
    originalExit = process.exit;
  });

  after(() => {
    // Restore original functions
    mongoose.connect = originalConnect;
    process.exit = originalExit;
  });

  describe("connectDB function", () => {
    it("should successfully connect to database with valid URL", async () => {
      // Mock successful connection
      const mockConnection = {
        connection: {
          host: "localhost:27017",
        },
      };

      mongoose.connect = mock.fn(async () => mockConnection);
      process.exit = mock.fn();

      const { connectDB } = await import("../../lib/db.js");
      await connectDB();

      assert.strictEqual(mongoose.connect.mock.calls.length, 1);
      assert.strictEqual(mongoose.connect.mock.calls[0].arguments[0], mockEnv.DATABASE_URL);
      assert.strictEqual(process.exit.mock.calls.length, 0);
    });

    it("should call mongoose.connect with correct parameters", async () => {
      const mockConnection = {
        connection: {
          host: "localhost:27017",
        },
      };

      mongoose.connect = mock.fn(async () => mockConnection);
      process.exit = mock.fn();

      const { connectDB } = await import("../../lib/db.js");
      await connectDB();

      const connectCall = mongoose.connect.mock.calls[0];
      assert.strictEqual(connectCall.arguments[0], mockEnv.DATABASE_URL);
      assert.deepStrictEqual(connectCall.arguments[1], {});
    });

    it("should handle connection errors and call process.exit(1)", async () => {
      const testError = new Error("Connection failed");

      mongoose.connect = mock.fn(async () => {
        throw testError;
      });
      
      let exitCode = null;
      process.exit = mock.fn((code) => {
        exitCode = code;
        throw new Error("process.exit called"); // Throw to stop execution
      });

      const { connectDB } = await import("../../lib/db.js");

      try {
        await connectDB();
        assert.fail("Should have thrown an error");
      } catch (error) {
        // Expected to throw
      }

      assert.strictEqual(process.exit.mock.calls.length, 1);
      assert.strictEqual(exitCode, 1);
    });

    it("should log success message with connection host", async () => {
      const mockHost = "test-host:27017";
      const mockConnection = {
        connection: {
          host: mockHost,
        },
      };

      mongoose.connect = mock.fn(async () => mockConnection);
      process.exit = mock.fn();

      // Capture console.log
      const originalLog = console.log;
      let loggedMessage = "";
      console.log = mock.fn((msg) => {
        loggedMessage = msg;
      });

      const { connectDB } = await import("../../lib/db.js");
      await connectDB();

      console.log = originalLog;

      assert.ok(loggedMessage.includes("Database connected successfully"));
      assert.ok(loggedMessage.includes(mockHost));
    });

    it("should log error message on connection failure", async () => {
      const testError = new Error("Network error");

      mongoose.connect = mock.fn(async () => {
        throw testError;
      });

      process.exit = mock.fn(() => {
        throw new Error("process.exit called");
      });

      // Capture console.error
      const originalError = console.error;
      let errorMessage = "";
      console.error = mock.fn((msg, err) => {
        errorMessage = msg;
      });

      const { connectDB } = await import("../../lib/db.js");

      try {
        await connectDB();
      } catch (error) {
        // Expected
      }

      console.error = originalError;

      assert.ok(errorMessage.includes("Database connection error"));
    });

    it("should handle empty DATABASE_URL gracefully", async () => {
      const emptyUrlEnv = { ...mockEnv, DATABASE_URL: "" };
      
      mock.module("../../lib/env.js", {
        namedExports: { ENV: emptyUrlEnv },
      });

      mongoose.connect = mock.fn(async () => {
        throw new Error("Invalid connection string");
      });

      process.exit = mock.fn(() => {
        throw new Error("process.exit called");
      });

      const { connectDB } = await import("../../lib/db.js");

      try {
        await connectDB();
        assert.fail("Should have thrown an error");
      } catch (error) {
        // Expected behavior
      }

      assert.strictEqual(process.exit.mock.calls.length, 1);
    });

    it("should handle mongoose connection with options object", async () => {
      const mockConnection = {
        connection: {
          host: "localhost:27017",
        },
      };

      mongoose.connect = mock.fn(async (url, options) => mockConnection);
      process.exit = mock.fn();

      const { connectDB } = await import("../../lib/db.js");
      await connectDB();

      // Verify empty options object is passed
      const options = mongoose.connect.mock.calls[0].arguments[1];
      assert.strictEqual(typeof options, "object");
    });
  });
});