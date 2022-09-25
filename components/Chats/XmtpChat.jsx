import { ContentTypeId } from "@xmtp/xmtp-js"
import { useEffect, useRef, useState } from "react"
import { useSigner } from "wagmi"
import { ActionIcon, Center, Group, Paper, ScrollArea, Skeleton, Stack } from "@mantine/core"
import { ChevronDown } from "tabler-icons-react"
import { useInView } from "react-intersection-observer"
import { ChatMessage } from "../ChatMessage"
import { ChatBox } from "../ChatBox"

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

export default function XmtpChat({ xmtp }) {
    const [groupChats, setGroupChats] = useState([])
    const { data: signer, isError, isLoading } = useSigner()
    const [isChatLoading, setIsChatLoading] = useState(true)
    // const [xmtp, setXmtp] = useState()
    const [groupMessageCodec, setGroupMessageCodec] = useState()
    const [isInitialized, setIsInitialized] = useState(false)
    const [id, setId] = useState("")
    const [hidden, setHidden] = useState(true)
    const dummy = useRef(null)
    const { ref, inView } = useInView({
        delay: 600,
        threshold: 1,
    })

    function goBot() {
        dummy.current?.scrollIntoView({ behavior: "smooth" })
        setHidden(true)
        setId("")
    }

    let groupMembers = [
        "0x0de82DCC40B8468639251b089f8b4A4400022e04",
        "0x9e03C44b5A09db89bf152F8C5500dF3360c1C5bF",
        "0x044B595C9b94A17Adc489bD29696af40ccb3E4d2",
    ]
    const groupMsgInputRef = useRef()
    const bottomDivRef = useRef()
    const sendGroupMessage = async () => {
        const msg = groupMsgInputRef.current.value
        for (const member of groupMembers) {
            try {
                const conversation = await xmtp.conversations.newConversation(member)
                conversation.send(msg, {
                    contentType: groupMessageCodec.GROUP_MESSAGE_CONTENT_TYPE,
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const isGroupMessage = (message) => {
        return message.contentType.typeId === "group message"
    }

    const onNewGroupMessage = (message) => {
        setGroupChats((currentChats) => {
            for (const msg of currentChats) {
                if (msg.id === message.id) {
                    return currentChats
                }
            }
            if (currentChats && currentChats.length !== 0) {
                return [...currentChats, message]
            } else {
                return [message]
            }
        })
        setIsChatLoading(false)
        bottomDivRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        setGroupChats([])
    }, [])

    useEffect(() => {
        if (signer && !isInitialized) {
            initialize()
        }
    }, [isLoading, signer])

    const initialize = async () => {
        const userAddress = await signer.getAddress()
        groupMembers = groupMembers.filter((member) => member != userAddress)
        console.log(groupMembers)
        setup()
    }

    const setup = async () => {
        try {
            // const gmc = new GroupMessageCodec("123", "group message")
            // setGroupMessageCodec(gmc)
            // // Create the client with your wallet. This will connect to the XMTP development network by default
            // const client = await Client.create(signer, {
            //     codecs: [gmc],
            // })
            // setXmtp(client)
            const client = xmtp
            if (client === null) return

            /*
             * Load all existing conversations and messages
             */
            const conversations = await client.conversations.list()
            console.log(conversations)
            for (const conversation of conversations) {
                loadConversation(conversation)
            }

            /*
             * Stream new conversations
             */
            for (const member of groupMembers) {
                listenForConversation(member)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const listenForConversation = async (member) => {
        try {
            // Listen for new messages in the conversation
            const conversation = await xmtp.conversations.newConversation(member)
            // Listen for new messages in the conversation
            for await (const message of await conversation.streamMessages()) {
                onNewGroupMessage(message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadConversation = async (conversation) => {
        // TODO This might be a bug in XMTP, reach out to them.
        // await new Promise((_) => setTimeout(_, 2000))
        const messages = await conversation.messages({ pageSize: 100 })

        for (const message of messages) {
            if (isGroupMessage(message) && !groupChats.includes(message)) {
                onNewGroupMessage(message)
            } else {
            }
        }
    }

    return (
        <Skeleton visible={isChatLoading} animate={true}>
            <Center>
                <Stack sx={{ height: "65vh" }} p={0}>
                    <ScrollArea p={"xs"} sx={{ height: "65vh" }} scrollbarSize={1}>
                        <Stack>
                            <Group hidden={inView} position="center" pt="xs">
                                <Paper
                                    shadow="md"
                                    radius="xl"
                                    withBorder
                                    p={0}
                                    sx={{ position: "absolute", top: "95%" }}
                                >
                                    <ActionIcon color="violet" radius="xl" onClick={goBot}>
                                        <ChevronDown />
                                    </ActionIcon>
                                </Paper>
                            </Group>
                            <Center>
                                <Stack
                                    sx={(theme) => ({
                                        width: "50vw",
                                        maxWidth: "60vw",
                                        [theme.fn.smallerThan("md")]: {
                                            width: "100%",
                                        },
                                    })}
                                >
                                    {groupChats
                                        ? groupChats.map((message, index) => {
                                              return (
                                                  <div key={index}>
                                                      <ChatMessage
                                                          senderAddress={message.senderAddress}
                                                          content={message.content}
                                                      />
                                                  </div>
                                              )
                                          })
                                        : "Wow so empty"}
                                </Stack>
                            </Center>
                            <div style={{ float: "left", clear: "both" }} ref={bottomDivRef}></div>
                            <div ref={ref}></div>
                            <div ref={dummy}></div>
                        </Stack>
                    </ScrollArea>
                    <ChatBox
                        fn={goBot}
                        inputRef={groupMsgInputRef}
                        sendGroupMessage={sendGroupMessage}
                    />
                </Stack>
            </Center>
        </Skeleton>
    )
}
