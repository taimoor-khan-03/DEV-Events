import posthog from "posthog-js";

// Mock posthog
jest.mock("posthog-js", () => ({
  init: jest.fn(),
}));

describe("PostHog Client Initialization", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should initialize PostHog client with correct configuration parameters", () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = "test-posthog-key";
    process.env.NODE_ENV = "production";

    // Re-import to trigger initialization
    jest.isolateModules(() => {
      require("./instrumentation-client");
    });

    expect(posthog.init).toHaveBeenCalledWith("test-posthog-key", {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      defaults: "2025-05-24",
      capture_exceptions: true,
      debug: false,
    });
  });

  it("should enable PostHog exception capturing", () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = "test-posthog-key";
    process.env.NODE_ENV = "production";

    jest.isolateModules(() => {
      require("./instrumentation-client");
    });

    const initCall = (posthog.init as jest.Mock).mock.calls[0];
    expect(initCall[1].capture_exceptions).toBe(true);
  });

  it("should enable debug mode in development environment", () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = "test-posthog-key";
    process.env.NODE_ENV = "development";

    jest.isolateModules(() => {
      require("./instrumentation-client");
    });

    const initCall = (posthog.init as jest.Mock).mock.calls[0];
    expect(initCall[1].debug).toBe(true);
  });

  it("should disable debug mode in production environment", () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = "test-posthog-key";
    process.env.NODE_ENV = "production";

    jest.isolateModules(() => {
      require("./instrumentation-client");
    });

    const initCall = (posthog.init as jest.Mock).mock.calls[0];
    expect(initCall[1].debug).toBe(false);
  });

  it("should correctly set debug mode based on environment", () => {
    const testCases = [
      { env: "development", expectedDebug: true },
      { env: "production", expectedDebug: false },
      { env: "test", expectedDebug: false },
    ];

    testCases.forEach(({ env, expectedDebug }) => {
      jest.clearAllMocks();
      process.env.NEXT_PUBLIC_POSTHOG_KEY = "test-posthog-key";
      process.env.NODE_ENV = env;

      jest.isolateModules(() => {
        require("./instrumentation-client");
      });

      const initCall = (posthog.init as jest.Mock).mock.calls[0];
      expect(initCall[1].debug).toBe(expectedDebug);
    });
  });
});
