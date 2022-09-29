import type { NextPage } from "next"
import Head from "next/head"
import { Banner } from "../components/Banner"
import { NavTabs } from "../components/NavTabs"
import defaultStats from "../components/Banner/stats.json"
import { useAccount, useProvider, useSigner } from "wagmi"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Layout } from "../components/Layout"
import { Stack } from "@mantine/core"
import useTableland from "../hooks/useTableland"
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client'
import { fetchUserProfile } from "../constants/graphql/queries"
import useContract from "../hooks/useContract"

const UserProfile: NextPage = () => {
    const { isConnected, isDisconnected, status } = useAccount()
    const router = useRouter()
    const { address } = useAccount()
    const [profId, setProfId] = useState()
    const isOwner = address === router.query.address
    const [stats, setStats] = useState(defaultStats)
    const [isPostCountFetched, setIsPostCountFetched] = useState(false)
    const { getUserData } = useTableland()
    const { getLensPostCount } = useContract()
    const client = new ApolloClient({
        uri: 'https://api-mumbai.lens.dev/',
        cache: new InMemoryCache(),
    })
    useEffect(() => {
        if (router.query) {
            initialize().then()
        }
    }, [router.query])

    const initialize = async () => {
        const user = await getUserData(router.query.address)
        console.log(user)
        setProfId(user[1])
        // const response = await fetch("https://" + user[7] + ".ipfs.w3s.link/json")
        // const externalProfileData: any = response.json()
        const profileHex = user[2]
        const userStats = {
            image: "https://" + user[5] + ".ipfs.w3s.link/image",
            avatar: "https://" + user[4] + ".ipfs.w3s.link/image",
            name: user[3],
        }
        setStats((oldStats) => ({ ...oldStats, ...userStats }))
        fetchPostsCount(user[1])
        fetchExternalURIs(user[7])

        const query = {
            query: gql(fetchUserProfile),
            variables: {
                profHex: profileHex,
            },
        }

        const graphRes = (await client.query(query)).data
            .profiles.items[0].stats
        const lensStats = [
            {
                value: graphRes.totalFollowers,
                label: "Followers",
            },
            {
                value: graphRes.totalFollowing,
                label: "Follows",
            },
            {
                value: graphRes.totalPosts,
                label: "Posts",
            },
        ]
        setStats((oldStats) => ({ ...oldStats, stats: lensStats }))
    }

    const fetchPostsCount = async (profileId) => {
        console.log("fetchTotalPosts")
        const totalPosts = await getLensPostCount(profileId)
        console.log("total post", totalPosts)
        setStats((oldStats) => {
            const stats = oldStats.stats
            stats[2] = {
                value: totalPosts,
                label: "Posts",
            }
            return { ...oldStats, stats }
        })
        setIsPostCountFetched(true)
    }

    const fetchExternalURIs = async (cid: string) => {
        const response = await fetch("https://" + cid + ".ipfs.w3s.link/json")
        const externalProfileData = await response.json()
        console.log("ex", externalProfileData)
        setStats((oldStats) => ({ ...oldStats, ...externalProfileData }))
    }

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
                    <Banner isOwner={isOwner} {...stats} profId={profId} />
                    <NavTabs
                        isOwner={isOwner}
                        isPostCountFetched={isPostCountFetched}
                        profId={profId}
                        postCount={
                            stats && stats.stats && stats.stats[2] ? stats.stats[2].value : 0
                        }
                    />
                </Stack>
            </Layout>
        </>
    )
}

export default UserProfile
