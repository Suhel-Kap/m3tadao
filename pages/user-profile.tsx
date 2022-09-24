import type {NextPage} from "next"
import Head from "next/head"
import {Banner} from "../components/Banner"
import {NavTabs} from "../components/NavTabs"
import defaultStats from "../components/Banner/stats.json"
import {useAccount, useProvider, useSigner} from "wagmi"
import {useEffect, useState} from "react"
import {useRouter} from "next/router"
import {Layout} from "../components/Layout"
import {Container, Stack} from "@mantine/core"
import useSuperFluid from "../hooks/useSuperFluid"
import useTableland from "../hooks/useTableland"
import {graphql} from "@valist/sdk"
import {fetchUserProfile} from "../constants/graphql/queries"

const UserProfile: NextPage = () => {
    const {isConnected, isDisconnected, status} = useAccount()
    const router = useRouter()
    const [stats, setStats] = useState(defaultStats)
    const {getUserData} = useTableland()
    useEffect(() => {
        // if (!isConnected) {
        //     router.push("/")
        // }
        initialize()
    }, [])

    const initialize = async () => {
        const user = await getUserData()
        console.log(user)
        // const response = await fetch("https://" + user[7] + ".ipfs.w3s.link/json")
        // const externalProfileData: any = response.json()
        const profileHex = user[2]
        const userStats = {
            image: "https://" + user[5] + ".ipfs.w3s.link/image",
            avatar: "https://" + user[4] + ".ipfs.w3s.link/image",
            name: user[3],
        }
        setStats((oldStats) => ({...oldStats, ...userStats}))

        fetchExternalURIs(user[7])

        const query = {
            query: fetchUserProfile,
            variables: {
                profHex: profileHex
            }
        }


        const graphRes = (await graphql.fetchGraphQL("https://api-mumbai.lens.dev/", query)).data.profiles.items[0].stats
        console.log(graphRes)
        const lensStats = [
            {
                "value": graphRes.totalFollowers,
                label: "Followers"
            },
            {
                "value": graphRes.totalFollowing,
                label: "Follows"
            },
            {
                "value": graphRes.totalPosts,
                label: "Posts"
            }
        ]
        setStats((oldStats) => ({...oldStats, stats: lensStats}))
    }

    const fetchExternalURIs = async (cid: string) => {
        // const response = await fetch("https://" + cid + ".ipfs.w3s.link/json")
        // const externalProfileData: any = await response.json()
        // console.log(externalProfileData)
        const externalProfileData = {
            website: 'abc', twitter: '', github: '', interests: [], skills: [], designation: "student"
        }
        setStats((oldStats) => ({...oldStats, ...externalProfileData}))
    }

    const {Main} = useSuperFluid()
    const provider = useProvider()
    const {data: signer, isLoading} = useSigner()

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
                <Stack m={"sm"} sx={{height: "100%"}}>
                    <Banner {...stats} />
                    <NavTabs/>
                </Stack>
            </Layout>
        </>
    )
}

export default UserProfile
