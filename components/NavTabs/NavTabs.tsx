import {Tabs, Grid, Container, Title, Center, Paper} from '@mantine/core'
import {PostCard} from "../PostCard";
import PostData from "../PostCard/data.json"
import {ChatRoom} from "../ChatRoom";
import {useState} from "react";
import {ManageProfile} from "../ManageProfile";
import Link from "next/link";

export function NavTabs() {
    const [active, setActive] = useState("second")
    return (
        <Tabs variant="outline" defaultValue="second" onTabChange={(event) => {
            setActive(event)
        }}>
            <Tabs.List grow position="center" mb={75}>
                <Tabs.Tab value="first">Posts</Tabs.Tab>
                <Tabs.Tab value="second">Your Chats</Tabs.Tab>
                <Tabs.Tab value="third">Manage Profile</Tabs.Tab>
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
                    {active === "second" ? <ChatRoom/> : null}
                    <Center>
                        <Title order={6} color={"dimmed"}>Powered by XMTP</Title>
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