import { ethers } from "ethers"
import { contractAddresses, humanCheckAbi } from "../constants/"
import { useAccount, useSigner } from "wagmi"
import { uploadFileToIpfs, uploadJsonToIpfs } from "../utils/uploadToIpfs"
import { v4 as uuidv4 } from "uuid"
import { defaultAbiCoder } from "ethers/lib/utils"

const useWorldcoin = () => {
    const { data: signer, isError, isLoading } = useSigner()
    const { address } = useAccount()

    const verifyProfile = async (profId, root, nullifierHash, proof) => {
        const humanCheckContractInstance = new ethers.Contract(
            contractAddresses.humanCheck,
            humanCheckAbi,
            signer
        )

        var tx = await humanCheckContractInstance.verify(profId, root, nullifierHash, proof, {
            gasLimit: 5000000,
        })
        return await tx.wait()
    }

    return {
        verifyProfile,
    }
}

export default useWorldcoin
