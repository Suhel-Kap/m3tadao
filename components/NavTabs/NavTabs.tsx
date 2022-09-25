import {Tabs, Grid, Container, Title, Center, Paper} from "@mantine/core"
import {PostCard} from "../PostCard"
import PostData from "../PostCard/data.json"
import {ChatRoom} from "../ChatRoom"
import {useEffect, useState} from "react"
import {ManageProfile} from "../ManageProfile"
import Link from "next/link"
import useContract from "../../hooks/useContract"

const defaultActive = "first"

export function NavTabs({isOwner, profId, postCount, isPostCountFetched}) {
    console.log("postCount navtabs", postCount)
    const [active, setActive] = useState(defaultActive)
    const [posts, setPosts] = useState([])
    const {getLensPost} = useContract()
    useEffect(() => {
        if (isPostCountFetched) {
            initializePosts()
        }
    }, [isPostCountFetched])
    console.log(posts)

    const initializePosts = async () => {
        for (let i = 1; i <= postCount; i++) {
            const postFromLens = await getLensPost(profId, i)
            const postArray = postFromLens.split(",")
            console.log("postArray", postArray)
            const response = await fetch("https://" + postArray[2] + ".ipfs.w3s.link/json")
            const jsonObj = await response.json()
            console.log("jsonObj", jsonObj)
            const post = {
                id: jsonObj.metadata_id,
                title: jsonObj.content,
                description: jsonObj.description,
                image: "https://" + jsonObj.image + ".ipfs.w3s.link/image",
                authorAddress: jsonObj.address
            }
            setPosts((oldPosts) => [...oldPosts, post])
        }
    }
    return (
        <Tabs
            variant="outline"
            defaultValue={defaultActive}
            onTabChange={(event) => {
                setActive(event)
            }}
        >
            <Tabs.List grow position="center" mb={75}>
                <Tabs.Tab value="first">Posts</Tabs.Tab>
                {isOwner && (
                    <>
                        <Tabs.Tab value="second">Your Chats</Tabs.Tab>
                        <Tabs.Tab value="third">Manage Profile</Tabs.Tab>
                    </>
                )}
            </Tabs.List>

            <Tabs.Panel value={"first"}>
                <Paper shadow="xl" radius="lg" p="md" pt={"lg"}>
                    <Grid>
                        <Grid.Col lg={4} md={6}>
                            <Link href={"/post"} passHref style={{cursor: "pointer"}}>
                                <Container size={400} px="xs">
                                    <PostCard {...PostData} />
                                </Container>
                            </Link>
                        </Grid.Col>
                        <Grid.Col lg={4} md={6}>
                            <Container size={400} px="xs">
                                <PostCard {...PostData} />
                            </Container>
                        </Grid.Col>
                        <Grid.Col lg={4} md={6}>
                            <Container size={400} px="xs">
                                <PostCard {...PostData} />
                            </Container>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Tabs.Panel>
            <Tabs.Panel value={"second"}>
                <Title order={4} align={"center"} mb={"lg"} mt={0}>
                    Your Conversations
                </Title>
                <Paper shadow="xl" radius="lg" p="md">
                    {active === "second" ? <ChatRoom isActive={active === "second"}/> : null}
                    <Center>
                        <Title order={6} color={"dimmed"}>
                            Powered by XMTP
                        </Title>
                    </Center>
                </Paper>
            </Tabs.Panel>
            <Tabs.Panel value={"third"}>
                <Paper shadow="xl" radius="lg" p="md">
                    <ManageProfile/>
                </Paper>
            </Tabs.Panel>
        </Tabs>
    )
}
