/** GuestBook 演示合约的 ABI（与 contracts/GuestBook.sol 对应）。 */
export const GUESTBOOK_ABI = [
  {
    type: "function",
    name: "post",
    stateMutability: "nonpayable",
    inputs: [{ name: "content", type: "string" }],
    outputs: [],
  },
  {
    type: "function",
    name: "getMessages",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "author", type: "address" },
          { name: "content", type: "string" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

export interface GuestMessage {
  author: string;
  content: string;
  timestamp: bigint;
}
