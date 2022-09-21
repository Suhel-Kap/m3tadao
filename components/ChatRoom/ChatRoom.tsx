import {Grid, Text, NavLink, Center} from "@mantine/core"
import {Client, ContentTypeId} from "@xmtp/xmtp-js"
import {useEffect, useState} from "react"
import {IconChevronRight} from "@tabler/icons"
import {useSigner} from "wagmi"
import XmtpChat from "../Chats/XmtpChat"
import {DirectChat} from "../DirectChat"

export class GroupMessageCodec {
    constructor(authorityId, typeId) {
        this.GROUP_MESSAGE_CONTENT_TYPE = new ContentTypeId({
            authorityId: authorityId,
            typeId: typeId,
            versionMajor: 0,
            versionMinor: 1,
        })
    }

    get contentType() {
        return this.GROUP_MESSAGE_CONTENT_TYPE
    }

    encode(content) {
        return {
            type: this.GROUP_MESSAGE_CONTENT_TYPE,
            parameters: {},
            fallback: "This was a group message that failed to decode",
            content: new TextEncoder().encode(JSON.stringify(content)),
        }
    }

    decode(content) {
        const bytes = new TextDecoder().decode(content.content)
        return JSON.parse(bytes)
    }
}

export function ChatRoom() {
    const [active, setActive] = useState(0)
    const {data: signer, isError, isLoading} = useSigner()
    const [xmtp, setXmtp] = useState()
    const data = [
        {
            title: "Chat Room 1",
            groupId: "1234",
            groupChat: true,
        },
        {
            title: "Chat Room 2",
            groupId: "1235",
            groupChat: true,
        },
        {
            title: "Chat Room 3",
            otherUser: "0x0de82DCC40B8468639251b089f8b4A4400022e04",
            groupChat: false,
        },
    ]

    const items = data.map((item, index) => (
        <NavLink
            sx={(theme) => ({width: "85%", [theme.fn.smallerThan("md")]: {width: "100%"}})}
            key={item.groupId || item.otherUser}
            active={index === active}
            label={item.title}
            rightSection={<IconChevronRight size={14} stroke={1.5}/>}
            onClick={() => setActive(index)}
        />
    ))

    useEffect(() => {
        if (signer) {
            initialize()
        }
    }, [isLoading, signer])

    const initialize = async () => {
        if (!xmtp) {
            const gmc = new GroupMessageCodec("123", "group message")
            // setGroupMessageCodec(gmc)
            // Create the client with your wallet. This will connect to the XMTP development network by default
            const client = await Client.create(signer, {
                codecs: [gmc],
            })
            setXmtp(client)
        }
    }

    return (
        <Center
            sx={(theme) => ({
                [theme.fn.smallerThan("md")]: {
                    width: "100%",
                },
            })}
        >
            <Grid>
                <Grid.Col lg={3} md={2}>
                    {items}
                </Grid.Col>
                <Grid.Col lg={9} md={10}>
                    <Text>
                        {data[active].groupChat ? (
                            <XmtpChat xmtp={xmtp}/>
                        ) : (
                            xmtp && <DirectChat xmtp={xmtp} otherUser={data[active].otherUser}/>
                        )}
                    </Text>
                </Grid.Col>
            </Grid>
        </Center>
    )
}