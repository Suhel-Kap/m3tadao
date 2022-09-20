// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "./Im3taQuery.sol";
import "./IValist.sol";
import "./Im3taUser.sol";

contract m3taDao 

{

    // / @@@  @@@   @@@@@@   @@@       @@@   @@@@@@   @@@@@@@
    // / @@@  @@@  @@@@@@@@  @@@       @@@  @@@@@@@   @@@@@@@
    // / @@!  @@@  @@!  @@@  @@!       @@!  !@@         @@!
    // / !@!  @!@  !@!  @!@  !@!       !@!  !@!         !@!
    // / @!@  !@!  @!@!@!@!  @!!       !!@  !!@@!!      @!!
    // / !@!  !!!  !!!@!!!!  !!!       !!!   !!@!!!     !!!
    // / :!:  !!:  !!:  !!!  !!:       !!:       !:!    !!:
    // /  ::!!:!   :!:  !:!   :!:      :!:      !:!     :!:
    // /   ::::    ::   :::   :: ::::   ::  :::: ::      ::
    // /    :       :   : :  : :: : :  :    :: : :       :
    
    ITablelandTables private tablelandContract;
    Im3taQuery       private queryContract;
    IValist          private valistRegistryContract;
    Im3taUser        private m3taUserContract;
    string  private _chainID;
    uint    private _chainId;
    string  private _baseURIString;
    string  private _metadataTable;
    // Tableland Account-Project table variables
    string  private _projectTable;
    string  private _projectTablePrefix;
    uint256 private _projectTableId;
    // Tableland SubProject table variables
    string  private _subProjectTable;
    string  private _subProjectTablePrefix;
    uint256 private _subProjectTableId;
    // Tableland Release table variables
    string  private _releaseTable;
    string  private _releaseTablePrefix;
    uint256 private _releaseTableId;

    string  private _postTable;
    string  private _postTablePrefix;
    uint256 private _postTableId;


    constructor(Im3taQuery initQueryContract,Im3taUser intitM3taUserContract)
    {
        // __Ownable_init();
        // setting the external contracts
        m3taUserContract = intitM3taUserContract;
        queryContract = initQueryContract;
        valistRegistryContract = IValist(0xD504d012D78B81fA27288628f3fC89B0e2f56e24);

        // Tableland Table Properties and Creation 
        _baseURIString = "https://testnet.tableland.network/query?s=";
        _projectTablePrefix = "M3taProject";
        _subProjectTablePrefix = "M3taSubProject";
        _releaseTablePrefix = "M3taRelease";
        _postTablePrefix = "M3taPost";
        tablelandContract = TablelandDeployments.get();
        _chainId = 80001;
        _chainID = Strings.toString(_chainId);
        // Creating the Project Table by taking the crea
        _projectTableId = tablelandContract.createTable(
            address(this),
            queryContract.getCreateValistProjectTableStatement(
                _projectTablePrefix,
                _chainID
            )
        );

        _projectTable = string.concat(
            _projectTablePrefix,
            "_",
            _chainID,
            "_",
            Strings.toString(_projectTableId)
        );
        _subProjectTableId = tablelandContract.createTable(
            address(this),
            queryContract.getCreateValistSubProjectTableStatement(
                _subProjectTablePrefix,
                _chainID
            )
        );

        _subProjectTable = string.concat(
            _subProjectTablePrefix,
            "_",
            _chainID,
            "_",
            Strings.toString(_subProjectTableId)
        );

        _releaseTableId = tablelandContract.createTable(
            address(this),
            queryContract.getCreateValistReleaseTableStatement(
                _releaseTablePrefix,
                _chainID
            )
        );

        _releaseTable = string.concat(
            _subProjectTablePrefix,
            "_",
            _chainID,
            "_",
            Strings.toString(_releaseTableId)
        );

        _postTableId = tablelandContract.createTable(
            address(this),
            queryContract.getCreateValistProjectTableStatement(
                _postTablePrefix,
                _chainID
            )
        );

        _postTable = string.concat(
            _projectTablePrefix,
            "_",
            _chainID,
            "_",
            Strings.toString(_postTableId)
        );
    }

    function createLensProfile(DataTypes.ProfileTableStruct memory vars) public {
        m3taUserContract.createProfile(vars);
    }
    // function createLensProfile1(
    //     DataTypes.ProfileTableStruct2 memory vars,
    //     uint256[8] calldata proof
    // ) public {
    //     m3taUserContract.createProfile1(vars, proof);
    // }

    function createProjectAccount(DataTypes.AccountStruct memory vars)
        public
        payable
    {
        require(
            m3taUserContract.getProfIdByAddress(vars.founderAddress) > 0,
            "only m3taDao users can create an Account"
        );
        // accountID & accountHex null values

        vars.metadataTable = _projectTable;

        vars.accountID = valistRegistryContract.generateID(_chainId, vars.accountName);

        vars.accountHex = Strings.toHexString(vars.accountID);

        valistRegistryContract.createAccount(
            vars.accountName,
            vars.metaURI,
            vars.members
        );

        tablelandContract.runSQL(
            address(this),
            _projectTableId,
            queryContract.getProjectInsertStatement(vars)
        );
    }

    function createSubProject(DataTypes.ProjectStruct memory vars)
        public
        payable
    {
        require(
            m3taUserContract.getProfIdByAddress(vars.sender) > 0,
            "only m3taDao users can create a Project"
        );
        // projectID & projectHex null values
        vars.metadataTable = _subProjectTable;

        vars.projectID = valistRegistryContract.generateID(_chainId, vars.projectName);

        vars.projectHex = Strings.toHexString(vars.projectID);

        valistRegistryContract.createProject(
            vars.accountID,
            vars.projectName,
            vars.metaURI,
            vars.members
        );

        tablelandContract.runSQL(
            address(this),
            _subProjectTableId,
            queryContract.getSubProjectInsertStatement(vars)
        );
    }

    function createRelease(DataTypes.ReleaseStruct memory vars) public payable {
        
        require(
            m3taUserContract.getProfIdByAddress(vars.sender) > 0,
            "only m3taDao users can create a Release"
        );
        // releaseID & releaseHex null values
        vars.metadataTable = _releaseTable;

        vars.releaseID = valistRegistryContract.generateID(_chainId, vars.releaseName);

        vars.releaseHex = Strings.toHexString(vars.releaseID);

        valistRegistryContract.createRelease(
            vars.projectID,
            vars.releaseName,
            vars.metaURI
        );

        tablelandContract.runSQL(
            address(this),
            _releaseTableId,
            queryContract.getReleaseInsertStatement(vars)
        );
    }

    function createPost(DataTypes.PostStruct memory vars) public {
        require(
            isAccountMember(vars.accountID, vars.posterAddress),
            "only accountMembers can Post"
        );

        tablelandContract.runSQL(
            address(this),
            _postTableId,
            queryContract.getPostInsertStatement(vars)
        );
    }

    function updateAccountMetadata(uint _accountID, string calldata _metaURI)
        public
    {
        valistRegistryContract.setAccountMetaURI(_accountID, _metaURI);
    }

    function updateProjectMetadata(uint _projectID, string calldata _metaURI)
        public
    {
        valistRegistryContract.setProjectMetaURI(_projectID, _metaURI);
    }

    function getProjectTableURI() public view returns (string memory) {
        return queryContract.metadataURI(_projectTable, _baseURI());
    }

    function getUserTableName() public view returns (string memory) {
        return m3taUserContract.metadataURI();
    }

    function _baseURI() internal view returns (string memory) {
        return _baseURIString;
    }

    function isAccountMember(uint _accountID,address member) public view returns (bool) {
       return  valistRegistryContract.isAccountMember(_accountID,member);
    }

    /**
     * @dev Set baseURI
     */
    function setBaseURI(string calldata newBaseURI) external  {
        _baseURIString = newBaseURI;
    }

}