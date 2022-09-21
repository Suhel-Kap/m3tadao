import Head from "next/head";
import {Container} from "@mantine/core";
import {Layout} from "../components/Layout";
import {CreateRelease} from "../components/CreateRelease";

export default function CreateRel(){
    return (
        <Layout>
            <Head>
                <title>Create Release</title>
            </Head>
            <Container size={"xs"}>
                <CreateRelease />
            </Container>
        </Layout>
    )
}