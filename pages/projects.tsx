import {Layout} from "../components/Layout";
import Head from "next/head";
import {Button, Center, Container, Skeleton} from "@mantine/core";
import {DisplayGrid} from "../components/DisplayGrid";
import {useEffect, useState} from "react";
import Link from "next/link";
import useTableland from "../hooks/useTableland";

export default function Projects() {
    const [onLoad, setOnLoad] = useState(true)
    const {getAllProjects} = useTableland()
    const [projectsData, setProjectsData] = useState([])

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const projectsData = await getAllProjects()
        console.log("projectsData", projectsData)
        setProjectsData(projectsData)
        setOnLoad(false)
    }

    return (
        <Layout>
            <Head>
                <title>Projects - m3tadao</title>
                <meta name="description" content="Organisations"/>
            </Head>
            <Container>
                <Skeleton visible={onLoad} animate={true}>
                    <DisplayGrid isOrganisations={false} data={projectsData} onLoad={onLoad}/>
                </Skeleton>
            </Container>
        </Layout>
    )
}