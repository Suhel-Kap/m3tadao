import { HeaderSimple } from "../HeaderSimple"
import { AppShell, Navbar, Header } from "@mantine/core"
import { Footer } from "../Footer"

export function Layout({ children }) {
    return (
        <AppShell
            padding="md"
            header={<HeaderSimple />}
            footer={<Footer />}
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
        >
            {children}
        </AppShell>
    )
}
