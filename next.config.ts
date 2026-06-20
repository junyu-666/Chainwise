import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config, { webpack }) => {
    // wagmi v3 connectors 引用了我们不使用的可选 connector（porto / tempo），
    // 其可选依赖未安装，忽略这些模块的解析以避免打包失败。
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(porto(\/internal)?|accounts)$/,
      }),
    );
    return config;
  },
};

export default nextConfig;
