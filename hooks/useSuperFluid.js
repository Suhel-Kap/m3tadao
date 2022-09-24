import {Framework, ConstantFlowAgreementV1 , ISuperToken } from "@superfluid-finance/sdk-core"

import {useSigner} from "wagmi"
import {ethers,utils} from "ethers"

const useSuperFluid = () => {
    const {data: signer} = useSigner()


    const Main = async (provider, signer) => {
        console.log("provider", provider)
        console.log("signer", signer)




        try {
            const sf = await Framework.create({
                networkName: "mumbai",
                provider: provider,
                chainId: 80001,

            })

            const DAIxContract = await sf.loadSuperToken("MATICx");
            const MATICx = DAIxContract.address;

            const createFlowOperation =  sf.cfaV1.authorizeFlowOperatorWithFullControl({
                superToken: MATICx,
                flowOperator: "0xC174E0e4fC27198cd12cA97456Fea74A5293a77C".toLowerCase()

        })

            const result = await createFlowOperation.exec(signer)
            console.log(result)
        } catch (error) {
            console.log(
                "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
            )
            console.error(error)
        }
    }

    return {Main}
}

export default useSuperFluid