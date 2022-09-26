import dynamic from "next/dynamic"
import { utils } from "@worldcoin/id"
import { WidgetProps } from "@worldcoin/id"
import { useEffect } from "react"
import { keccak256 } from "@ethersproject/solidity"
import { ethers } from "ethers"
import axios from "axios"
import useWorldcoin from "../../hooks/useWorldcoin"
import { Button } from "@mantine/core"

const WorldIDWidget = dynamic<WidgetProps>(
    () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
    { ssr: false }
)

export function Worldcoin({ profId }) {
    const { verifyProfile } = useWorldcoin()

    const decode = (hash) => {
        const unpackedProof = ethers.utils.defaultAbiCoder.decode(["uint256[8]"], hash)[0]
        console.log(unpackedProof)
        let array = []
        for (let i = 0; i < 8; i++) {
            array.push(unpackedProof[i]._hex)
        }
        console.log(array)
        return array
    }
    const handleOnSuccess = async (verificationResponse) => {
        const response = await verifyProfile(
            parseInt(profId),
            verificationResponse.merkle_root,
            verificationResponse.nullifier_hash,
            decode(verificationResponse.proof)
        )
        console.log(response)
    }

    return (
        <WorldIDWidget
            actionId="wid_staging_2ef14547b3882ab92e3ed9ce378062f7" // obtain this from developer.worldcoin.org
            signal={profId}
            enableTelemetry
            onSuccess={(verificationResponse) => {
                handleOnSuccess(verificationResponse)
                console.log(verificationResponse)
                // sendReq({
                //     action_id: "wid_staging_3b9e688b2f1b9fa2957249b3df8edb9f",
                //     signal: { profId },
                //     proof: decode(verificationResponse.proof),
                //     nullifier_hash: verificationResponse.nullifier_hash,
                //     merkle_root: verificationResponse.merkle_root,
                // })
            }}
            onError={(error) => console.error(error)}
        />
    )
}

// <main className={styles.main}>
//                 <WorldIDWidget
//                     actionId="wid_staging_2ef14547b3882ab92e3ed9ce378062f7" // obtain this from developer.worldcoin.org
//                     signal="123"
//                     enableTelemetry
//                     onSuccess={(verificationResponse) => {
//                         console.log(verificationResponse)
//                         sendReq({
//                             action_id: "wid_staging_3b9e688b2f1b9fa2957249b3df8edb9f",
//                             signal: "123",
//                             proof: decode(verificationResponse.proof),
//                             nullifier_hash: verificationResponse.nullifier_hash,
//                             merkle_root: verificationResponse.merkle_root,
//                         })
//                     }}
//                     onError={(error) => console.error(error)}
//                 />
