import {ActionIcon, Group, Stack, TextInput} from "@mantine/core";
import {Send} from "tabler-icons-react";
import {getHotkeyHandler} from "@mantine/hooks";
import {useState} from "react";

export function ChatBox(props: any){
    const [value, setValue] = useState("")
    const clear = () => {
        props.sendGroupMessage()
        props.fn()
        setValue("")
    }

    return (
        <>
            <Stack sx={{ height: "8vh" }} justify="center" p={0}>
                <Group position="right" p="xs">
                    <TextInput
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        ref={props.inputRef}
                        sx={{ flexGrow: 1 }}
                        placeholder="Say something nice . . . "
                        onKeyDown={
                            !/\S/.test(value)
                                ? undefined
                                : value.length < 2
                                    ? undefined
                                    : getHotkeyHandler([["Enter", clear]])
                        }
                    />
                    <ActionIcon
                        onClick={clear}
                        size="lg"
                        disabled={
                            !/\S/.test(value) ? true : value.length < 2
                        }
                    >
                        <Send />
                    </ActionIcon>
                </Group>
            </Stack>
        </>
    )
}