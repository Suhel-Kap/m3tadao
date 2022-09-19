//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "./Im3taDao.sol";
import "./DaoTressure.sol";

contract m3taTressure
{
    Im3taDao metadaoContract;
    mapping(uint256=>DaoTressure) public  accountTressuries;
    constructor(Im3taDao initMetadaoContract){
        metadaoContract = initMetadaoContract;
    }


    function deployTressury(ISuperfluid host, address _owner,uint accountID) public {
            // getting sure that only an Organization member can deploy the tressury of that Org
            require(metadaoContract.isAccountMember(accountID, msg.sender) && accountTressuries[accountID] == DaoTressure(address(0)));
            DaoTressure tressure = new DaoTressure(host ,_owner, accountID);
            accountTressuries[accountID] = tressure;
        }

    function getAccountTressure(uint accountId)
        public
        view
        returns (
            address owner,
            address MoneyRouterAddr,
            uint balance
        )
    {
        DaoTressure tressure = accountTressuries[accountId];
        return (tressure.owner(), tressure.MoneyRouterAddr(), address(tressure).balance);
    }


}
