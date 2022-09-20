// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "./DataTypes.sol";

interface Im3taUser  {

 function createProfile(DataTypes.ProfileTableStruct memory vars) external;

 function updateProfile(uint256 profileId, string calldata imageURI) external;
 
 function getProfIdByAddress(address owner) external view returns ( uint256);

 function metadataURI() external view returns (string memory);

 function createProfile1(DataTypes.ProfileTableStruct2 memory vars , uint256[8] calldata proof)  external;



}