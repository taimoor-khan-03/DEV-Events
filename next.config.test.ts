import type { NextConfig } from "next";
import nextConfig from "./next.config";

describe("Next.js PostHog Configuration", () => {
  it("should correctly route PostHog API requests with rewrite rules", async () => {
    const rewrites = await nextConfig.rewrites?.();

    expect(rewrites).toBeDefined();
    expect(Array.isArray(rewrites)).toBe(true);
    expect(rewrites).toHaveLength(2);
  });

  it("should route static PostHog assets to us-assets.i.posthog.com", async () => {
    const rewrites = await nextConfig.rewrites?.();

    const staticRewrite = rewrites?.find(
      (rewrite) => rewrite.source === "/ingest/static/:path*"
    );

    expect(staticRewrite).toBeDefined();
    expect(staticRewrite?.destination).toBe(
      "https://us-assets.i.posthog.com/static/:path*"
    );
  });

  it("should route PostHog API requests to us.i.posthog.com", async () => {
    const rewrites = await nextConfig.rewrites?.();

    const apiRewrite = rewrites?.find(
      (rewrite) => rewrite.source === "/ingest/:path*"
    );

    expect(apiRewrite).toBeDefined();
    expect(apiRewrite?.destination).toBe("https://us.i.posthog.com/:path*");
  });

  it("should enable skipTrailingSlashRedirect for PostHog API compatibility", () => {
    expect(nextConfig.skipTrailingSlashRedirect).toBe(true);
  });

  it("should have correct rewrite order (static before general)", async () => {
    const rewrites = await nextConfig.rewrites?.();

    expect(rewrites?.[0].source).toBe("/ingest/static/:path*");
    expect(rewrites?.[1].source).toBe("/ingest/:path*");
  });

  it("should configure PostHog proxy correctly for client-side tracking", async () => {
    const rewrites = await nextConfig.rewrites?.();

    // Verify that all rewrites target PostHog infrastructure
    rewrites?.forEach((rewrite) => {
      expect(rewrite.source).toMatch(/^\/ingest/);
      expect(rewrite.destination).toMatch(/posthog\.com/);
    });
  });
});
