// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

import "./DataTypes.sol";

/**
 * @title ILensHub
 * @author Lens Protocol
 *
 * @notice This is the interface for the LensHub contract, the main entry point for the Lens Protocol.
 * You'll find all the events and external functions, as well as the reasoning behind them here.
 */
interface IMockProfileCreationProxy {
   
    function proxyCreateProfile(DataTypes.CreateProfileData memory vars) external;

   
}