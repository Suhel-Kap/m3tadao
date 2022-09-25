// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "./DataTypes.sol";

interface Im3taQuery  {

    function getSubProjectInsertStatement(DataTypes.ProjectStruct memory vars)
    external pure returns (string memory);

    function getCreateHiringRequestTableStatement(string memory _tableprefix, string memory chainid) 
    external pure returns (string memory);

    function getHiringRequestInsertStatement(DataTypes.HireReqStruct memory vars)
    external pure returns (string memory);

    function getCreateLensProfileTableStatement(string memory _tableprefix, string memory chainid)
    external pure returns (string memory);

    function getProfileInsertStatement(DataTypes.ProfileTableStruct memory vars)
    external pure returns (string memory);

     function getCreateValistSubProjectTableStatement(string memory _tableprefix, string memory chainid) 
     external pure returns (string memory);

    function getAccountInsertStatement(DataTypes.AccountStruct memory vars)
    external pure returns (string memory);

    function metadataURI(string memory metadataTable, string memory base) 
    external pure returns (string memory);
    
    function getCreateValistAccountTableStatement(string memory _tableprefix, string memory chainid) 
    external pure returns (string memory);

    function getPostInsertStatement(DataTypes.PostStruct memory vars)
    external pure returns (string memory);

    function getCreatePostTableStatement(string memory _tableprefix, string memory chainid)
    external pure returns (string memory);

    function getUpdateLensProfileStatement(string memory metadataTable, uint256 profID,  string memory imageURL,string memory profileURI, string memory externalURIs)
    external pure returns (string memory);

    function getUpdateAccountProjectStatement(string memory metadataTable, uint256 projectID,  string memory imageURL,string memory metaURI, string memory description)
    external pure returns (string memory);

    function getUpdateAccountStatement(string memory metadataTable, uint256 projectID,string memory requirements)
    external pure returns (string memory);

    function getDeletePostStatement(string memory metadataTable, uint256 postID)
    external pure returns (string memory);

    function getRejectHiringRequestStatement(string memory metadataTable, uint256 hireID)
    external pure returns (string memory);


}