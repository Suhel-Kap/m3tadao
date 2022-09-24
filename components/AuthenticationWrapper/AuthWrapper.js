import Head from "next/head"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import {useEffect} from "react";
import {AppProps} from "next/app";
const AuthWrapper = (props) => {
    // const {Component, pageProps} = props
    const router = useRouter()

    const {isConnected,isDisconnected, status} = useAccount()

    useEffect(() => {
        if(isDisconnected && router.pathname !== "/" && router.pathname !== "/registration") {
            router.push("/")
        }
    }, [status])

    return (
        <>
            {isConnected ? props.children : ((router.pathname === "/" || router.pathname === "/registration") ? props.children : null)}
        </>
    )
}

export default AuthWrapper
