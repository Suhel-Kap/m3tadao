import { Layout } from "../components/Layout"
import Head from "next/head"
import {Text, Container, Grid, Tabs, Title, Paper, Center, Stack, SimpleGrid, Button, Group, Modal,} from "@mantine/core"
import { ProjectCard } from "../components/ProjectCard"
import { useEffect, useState } from "react"
import { IconPlus } from "@tabler/icons"
import { EditOrganisation } from "../components/EditOrganisation"
import Link from "next/link"
import { MemberCard } from "../components/MemberCard"
import { CreatePost } from "../components/CreatePost"
import { useRouter } from "next/router"
import { fetchOrganisationDetails } from "../constants/graphql/queries"
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client'
import { HiringRequestTable } from "../components/HiringRequestTable"
import { RequirementsCard } from "../components/RequirementsCard"

const Organisation = () => {
    const [activeTab, setActiveTab] = useState("first")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectsData, setProjectsData] = useState([])
    const [members, setMembers] = useState([])
    const [name, setName] = useState("")
    const [accId, setAccId] = useState("")

    const router = useRouter()
    const client = new ApolloClient({
        uri: 'https://api.thegraph.com/subgraphs/name/valist-io/valistmumbai',
        cache: new InMemoryCache(),
    })

    useEffect(() => {
        initialize().then()
        setAccId(router.query.accId)
    }, [router.query])

    const initialize = async () => {
        const accHex = router.query.accHex

        const query = {
            query: gql(fetchOrganisationDetails),
            variables: {
                accHex: accHex,
            },
        }

        // const graphRes = (await graphql.fetchGraphQL("https://api.thegraph.com/subgraphs/name/valist-io/valistmumbai", query)).data.accounts
        const graphRes = (
            await client.query(query)
        ).data?.account
        setName(graphRes.name)
        setProjectsData(graphRes.projects)
        setMembers(
            graphRes.members.filter(
                (mem) => mem.id !== "0x28fb200c401bcc2eb407d29aed6b5bae2d3f98c3"
            )
        )
    }

    const projects = projectsData.map((project, index) => {
        return (
            <ProjectCard
                key={index}
                organisationName={name}
                projectId={project.id}
                avatar={project.avatar}
                name={project.name}
                shortDescription={project.shortDescription}
            />
        )
    })

    const postModal = (
        <Modal
            opened={isModalOpen}
            size="60%"
            transition="fade"
            transitionDuration={500}
            transitionTimingFunction="ease"
            title={<Title>Add a post</Title>}
            onClose={() => setIsModalOpen(false)}
        >
            <Center>
                <CreatePost />
            </Center>
        </Modal>
    )

    return (
        <Layout>
            <Head>
                <title>Organisation - m3tadao</title>
            </Head>
            <Group position={"apart"} p={"xl"} mx={"xl"} my={"sm"}>
                <Group>
                    <Title>Welcome to {name} 👋</Title>
                    <Text color={"dimmed"} size={"sm"}>
                        Powered by Valist
                    </Text>
                </Group>
                <Button.Group>
                    <Button
                        radius="md"
                        mt="xl"
                        size="md"
                        variant={"light"}
                        onClick={() => setIsModalOpen(true)}
                    >
                        New Post
                    </Button>
                </Button.Group>
            </Group>
            {postModal}
            <Tabs variant="outline" defaultValue={activeTab} onTabChange={setActiveTab}>
                <Tabs.List grow position="center" mb={75}>
                    <Tabs.Tab value="first">Projects</Tabs.Tab>
                    <Tabs.Tab value={"requirements"}>Requirements</Tabs.Tab>
                    <Tabs.Tab value="fourth">Hiring Requests</Tabs.Tab>
                    <Tabs.Tab value="third">Manage Organisation</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={"first"}>
                    <Container size={"xl"} mb={"xl"}>
                        <Paper shadow="xl" radius="lg" p="md" pt={"lg"}>
                            <Center my={"md"} sx={{ width: "100%" }}>
                                <Grid>
                                    <Grid.Col lg={10}>
                                        <Container>
                                            <SimpleGrid
                                                cols={2}
                                                spacing={"xs"}
                                                breakpoints={[
                                                    {
                                                        maxWidth: "lg",
                                                        cols: 2,
                                                        spacing: "md",
                                                    },
                                                    { maxWidth: "sm", cols: 1, spacing: "sm" },
                                                ]}
                                            >
                                                <Link
                                                    href={`/create-project?accId=${accId}`}
                                                    passHref
                                                >
                                                    <Grid.Col>
                                                        <Paper
                                                            radius="md"
                                                            withBorder
                                                            p="lg"
                                                            sx={(theme) => ({
                                                                backgroundColor:
                                                                    theme.colorScheme === "dark"
                                                                        ? theme.colors.dark[8]
                                                                        : theme.white,
                                                                cursor: "pointer",
                                                            })}
                                                        >
                                                            <Stack py={"13%"}>
                                                                <Center>
                                                                    <IconPlus size={128} />
                                                                </Center>
                                                                <Center>
                                                                    <Text weight={700} size={"xl"}>
                                                                        Create Project
                                                                    </Text>
                                                                </Center>
                                                            </Stack>
                                                        </Paper>
                                                    </Grid.Col>
                                                </Link>
                                                {projects}
                                            </SimpleGrid>
                                        </Container>
                                    </Grid.Col>
                                    <Grid.Col lg={2}>
                                        <Text weight={700}>Members</Text>
                                        {members.map((member, index) => {
                                            return (
                                                <MemberCard
                                                    key={index}
                                                    address={member.id}
                                                    name="Admin"
                                                />
                                            )
                                        })}
                                    </Grid.Col>
                                </Grid>
                            </Center>
                        </Paper>
                    </Container>
                </Tabs.Panel>
                <Tabs.Panel value={"requirements"}>
                    <Container size={"lg"} mb={"xl"}>
                        <SimpleGrid
                            cols={2}
                            spacing={"md"}
                            breakpoints={[{ maxWidth: 600, cols: 1, spacing: "sm" }]}
                        >
                            <RequirementsCard
                                description={"We are looking for project managers."}
                                title={"Project manager"}
                                price={"20 MATIC"}
                                deadline={"30 Sept 2022"}
                                badges={["Defi", "Design", "Management"]}
                            />
                            <RequirementsCard
                                description={"We need people who can help us with marketing."}
                                title={"Digital Marketer"}
                                price={"50 MATIC"}
                                deadline={"26 Sept 2022"}
                                badges={["Defi", "Design", "Management"]}
                            />
                        </SimpleGrid>
                    </Container>
                </Tabs.Panel>
                <Tabs.Panel value={"third"}>
                    <Container>
                        <Paper shadow="xl" radius="lg" p="md" pt={"lg"}>
                            <EditOrganisation
                                members={Object.keys(members).map(function (key) {
                                    return members[key].id
                                })}
                            />
                        </Paper>
                    </Container>
                </Tabs.Panel>
                <Tabs.Panel value={"fourth"}>
                    <Container>
                        <Paper shadow="xl" radius="lg" p="md" pt={"lg"}>
                            <HiringRequestTable
                                data={{
                                    title: "some title",
                                    description: "some description",
                                    address: "0x0000000000000000000000000000000000000000",
                                }}
                            />
                        </Paper>
                    </Container>
                </Tabs.Panel>
            </Tabs>
        </Layout>
    )
}

export default Organisation
