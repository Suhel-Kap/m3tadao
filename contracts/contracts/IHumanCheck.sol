// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
interface IHumanCheck {
    function verify(
        uint256 profileId,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external payable;

    function isVerifiedProfile(uint256 profileId) external view returns ( bool );
}