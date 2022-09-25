import { Layout } from "../components/Layout"
import {
    Center,
    Button,
    Modal,
    ActionIcon,
    Title,
    Text,
    Group,
    Container,
    SimpleGrid,
    Skeleton,
    Grid,
    useMantineTheme,
    ScrollArea,
} from "@mantine/core"
import { CreatePost } from "../components/CreatePost"
import Head from "next/head"
import { IconCirclePlus } from "@tabler/icons"
import { useEffect, useState } from "react"
import { AuthorCard } from "../components/AuthorCard"
import { HomePost } from "../components/HomePost/HomePost"
import { HomeProjectCard } from "../components/HomeProjectCard"

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    useEffect(() => {
        console.log("hello")
    }, [])
    const theme = useMantineTheme()
    const PRIMARY_COL_HEIGHT = 300
    const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2

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
        <>
            <Layout>
                <Head>
                    <title>Home - m3tadao</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </Head>
                <Center m={"lg"}>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        leftIcon={<IconCirclePlus size={14} />}
                    >
                        Create Post
                    </Button>
                </Center>
                <Container my="md">
                    <Grid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                        <Grid.Col lg={7}>
                            <Title my={"sm"}>Latest Posts</Title>
                            <ScrollArea
                                style={{ height: "80vh" }}
                                scrollbarSize={4}
                                scrollHideDelay={500}
                            >
                                <HomePost
                                    postedAt={"2 days ago"}
                                    image={"./hero.webp"}
                                    body={
                                        "Lorem ipsum doler Lorem ipsum dolerLorem ipsum dolerLorem ipsum doler"
                                    }
                                    author={{
                                        name: "Suhel",
                                        image: "https://avatars.githubusercontent.com/u/30869493?v=4",
                                    }}
                                />
                                <HomePost
                                    postedAt={"2 days ago"}
                                    body={
                                        "Lorem ipsum doler Lorem ipsum dolerLorem ipsum dolerLorem ipsum doler"
                                    }
                                    author={{
                                        name: "Suhel",
                                        image: "https://avatars.githubusercontent.com/u/30869493?v=4",
                                    }}
                                />
                                <HomePost
                                    postedAt={"2 days ago"}
                                    body={
                                        "Lorem ipsum doler Lorem ipsum dolerLorem ipsum dolerLorem ipsum doler"
                                    }
                                    author={{
                                        name: "Suhel",
                                        image: "https://avatars.githubusercontent.com/u/30869493?v=4",
                                    }}
                                />
                                <HomePost
                                    postedAt={"2 days ago"}
                                    body={
                                        "Lorem ipsum doler Lorem ipsum dolerLorem ipsum dolerLorem ipsum doler"
                                    }
                                    author={{
                                        name: "Suhel",
                                        image: "https://avatars.githubusercontent.com/u/30869493?v=4",
                                    }}
                                />
                                <HomePost
                                    postedAt={"2 days ago"}
                                    body={
                                        "Lorem ipsum doler Lorem ipsum dolerLorem ipsum dolerLorem ipsum doler"
                                    }
                                    author={{
                                        name: "Suhel",
                                        image: "https://avatars.githubusercontent.com/u/30869493?v=4",
                                    }}
                                />
                                <HomePost
                                    postedAt={"2 days ago"}
                                    body={
                                        "Lorem ipsum doler Lorem ipsum dolerLorem ipsum dolerLorem ipsum doler"
                                    }
                                    author={{
                                        name: "Suhel",
                                        image: "https://avatars.githubusercontent.com/u/30869493?v=4",
                                    }}
                                />
                            </ScrollArea>
                        </Grid.Col>
                        <Grid.Col lg={5}>
                            <Title my={"sm"}>Latest Projects</Title>
                            <ScrollArea
                                style={{ height: "80vh" }}
                                scrollbarSize={4}
                                scrollHideDelay={500}
                            >
                                <HomeProjectCard
                                    title={"m3tadao"}
                                    description={
                                        "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
                                    }
                                    image={"./hero.webp"}
                                />
                                <HomeProjectCard
                                    title={"m3tadao"}
                                    description={
                                        "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
                                    }
                                    image={"./hero.webp"}
                                />
                                <HomeProjectCard
                                    title={"m3tadao"}
                                    description={
                                        "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
                                    }
                                    image={"./hero.webp"}
                                />
                                <HomeProjectCard
                                    title={"m3tadao"}
                                    description={
                                        "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
                                    }
                                    image={"./hero.webp"}
                                />
                                <HomeProjectCard
                                    title={"m3tadao"}
                                    description={
                                        "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
                                    }
                                    image={"./hero.webp"}
                                />
                                <HomeProjectCard
                                    title={"m3tadao"}
                                    description={
                                        "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
                                    }
                                    image={"./hero.webp"}
                                />
                            </ScrollArea>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Layout>
            {postModal}
        </>
    )
}
