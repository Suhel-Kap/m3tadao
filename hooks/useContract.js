import { ethers } from "ethers"
import { m3taDaoAbi, contractAddresses } from "../constants/"
import { useSigner } from "wagmi"

const useContract = () => {
    const { data: signer, isError, isLoading } = useSigner()

    const createLensProfile = async (
        userAddress,
        handle,
        imageURI,
        followNFTURI,
        description,
        github,
        twitter,
        website,
        profileURI
    ) => {
        console.log("13")
        const groupID = { website, twitter, github }
        //     name: '',
        //     description: '',
        //     designation: '',
        //     skills: [],
        //     interests: [],
        //     image: '',
        //     banner: ''
        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )
        console.log(m3taDaoContractInstance)
        console.log("14")
        console.log(userAddress)
        const inputStruct = {
            to: userAddress,
            handle: handle,
            imageURI: imageURI,
            followModule: "0x0000000000000000000000000000000000000000",
            followModuleInitData: [],
            followNFTURI: followNFTURI,
        }

        const inputStruct2 = {
            metadataTable: "dont care",
            profID: 0,
            description: description,
            groupID: JSON.stringify(groupID),
            profileURI: JSON.stringify(profileURI),
        }
        const finalCreateProfileInput = {
            inputStruct,
            inputStruct2,
        }
        console.log("15")
        var tx = await m3taDaoContractInstance.createLensProfile(
            [
                [
                    userAddress,
                    "handle894357",
                    imageURI,
                    "0x0000000000000000000000000000000000000000",
                    "0x",
                    followNFTURI,
                ],
                ["dont care", 0, description, JSON.stringify(groupID), JSON.stringify(profileURI)],
            ],
            { gasLimit: 5000000 }
        )
        // var tx = await m3taDaoContractInstance.getProjectTableURI()
        return tx
    }

    const createProjectAccount = async (
        accountID,
        founderAddress,
        accountHex,
        accountName,
        metaURI,
        AccountType,
        groupID,
        imageURI,
        metadataTable,
        description,
        members
    ) => {
        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        const accountStruct = [
            accountID,
            founderAddress,
            accountHex,
            accountName,
            metaURI,
            AccountType,
            groupID,
            imageURI,
            metadataTable,
            description,
            members,
        ]

        var tx = await m3taDaoContractInstance.createProjectAccount(accountStruct, {
            gasLimit: 5000000,
        })
        return tx
    }

    const createSubProject = async (
        sender,
        accountID,
        projectID,
        metadataTable,
        projectHex,
        projectName,
        metaURI,
        projectType,
        imageURI,
        description,
        members
    ) => {
        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        const ProjectStruct = [
            sender,
            accountID,
            projectID,
            metadataTable,
            projectHex,
            projectName,
            metaURI,
            projectType,
            imageURI,
            description,
            members,
        ]

        var tx = await m3taDaoContractInstance.createSubProject(ProjectStruct, {
            gasLimit: 5000000,
        })
        return tx
    }

    const createRelease = async (
        sender,
        releaseID,
        projectID,
        metadataTable,
        releaseHex,
        releaseName,
        metaURI,
        releaseType,
        imageURI,
        description,
        releaseURI
    ) => {
        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        const ReleaseStruct = [
            sender,
            releaseID,
            projectID,
            metadataTable,
            releaseHex,
            releaseName,
            metaURI,
            releaseType,
            imageURI,
            description,
            releaseURI,
        ]

        var tx = await m3taDaoContractInstance.createRelease(ReleaseStruct, { gasLimit: 5000000 })
        return tx
    }

    return {
        createLensProfile,
        createProjectAccount,
        createSubProject,
        createRelease,
    }
}

export default useContract
