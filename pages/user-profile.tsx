import type {NextPage} from 'next'
import Head from 'next/head'
import {Banner} from "../components/Banner";
import {NavTabs} from "../components/NavTabs"
import stats from "../components/Banner/stats.json"
import {useAccount, useProvider, useSigner} from "wagmi";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {Layout} from "../components/Layout";
import {Container, Stack} from "@mantine/core"
import useSuperFluid from "../hooks/useSuperFluid"

const UserProfile: NextPage = () => {
    const {isConnected, isDisconnected, status} = useAccount()
    const router = useRouter()
    useEffect(() => {
        if (!isConnected) {
            router.push("/")
        }
    }, [isConnected, isDisconnected, status])
    const {Main} = useSuperFluid()
    const provider = useProvider()
    const {data: signer, isLoading} = useSigner()



    return (
        <>
            <Layout>
                <Head>
                    <title>User Profile</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
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
                    <Banner {...stats}/>
                    <NavTabs/>
                </Stack>
            </Layout>
        </>
    )
}

export default UserProfile
