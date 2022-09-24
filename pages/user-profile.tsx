import type { NextPage } from "next"
import Head from "next/head"
import { Banner } from "../components/Banner"
import { NavTabs } from "../components/NavTabs"
import defaultStats from "../components/Banner/stats.json"
import { useAccount, useProvider, useSigner } from "wagmi"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Layout } from "../components/Layout"
import { Container, Stack } from "@mantine/core"
import useSuperFluid from "../hooks/useSuperFluid"
import useTableland from "../hooks/useTableland"

const UserProfile: NextPage = () => {
    const { isConnected, isDisconnected, status } = useAccount()
    const router = useRouter()
    const [stats, setStats] = useState(defaultStats)
    const { getUserData } = useTableland()
    useEffect(() => {
        // if (!isConnected) {
        //     router.push("/")
        // }
        initialize()
    }, [])

    const initialize = async () => {
        const user = await getUserData()
        // const response = await fetch("https://" + user[7] + ".ipfs.w3s.link/json")
        // const externalProfileData: any = response.json()
        // const profileHex = user[2]
        const userStats = {
            image: "https://" + user[4] + ".ipfs.w3s.link/image",
            avatar: "https://" + user[4] + ".ipfs.w3s.link/image",
            name: user[3],
            job: user[7],
            stats: [
                {
                    value: "34K",
                    label: "Followers",
                },
                {
                    value: "187",
                    label: "Follows",
                },
                {
                    value: "1.6K",
                    label: "Posts",
                },
            ],
        }
        setStats(userStats)
    }
    const { Main } = useSuperFluid()
    const provider = useProvider()
    const { data: signer, isLoading } = useSigner()

    return (
        <>
            <Layout>
                <Head>
                    <title>Your Profile</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </Head>
                {/*<button onClick={() => {*/}
                {/*    console.log(isLoading)*/}
                {/*    if (!isLoading){*/}
                {/*        Main(provider, signer)*/}
                {/*    }*/}
                {/*}}>*/}
                {/*    superfluid*/}
                {/*</button>*/}
                <Stack m={"sm"} sx={{ height: "100%" }}>
                    <Banner {...stats} />
                    <NavTabs />
                </Stack>
            </Layout>
        </>
    )
}

export default UserProfile
