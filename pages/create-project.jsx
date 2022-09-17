import {CreateProject} from "../components/CreateProject";
import {Container} from "@mantine/core";
import {Layout} from "../components/Layout";
import Head from "next/head";

export default function CreateProj() {
    return (
        <Layout>
            <Head>
                <title>Create Project</title>
            </Head>
        <Container size={"xs"}>
            <CreateProject/>
        </Container>
        </Layout>
    )
}