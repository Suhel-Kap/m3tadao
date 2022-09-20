// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Im3taQuery.sol";
contract m3taQuery is 
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    Im3taQuery
    {
    
    /**
     * @dev initialization function for upgradeable contract
     */
    function initialize()
        public
        initializer
    {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function metadataURI(string memory metadataTable, string memory base) 
    public pure returns (string memory) {
        return string.concat(
            base, 
            "SELECT%20*%20FROM%20",
            metadataTable
        );
    }
    

    
    function getCreateValistProjectTableStatement(string memory _tableprefix, string memory chainid) 
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                " (founderAddress text, accountID text, accountHex text, accountName text, metaURI text, imageURI text, groupID text, description text, AccountType text);"
            );
    }

    function getProjectInsertStatement(DataTypes.AccountStruct memory vars)
    public pure returns (string memory) {
   
        return string.concat(
                "INSERT INTO ",
                vars.metadataTable,
                " (founderAddress, accountID, accountHex, accountName, metaURI, imageURI, groupID, description, AccountType) VALUES ("
                ," '"
                ,Strings.toHexString(uint160(vars.founderAddress), 20)
                ,"', '"
                ,Strings.toString(vars.accountID)
                ,"', '"
                ,vars.accountHex
                ,"', '"
                ,vars.accountName
                ,"', '"
                ,vars.metaURI
                ,"', '"
                ,vars.imageURI
                ,"', '"
                ,vars.groupID
                ,"', '"
                ,vars.description
                ,"', '"
                ,vars.AccountType
                ,"')");
    }

    function getCreateValistSubProjectTableStatement(string memory _tableprefix, string memory chainid) 
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                " (projectID text, accountID text, projectHex text, projectName text, metaURI text, imageURI text, description text, projectType text);"
            );
    }

    function getSubProjectInsertStatement(DataTypes.ProjectStruct memory vars)
    public pure returns (string memory) {
        return string.concat(
                "INSERT INTO ",
                vars.metadataTable,
                " (projectID, accountID, projectHex, projectName, metaURI, imageURI, description, projectType) VALUES ( '"
                ,Strings.toString(vars.projectID)
                ,"', '"
                ,Strings.toString(vars.accountID)
                ,"', '"
                ,vars.projectHex
                ,"', '"
                ,vars.projectName
                ,"', '"
                ,vars.metaURI
                ,"', '"
                ,vars.imageURI
                ,"', '"
                ,vars.description
                ,"', '"
                ,vars.projectType
                ,"')");
    }

    function getCreateValistReleaseTableStatement(string memory _tableprefix, string memory chainid) 
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                " (releaseID text, projectID text, releaseHex text, releaseName text, releaseURI text, metaURI text, imageURI text, description text, releaseType text);"
            );
    }

    function getReleaseInsertStatement(DataTypes.ReleaseStruct memory vars)
    public pure returns (string memory) {
        return string.concat(
                "INSERT INTO ",
                vars.metadataTable,
                " (releaseID, projectID, releaseHex, releaseName, releaseURI, metaURI, imageURI, description, releaseType) VALUES ( '"
                ,Strings.toString(vars.projectID)
                ,"', '"
                ,Strings.toString(vars.releaseID)
                ,"', '"
                ,vars.releaseHex
                ,"', '"
                ,vars.releaseName
                ,"', '"
                ,vars.releaseURI
                ,"', '"
                ,vars.metaURI
                ,"', '"
                ,vars.imageURI
                ,"', '"
                ,vars.description
                ,"', '"
                ,vars.releaseType
                ,"')");
    }

    function getCreateLensProfileTableStatement(string memory _tableprefix, string memory chainid)
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                " (ownerAddress text, profID int, handle text, imageURL text, profileURL text, description text, groupID text);"
            );
    }

    function getProfileInsertStatement(DataTypes.ProfileTableStruct memory vars)
    public pure returns (string memory) {
        return string.concat(
                "INSERT INTO ",
                vars.tableData.metadataTable,
                " (ownerAddress, profID, handle, imageURL, profileURL, description, groupID) VALUES ("
                ," '"
                ,Strings.toHexString(uint160(vars.profile.to), 20)
                ,"', "
                ,Strings.toString(vars.tableData.profID)
                ,", '"
                ,vars.profile.handle
                ,"', '"
                ,vars.profile.imageURI
                ,"', '"
                ,vars.tableData.profileURI
                ,"', '"
                ,vars.tableData.description
                ,"', '"
                ,vars.tableData.groupID
                ,"')"); 
    }

    function getProfileInsertStatement2(DataTypes.ProfileTableStruct2 memory vars)
    public pure returns (string memory) {
        return string.concat(
                "INSERT INTO ",
                vars.tableData.metadataTable,
                " (ownerAddress, profID, handle, imageURL, profileURL, description, groupID) VALUES ("
                ," '"
                ,Strings.toHexString(uint160(vars.profile.to), 20)
                ,"', "
                ,Strings.toString(vars.tableData.profID)
                ,", '"
                ,vars.profile.handle
                ,"', '"
                ,vars.profile.imageURI
                ,"', '"
                ,vars.tableData.profileURI
                ,"', '"
                ,vars.tableData.description
                ,"', '"
                ,vars.tableData.groupID
                ,"')"); 
    }

    function getCreatePostTableStatement(string memory _tableprefix, string memory chainid)
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                " (posterAddress text, postID int, accountID text, postDescription text, postTitle text, postGalery text);"
        );
    }

    function getPostInsertStatement(DataTypes.PostStruct memory vars)
    public pure returns (string memory) {
        return string.concat(
                "INSERT INTO ",
                vars.metadataTable,
                " (posterAddress, postID, accountID, postDescription, postTitle ,postGalery) VALUES ("
                ," '"
                ,Strings.toHexString(uint160(vars.posterAddress), 20)
                ,"', "
                ,Strings.toString(vars.postID)
                ,", '"
                ,Strings.toString(vars.accountID)
                ,"', '"
                ,vars.postDescription
                ,"', '"
                ,vars.postTitle
                ,"', '"
                ,vars.postGalery
                ,"')"); 
    }

 /**
     * @dev Override _authorizeUpgrade to upgrade only by owner
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}


}