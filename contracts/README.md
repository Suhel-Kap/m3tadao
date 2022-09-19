<!-- The command to deploy the contracts -->

npx hardhat run scripts/deploy.js --network mumbai

<!-- command to verify M3taDao contract -->

npx hardhat verify "M3taDao deployed Address from terminal after running the above command" --network mumbai