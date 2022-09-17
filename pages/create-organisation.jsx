import {CreateOrganisation} from "../components/CreateOrganisation";
import {Container} from "@mantine/core";
import {Layout} from "../components/Layout";
import Head from "next/head";

export default function CreateOrg() {
    return (
        <Layout>
            <Head>
                <title>Create Organisation</title>
            </Head>
            <Container size={"xs"}>
                <CreateOrganisation/>
            </Container>
        </Layout>
    )
}