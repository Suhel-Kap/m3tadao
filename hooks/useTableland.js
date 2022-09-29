import { ethers } from "ethers"
import { m3taDaoAbi, contractAddresses, tableNames } from "../constants/"
import { useAccount, useSigner } from "wagmi"
import { uploadFileToIpfs, uploadJsonToIpfs } from "../utils/uploadToIpfs"
import { connect } from "@tableland/sdk"

// https://testnet.tableland.network/query?s=SELECT%20*%20FROM%20M3taUser_80001_2741%20WHERE%20ownerAddress=%220x0de82dcc40b8468639251b089f8b4a4400022e04%22

const isJsonEmpty = (jsonObj) => {
    return (
        jsonObj &&
        Object.keys(jsonObj).length === 0 &&
        Object.getPrototypeOf(jsonObj) === Object.prototype
    )
}

const useTableland = () => {
    const { data: signer, isError, isLoading } = useSigner()
    const { address } = useAccount()

    const getUserExists = async (addr = address) => {

        const tableland = await connect({ network: "testnet", chain: "polygon-mumbai" })
        // console.log("address", address)
        const { columns, rows } = await tableland.read(
            `SELECT * FROM ${
                tableNames["m3taUser"]
            } WHERE ownerAddress='${addr.toLowerCase()}';`
        )

        // const { columns, rows } = await tableland.read(`SELECT * FROM ${tableNames["m3taUser"]};`)

        // console.log(columns)
        // [ { name: 'name' }, { name: 'id' } ]
        // console.log(rows)
        // [ [ 'Bobby Tables', 0 ], [ 'Molly Tables', 1 ] ]
        return rows.length !== 0
    }

    const getUserData = async (userAddress) => {
        if (!userAddress) {
            return []
        }
        const tableland = await connect({ network: "testnet", chain: "polygon-mumbai" })
        const { columns, rows } = await tableland.read(
            `SELECT * FROM ${
                tableNames["m3taUser"]
            } WHERE ownerAddress='${userAddress.toLowerCase()}';`
        )
        return rows[0]
    }

    const getOrganisationData = async (organisationIdentifier) => {
        const tableland = await connect({ network: "testnet", chain: "polygon-mumbai" })
        // console.log("address", address)
        const { columns, rows } = await tableland.read(
            `SELECT * FROM ${tableNames["m3taOrganisation"]} WHERE identifier='${organisationIdentifier}';`
        )
        return rows[0]
    }

    const getOrganisationsData = async () => {
        const tableland = await connect({ network: "testnet", chain: "polygon-mumbai" })
        // console.log("address", address)
        const { columns, rows } = await tableland.read(
            `SELECT * FROM ${tableNames["m3taOrganisation"]};`
        )
        console.log(columns)
        console.log(rows)
        return rows
    }

    const getAllProjects = async () => {
        const tableland = await connect({ network: "testnet", chain: "polygon-mumbai" })
        // console.log("address", address)
        const { columns, rows } = await tableland.read(
            `SELECT * FROM ${tableNames["m3taProject"]};`
        )
        console.log(columns)
        console.log(rows)
        return rows
    }

    return {
        getAllProjects,
        getUserExists,
        getUserData,
        getOrganisationData,
        getOrganisationsData,
    }
}

export default useTableland
