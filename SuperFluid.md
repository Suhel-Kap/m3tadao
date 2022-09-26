M3tadao integrates Superfluid x Gelato to establish  programable (planned Streams) where Gelato takes the access control to start and close the streams for a user 
to do that we are using the SuperApp x Gelato contract displayed here : https://github.com/Suhel-Kap/m3tadao/blob/mantine/contracts/contracts/m3taSuperTreasure.sol

For upgrading matic to maticx authorizeOperatorWithFullControl and to call the planned stream we are using that hook :https://github.com/Suhel-Kap/m3tadao/blob/mantine/hooks/useSuperFluid.js

With programable Streams we established our goal to create a functional Dao for the next web3 projects!!!

We also have in our plans to give the oportunity to each m3tadao oraganization to have a SuperTreasury that is going to receiveStreams and also calling the 
m3taSuperTreasure for the plannedStream.

For making that happen we already have a SuperApp Factory with just one txt  that deploys a superApp for each Org code here :
https://github.com/Suhel-Kap/m3tadao/blob/mantine/contracts/contracts/m3taTressure.sol

And this is the SuperApp implementation where we are also added the accountID/OrganizationID to distinguise our contracts for each organization DAO!

https://github.com/Suhel-Kap/m3tadao/blob/mantine/contracts/contracts/DaoTreasure.sol
