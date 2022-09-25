// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "./Ownable.sol";
import "./Im3taQuery.sol";
import "./IValist.sol";
import "./Im3taUser.sol";

contract m3taDao is
    Ownable
{


                        //   @@@@@  @@@@@    @@@@@@@  @@@@@@@   @@@@@@   @@@@@@@      @@@@@@     @@@@@@@    \\
                        //  @@@@@@@@@@@@@@   @@@@@@@  @@@@@@@  @@@@@@@@  @@@@@@@@    @@@@@@@@   @@@@@@@@@   \\
                        //  @@!  @@@@  @@@       !!@    @@@    @@!  @@@  @@    @@@   @@!  @@@  @@@     @@@  \\
                        //  !@!  !@!@  @!@       !!@    @@@    !@!  @!@  @@     @@@  !@!  @!@  !@!     @!@  \\
                        //  !@!  @!@!  !@!   @@@@!!@    @@@    @!@!@!@!  @@     @@@  @!@!@!@!  @!@     !@!  \\
                        //  !!!  !!!!  !!!   @@@@!!@    @@@    !!!@!!!!  @@     @@@  !!!@!!!!  !!!     !!!  \\
                        //  !!:  !!!!  !!!       !!@    @!@    !!:  !!!  @@     @@@  !!:  !!!  !!:     !!!  \\
                        //  :!:  :!:!  !:!       !!@    @@@    :!:  !:!  @@    @@@   :!:  !:!  :!:     !:!  \\  
                        //  :::  ::::  :::   @@@@@@@    @@@    ::   :::  @@   @@@    :::  :::  @@@@@@@@@@   \\
                        //  :::  ::::  :::   @@@@@@@    @@@    ::   :::  @@@@@@@     :::  : :    @@@@@@@    \\

//  @@@  @@@   @@@@@@   @@@       @@@   @@@@@@   @@@@@@@      @@       @@      @@@      @@@ ::::  @@@       @@@   @@@@@@   \\
//  @@@  @@@  @@@@@@@@  @@@       @@@  @@@@@@@   @@@@@@@       @@     @@       @@@      @@@ ::::  @@@::     @@@  @@@@@@@   \\
//  @@!  @@@  @@!  @@@  @@!       @@!  !@@         @@!          @@   @@        @@!      @@!       @@! ::    @@!  !@@       \\
//  !@!  @!@  !@!  @!@  !@!       !@!  !@!         !@!           @@ @@         !@!      !@!       !@!  ::   !@!  !@!       \\
//  @!@  !@!  @!@!@!@!  @!!       !!@  !!@@!!      @!!           @@@@          @!!      @!! ::::  @!!   ::  @!!  !!@@!!    \\
//  !@!  !!!  !!!@!!!!  !!!       !!!   !!@!!!     !!!           @@@@          !!!      !!! ::::  !!!    :: !!!   !!@!!!   \\
//  :!:  !!:  !!:  !!!  !!:       !!:       !:!    !!:          @@  @@         !!:      !!:       !!:     ::!!:       !:!  \\
//   ::!!:!   :!:  !:!   :!:      :!:      !:!     :!:         @@    @@        :!:      :!:       :!:      :::!      !:!   \\
//    ::::    ::   :::   :: ::::  :::  :::: ::      ::        @@      @@       :: ::::  ::: ::::  ::        :::  :::: ::   \\
//     :       :   : :  : :: : :  :::  :: : :       :        @@        @@      :: ::::  ::: ::::  ::         ::  :: : :    \\

               // @@@@@@@   @@@@@@   @@@@@@@   @@@      @@@ ::::  @@@       @@@@@@   @@@       @@@  @@@@@@@     \\
               // @@@@@@@  @@@@@@@@  @@@@@@@@  @@@      @@@ ::::  @@@      @@@@@@@@  @@@::     @@@  @@@@@@@@    \\
               //   @@@    @@!  @@@  @@@   @@  @@!      @@!       @@@      @@!  @@@  @@! ::    @@!  @@    @@@   \\
               //   @@@    !@!  @!@  @@@   @@  !@!      !@!       @@@      !@!  @!@  !@!  ::   !@!  @@     @@@  \\
               //   @@@    @!@!@!@!  @@@@@@@@  @!!      @!! ::::  @@@      @!@!@!@!  @!!   ::  @!!  @@     @@@  \\
               //   @@@    !!!@!!!!  @@@@@@@@  !!!      !!! ::::  @@@      !!!@!!!!  !!!    :: !!!  @@     @@@  \\
               //   @!@    !!:  !!!  @@@   @@  !!:      !!:       @@@      !!:  !!!  !!:     ::!!:  @@     @@@  \\
               //   @@@    :!:  !:!  @@@   @@  :!:      :!:       @@@      :!:  !:!  :!:      :::!  @@    @@@   \\
               //   @@@    ::   :::  @@@@@@@@  :: ::::  ::: ::::  @@@@@@@  ::   :::  ::        :::  @@   @@@    \\
               //   @@@    ::   :::  @@@@@@@   :: ::::  ::: ::::  @@@@@@@   :   : :  ::         ::  @@@@@@@     \\


    mapping(uint256 => address) postsMapping;
    mapping(uint => uint256) valistMapping;
    mapping(uint256 => address) hireMapping;
    using Counters for Counters.Counter;
    Counters.Counter private postID;
    Counters.Counter private ValistID;
    Counters.Counter private hireID;
    ITablelandTables private tablelandContract;
    Im3taQuery       private queryContract;
    IValist          private valistRegistryContract;
    Im3taUser        private m3taUserContract;
    string  private _chainID;
    uint256    private _chainId;
    string  private _baseURIString;
    string  private _metadataTable;
    // Tableland < Project||Account||Organization||Portofolio > table variables
    string  private _projectTable;
    string  private _projectTablePrefix;
    uint256 private _projectTableId;
    // Tableland SubProject table variables < each Project has subProjects >
    string  private _subProjectTable;
    string  private _subProjectTablePrefix;
    uint256 private _subProjectTableId;
    // Tableland Hiring table variables
    string  private _hireTable;
    string  private _hiringTablePrefix;
    uint256 private _hiringTableId;
    // Tableland Post Tables for Organizations
    string  private _postTable;
    string  private _postTablePrefix;
    uint256 private _postTableId;


    constructor(Im3taQuery initQueryContract,Im3taUser intitM3taUserContract)
    {
        //@dev setting the external contracts
        m3taUserContract = intitM3taUserContract;
        queryContract = initQueryContract;
        valistRegistryContract = IValist(0xD504d012D78B81fA27288628f3fC89B0e2f56e24);

        // Tableland Table Properties and Creation 
        _baseURIString = "https://testnet.tableland.network/query?s=";
        _projectTablePrefix = "M3taAccount";
        _subProjectTablePrefix = "M3taProject";
        _hiringTablePrefix = "M3taHire";
        _postTablePrefix = "M3taPost";
        tablelandContract = TablelandDeployments.get();
        _chainId = 80001;
        _chainID = Strings.toString(_chainId);
        // Creating the M3taDao Tableland Tables on the constructor
        _projectTableId = tablelandContract.createTable(
            address(this),
            queryContract.getCreateValistAccountTableStatement(
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

        _hiringTableId = tablelandContract.createTable(
            address(this),
            queryContract.getCreateHiringRequestTableStatement(
                _hiringTablePrefix,
                _chainID
            )
        );

        _hireTable = string.concat(
            _hiringTablePrefix,
            "_",
            _chainID,
            "_",
            Strings.toString(_hiringTableId)
        );

        _postTableId = tablelandContract.createTable(
            address(this),
            queryContract.getCreatePostTableStatement(
                _postTablePrefix,
                _chainID
            )
        );

        _postTable = string.concat(
            _postTablePrefix,
            "_",
            _chainID,
            "_",
            Strings.toString(_postTableId)
        );
    }
    // Creating a Lens protocol Profile
    function createLensProfile(DataTypes.ProfileTableStruct memory vars) public {
        vars.profile.to = msg.sender;
        m3taUserContract.createProfile(vars);
    }

    // Creating a Valist Account/Organization
    function createProjectAccount(DataTypes.AccountStruct memory vars)
        public
        payable
    {
        vars.founderAddress = msg.sender;

        require(
            m3taUserContract.getProfIdByAddress(vars.founderAddress) > 0,
            "only m3taDao users can create an Account"
        );

        vars.metadataTable = _projectTable;

        vars.accountID = valistRegistryContract.generateID(_chainId, vars.accountName);

        vars.accountHex = Strings.toHexString(vars.accountID);

        ValistID.increment();

        valistMapping[vars.accountID] = ValistID.current();

        vars.id = ValistID.current();

        valistRegistryContract.createAccount(
            vars.accountName,
            vars.metaURI,
            vars.members
        );
        string memory statement = queryContract.getAccountInsertStatement(vars);
        runSQL(_projectTableId,statement);
    }

    //  Creating a Project inside a Valist Account/Organization 
    function createSubProject(DataTypes.ProjectStruct memory vars)
        public
        payable
    {
        vars.sender = msg.sender;
        require(
            m3taUserContract.getProfIdByAddress(vars.sender) > 0,
            "only m3taDao users can create a Project"
        );

        vars.metadataTable = _subProjectTable;

        vars.projectID = valistRegistryContract.generateID(vars.accountID, vars.projectName);

        vars.projectHex = Strings.toHexString(vars.projectID);

        ValistID.increment();

        valistMapping[vars.projectID] = ValistID.current();

        vars.id = ValistID.current();

        valistRegistryContract.createProject(
            vars.accountID,
            vars.projectName,
            vars.metaURI,
            vars.members
        );
        string memory statement = queryContract.getSubProjectInsertStatement(vars);
        runSQL(_subProjectTableId,statement);
    }

    // Creating a Release version inside a Valist Project 
    function createHiringRequest(DataTypes.HireReqStruct memory vars) public  {

        vars.profAddress = msg.sender;
        // Only M3taDao Users can make a Hire request to an Organization
        require(
            m3taUserContract.getProfIdByAddress(msg.sender) > 0,
            "only m3taDao users can create a Hiring Request"
        );

        hireID.increment();

        vars.hireID = hireID.current();

        vars.metadataTable = _hireTable;

        vars.accountID = valistMapping[vars.accountID];

        string memory statement = queryContract.getHiringRequestInsertStatement(vars);
        runSQL(_hiringTableId,statement);

    }

    // Function for creating posts for an Organization 
    function createPost(DataTypes.PostStruct memory vars) public {
        vars.posterAddress = msg.sender;
        require(
            m3taUserContract.getProfIdByAddress(vars.posterAddress) > 0, "Only m3taDao Users can post into Organization/Team Accounts"
        );
        postID.increment();
        vars.postID = postID.current();
        postsMapping[vars.postID] = vars.posterAddress;
        vars.metadataTable = _postTable;
        string memory statement = queryContract.getPostInsertStatement(vars);
        runSQL(_postTableId,statement);
    }

    // Deleting a post only post owner or Organization members
    function deletePost(uint256 accountID , uint256 postId) public {
        require(postsMapping[postId] == msg.sender || isAccountMember(accountID,msg.sender) , "Only post creators and account members can delete a post");
        string memory statement = queryContract.getDeletePostStatement(_postTable,postId);
         runSQL(_postTableId,statement);
        postsMapping[postId] = address(0);
    }

    // Deleting a Hiring Request only Request owner or Organization members can call!
    function rejectHiringRequest(uint256 accountID , uint256 hireId) public {
        require(hireMapping[hireId] == msg.sender || isAccountMember(accountID,msg.sender) , "Only post creators and account members can Reject a Hiring Request");
        string memory statement = queryContract.getRejectHiringRequestStatement(_postTable,hireId);
         runSQL(_postTableId,statement);
        //Assigning the null address for Avoiding conflicts
        postsMapping[hireId] = address(0);
    }

    // Update metadata for a Valist Account/Organization/Team
    function updateAccountMetadata( uint accountID, string memory requirements)
        public
    {
        require(
            isAccountMember(accountID, msg.sender),
            "only accountMembers can update the Account metadata"
        );

        uint256 id = valistMapping[accountID]; 
        string memory statement = queryContract.getUpdateAccountStatement(_projectTable,id,requirements);
        runSQL(_projectTableId,statement);

    }
 
    // Update metadata for a Valist Project
    function updateProjectMetadata(uint projectID,  string memory imageURI,string calldata metaURI, string memory description)
    public
    {
        require(
            isAccountMember(projectID, msg.sender),
            "only accountMembers can update the project metadata"
        );
        valistRegistryContract.setProjectMetaURI(projectID, metaURI);
        uint256 id = valistMapping[projectID];
        string memory uri = metaURI;
        string memory statement = queryContract.getUpdateAccountProjectStatement(_projectTable,id,imageURI,uri,description);
        runSQL(_projectTableId,statement);
        

    }

    // Update Lens Protocol Profile Data
    function updateProfileMetadata(uint256 profileId, string calldata imageURI, string memory profileURI, string memory externalURIs)
    public
    {
        m3taUserContract.updateProfile(profileId, imageURI ,profileURI, externalURIs);
    }


    // Function to make Insertions , Updates and Deletions to our Tableland Tables 
    function runSQL(uint256 tableID, string memory statement) private{
         tablelandContract.runSQL(
            address(this),
            tableID,
            statement        
        );
    }

    // Getters for Fetching our Contract Table URIs
    function getAccountTableURI() public view returns (string memory) {
        return queryContract.metadataURI(_projectTable, _baseURI());
    }
    function getProjectTableURI() public view returns (string memory) {
        return queryContract.metadataURI(_subProjectTable, _baseURI());
    }

    function getHiringTableURI() public view returns (string memory) {
        return queryContract.metadataURI(_hireTable, _baseURI());
    }

    function getUserTableURI() public view returns (string memory) {
        return m3taUserContract.metadataURI();
    }

    function getPostTableURI()public view returns (string memory) {
        return queryContract.metadataURI(_postTable, _baseURI());
    }

    function _baseURI() internal view returns (string memory) {
        return _baseURIString;
    }
    // Setting tableland BaseUri for future updates!!!
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseURIString = baseURI;
    }

    function isAccountMember(uint _accountID,address member) public view returns (bool) {
       return  valistRegistryContract.isAccountMember(_accountID,member);
    }

}