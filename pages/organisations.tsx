import {Layout} from "../components/Layout";
import Head from "next/head";
import {Button, Center, Container, Skeleton} from "@mantine/core";
import {DisplayGrid} from "../components/DisplayGrid";
import {useEffect, useState} from "react";
import Link from "next/link";
import useTableland from "../hooks/useTableland";

export default function Organisations() {
    const [onLoad, setOnLoad] = useState(true)
    const {getOrganisationsData} = useTableland()
    const [organisationsData, setOrganisationData] = useState([])

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const organisationsDataFromTableland = await getOrganisationsData()
        console.log("organisationsDataFromTableland", organisationsDataFromTableland)
        setOrganisationData(organisationsDataFromTableland)
        setOnLoad(false)
    }
    return (
        <Layout>
            <Head>
                <title>Organisations - m3tadao</title>
                <meta name="description" content="Organisations"/>
            </Head>
            <Container>
                <Center>
                    <Button.Group>
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
                <Skeleton visible={onLoad} animate={true}>
                    <DisplayGrid onLoad={onLoad} data={organisationsData} isOrganisations={true}/>
                </Skeleton>
            </Container>
        </Layout>
    )
}