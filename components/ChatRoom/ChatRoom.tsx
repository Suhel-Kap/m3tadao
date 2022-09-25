import { Grid, Text, NavLink, Center, Title, Skeleton } from "@mantine/core"
import { Client, ContentTypeId } from "@xmtp/xmtp-js"
import { useContext, useEffect, useState } from "react"
import { IconChevronRight } from "@tabler/icons"
import { useAccount, useSigner } from "wagmi"
import XmtpChat from "../Chats/XmtpChat"
import { DirectChat } from "../DirectChat"
import XMTPContext from "../../context/XMTPProvider"

export class GroupMessageCodec {
    GROUP_MESSAGE_CONTENT_TYPE: ContentTypeId
    constructor(authorityId: string, typeId: string) {
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

    encode(content: any) {
        return {
            type: this.GROUP_MESSAGE_CONTENT_TYPE,
            parameters: {},
            fallback: "This was a group message that failed to decode",
            content: new TextEncoder().encode(JSON.stringify(content)),
        }
    }

    decode(content: { content: BufferSource | undefined }) {
        const bytes = new TextDecoder().decode(content.content)
        return JSON.parse(bytes)
    }
}

export function ChatRoom({ isActive }) {
    const ctx = useContext(XMTPContext)
    const [active, setActive] = useState(0)
    const { data: signer, isLoading } = useSigner()
    const { address } = useAccount()
    const [conversations, setConversations] = useState([])
    // const [xmtp, setXmtp] = useState()
    const [isConversationLoading, setIsConversationLoading] = useState(true)
    const dataDefault = [
        {
            title: "Chat Room 1",
            groupId: "1234",
            groupChat: true,
        },
    ]
    const data = [...dataDefault, ...conversations]
    console.log("data", data)

    useEffect(() => {
        if (signer && isActive) {
            initialize()
        }
    }, [isLoading, signer, isActive])

    const initialize = async () => {
        // console.log("initializing")
        // console.log(ctx)
        // console.log("conversations", conversations)
        if (!ctx.isXMTPConnected) {
            const gmc = new GroupMessageCodec("123", "group message")
            // setGroupMessageCodec(gmc)
            // Create the client with your wallet. This will connect to the XMTP development network by default
            const client = await Client.create(signer, {
                codecs: [gmc],
            })
            ctx.setXMTP(client)
            ctx.setIsXMTPConnected(true)
            // setXmtp(client)
            initializeConversationsListener(client)
            return
        }

        initializeConversationsListener(ctx.XMTP)
    }

    const initializeConversationsListener = async (xmtp: Client | null) => {
        const allConversations = await xmtp.conversations.list()
        // console.log(allConversations)
        for (const conversation of allConversations) {
            // console.log("conversation", conversation)
            if (conversation.peerAddress == address) {
                continue
            }
            setConversations((oldConversations) => {
                // console.log("*******************************")
                // console.log("for : ", conversation)
                for (let i = 0; i < oldConversations.length; i++) {
                    // console.log("considering : ", oldConversations[i])
                    if (oldConversations[i].groupChat) {
                        // console.log("grouchat")
                        continue
                    }
                    if (conversation.peerAddress == oldConversations[i].otherUser) {
                        // console.log("nothing")
                        return oldConversations
                    }
                }
                // console.log("new user")
                return [
                    {
                        id: conversation.peerAddress,
                        title: conversation.peerAddress,
                        otherUser: conversation.peerAddress,
                        groupChat: false,
                    },
                    ...oldConversations,
                ]
            })
        }
        setIsConversationLoading(false)
    }

    const items = data.map((item, index) => (
        <NavLink
            sx={(theme) => ({ width: "85%", [theme.fn.smallerThan("md")]: { width: "100%" } })}
            key={item.groupId || item.otherUser}
            active={index === active}
            label={item.title}
            rightSection={<IconChevronRight size={14} stroke={1.5} />}
            onClick={() => {
                console.log("index", index)
                setActive(index)
            }}
        />
    ))
    const skeletonItems = new Array(10).fill(
        <Skeleton height={24} mt={6} width="100%" radius="xl" />
    )

    return (
        <Skeleton visible={isConversationLoading} animate={true}>
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
                        {/* {true ? skeletonItems : items} */}
                    </Grid.Col>
                    <Grid.Col lg={9} md={10}>
                        <Text>
                            {data[active].groupChat ? (
                                <XmtpChat xmtp={ctx.XMTP} />
                            ) : (
                                ctx.XMTP && (
                                    <DirectChat
                                        xmtp={ctx.XMTP}
                                        otherUser={data[active].otherUser}
                                    />
                                )
                            )}
                        </Text>
                    </Grid.Col>
                </Grid>
            </Center>
        </Skeleton>
    )
}
