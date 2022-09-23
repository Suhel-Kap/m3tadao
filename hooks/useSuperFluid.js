import {Framework, ConstantFlowAgreementV1} from "@superfluid-finance/sdk-core"
import {useSigner} from "wagmi"

const useSuperFluid = () => {
    const {data: signer} = useSigner()


    const Main = async (provider, signer) => {
        console.log("provider", provider)
        console.log("signer", signer)
        const sf = await Framework.create({
            networkName: "mumbai",
            provider: provider,
            chainId: 80001,
            // resolverAddress: "0xC174E0e4fC27198cd12cA97456Fea74A5293a77C",
            // customSubgraphQueriesEndpoint: "https://thegraph.com/hosted-service/subgraph/superfluid-finance/protocol-v1-mumbai",
            // resolverAddress: "0x1a67fCD7E62E9dd093Ed6fCC9E8e0A459b4FE426",
        })

        // sf.cfaV1 = new ConstantFlowAgreementV1({
        //     options: {
        //         resolverAddress: "0x1a67fCD7E62E9dd093Ed6fCC9E8e0A459b4FE426",
        //         hostAddress: "0xEB796bdb90fFA0f28255275e16936D25d3418603",
        //         cfaV1Address: "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873",
        //         idaV1Address: "0x804348D4960a61f2d5F9ce9103027A3E849E09b8",
        //     }
        // })
        console.log(signer)

        // const DAIxContract = await sf.loadSuperToken("fDAIx");
        // const DAIx = DAIxContract.address;
        // return
        try {
            console.log("Creating your stream...123")


            const createFlowOperation = await sf.cfaV1.authorizeFlowOperatorWithFullControl({
                flowOperator: "0xC174E0e4fC27198cd12cA97456Fea74A5293a77C",
                supertoken: "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4",
            })

            console.log("Creating your stream...")

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
