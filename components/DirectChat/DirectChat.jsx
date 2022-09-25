import { Client, ContentTypeId } from "@xmtp/xmtp-js"
import { useEffect, useRef, useState } from "react"
import { useSigner } from "wagmi"
import { ActionIcon, Center, Group, Paper, ScrollArea, Skeleton, Stack } from "@mantine/core"
import { ChevronDown } from "tabler-icons-react"
import { ChatMessage } from "../ChatMessage"
import { ChatBox } from "../ChatBox"
import { useInView } from "react-intersection-observer"

export function DirectChat(props) {
    const [isChatLoading, setIsChatLoading] = useState(true)
    const [user2, setUser2] = useState()
    console.log("props.otherUser", props.otherUser)
    const [chats, setChats] = useState([])
    const { data: signer, isError, isLoading } = useSigner()
    const [conversation, setConversation] = useState()
    const addressInputRef = useRef(props.otherUser)
    const msgInputRef = useRef()
    const bottomDivRef = useRef()
    const dummy = useRef(null)
    const { ref, inView } = useInView({
        delay: 600,
        threshold: 1,
    })
    const xmtp = props.xmtp

    function goBot() {
        dummy.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        console.log("13")
        createConversation()
    }, [props.otherUser])

    useEffect(() => {
        bottomDivRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chats])

    const listenForMessage = async (conversationWithUser) => {
        if (!conversationWithUser) [(conversationWithUser = conversation)]

        // Listen for new messages in the conversation
        for await (const message of await conversationWithUser.streamMessages()) {
            setChats((chats) => [...chats, message])
        }
    }
    const createConversation = async () => {
        if (user2 && user2 == props.otherUser) {
            return
        }
        setIsChatLoading(true)
        setChats([])
        setUser2(props.otherUser)
        // "0x9e03C44b5A09db89bf152F8C5500dF3360c1C5bF"
        const addressOfUser2 = addressInputRef.current
        console.log("1", addressInputRef)
        console.log("2", addressOfUser2)
        // Start a conversation with addressOfUser2
        const conversationWithUser = await xmtp.conversations.newConversation(props.otherUser)
        console.log("conversationWithUser", conversationWithUser)
        setConversation(conversationWithUser)
        console.log("conversation", conversation)
        await renderChats(conversationWithUser)
        console.log("stuff")
        listenForMessage(conversationWithUser)
    }
    const renderChats = async (conversationWithUser) => {
        if (!conversationWithUser) [(conversationWithUser = conversation)]
        // Create the client with your wallet. This will connect to the XMTP development network by default
        // Load all messages in the conversation
        const messages = await conversationWithUser.messages()
        setChats(messages)
        setIsChatLoading(false)
        bottomDivRef.current?.scrollIntoView({ behavior: "smooth" })
        // // Send a message
        // await conversation.send("gm")
        // // Listen for new messages in the conversation
        // for await (const message of await conversation.streamMessages()) {
        //     console.log(`[${message.senderAddress}]: ${message.content}`)
        // }
    }

    const sendMessage = async () => {
        // "0x9e03C44b5A09db89bf152F8C5500dF3360c1C5bF"
        const addressOfUser2 = addressInputRef.current
        const msg = msgInputRef.current.value
        // Start a conversation with addressOfUser2
        const conversation = await xmtp.conversations.newConversation(addressOfUser2)
        // // Load all messages in the conversation
        // const messages = await conversation.messages()
        // console.log(messages)
        // Send a message
        conversation.send(msg)
        // await Client.sendMessage(addressOfUser2, msg, { contentType: "abc123" })
        // await conversation.send(msg, { contentType: "abc123" })
        // // Listen for new messages in the conversation
        // for await (const message of await conversation.streamMessages()) {
        //     console.log(`[${message.senderAddress}]: ${message.content}`)
        // }
    }

    return (
        <>
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
                                        {chats
                                            ? chats.map((message, index) => {
                                                  if (
                                                      message &&
                                                      message.contentType.typeId !== "fallback"
                                                  )
                                                      return (
                                                          <div key={index}>
                                                              <ChatMessage
                                                                  senderAddress={
                                                                      message.senderAddress
                                                                  }
                                                                  content={message.content}
                                                              />
                                                          </div>
                                                      )
                                              })
                                            : "Wow so empty"}
                                    </Stack>
                                </Center>
                                <div
                                    style={{ float: "left", clear: "both" }}
                                    ref={bottomDivRef}
                                ></div>
                                <div ref={ref}></div>
                                <div ref={dummy}></div>
                            </Stack>
                        </ScrollArea>
                        <ChatBox
                            fn={goBot}
                            inputRef={msgInputRef}
                            sendGroupMessage={sendMessage}
                        />
                    </Stack>
                </Center>
            </Skeleton>
        </>
    )
}
