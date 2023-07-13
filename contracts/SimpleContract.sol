//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract SimpleContract {
    uint public value;
    
    constructor(uint initialValue) {
        value = initialValue;
    }
    
    function setValue(uint newValue) public {
        value = newValue;
    }
}
