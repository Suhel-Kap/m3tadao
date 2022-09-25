import {useAccount, useProvider, useSigner} from "wagmi";
import useSuperFluid from "../../hooks/useSuperFluid";
import {showNotification, updateNotification} from "@mantine/notifications";
import {IconAlertCircle, IconCheck} from "@tabler/icons";
import {Button, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";

export function CreateStream({receiver}) {
    const {SendPlannedStream} = useSuperFluid()
    const {data: signer} = useSigner()
    const provider = useProvider()
    const {address} = useAccount()
    console.log(receiver)
    const form = useForm({
        initialValues: {
            sender: address,
            receiver: receiver,
            duration: 0,
            totalToken: 0
        },
    })


    const sendStream = async () => {
        showNotification({
            id: "load-data",
            loading: true,
            title: "Sending Stream",
            message:
                "Please wait while we send the stream using superfluid",
            autoClose: false,
            disallowClose: true,
        })

        try {
            await SendPlannedStream(provider, signer, address, form.values.receiver, form.values.duration, form.values.totalToken)
            updateNotification({
                id: "load-data",
                color: "teal",
                title: "Success",
                message: "Matic sent successfully",
                icon: <IconCheck size={16}/>,
                autoClose: 2000,
            })
        } catch (e) {
            console.log(e)
            updateNotification({
                id: "load-data",
                color: "red",
                title: "Error",
                message: "Failed to send Matic",
                icon: <IconAlertCircle size={16}/>,
                autoClose: 2000,
            })
        }
    }

    return (
        <Stack
            sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: {
                    width: "90%",
                },
                width: "50%",
            })}
        >
            <TextInput
                value={form.values.receiver}
                disabled
                label={"Receiver"}
                {...form.getInputProps("receiver")}
            />
            <TextInput
                placeholder="3 Hours"
                label={"Duration (in hours)"}
                {...form.getInputProps("duration")}
            />
            <TextInput
                placeholder="100 MATIC"
                label={"Total amount of MATIC to send"}
                required
                {...form.getInputProps("totalToken")}
            />
            <Button onClick={() => sendStream()} variant={"filled"}>
                Send Matic Stream
            </Button>
        </Stack>
    )

}