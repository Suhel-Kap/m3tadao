import type {NextPage} from 'next'
import Head from 'next/head'
import {Banner} from "../components/Banner";
import {NavTabs} from "../components/NavTabs"
import stats from "../components/Banner/stats.json"
import {DarkModeToggle} from "../components/DarkModeToggle";
import {Group} from "@mantine/core";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useAccount} from "wagmi";
import {useEffect} from "react";
import {useRouter} from "next/router";

const UserProfile: NextPage = () => {
    const {isConnected} = useAccount()
    const router = useRouter()
    useEffect(() => {
        if (!isConnected) {
            router.push("/")
        }
    }, [isConnected])

    return (
        <>
            <Head>
                <title>User Profile</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <Group position={"right"}>
                <DarkModeToggle/>
                <ConnectButton showBalance={false}/>
            </Group>
            <Banner {...stats}/>
            <NavTabs/>
        </>
    )
}

export default UserProfile
