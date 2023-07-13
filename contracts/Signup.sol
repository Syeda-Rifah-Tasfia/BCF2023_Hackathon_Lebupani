//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract SignUp {
    struct User {
        string name;
        address userAddress;
        uint256 timestamp;
    }

    mapping(address => User) public users;

    event NewUserRegistered(string name, address userAddress);

    function signUp(string memory name) public {
        require(bytes(name).length > 0, "Name should not be empty");
        require(users[msg.sender].userAddress == address(0), "User already registered");

        users[msg.sender] = User(name, msg.sender, block.timestamp);

        emit NewUserRegistered(name, msg.sender);
    }
}
