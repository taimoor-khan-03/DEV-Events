# PostHog Unit Tests

This directory contains unit tests for PostHog integration in the Next.js application.

## Test Coverage

### 1. PostHog Client Initialization Tests (`instrumentation-client.test.ts`)
- ✅ PostHog client is initialized with the correct configuration parameters
- ✅ Exception capturing is enabled
- ✅ Debug mode is correctly set based on the environment (development vs production)

### 2. Next.js Configuration Tests (`next.config.test.ts`)
- ✅ Next.js rewrite rules correctly route PostHog API requests
- ✅ Static assets are routed to `us-assets.i.posthog.com`
- ✅ API requests are routed to `us.i.posthog.com`
- ✅ `skipTrailingSlashRedirect` is enabled for PostHog API compatibility
- ✅ Rewrite order is correct (static before general)

## Setup

Install the required dependencies:

```bash
npm install
```

This will install Jest, ts-jest, and @types/jest along with other dependencies.

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage report:
```bash
npm run test:coverage
```

## Test Configuration

The tests use Jest with ts-jest for TypeScript support. Configuration can be found in `jest.config.js`.

## Key Testing Approaches

### Client Initialization Tests
- Uses `jest.isolateModules()` to re-import the module with fresh environment variables
- Mocks the `posthog-js` module to verify initialization calls
- Tests multiple environment scenarios (development, production, test)

### Next.js Config Tests
- Tests the async `rewrites()` function
- Validates routing rules and order
- Ensures PostHog proxy configuration is correct

## Environment Variables

The tests mock the following environment variables:
- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog API key
- `NODE_ENV`: Node environment (development, production, test)

## Notes

- Tests use Jest mocks to avoid actual PostHog API calls
- Environment variables are reset between tests to ensure isolation
- All tests are independent and can run in any order
