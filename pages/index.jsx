import Head from 'next/head'
import {unstable_getServerSession} from "next-auth"
import {getAuthOptions} from "./api/auth/[...nextauth]"
import {useAccount} from "wagmi";
import {useEffect} from "react";
import {useRouter} from "next/router";
import { useSession } from "next-auth/react"
import {Hero} from "../components/Hero";

export const getServerSideProps = async ({req, res}) => {
    return {
        props: {
            session: await unstable_getServerSession(req, res, getAuthOptions(req))
        }
    }
}

const Home = () => {
    const router = useRouter()
    const {status : sessionStatus} = useSession()
    useEffect(() => {
        sessionStatus === "authenticated" && router.push("/user-profile")
    }, [sessionStatus])

    return (
        <>
            <Head>
                <title>m3tadao</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <Hero />
        </>
    )
}

export default Home
