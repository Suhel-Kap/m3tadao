import {HeaderSimple} from "../HeaderSimple";

export function Layout({ children }) {
    return (
        <>
            <HeaderSimple />
            <main>{children}</main>
        </>
    )
}