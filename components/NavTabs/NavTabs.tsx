import {Tabs, Grid, Container} from '@mantine/core'
import {PostCard} from "../PostCard";
import PostData from "../PostCard/data.json"
import XmtpChat from "../Chats/XmtpChat"
import {ChatRoom} from "../ChatRoom";

export function NavTabs() {
    return (
        <Tabs variant="outline" defaultValue="first">
            <Tabs.List grow position="center" mb={75}>
                <Tabs.Tab value="first">Posts</Tabs.Tab>
                <Tabs.Tab value="second">Second tab</Tabs.Tab>
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
                <p>second Tab</p>
            </Tabs.Panel>
            <Tabs.Panel value={"third"}>
                <p>third Tab</p>
            </Tabs.Panel>
        </Tabs>
    )
}