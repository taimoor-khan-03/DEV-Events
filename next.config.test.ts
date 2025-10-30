import type { NextConfig } from "next";
import nextConfig from "./next.config";

describe("Next.js PostHog Configuration", () => {
  type RewriteItem = { source: string; destination: string };

  const getRewriteList = async (): Promise<RewriteItem[]> => {
    const rw = await nextConfig.rewrites?.();
    return Array.isArray(rw)
      ? (rw as RewriteItem[])
      : [
          ...((rw?.beforeFiles ?? []) as RewriteItem[]),
          ...((rw?.afterFiles ?? []) as RewriteItem[]),
          ...((rw?.fallback ?? []) as RewriteItem[]),
        ];
  };

  it("should correctly route PostHog API requests with rewrite rules", async () => {
    const rw = await nextConfig.rewrites?.();
    const list = Array.isArray(rw) ? rw : [];

    expect(rw).toBeDefined();
    expect(Array.isArray(rw)).toBe(true);
    expect(list).toHaveLength(2);
  });

  it("should route static PostHog assets to us-assets.i.posthog.com", async () => {
    const list = await getRewriteList();

    const staticRewrite = list.find(
      (rewrite) => rewrite.source === "/ingest/static/:path*"
    );

    expect(staticRewrite).toBeDefined();
    expect(staticRewrite?.destination).toBe(
      "https://us-assets.i.posthog.com/static/:path*"
    );
  });

  it("should route PostHog API requests to us.i.posthog.com", async () => {
    const list = await getRewriteList();

    const apiRewrite = list.find(
      (rewrite) => rewrite.source === "/ingest/:path*"
    );

    expect(apiRewrite).toBeDefined();
    expect(apiRewrite?.destination).toBe("https://us.i.posthog.com/:path*");
  });

  it("should enable skipTrailingSlashRedirect for PostHog API compatibility", () => {
    expect(nextConfig.skipTrailingSlashRedirect).toBe(true);
  });

  it("should have correct rewrite order (static before general)", async () => {
    const list = await getRewriteList();

    expect(list[0]?.source).toBe("/ingest/static/:path*");
    expect(list[1]?.source).toBe("/ingest/:path*");
  });

  it("should configure PostHog proxy correctly for client-side tracking", async () => {
    const list = await getRewriteList();

    // Verify that all rewrites target PostHog infrastructure
    list.forEach((rewrite) => {
      expect(rewrite.source).toMatch(/^\/ingest/);
      expect(rewrite.destination).toMatch(/posthog\.com/);
    });
  });
});
