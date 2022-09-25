// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Im3taQuery.sol";


// We are introducing the m3taQuery Contract with M3taQuery 
// Our Tableland Contracts loosing a lot of Bytes by keeping 
// Our SQL Queries in this contract as a Storage Contract!!!
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
    

    
    function getCreateValistAccountTableStatement(string memory _tableprefix, string memory chainid) 
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                " (founderAddress text, identifier text, accountID text, accountHex text, accountName text, metaURI text, imageURI text, bannerURI text, requirements text, description text, AccountType text);"
            );
    }

     function getAccountInsertStatement(DataTypes.AccountStruct memory vars)
    public pure returns (string memory) {
   
        return string.concat(
                "INSERT INTO ",
                vars.metadataTable,
                " (founderAddress, identifier, accountID, accountHex, accountName, metaURI, imageURI, bannerURI, requirements, description, AccountType) VALUES ("
                ," '"
                ,Strings.toHexString(uint160(vars.founderAddress), 20)
                ,"', "
                ,Strings.toString(vars.id)
                ,", '"
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
                ,vars.bannerURI
                ,"', '"
                ,vars.requirements
                ,"', '"
                ,vars.description
                ,"', '"
                ,vars.AccountType
                ,"')");
    }


    function getUpdateAccountStatement(string memory metadataTable, uint256 accountID,string memory requirements)
    public pure returns (string memory) 
    {
        return string.concat(
                "UPDATE ",
                metadataTable,
                " SET requirements='",
                requirements,
                "' WHERE identifier='",
                Strings.toString(accountID),
                "';"
            );
    }



    function getCreateValistSubProjectTableStatement(string memory _tableprefix, string memory chainid) 
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                " (projectID text, identifier text, accountID text, projectHex text, projectName text, metaURI text, imageURI text, description text, projectType text);"
            );
    }

    function getSubProjectInsertStatement(DataTypes.ProjectStruct memory vars)
    public pure returns (string memory) {
        return string.concat(
                "INSERT INTO ",
                vars.metadataTable,
                " (projectID, identifier, accountID, projectHex, projectName, metaURI, imageURI, description, projectType) VALUES ( '"
                ,Strings.toString(vars.projectID)
                ,"', "
                ,Strings.toString(vars.id)
                ,", '"
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

    function getUpdateAccountProjectStatement(string memory metadataTable, uint256 projectID,  string memory imageURL,string memory metaURI, string memory description)
    public pure returns (string memory) 
    {
        return string.concat(
                "UPDATE ",
                metadataTable,
                " SET metaURI='",
                metaURI,
                "', imageURI='",
                imageURL,
                "', description='",
                description,
                "' WHERE identifier='",
                Strings.toString(projectID),
                "';"
            );
    }

    // function getCreateValistReleaseTableStatement(string memory _tableprefix, string memory chainid) 
    // public pure returns (string memory) {
    //     return string.concat(
    //             "CREATE TABLE ",
    //             _tableprefix,
    //             "_",
    //             chainid,
    //             " (releaseID text, projectID text, releaseHex text, releaseName text, releaseURI text, metaURI text, imageURI text, description text, releaseType text);"
    //         );
    // }

    function getCreateHiringRequestTableStatement(string memory _tableprefix, string memory chainid) 
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                // identifier is used to reference to a valist Account/Org
                " (hireID text, profHex text, profAddress text, identifier text, hireTitle text, hireDescription text);"
            );
    }

    function getHiringRequestInsertStatement(DataTypes.HireReqStruct memory vars)
    public pure returns (string memory) {
        return string.concat(
                "INSERT INTO ",
                vars.metadataTable,
                " (hireID, profHex, profAddress, identifier, hireTitle, hireDescription) VALUES ( '"
                ,Strings.toString(vars.hireID)
                ,"', '"
                ,vars.profHex
                ,"', '"
                ,Strings.toHexString(uint160(vars.profAddress), 20)
                ,"', '"
                ,Strings.toString(vars.accountID)
                ,"', '"
                ,vars.hireTitle
                ,"', '"
                ,vars.hireDescription
                ,"')");
    }

    function getRejectHiringRequestStatement(string memory metadataTable, uint256 hireID)
    public pure returns (string memory) 
    {
        return string.concat(
                "DELETE FROM ",
                metadataTable,
                 " WHERE hireID='",
                Strings.toString(hireID),
                "';"
                );
    }

    // function getReleaseInsertStatement(DataTypes.ReleaseStruct memory vars)
    // public pure returns (string memory) {
    //     return string.concat(
    //             "INSERT INTO ",
    //             vars.metadataTable,
    //             " (releaseID, projectID, releaseHex, releaseName, releaseURI, metaURI, imageURI, description, releaseType) VALUES ( '"
    //             ,Strings.toString(vars.projectID)
    //             ,"', '"
    //             ,Strings.toString(vars.releaseID)
    //             ,"', '"
    //             ,vars.releaseHex
    //             ,"', '"
    //             ,vars.releaseName
    //             ,"', '"
    //             ,vars.releaseURI
    //             ,"', '"
    //             ,vars.metaURI
    //             ,"', '"
    //             ,vars.imageURI
    //             ,"', '"
    //             ,vars.description
    //             ,"', '"
    //             ,vars.releaseType
    //             ,"')");
    // }

    function getCreateLensProfileTableStatement(string memory _tableprefix, string memory chainid)
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                " (ownerAddress text, profID text, profHex text, handle text, imageURI text, profileURI text, description text, externalURIs text);"
            );
    }

    function getProfileInsertStatement(DataTypes.ProfileTableStruct memory vars)
    public pure returns (string memory) {
        return string.concat(
                "INSERT INTO ",
                vars.tableData.metadataTable,
                " (ownerAddress, profID, profHex, handle, imageURI, profileURI, description, externalURIs) VALUES ("
                ," '"
                ,Strings.toHexString(uint160(vars.profile.to), 20)
                ,"', '"
                ,Strings.toString(vars.tableData.profID)
                ,"', '"
                ,vars.tableData.profHex
                ,"', '"
                ,vars.profile.handle
                ,"', '"
                ,vars.profile.imageURI
                ,"', '"
                ,vars.tableData.profileURI
                ,"', '"
                ,vars.tableData.description
                ,"', '"
                ,vars.tableData.externalURIs
                ,"')"); 
    }

    function getUpdateLensProfileStatement(string memory metadataTable, uint256 profID,  string memory imageURL,string memory profileURI, string memory externalURIs)
    public pure returns (string memory) 
    {
        return string.concat(
                "UPDATE ",
                metadataTable,
                " SET imageUri='",
                imageURL,
                "', profileURI='",
                profileURI,
                "', externalURIs='",
                externalURIs,
                "' WHERE profID='",
                Strings.toString(profID),
                "';"
            );
    }

    function getCreatePostTableStatement(string memory _tableprefix, string memory chainid)
    public pure returns (string memory) {
        return string.concat(
                "CREATE TABLE ",
                _tableprefix,
                "_",
                chainid,
                " (posterAddress text, postID text, accountID text, postDescription text, postTitle text, postGalery text);"
        );
    }

    function getPostInsertStatement(DataTypes.PostStruct memory vars)
    public pure returns (string memory) {
        return string.concat(
                "INSERT INTO ",
                vars.metadataTable,
                " (posterAddress, postID, accountID, postDescription, postTitle, postGalery) VALUES ("
                ," '"
                ,Strings.toHexString(uint160(vars.posterAddress), 20)
                ,"', '"
                ,Strings.toString(vars.postID)
                ,"', '"
                ,vars.accountID
                ,"', '"
                ,vars.postDescription
                ,"', '"
                ,vars.postTitle
                ,"', '"
                ,vars.postGalery
                ,"')"); 
    }

    function getDeletePostStatement(string memory metadataTable, uint256 postID)
    public pure returns (string memory) 
    {
        return string.concat(
                "DELETE FROM ",
                metadataTable,
                 " WHERE postID='",
                Strings.toString(postID),
                "';"
                );
    }
     /**
     * @dev Override _authorizeUpgrade to upgrade only by owner
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}


}