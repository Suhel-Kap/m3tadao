import {Layout} from "../components/Layout"
import {Center, Button, Modal, Text, Title, Container, Grid, ScrollArea,} from "@mantine/core"
import {CreatePost} from "../components/CreatePost"
import Head from "next/head"
import makeBlockie from "ethereum-blockies-base64";
import {IconCirclePlus} from "@tabler/icons"
import {useEffect, useState} from "react"
import {HomePost} from "../components/HomePost/HomePost"
import {HomeProjectCard} from "../components/HomeProjectCard"

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const postModal = (
        <Modal
            opened={isModalOpen}
            size="60%"
            transition="fade"
            transitionDuration={500}
            transitionTimingFunction="ease"
            title={<Title>Add a post <Text color={"dimmed"} size={"sm"}>Powered by Lens</Text></Title>}
            onClose={() => setIsModalOpen(false)}
        >
            <Center>
                <CreatePost/>
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
                        leftIcon={<IconCirclePlus size={14}/>}
                    >
                        Create Post
                    </Button>
                </Center>
                <Container my="md">
                    <Grid spacing="md" breakpoints={[{maxWidth: "sm", cols: 1}]}>
                        <Grid.Col lg={7}>
                            <Title my={"sm"}>Latest Posts</Title>
                            <ScrollArea
                                style={{height: "80vh"}}
                                scrollbarSize={4}
                                scrollHideDelay={500}
                            >
                                <HomePost
                                    postedAt={"1 day ago"}
                                    image={"https://images.pexels.com/photos/3013440/pexels-photo-3013440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                    body={
                                        "Hey all and welcome to Moog3. We are a DAO that is focused on creating a community of artists and developers to create a new type of NFTs. We are currently working on a new project called Moog3. We are a DAO that is focused on creating a community of artists and developers to create a new type of NFTs. We are currently working on a new project called Moog3. We are a DAO that is focused on creating a community of artists and developers to create a new type of NFTs. We are currently working on a new project called Moog3."
                                    }
                                    author={{
                                        name: "moog3",
                                        image: makeBlockie("0x87f5311daD4AbC84a79d31F6c19566129417F026"),
                                    }}
                                />
                                <HomePost
                                    postedAt={"2 days ago"}
                                    body={
                                        "Hey guys! It's nice to be here on this amazing platform"
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
                                style={{height: "80vh"}}
                                scrollbarSize={4}
                                scrollHideDelay={500}
                            >
                                <HomeProjectCard
                                    title={"m3tadao"}
                                    description={
                                        "Hey all and welcome to m3tadao. We are a DAO that is focused on creating a community of artists and developers to create a new type of NFTs. We are currently working on a new project called Moog3. We are a DAO that is focused on creating a community of artists and developers to create a new type of NFTs. We are currently working on a new project called Moog3. We are a DAO that is focused on creating a community of artists and developers to create a new type of NFTs. We are currently working on a new project called Moog3."
                                    }
                                    image={"https://images.pexels.com/photos/13291092/pexels-photo-13291092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                />
                                <HomeProjectCard
                                    title={"moog3"}
                                    description={
                                        "Moog3 is a new type of NFTs that is focused on creating a community of artists and developers to create a new type of NFTs. We are currently working on a new project called Moog3. We are a DAO that is focused on creating a community of artists and developers to create a new type of NFTs. We are currently working on a new project called Moog3. We are a DAO that is focused on creating a community of artists and developers to create a new type of NFTs. We are currently working on a new project called Moog3."
                                    }
                                    image={"https://images.pexels.com/photos/12346579/pexels-photo-12346579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
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
