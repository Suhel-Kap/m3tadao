// scripts/deploy_upgradeable_box.js
const { ethers, upgrades } = require("hardhat");

async function main() {

    const M3taQuery = await ethers.getContractFactory("m3taQuery");
    console.log("Deploying m3taQuery...");
    const m3taQuery = await upgrades.deployProxy(M3taQuery, [], {
        initializer: "initialize",
    });
    await m3taQuery.deployed();
    console.log("m3taQuery deployed to:", m3taQuery.address);

    // const HumanCheck = await ethers.getContractFactory("HumanCheck");
    // console.log("Deploying HumanCheck...");
    // const humanCheck = await HumanCheck.deploy("0xABB70f7F39035586Da57B3c8136035f87AC0d2Aa", 1, "wid_staging_2ef14547b3882ab92e3ed9ce378062f7");
    // await humanCheck.deployed();
    // console.log("humanCheck deployed to:", humanCheck.address);

    const M3taUser = await ethers.getContractFactory("m3taUser");
    console.log("Deploying m3taUser...");
    // const m3taUser = await M3taUser.deploy(m3taQuery.address, humanCheck.address);
    const m3taUser = await M3taUser.deploy(m3taQuery.address);

    await m3taUser.deployed();
    console.log("m3taUser deployed to:", m3taUser.address);

    const M3taDao = await ethers.getContractFactory("m3taDao");
    console.log("Deploying m3taDao...");
    // const m3taUser = await M3taUser.deploy(m3taQuery.address, humanCheck.address);
    const m3taDao = await M3taDao.deploy(m3taQuery.address, m3taUser.address);

    await m3taDao.deployed();
    console.log("m3taDao deployed to:", m3taDao.address);

    const M3taTressure = await ethers.getContractFactory("m3taTressure");
    console.log("Deploying M3taTressure...");
    // const m3taUser = await M3taUser.deploy(m3taQuery.address, humanCheck.address);
    const m3taTressure = await M3taTressure.deploy(m3taDao.address);

    await m3taTressure.deployed();
    console.log("M3taTressure deployed to:", m3taTressure.address);
}

main();