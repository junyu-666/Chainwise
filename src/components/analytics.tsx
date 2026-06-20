import Script from "next/script";

/**
 * 可选的隐私友好分析（Umami / Plausible 等）。
 * 仅在配置了对应环境变量时注入脚本，否则不渲染。
 */
export function Analytics() {
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  const websiteId = process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID;

  if (!src || !websiteId) return null;

  return (
    <Script
      src={src}
      data-website-id={websiteId}
      strategy="afterInteractive"
      defer
    />
  );
}
