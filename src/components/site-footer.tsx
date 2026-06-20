export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-zinc-500">
        <p className="font-medium text-zinc-700">Chainwise</p>
        <p className="mt-1 max-w-2xl">
          一个面向完全新手的区块链安全上手指南。全程使用测试网，不涉及真实资产，
          不托管私钥，不提供任何投资建议。
        </p>
        <p className="mt-4 text-xs text-zinc-400">
          区块链操作存在不可逆风险。请在理解每一步含义后再操作，任何人向你索要助记词都是骗局。
        </p>
      </div>
    </footer>
  );
}
