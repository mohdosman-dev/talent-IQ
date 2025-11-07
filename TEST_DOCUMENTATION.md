# Test Documentation

This document provides comprehensive information about the test suite for this project.

## Overview

The project includes comprehensive unit tests for both backend and frontend code changes:

### Backend Tests (Node.js Native Test Runner)
- **Location**: `backend/src/__tests__/`
- **Framework**: Node.js built-in test runner (node:test)
- **Files Tested**:
  - `backend/src/lib/db.js` - Database connection module
  - `backend/src/lib/env.js` - Environment configuration module
  - `backend/src/app.js` - Application startup and Express setup

### Frontend Tests (Vitest)
- **Location**: `frontend/src/__tests__/`
- **Framework**: Vitest with @testing-library/react
- **Files Tested**:
  - `frontend/src/main.jsx` - Application bootstrap and ClerkProvider setup
  - `frontend/src/App.jsx` - Main App component with SignInButton

## Running Tests

### Backend Tests

```bash
cd backend

# Run all tests
npm test
# or
yarn test

# Run tests with more verbose output
node --test --test-reporter=spec src/__tests__/**/*.test.js

# Run a specific test file
node --test src/__tests__/lib/db.test.js
```

### Frontend Tests

First, install the new dependencies:

```bash
cd frontend

# Install dependencies
npm install
# or
yarn install
```

Then run tests:

```bash
# Run all tests (single run)
npm test
# or
yarn test

# Run tests in watch mode
npm run test:watch
# or
yarn test:watch

# Run tests with UI
npm run test:ui
# or
yarn test:ui

# Run tests with coverage
npm run test:coverage
# or
yarn test:coverage
```

## Test Coverage

### Backend Tests

#### `db.test.js` - Database Connection Tests
- ✅ Successful database connection with valid URL
- ✅ Correct parameters passed to mongoose.connect
- ✅ Error handling and process.exit(1) on connection failure
- ✅ Success message logging with connection host
- ✅ Error message logging on connection failure
- ✅ Handling empty DATABASE_URL
- ✅ Mongoose connection with options object

#### Total: 8 test cases

#### `env.test.js` - Environment Configuration Tests
- ✅ ENV object structure validation
- ✅ Correct property types
- ✅ Default PORT value (3000)
- ✅ Default DATABASE_URL (empty string)
- ✅ Default SECRET_KEY (empty string)
- ✅ Default ENV value (development)
- ✅ Custom PORT handling
- ✅ Custom DATABASE_URL handling
- ✅ Custom SECRET_KEY handling
- ✅ Custom ENV value handling
- ✅ dotenv quiet option enabled
- ✅ PORT string to number conversion
- ✅ Invalid PORT fallback to default
- ✅ Zero PORT value handling
- ✅ Special characters preservation in DATABASE_URL
- ✅ Whitespace preservation in environment values
- ✅ Development environment identification
- ✅ Production environment identification
- ✅ Test environment identification

#### Total: 19 test cases

#### `app.test.js` - Application Startup Tests
- ✅ connectDB called before server start
- ✅ Server starts on correct PORT from ENV
- ✅ process.exit(1) on connectDB failure
- ✅ Error logging on startup failure
- ✅ Success logging when server starts
- ✅ Express app instance creation
- ✅ /health endpoint definition
- ✅ Static files setup in production mode
- ✅ No static files in development mode
- ✅ Network error handling during startup
- ✅ Authentication error handling during startup

#### Total: 11 test cases

#### Backend Total: 38 test cases

### Frontend Tests

#### `main.test.jsx` - Application Bootstrap Tests
- ✅ Error when VITE_CLERK_PUBLISHABLE_KEY is not defined
- ✅ No error when VITE_CLERK_PUBLISHABLE_KEY is defined
- ✅ Publishable key format validation
- ✅ Invalid publishable key format rejection
- ✅ ClerkProvider with correct publishableKey
- ✅ App wrapped with ClerkProvider
- ✅ StrictMode usage
- ✅ DOM mounting to root element
- ✅ Graceful failure if root element missing
- ✅ Descriptive error for missing environment variable
- ✅ Empty string handling as invalid key
- ✅ Null handling as invalid key
- ✅ Undefined handling as invalid key
- ✅ Typo documentation (CLECRK_PUBLISHABLE_KEY)
- ✅ Functionality despite variable name typo
- ✅ Required React dependencies import
- ✅ Clerk dependencies import
- ✅ Local dependencies import
- ✅ createRoot API usage (React 18+)
- ✅ No legacy ReactDOM.render

#### Total: 20 test cases

#### `App.test.jsx` - Main Application Component Tests
- ✅ Component renders without crashing
- ✅ SignInButton component rendering
- ✅ Only SignInButton as main content
- ✅ Proper component structure
- ✅ mode="modal" passed to SignInButton
- ✅ Correct mode prop rendering
- ✅ No additional props to SignInButton
- ✅ Default export validation
- ✅ Functional component verification
- ✅ No Vite logo
- ✅ No React logo
- ✅ No counter button
- ✅ No "Edit src/App.jsx" message
- ✅ No documentation links
- ✅ No useState hook for counter
- ✅ Minimal JSX structure
- ✅ No unnecessary divs
- ✅ No logo containers
- ✅ No card container
- ✅ App.css import
- ✅ No props required
- ✅ Works with no props
- ✅ Accessible button element
- ✅ No empty alt texts
- ✅ Modal mode for authentication
- ✅ Not redirect mode
- ✅ Simpler than original boilerplate
- ✅ No nested link elements
- ✅ No multiple heading levels
- ✅ React Fragment as root
- ✅ No unnecessary container div
- ✅ Works within ClerkProvider context
- ✅ SignInButton depends on Clerk context
- ✅ No internal state
- ✅ No useState hook
- ✅ No useEffect hook
- ✅ Error boundary compatibility
- ✅ Quick rendering performance
- ✅ Minimal re-renders

#### Total: 39 test cases

#### Frontend Total: 59 test cases

#### Grand Total: 97 test cases

## Test Structure

### Backend Test Structure