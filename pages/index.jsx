import Head from "next/head"
import { unstable_getServerSession } from "next-auth"
import { getAuthOptions } from "./api/auth/[...nextauth]"
import { useAccount } from "wagmi"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { Hero } from "../components/Hero"
import useTableland from "../hooks/useTableland"

export const getServerSideProps = async ({ req, res }) => {
    return {
        props: {
            session: await unstable_getServerSession(req, res, getAuthOptions(req)),
        },
    }
}

const Home = () => {
    const router = useRouter()
    const {address} = useAccount()
    const { status: sessionStatus } = useSession()
    const { getUserExists } = useTableland()
    useEffect(() => {
        sessionStatus === "authenticated" && address && checkStatus()
    }, [sessionStatus, address])

    const checkStatus = async () => {
        const isUserExists = await getUserExists(address)
        if (isUserExists) {
            router.push("/home")
        } else {
            router.push("/registration")
        }
    }

    return (
        <>
            <Head>
                <title>m3tadao</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Hero />
        </>
    )
}

export default Home
