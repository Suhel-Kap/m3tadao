import {Tabs, Grid, Container, Title} from '@mantine/core'
import {PostCard} from "../PostCard";
import PostData from "../PostCard/data.json"
import {ChatRoom} from "../ChatRoom";
import {DirectChat} from "../DirectChat";
import {useState} from "react";

export function NavTabs() {
    const [active, setActive] = useState()
    return (
        <Tabs variant="outline" defaultValue="first" onTabChange={(event) => {setActive(event)}}>
            <Tabs.List grow position="center" mb={75}>
                <Tabs.Tab value="first">Posts</Tabs.Tab>
                <Tabs.Tab value="second">Your Chats</Tabs.Tab>
                <Tabs.Tab value="third">Third tab</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={"first"}>
                <Grid>
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
                    <Grid.Col lg={4} md={6}>
                        <Container size={400} px="xs">
                            <PostCard {...PostData} />
                        </Container>
                    </Grid.Col>
                </Grid>
            </Tabs.Panel>
            <Tabs.Panel value={"second"}>
                <Title order={4} align={"center"} mb={"lg"} mt={0}>
                    Your Conversations
                </Title>
                {active === "second" ? <ChatRoom /> : null}
            </Tabs.Panel>
            <Tabs.Panel value={"third"}>
               Hello
            </Tabs.Panel>
        </Tabs>
    )
}