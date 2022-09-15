import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Banner} from "../components/Banner";
import {NavTabs} from "../components/NavTabs"
import stats from "../components/Banner/stats.json"
import {DarkModeToggle} from "../components/DarkModeToggle";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            {/*<DarkModeToggle />*/}
            <Banner {...stats}/>
            <NavTabs />
        </>
    )
}

export default Home
