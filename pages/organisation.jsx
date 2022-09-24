import {Layout} from "../components/Layout";
import Head from "next/head";
import {Text, Container, Grid, Tabs, Title, Paper, Center, Stack, SimpleGrid, Button, Group, Modal} from "@mantine/core"
import {ProjectCard} from "../components/ProjectCard"
import {useEffect, useState} from "react"
import {IconPlus} from "@tabler/icons"
import {EditOrganisation} from "../components/EditOrganisation";
import {ChatRoom} from "../components/ChatRoom";
import Link from "next/link";
import {MemberCard} from "../components/MemberCard";
import {CreatePost} from "../components/CreatePost";
import { useRouter } from "next/router";
import {fetchOrganisationDetails} from "../constants/graphql/queries"
import { graphql } from "@valist/sdk";

const data = [
    {
        avatar: "https://img.freepik.com/free-vector/cute-owl-wearing-earmuffs-cartoon-icon-illustration_138676-2701.jpg?w=740&t=st=1663785103~exp=1663785703~hmac=b32e960a6a1d75f639dde13fe4aef0cd679d58d17b0362cad4d6f6b787f214e8",
        name: "m3tadao",
        shortDescription: " tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        avatar: "https://img.freepik.com/free-vector/cute-owl-wearing-earmuffs-cartoon-icon-illustration_138676-2701.jpg?w=740&t=st=1663785103~exp=1663785703~hmac=b32e960a6a1d75f639dde13fe4aef0cd679d58d17b0362cad4d6f6b787f214e8",
        name: "moog3",
        shortDescription: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        avatar: "https://img.freepik.com/free-vector/cute-owl-wearing-earmuffs-cartoon-icon-illustration_138676-2701.jpg?w=740&t=st=1663785103~exp=1663785703~hmac=b32e960a6a1d75f639dde13fe4aef0cd679d58d17b0362cad4d6f6b787f214e8",
        name: "m3tadao",
        shortDescription: "lorem  ipsum dolor sit amet consectetur adipiscingipsum dolor sit amet consectetur adipiscingipsum dolor sit amet consectetur adipiscingipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
        avatar: "https://img.freepik.com/free-vector/cute-owl-wearing-earmuffs-cartoon-icon-illustration_138676-2701.jpg?w=740&t=st=1663785103~exp=1663785703~hmac=b32e960a6a1d75f639dde13fe4aef0cd679d58d17b0362cad4d6f6b787f214e8",
        name: "moog3",
        shortDescription: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
]
const memberData = [
    {
        address: "0x0000000000000001234500000000000000000000",
        name: "person1"
    },
    {
        address: "0x0321000000000000000000000000000000000000",
        name: "person2"
    },
    {
        address: "0x0000000000000000000000000000000007770000",
        name: "person3"
    }
]

const Organisation = () => {
    const [activeTab, setActiveTab] = useState("first")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectsData, setProjectsData] = useState([])
    const [members, setMembers] = useState([])
    const [name, setName] = useState("")
    const router = useRouter()

    useEffect(()=>{
        initialize()

    },[])

    const initialize = async()=>{
        const accHex = router.query.accHex
        
        const query = {
            query: fetchOrganisationDetails,
            variables: {
                accHex: accHex
            }
        }

        // const graphRes = (await graphql.fetchGraphQL("https://api.thegraph.com/subgraphs/name/valist-io/valistmumbai", query)).data.accounts
        const graphRes = (await graphql.fetchGraphQL("https://api.thegraph.com/subgraphs/name/valist-io/valistmumbai", query)).data.account
        console.log("graphRes",graphRes)
        setName(graphRes.name)
        setProjectsData(graphRes.projects)
        setMembers(graphRes.members)
    }

    const projects = projectsData.map((project, index) => {
        return (
            <ProjectCard avatar={project.avatar} name={project.name} shortDescription={project.shortDescription}/>
        )
    })

    const postModal = <Modal
        opened={isModalOpen}
        size="60%"
        transition="fade"
        transitionDuration={500}
        transitionTimingFunction="ease"
        title={<Title>Add a post</Title>}
        onClose={() => setIsModalOpen(false)}>
        <Center>
            <CreatePost/>
        </Center>
    </Modal>

    return (
        <Layout>
            <Head>
                <title>Organisation - m3tadao</title>
            </Head>
            <Group position={"apart"} p={"xl"} mx={"xl"} my={"sm"}>
                <Title>
                    Welcome to {name} 👋
                </Title>
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
            </Group>
            {postModal}
            <Tabs variant="outline" defaultValue={activeTab} onTabChange={setActiveTab}>
                <Tabs.List grow position="center" mb={75}>
                    <Tabs.Tab value="first">Projects</Tabs.Tab>
                    <Tabs.Tab value="second">Chat</Tabs.Tab>
                    <Tabs.Tab value="third">Manage Organisation</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={"first"}>
                    <Container size={"xl"} mb={"xl"}>
                        <Paper shadow="xl" radius="lg" p="md" pt={"lg"}>
                            <Center my={"md"} sx={{width: "100%"}}>
                                <Grid>
                                    <Grid.Col lg={10}>
                                        <Container>
                                            <SimpleGrid cols={2} spacing={"xs"} breakpoints={[
                                                {maxWidth: 'lg', cols: 2, spacing: 'md'},
                                                {maxWidth: 'sm', cols: 1, spacing: 'sm'},
                                            ]}>
                                                <Link href={"/create-project"} passHref>
                                                    <Grid.Col>
                                                        <Paper radius="md" withBorder p="lg" sx={(theme) => ({
                                                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                                                            cursor: "pointer",
                                                        })}>
                                                            <Stack py={"13%"}>
                                                                <Center>
                                                                    <IconPlus size={128}/>
                                                                </Center>
                                                                <Center>
                                                                    <Text weight={700} size={"xl"}>Create Project</Text>
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
                                        {
                                            members.map((member, index) => {
                                                return (
                                                    <MemberCard address={member.id} name="Admin" />
                                                )
                                            })
                                        }
                                    </Grid.Col>
                                </Grid>
                            </Center>
                        </Paper>
                    </Container>
                </Tabs.Panel>
                <Tabs.Panel value={"second"}>
                    <Paper shadow="xl" radius="lg" p="md" pt={"lg"}>
                        <ChatRoom/>
                        <Center>
                            <Title order={6} color={"dimmed"}>Powered by XMTP</Title>
                        </Center>
                    </Paper>
                </Tabs.Panel>
                <Tabs.Panel value={"third"}>
                    <Container>
                        <Paper shadow="xl" radius="lg" p="md" pt={"lg"}>
                            <EditOrganisation/>
                        </Paper>
                    </Container>
                </Tabs.Panel>
            </Tabs>
        </Layout>
    )
}

export default Organisation