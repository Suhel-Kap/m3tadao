// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

interface Im3taDao {
    function isAccountMember(uint _accountID,address member) external view returns (bool);
}