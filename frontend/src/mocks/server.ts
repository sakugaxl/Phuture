import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Validate handlers to ensure they are properly imported
if (!handlers || !Array.isArray(handlers)) {
  console.error('Error: Handlers are not properly defined or exported from ./handlers');
  throw new Error('Handlers setup failed.');
}

// Initialize the MSW server
export const server = setupServer(...handlers);

// Server lifecycle management for tests
if (process.env.NODE_ENV === 'test') {
  // Start the server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

  // Reset handlers after each test to prevent state leaks
  afterEach(() => server.resetHandlers());

  // Close the server when tests are finished
  afterAll(() => server.close());
}
