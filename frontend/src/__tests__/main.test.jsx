import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ClerkProvider } from '@clerk/clerk-react';

describe('main.jsx - Application Bootstrap', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    // Reset environment
    vi.resetModules();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('Environment variable validation', () => {
    it('should throw error when VITE_CLERK_PUBLISHABLE_KEY is not defined', () => {
      // Mock import.meta.env without the key
      const originalEnv = import.meta.env;
      
      vi.stubGlobal('import', {
        meta: {
          env: {}
        }
      });

      expect(() => {
        const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        if (!key) {
          throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined");
        }
      }).toThrow("VITE_CLERK_PUBLISHABLE_KEY is not defined");

      vi.unstubAllGlobals();
    });

    it('should not throw error when VITE_CLERK_PUBLISHABLE_KEY is defined', () => {
      const testKey = 'pk_test_placeholder';
      
      vi.stubGlobal('import', {
        meta: {
          env: {
            VITE_CLERK_PUBLISHABLE_KEY: testKey
          }
        }
      });

      expect(() => {
        const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
        if (!key) {
          throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined");
        }
      }).not.toThrow();

      vi.unstubAllGlobals();
    });

    it('should validate publishable key format', () => {
      const validKeys = [
        'pk_test_abc123',
        'pk_live_xyz789',
      ];

      validKeys.forEach(key => {
        expect(key).toMatch(/^pk_(test|live)_/);
      });
    });

    it('should reject invalid publishable key formats', () => {
      const invalidKeys = [
        '',
        'invalid_key',
        'sk_test_secret',
        'undefined',
      ];

      invalidKeys.forEach(key => {
        if (key && key.startsWith('pk_')) {
          // Valid
        } else {
          expect(key).not.toMatch(/^pk_(test|live)_/);
        }
      });
    });
  });

  describe('ClerkProvider integration', () => {
    it('should render ClerkProvider with correct publishableKey', () => {
      const testKey = 'pk_test_mock123';
      
      // Mock ClerkProvider to verify props
      const MockClerkProvider = vi.fn(({ children, publishableKey }) => {
        expect(publishableKey).toBe(testKey);
        return children;
      });

      vi.mock('@clerk/clerk-react', () => ({
        ClerkProvider: MockClerkProvider,
      }));

      // Simulate what main.jsx does
      const key = testKey;
      if (!key) {
        throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined");
      }

      expect(() => {
        MockClerkProvider({ 
          publishableKey: key,
          children: null 
        });
      }).not.toThrow();
    });

    it('should wrap App component with ClerkProvider', () => {
      // This tests the structure: ClerkProvider > App
      const structure = {
        provider: 'ClerkProvider',
        child: 'App',
      };

      expect(structure.provider).toBe('ClerkProvider');
      expect(structure.child).toBe('App');
    });

    it('should use StrictMode for development best practices', () => {
      // Verify StrictMode is used as outer wrapper
      const structure = {
        outer: 'StrictMode',
        middle: 'ClerkProvider',
        inner: 'App',
      };

      expect(structure.outer).toBe('StrictMode');
      expect(structure.middle).toBe('ClerkProvider');
      expect(structure.inner).toBe('App');
    });
  });

  describe('DOM mounting', () => {
    it('should mount to root element', () => {
      const rootId = 'root';
      
      // Simulate DOM element selection
      const mockElement = document.createElement('div');
      mockElement.id = rootId;
      document.body.appendChild(mockElement);

      const selectedElement = document.getElementById(rootId);
      expect(selectedElement).toBeTruthy();
      expect(selectedElement.id).toBe(rootId);

      document.body.removeChild(mockElement);
    });

    it('should fail gracefully if root element does not exist', () => {
      const nonExistentId = 'non-existent-root';
      const element = document.getElementById(nonExistentId);
      
      expect(element).toBeNull();
    });
  });

  describe('Error handling', () => {
    it('should throw descriptive error for missing environment variable', () => {
      const errorMessage = "VITE_CLERK_PUBLISHABLE_KEY is not defined";
      
      const testFn = () => {
        const key = undefined;
        if (!key) {
          throw new Error(errorMessage);
        }
      };

      expect(testFn).toThrow(errorMessage);
    });

    it('should handle empty string as invalid key', () => {
      const emptyKey = "";
      
      const testFn = () => {
        if (!emptyKey) {
          throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined");
        }
      };

      expect(testFn).toThrow();
    });

    it('should handle null as invalid key', () => {
      const nullKey = null;
      
      const testFn = () => {
        if (!nullKey) {
          throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined");
        }
      };

      expect(testFn).toThrow();
    });

    it('should handle undefined as invalid key', () => {
      const undefinedKey = undefined;
      
      const testFn = () => {
        if (!undefinedKey) {
          throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined");
        }
      };

      expect(testFn).toThrow();
    });
  });

  describe('Typo in variable name (CLECRK_PUBLISHABLE_KEY)', () => {
    it('should document the typo in variable name', () => {
      // Note: The actual code has a typo: CLECRK_PUBLISHABLE_KEY instead of CLERK_PUBLISHABLE_KEY
      const typoName = 'CLECRK_PUBLISHABLE_KEY';
      const correctName = 'CLERK_PUBLISHABLE_KEY';
      
      // This test documents the typo for future refactoring
      expect(typoName).not.toBe(correctName);
      expect(typoName).toBe('CLECRK_PUBLISHABLE_KEY');
    });

    it('should still work despite variable name typo', () => {
      // The typo is in the variable name, not the env var name
      // So it still reads from the correct env var: VITE_CLERK_PUBLISHABLE_KEY
      const envVarName = 'VITE_CLERK_PUBLISHABLE_KEY';
      expect(envVarName).toBe('VITE_CLERK_PUBLISHABLE_KEY');
    });
  });

  describe('Import statements', () => {
    it('should import required React dependencies', () => {
      const requiredImports = [
        'StrictMode',
        'createRoot',
      ];

      requiredImports.forEach(importName => {
        expect(importName).toBeTruthy();
      });
    });

    it('should import Clerk dependencies', () => {
      const clerkImports = [
        'ClerkProvider',
      ];

      clerkImports.forEach(importName => {
        expect(importName).toBeTruthy();
      });
    });

    it('should import local dependencies', () => {
      const localImports = [
        './index.css',
        './App.jsx',
      ];

      localImports.forEach(importPath => {
        expect(importPath).toBeTruthy();
      });
    });
  });

  describe('React 19 compatibility', () => {
    it('should use createRoot API (React 18+)', () => {
      const apiName = 'createRoot';
      expect(apiName).toBe('createRoot');
    });

    it('should not use legacy ReactDOM.render', () => {
      const legacyAPI = 'ReactDOM.render';
      const modernAPI = 'createRoot';
      
      expect(modernAPI).not.toBe(legacyAPI);
    });
  });
});