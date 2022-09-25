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

    // WorldCoin Smart Contract On Chain Integration!

    const HumanCheck = await ethers.getContractFactory("HumanCheck");
    console.log("Deploying HumanCheck...");
    const humanCheck = await HumanCheck.deploy("0xABB70f7F39035586Da57B3c8136035f87AC0d2Aa", 1, "wid_staging_2ef14547b3882ab92e3ed9ce378062f7");
    await humanCheck.deployed();
    console.log("humanCheck deployed to:", humanCheck.address);

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

    // // Deploying the m3taSuperTreasure
    // let HOST = '0xEB796bdb90fFA0f28255275e16936D25d3418603';
    // let MATICx = '0x96B82B65ACF7072eFEb00502F45757F254c2a0D4';
    // let GELATO_OPS = '0xB3f5503f93d5Ef84b06993a1975B9D21B962892F';
    // let GELATO_TREASURY = '0x527a819db1eb0e34426297b03bae11F2f8B3A19E';

    // const M3taSuperTreasure = await ethers.getContractFactory("m3taSuperTreasure");
    // console.log("Deploying m3taSuperTreasure...");
    // const m3taSuperTreasure = await M3taSuperTreasure.deploy(HOST, MATICx, GELATO_OPS, GELATO_TREASURY);

    // await m3taSuperTreasure.deployed();

    // console.log("m3taSuperTreasure deployed to:", m3taSuperTreasure.address);

}

main();