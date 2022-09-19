import {ActionIcon, Group, Paper, ScrollArea, Stack} from "@mantine/core";
import {useInView} from "react-intersection-observer";
import {ChevronDown} from "tabler-icons-react";
import {useRef, useState} from "react";

export function ChatRoom(){
    const [id, setId] = useState("")
    const [hidden, setHidden] = useState(true)
    const dummy = useRef<HTMLDivElement>(null)
    const { ref, inView } = useInView({
        delay: 600,
        threshold: 1
    })

    function goBot() {
        dummy.current?.scrollIntoView({ behavior: "smooth" });
        setHidden(true);
        setId("");
    }

    return (
        <>
        <h1>Chat Room</h1>
            <Stack sx={{height: "65vh"}} p={0}>
                <ScrollArea p={"xs"} sx={{height: "65vh"}} scrollbarSize={1}>
                    <Stack>
                        <Group hidden={inView} position={"center"} pt={"xs"}>
                            <Paper shadow={"md"} p={0} withBorder radius={"xl"} sx={{ position: "absolute", top: "95%" }}>
                                <ActionIcon radius={"xl"} onClick={goBot}>
                                    <ChevronDown />
                                </ActionIcon>
                            </Paper>
                        </Group>


                    </Stack>
                </ScrollArea>
            </Stack>
        </>
    )
}