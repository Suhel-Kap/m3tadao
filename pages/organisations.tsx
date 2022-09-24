import {Layout} from "../components/Layout";
import Head from "next/head";
import {Button, Center, Container, Skeleton} from "@mantine/core";
import {DisplayGrid} from "../components/DisplayGrid";
import {useState} from "react";
import Link from "next/link";

export default function Organisations() {
    const [onLoad, setOnLoad] = useState(true)

    return (
        <Layout>
            <Head>
                <title>Organisations - m3tadao</title>
                <meta name="description" content="Organisations"/>
            </Head>
            <Container>
                <Center>
                    <Button.Group>
                        <Button component={"a"}
                                radius="md"
                                mt="xl"
                                size="md"
                                variant={"light"} onClick={() => setOnLoad(!onLoad)}>Load</Button>
                        <Link href={"/create-organisation"} passHref>
                            <Button
                                component={"a"}
                                radius="md"
                                mt="xl"
                                size="md"
                                variant={"light"}
                                // color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                            >
                                New Organisation
                            </Button>
                        </Link>
                    </Button.Group>
                </Center>
                <DisplayGrid onLoad={onLoad}/>
            </Container>
        </Layout>
    )
}