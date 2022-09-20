//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "./Im3taQuery.sol";
import "./IMockProfileCreationProxy.sol";
import "./ILensHub.sol";
// import "./IHumanCheck.sol";


contract m3taUser
{
    // IHumanCheck private humanCheck;
    Im3taQuery private _queryContract;
    IMockProfileCreationProxy private MockProfileCreationProxy;
    ILensHub private LensHub;
    ITablelandTables private _tableland;
    address M3taDaoAddress;

    mapping(address => uint256) _profileOwners;
    
    string private _chainID;
    string private _baseURIString;
    string private _profileTable;
    string private _profileTablePrefix;
    
    uint256 private _profileTableId;

    // constructor( Im3taQuery initqueryContract,IHumanCheck humancheckContract)  {
    constructor( Im3taQuery initqueryContract)  {



         _queryContract = initqueryContract;
        //  humanCheck = humancheckContract;
        // Initializing the Lens Protocol Profile Creator to interact with
        MockProfileCreationProxy = IMockProfileCreationProxy(0x420f0257D43145bb002E69B14FF2Eb9630Fc4736);
        //  Initializing the main Lens Protocol Contract to get its state
        LensHub = ILensHub(0x60Ae865ee4C725cd04353b5AAb364553f56ceF82);

        // Creating the M3taUser Table
        _chainID = "80001";

        _tableland = TablelandDeployments.get();

        _profileTablePrefix = "M3taUser";

        _profileTableId = _tableland.createTable(
            address(this),
            _queryContract.getCreateLensProfileTableStatement(_profileTablePrefix, _chainID)
        );

        _profileTable = string.concat(
            _profileTablePrefix,
            "_",
            _chainID,
            "_",
            Strings.toString(_profileTableId)
        );
        _baseURIString = "https://testnet.tableland.network/query?s=";
        
    }
    

    /**
     * @dev Only M3taDao contract can call
    */
    function onlyM3taDao() public view {
        require(msg.sender == address(M3taDaoAddress),"anothorized");
    }


    // Creates a Lens Profile and adds the Profile Data into M3taUser table for later indexing
    function createProfile(DataTypes.ProfileTableStruct memory vars)  external  {
        // With that modifier as a function we eliminate the callBack attack!
        // onlyM3taDao();
        
        // require(_profileOwners[vars.profile.to] == 0  , "Only one Profile per Address can get created");
        // calling Lens Proxy Profile Creator to create a new Profile for the User
        MockProfileCreationProxy.proxyCreateProfile(vars.profile);
        // Getting Profile Data
        vars.profile.handle = string.concat(vars.profile.handle,".test");
        // Connect the Profile ID with the ownerAddress to give him acccess in the m3taDao Dapp
        vars.tableData.profID = LensHub.getProfileIdByHandle(vars.profile.handle);
        _profileOwners[vars.profile.to] = vars.tableData.profID;
        vars.tableData.metadataTable = _profileTable;
        
        // Writing the Profile Data into m3taUser Tableland Table to be used as the indexer
        writeTable(vars);
    }

    // function verifyProfile(uint256 profileID,uint256 root,uint256 nullifierHash,uint256[8] calldata proof) public payable {
    //     humanCheck.verify(profileID,root,nullifierHash,proof);
    // }

    function writeTable(DataTypes.ProfileTableStruct memory vars) private {
            _tableland.runSQL(
            address(this),
            _profileTableId,
            // Getting the insert Profile statement from the Query Contract to add the profile into the Table
            _queryContract.getProfileInsertStatement(vars)
        );    
    }

    // function createProfile1(DataTypes.ProfileTableStruct2 memory vars , uint256[8] calldata proof)  external  {

    //     verifyAndExecute(vars.profile.to,vars.tableData.root,vars.tableData.nullifierHash,proof);
    //     // With that modifier as a function we eliminate the callBack attack!
    //     // onlyM3taDao();
    //     require(_profileOwners[vars.profile.to] == 0  , "Only one Profile per Address can get created");
    //     // calling Lens Proxy Profile Creator to create a new Profile for the User
    //     MockProfileCreationProxy.proxyCreateProfile(vars.profile);
    //     // Getting Profile Data
    //     vars.profile.handle = string.concat(vars.profile.handle,".test");
    //     // Connect the Profile ID with the ownerAddress to give him acccess in the m3taDao Dapp
    //     vars.tableData.profID = LensHub.getProfileIdByHandle(vars.profile.handle);
    //     _profileOwners[vars.profile.to] = vars.tableData.profID;
    //     vars.tableData.metadataTable = _profileTable;
    //     // Writing the Profile Data into m3taUser Tableland Table to be used as the indexer
    //     writeTable2(vars);
    // }

    // function writeTable2(DataTypes.ProfileTableStruct2 memory vars) private {
    //         _tableland.runSQL(
    //         address(this),
    //         _profileTableId,
    //         // Getting the insert Profile statement from the Query Contract to add the profile into the Table
    //         _queryContract.getProfileInsertStatement2(vars)
    //     );    
    // }

    function updateProfile(uint256 profileId, string calldata imageURI) external {
        LensHub.setProfileImageURI(profileId, imageURI);
    }

    function getProfIdByAddress(address owner) public view returns ( uint256){
        return _profileOwners[owner];
    }

    function _baseURI() internal view  returns (string memory) {
        return _baseURIString;
    }


    function metadataURI() public view returns (string memory) {
        return _queryContract.metadataURI(_profileTable,_baseURI());
    }

    function getTableName() public view returns ( string memory){
        return _profileTable;
    }

    // function setM3taDaoAddress(address m3tadao) public onlyOwner{
    //     M3taDaoAddress = m3tadao; 
    // }
 
}
