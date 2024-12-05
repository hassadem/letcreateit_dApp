// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LetCreateIt is ERC20 {
    constructor(string memory name, string memory symbol, uint8 decimals, uint256 initialSupply) 
        ERC20(name, symbol) 
    {
        _mint(msg.sender, initialSupply * (10 ** uint256(decimals)));
    }
}

contract LetCreateItFactory {
    address public owner;
    uint256 private rewardfee = 0.1 ether;

    event TokenCreated(address indexed tokenAddress, address indexed creator, string name, string symbol);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createMemeToken(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 totalSupply
    ) external payable returns (address) {
        require(msg.value >= rewardfee, "Insufficient service fee");

        // Deploy new MemeToken contract
        LetCreateIt newToken = new LetCreateIt(name, symbol, decimals, totalSupply);

        emit TokenCreated(address(newToken), msg.sender, name, symbol);

        // Transfer service fee to owner
        payable(owner).transfer(msg.value);

        return address(newToken);
    }

    function withdrawFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function updateServiceFee(uint256 newFee) external onlyOwner {
        // Update service fee if needed in the future
        require(newFee > 0, "Service fee must be greater than 0");
        rewardfee = newFee;
    }
}
