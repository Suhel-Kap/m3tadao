// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;
/**
 * @title DataTypes
 * @author M3taDao & Lens Protocol
 *
 * @notice A standard library of data types used throughout the M3TADAO Protocol Which Combines Lens - Valist - Tableland - WorldCoin Contracts.
 */
library DataTypes {   

    struct AccountStruct 
    {
        address founderAddress;
        uint256 id;
        uint    accountID;
        string  accountHex;
        string  accountName;
        string  metaURI;
        string  AccountType;
        string  requirements;
        string  imageURI;
        string  bannerURI;
        string  metadataTable;
        string  description;
        address[] members;
    }
    
    struct ProjectStruct {
        address sender;
        uint256 id;
        uint256 accountID;
        uint256 projectID;
        string  metadataTable;
        string  projectHex;
        string  projectName;
        string  metaURI;
        string  projectType;
        string  imageURI;
        string  description;
        address[] members;
    }

    struct ReleaseStruct 
    {
        address sender;
        uint256 id;
        uint256 releaseID;
        uint256 projectID;
        string metadataTable;
        string releaseHex;
        string releaseName;
        string metaURI;
        string releaseType;
        string imageURI;
        string description;
        string releaseURI;
    }

        struct HireReqStruct 
    {
        address profAddress;
        uint256 hireID;
        uint256 accountID;
        string  profHex;
        string  metadataTable;
        string  hireTitle;
        string  hireDescription;
        
    }
    // " (hireID text, profHex text, profAddress text, identifier text, hireTitle text, hireDescription text);"

    struct PostStruct
    {
        address posterAddress;
        uint256 postID;
        string  accountID;
        string  metadataTable;
        string  postDescription;    
        string  postTitle; 
        string  postGalery;
    }


    /**
     * @notice A struct containing the parameters required for the `createProfile()` function.
     *
     * @param to The address receiving the profile.
     * @param handle The handle to set for the profile, must be unique and non-empty.
     * @param imageURI The URI to set for the profile image.
     * @param followModule The follow module to use, can be the zero address.
     * @param followModuleInitData The follow module initialization data, if any.
     * @param followNFTURI The URI to use for the follow NFT.
     */
    struct CreateProfileData 
    {
        address to;
        string handle;
        string imageURI;
        address followModule;
        bytes followModuleInitData;
        string followNFTURI;
    }

    struct ProfTableStruct
    {
        string metadataTable;
        uint256 profID;
        string profHex;
        string description;
        string externalURIs;
        string profileURI;
        
    }

    struct ProfileTableStruct
    {
        CreateProfileData profile;
        ProfTableStruct tableData;
    }

    struct ProfileTableStruct2
    {
        CreateProfileData profile;
        ProfTableStruct2 tableData;
    }

    struct ProfTableStruct2{
        string metadataTable;
        uint256 profID;
        string description;
        string groupID;
        string profileURI;
        uint256 root;
        uint256 nullifierHash;
    }
}