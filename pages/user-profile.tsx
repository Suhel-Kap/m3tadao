import type {NextPage} from 'next'
import Head from 'next/head'
import {Banner} from "../components/Banner";
import {NavTabs} from "../components/NavTabs"
import stats from "../components/Banner/stats.json"
import {useAccount} from "wagmi";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {Layout} from "../components/Layout";

const UserProfile: NextPage = () => {
    const {isConnected, isDisconnected, status} = useAccount()
    const router = useRouter()
    useEffect(() => {
        if (!isConnected) {
            router.push("/")
        }
    }, [isConnected, isDisconnected, status])

    return (
        <>
            <Layout>
                <Head>
                    <title>User Profile</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                </Head>
                <Banner {...stats}/>
                <NavTabs/>
            </Layout>
        </>
    )
}

export default UserProfile
