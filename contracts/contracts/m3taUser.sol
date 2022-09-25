//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "./Ownable.sol";
import "./Im3taQuery.sol";
import "./IMockProfileCreationProxy.sol";
import "./ILensHub.sol";
// import "./IHumanCheck.sol";


contract m3taUser is Ownable
{
    // IHumanCheck private humanCheck;
    Im3taQuery private queryContract;
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
    constructor(Im3taQuery initqueryContract)  {


        queryContract = initqueryContract;
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
            queryContract.getCreateLensProfileTableStatement(_profileTablePrefix, _chainID)
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
        onlyM3taDao();
        
        require(_profileOwners[vars.profile.to] == 0  , "Only one Profile per Address can get created");

        // calling Lens Proxy Profile Creator to create a new Profile for the User
        MockProfileCreationProxy.proxyCreateProfile(vars.profile);
        // Getting Profile Data
        vars.profile.handle = string.concat(vars.profile.handle,".test");
        // Connect the Profile ID with the ownerAddress to give him acccess in the m3taDao Dapp
        vars.tableData.profID = LensHub.getProfileIdByHandle(vars.profile.handle);
        // Used to index profile data using GraphQL 
        vars.tableData.profHex = Strings.toHexString(vars.tableData.profID);
        
        _profileOwners[vars.profile.to] = vars.tableData.profID;

        vars.tableData.metadataTable = _profileTable;
        
        // Writing the Profile Data into m3taUser Tableland Table to be used as the indexer
        writeTable(vars);
    }

    function writeTable(DataTypes.ProfileTableStruct memory vars) private {
            _tableland.runSQL(
            address(this),
            _profileTableId,
            // Getting the insert Profile statement from the Query Contract to add the profile into the Table
            queryContract.getProfileInsertStatement(vars)
        );    
    }

    function updateProfile(uint256 profileId, string calldata imageURI, string memory profileURI, string memory externalURIs) external {
        string memory imageuri = imageURI;
        require(_profileOwners[msg.sender] == profileId, "Anothorized action only profile owner can update his profile metadata");

        LensHub.setProfileImageURI(profileId, imageURI);

        updateTable(profileId,imageuri,profileURI,externalURIs);

    }

    function updateTable(uint256 profileId, string memory imageURI, string memory profileURI, string memory externalURIs) private {
            _tableland.runSQL(
            address(this),
            _profileTableId,
            queryContract.getUpdateLensProfileStatement(_profileTable,profileId,imageURI,profileURI,externalURIs)        
            );
    }

    function getProfIdByAddress(address owner) public view returns ( uint256){
        return _profileOwners[owner];
    }

    function _baseURI() internal view  returns (string memory) {
        return _baseURIString;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseURIString = baseURI;
    }

    function metadataURI() public view returns (string memory) {
        return queryContract.metadataURI(_profileTable,_baseURI());
    }

    function getTableName() public view returns ( string memory){
        return _profileTable;
    }

    function setM3taDaoAddress(address m3tadao) public onlyOwner{
        M3taDaoAddress = m3tadao; 
    }
 
}
