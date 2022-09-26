import {Framework, ConstantFlowAgreementV1, ISuperToken} from "@superfluid-finance/sdk-core"
import {ethers} from "ethers"
import {contractAddresses, m3taTreasureAbi, MATICxABI} from "../constants/"
import {useAccount, useSigner} from "wagmi"

const useSuperFluid = () => {
    const {data: signer} = useSigner()

    //
    const SendPlannedStream = async (provider, signer, senderAddress, receiver, duration, totalTokens) => {
        console.log("provider", provider)
        console.log("signer", signer)


        try {
            const sf = await Framework.create({
                networkName: "mumbai",
                provider: provider,
                chainId: 80001,

            })
            await wrapMatic(provider, signer, totalTokens)

            const MaticXContract = await sf.loadSuperToken("MATICx");
            const MATICx = MaticXContract.address;

            const authorizeFlowOperatorWithFullControl = sf.cfaV1.authorizeFlowOperatorWithFullControl({
                superToken: MATICx,
                flowOperator: contractAddresses.superfluid.toLowerCase()
            })

            const result = await authorizeFlowOperatorWithFullControl.exec(signer)
            console.log(result)

            // let Xtokens
            let flowRate = ((totalTokens * 10 ** 18) / (duration * 3600)) //.toFixed(0) // X tokens per day

            let factor = (duration * 3600).toFixed(0)  // 1 day stream
            const plannedStreamConfig = {
                plannedStart: 60,
                stream: {
                    sender: senderAddress,
                    receiver: receiver,
                    duration: factor,
                    flowRate,
                },
            }

            const plannedStream = new ethers.Contract(
                contractAddresses.superfluid,
                m3taTreasureAbi,
                signer
            )

            const tx = await plannedStream.planStream(plannedStreamConfig)
            const receipt = await tx.wait()
            console.log(receipt)
            return receipt
        } catch (error) {
            console.log(
                "Hmmm, your transaction threw an error. Make sure  that you've entered a valid Ethereum address!"
            )
            console.error(error)
        }
    }

    const wrapMatic = async function (provider, signer, amt) {
        const MATICxAddress = "0x96B82B65ACF7072eFEb00502F45757F254c2a0D4";

        const ETHx = new ethers.Contract(MATICxAddress, MATICxABI, provider);

        try {
            console.log(`upgrading ${amt} MATIC to MATICx`);

            const amtToUpgrade = ethers.utils.parseEther(amt.toString());
            const receipt = await ETHx.connect(signer).upgradeByETH({
                value: amtToUpgrade
            });
            await receipt.wait().then(function (tx) {
                console.log(`Congrats - you've just upgraded MATIC to MATICx!`)
            });
        } catch (error) {
            console.error(error);
        }
    }

    return {SendPlannedStream}
}

export default useSuperFluid