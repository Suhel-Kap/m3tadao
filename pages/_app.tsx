import { AppProps } from "next/app"
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import "@rainbow-me/rainbowkit/styles.css"
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth"
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
    darkTheme,
} from "@rainbow-me/rainbowkit"
import { SessionProvider } from "next-auth/react"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import AuthWrapper from "../components/AuthenticationWrapper/AuthWrapper"
import { XMTPContextProvider } from "../context/XMTPProvider"

const { chains, provider, webSocketProvider } = configureChains(
    [chain.polygonMumbai],
    [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }), publicProvider()]
)

const { wallets } = getDefaultWallets({
    appName: "M3tadao",
    chains,
})

const metadaoAppInfo = {
    appName: "M3tadao",
}

const connectors = connectorsForWallets([...wallets])

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
})

const getSiweMessageOptions = () => ({
    statement: "Sign in to M3tadao",
})

export default function App(props: AppProps) {
    const { Component, pageProps } = props
    //
    // const {isDisconnected, status} = useAccount()
    //
    // const router = useRouter()
    // useEffect(() => {
    //     if(isDisconnected)
    //         router.push("/")
    // }, [status])

    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    })

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

    useHotkeys([["mod+J", () => toggleColorScheme()]])

    return (
        <WagmiConfig client={wagmiClient}>
            <SessionProvider refetchInterval={0} session={pageProps.session}>
                <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
                    <RainbowKitProvider
                        theme={darkTheme({
                            accentColor: "#228be6",
                            borderRadius: "large",
                        })}
                        chains={chains}
                        appInfo={metadaoAppInfo}
                        modalSize={"compact"}
                    >
                        <ColorSchemeProvider
                            colorScheme={colorScheme}
                            toggleColorScheme={toggleColorScheme}
                        >
                            <MantineProvider
                                withGlobalStyles
                                withNormalizeCSS
                                theme={{ colorScheme }}
                            >
                                <NotificationsProvider position="top-right" zIndex={2077}>
                                    <AuthWrapper>
                                        <XMTPContextProvider>
                                            <Component {...pageProps} />
                                        </XMTPContextProvider>
                                    </AuthWrapper>
                                </NotificationsProvider>
                            </MantineProvider>
                        </ColorSchemeProvider>
                    </RainbowKitProvider>
                </RainbowKitSiweNextAuthProvider>
            </SessionProvider>
        </WagmiConfig>
    )
}
