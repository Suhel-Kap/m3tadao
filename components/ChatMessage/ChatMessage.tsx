import {Group, Avatar, Stack, Tooltip, Alert, Text, MediaQuery, createStyles} from "@mantine/core"
import {useAccount, useEnsName} from "wagmi"
import makeBlockie from 'ethereum-blockies-base64'

const useStyles = createStyles((theme) => ({
    break: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        }
    }
}))

export function ChatMessage(props: any) {
    const {address} = useAccount()
    const message = address === props.senderAddress ? "right" : "left"
    const {data} = useEnsName(props.senderAddress)
    const {classes} = useStyles()

    return (
        <>
            <Stack p={0} spacing={2} align={"stretch"}>
                <Group position={message} align="flex-end" spacing="xs">
                    <Tooltip.Floating label={data || props.senderAddress} position={message}>
                        <Avatar
                            src={makeBlockie(props.senderAddress)}
                            radius="xl"
                            hidden={message === "right"}
                        />
                    </Tooltip.Floating>
                    <Group position={message}>
                        <Stack>
                            <Text className={classes.break} color={"dimmed"} size={"xs"}>{data || props.senderAddress}</Text>
                            <Alert sx={{}} radius="lg" py={8} variant={"light"}>
                                {props.content}
                            </Alert>
                        </Stack>
                    </Group>
                </Group>
            </Stack>
        </>
    )
}