// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title GuestBook - Chainwise 演示用链上留言板
/// @notice 任何人都可以写一句话进来，永久记录在区块链上。
/// 用于让新手亲手完成一次「与智能合约交互」并在浏览器看到结果。
contract GuestBook {
    struct Message {
        address author;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;

    event MessagePosted(address indexed author, string content, uint256 timestamp);

    /// @notice 写一条留言上链。
    /// @param content 留言内容，1-280 字节。
    function post(string calldata content) external {
        require(
            bytes(content).length > 0 && bytes(content).length <= 280,
            "Invalid length"
        );
        messages.push(Message(msg.sender, content, block.timestamp));
        emit MessagePosted(msg.sender, content, block.timestamp);
    }

    /// @notice 返回全部留言。
    function getMessages() external view returns (Message[] memory) {
        return messages;
    }

    /// @notice 返回留言总数。
    function getCount() external view returns (uint256) {
        return messages.length;
    }
}
