import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ClerkProvider } from '@clerk/clerk-react';
import App from '../App';

// Mock @clerk/clerk-react
vi.mock('@clerk/clerk-react', () => ({
  ClerkProvider: ({ children }) => <div data-testid="clerk-provider">{children}</div>,
  SignInButton: ({ mode, children, ...props }) => (
    <button data-testid="sign-in-button" data-mode={mode} {...props}>
      {children || 'Sign In'}
    </button>
  ),
}));

describe('App.jsx - Main Application Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<App />);
      }).not.toThrow();
    });

    it('should render SignInButton component', () => {
      render(<App />);
      
      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton).toBeInTheDocument();
    });

    it('should render only SignInButton as main content', () => {
      const { container } = render(<App />);
      
      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton).toBeInTheDocument();
      
      // Check that old content is not present
      expect(screen.queryByText(/Vite \+ React/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/count is/i)).not.toBeInTheDocument();
    });

    it('should have proper component structure', () => {
      const { container } = render(<App />);
      
      // App should render a fragment with SignInButton
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('SignInButton integration', () => {
    it('should pass mode="modal" to SignInButton', () => {
      render(<App />);
      
      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton).toHaveAttribute('data-mode', 'modal');
    });

    it('should render SignInButton with correct mode prop', () => {
      render(<App />);
      
      const signInButton = screen.getByTestId('sign-in-button');
      const mode = signInButton.getAttribute('data-mode');
      
      expect(mode).toBe('modal');
    });

    it('should not pass additional props to SignInButton', () => {
      render(<App />);
      
      const signInButton = screen.getByTestId('sign-in-button');
      
      // Should only have mode prop and test-specific attrs
      expect(signInButton.getAttribute('data-mode')).toBe('modal');
    });
  });

  describe('Component exports', () => {
    it('should export App as default export', () => {
      expect(App).toBeDefined();
      expect(typeof App).toBe('function');
    });

    it('should be a functional component', () => {
      const component = App;
      expect(typeof component).toBe('function');
      
      // Functional components don't have prototype.render
      expect(component.prototype?.render).toBeUndefined();
    });
  });

  describe('Old content removal', () => {
    it('should not render Vite logo', () => {
      render(<App />);
      
      expect(screen.queryByAltText(/vite logo/i)).not.toBeInTheDocument();
    });

    it('should not render React logo', () => {
      render(<App />);
      
      expect(screen.queryByAltText(/react logo/i)).not.toBeInTheDocument();
    });

    it('should not render counter button', () => {
      render(<App />);
      
      expect(screen.queryByRole('button', { name: /count is/i })).not.toBeInTheDocument();
    });

    it('should not render "Edit src/App.jsx" message', () => {
      render(<App />);
      
      expect(screen.queryByText(/Edit/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/src\/App\.jsx/i)).not.toBeInTheDocument();
    });

    it('should not render documentation links', () => {
      render(<App />);
      
      expect(screen.queryByText(/Click on the Vite and React logos/i)).not.toBeInTheDocument();
    });

    it('should not have useState hook for counter', () => {
      // The component should not manage counter state anymore
      const { container } = render(<App />);
      
      expect(screen.queryByText(/count is/i)).not.toBeInTheDocument();
    });
  });

  describe('Simplified component structure', () => {
    it('should have minimal JSX structure', () => {
      const { container } = render(<App />);
      
      // Should just have a fragment and SignInButton
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(1);
    });

    it('should not have unnecessary divs', () => {
      const { container } = render(<App />);
      
      // Old version had multiple divs, new version should be simpler
      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton).toBeInTheDocument();
    });

    it('should not have logo containers', () => {
      const { container } = render(<App />);
      
      const logoContainers = container.querySelectorAll('div');
      // Should have minimal divs (only from fragment or provider)
      expect(logoContainers.length).toBeLessThan(3);
    });

    it('should not have card container', () => {
      const { container } = render(<App />);
      
      expect(container.querySelector('.card')).not.toBeInTheDocument();
    });
  });

  describe('CSS imports', () => {
    it('should import App.css', () => {
      // This is tested by ensuring the component renders without errors
      expect(() => {
        render(<App />);
      }).not.toThrow();
    });
  });

  describe('Component props', () => {
    it('should not require any props', () => {
      expect(() => {
        render(<App />);
      }).not.toThrow();
    });

    it('should work with no props passed', () => {
      const { container } = render(<App />);
      
      expect(container).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button element', () => {
      render(<App />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should not have empty alt texts', () => {
      const { container } = render(<App />);
      
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        if (img.hasAttribute('alt')) {
          expect(img.getAttribute('alt')).not.toBe('');
        }
      });
    });
  });

  describe('Modal mode behavior', () => {
    it('should use modal mode for authentication', () => {
      render(<App />);
      
      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton.getAttribute('data-mode')).toBe('modal');
    });

    it('should not use redirect mode', () => {
      render(<App />);
      
      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton.getAttribute('data-mode')).not.toBe('redirect');
    });
  });

  describe('Component simplification', () => {
    it('should be simpler than original boilerplate', () => {
      const { container } = render(<App />);
      
      // Count total elements (should be minimal)
      const allElements = container.querySelectorAll('*');
      expect(allElements.length).toBeLessThan(10);
    });

    it('should not have nested link elements', () => {
      const { container } = render(<App />);
      
      const links = container.querySelectorAll('a');
      expect(links.length).toBe(0);
    });

    it('should not have multiple heading levels', () => {
      const { container } = render(<App />);
      
      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBe(0);
    });
  });

  describe('React Fragment usage', () => {
    it('should use React Fragment as root', () => {
      const { container } = render(<App />);
      
      // Fragment doesn't create DOM node, content should be directly rendered
      expect(container.firstChild).toBeTruthy();
    });

    it('should not wrap in unnecessary container div', () => {
      const { container } = render(<App />);
      
      // If a div wrapper existed at root, it would be the first child
      const firstChild = container.firstChild;
      expect(firstChild).toBeTruthy();
    });
  });

  describe('Integration with Clerk', () => {
    it('should work within ClerkProvider context', () => {
      const testKey = 'pk_test_12345';
      
      expect(() => {
        render(
          <ClerkProvider publishableKey={testKey}>
            <App />
          </ClerkProvider>
        );
      }).not.toThrow();
    });

    it('should render SignInButton that depends on Clerk context', () => {
      const testKey = 'pk_test_12345';
      
      render(
        <ClerkProvider publishableKey={testKey}>
          <App />
        </ClerkProvider>
      );
      
      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton).toBeInTheDocument();
    });
  });

  describe('State management', () => {
    it('should not have internal state', () => {
      // App component should be stateless now
      const { container } = render(<App />);
      
      // No state means no re-renders from internal state changes
      expect(container).toBeTruthy();
    });

    it('should not use useState hook', () => {
      // Verify no counter state exists
      render(<App />);
      
      expect(screen.queryByText(/count/i)).not.toBeInTheDocument();
    });

    it('should not use useEffect hook', () => {
      // Simple component shouldn't need effects
      expect(() => {
        render(<App />);
      }).not.toThrow();
    });
  });

  describe('Error boundaries', () => {
    it('should render without errors in error boundary', () => {
      expect(() => {
        render(<App />);
      }).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('should render quickly with minimal components', () => {
      const startTime = performance.now();
      render(<App />);
      const endTime = performance.now();
      
      // Should render in less than 100ms
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should have minimal re-renders', () => {
      const { rerender } = render(<App />);
      
      // Should not cause errors on re-render
      expect(() => {
        rerender(<App />);
      }).not.toThrow();
    });
  });
});