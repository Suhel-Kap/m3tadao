import {Grid, Text, NavLink, Center} from "@mantine/core";
import {useState} from "react";
import {IconChevronRight} from "@tabler/icons";
import XmtpChat from "../Chats/XmtpChat"
import {DirectChat} from "../DirectChat";

export function ChatRoom() {
    const [active, setActive] = useState(0)
    const [xmtp, setXmtp] = useState()
    const data = [
        {
            title: "Chat Room 1",
            groupId: "1234",
            groupChat: true
        },
        {
            title: "Chat Room 2",
            groupId: "1235",
            groupChat: true
        },
        {
            title: "Chat Room 3",
            otherUser: "0x0de82DCC40B8468639251b089f8b4A4400022e04",
            groupChat: false
        }
    ]

    const items = data.map((item, index) => (
        <NavLink
            sx={(theme) => ({width: "85%", [theme.fn.smallerThan("md")]: {width: "100%"}})}
            key={item.groupId || item.otherUser}
            active={index === active}
            label={item.title}
            rightSection={<IconChevronRight size={14} stroke={1.5}/>}
            onClick={() => setActive(index)}/>
    ))


    return (
        <Center sx={(theme) => ({
            [theme.fn.smallerThan("md")]: {
                width: "100%",
            }
        })}>
            <Grid>
                <Grid.Col lg={3} md={2}>
                    {items}
                </Grid.Col>
                <Grid.Col lg={9} md={10}>
                    <Text>
                        {/*<XmtpChat groupId={data[active].groupId}/>*/}
                        {/*<XmtpChat />*/}
                        {/*<DirectChat otherUser={"0x0de82DCC40B8468639251b089f8b4A4400022e04"} />*/}
                        {data[active].groupChat ? <XmtpChat setXmtp={setXmtp} /> : (xmtp && <DirectChat xmtp={xmtp} otherUser={data[active].otherUser} />)}
                    </Text>
                </Grid.Col>
            </Grid>
        </Center>
    )
}