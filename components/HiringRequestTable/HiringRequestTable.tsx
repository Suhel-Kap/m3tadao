import {Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea} from '@mantine/core';
import {
    IconMessages,
    IconNote,
    IconTrash,
    IconDots, IconCheck, IconAlertCircle,
} from '@tabler/icons'
import makeBlockie from "ethereum-blockies-base64";
import useSuperFluid from "../../hooks/useSuperFluid";
import {useAccount, useProvider, useSigner} from "wagmi";
import {showNotification, updateNotification} from "@mantine/notifications";

interface UsersStackProps {
    data: { title: string; description: string; address: string; }[];
}

export function HiringRequestTable({someotheredata}: UsersStackProps) {
    const {SendPlannedStream} = useSuperFluid()
    const {data: signer} = useSigner()
    const provider = useProvider()
    const {address} = useAccount()

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
            await SendPlannedStream(provider, signer, address, "0x044B595C9b94A17Adc489bD29696af40ccb3E4d2", 0.016, 1)
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

    const data = [
        {
            title: "some title",
            description: "some description",
            address: "0x0000000000000000000000000000000000000000",
        }
    ]
    const rows = data.map((item) => (
        <tr key={item.address}>
            <td>
                <Group spacing="sm">
                    <Avatar size={40} src={makeBlockie(item.address)} radius={40}/>
                    <div>
                        <Text size="sm" weight={500}>
                            {item.address}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>
                <Text size="sm">{item.title}</Text>
                <Text size="xs" color="dimmed">
                    Title
                </Text>
            </td>
            <td>
                <Text size="sm">{item.description}</Text>
            </td>
            <td>
                <Group spacing={0} position="right">
                    <Menu transition="pop" withArrow position="bottom-end">
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size={16} stroke={1.5}/>
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item icon={<IconMessages size={16} stroke={1.5}/>}>Send message</Menu.Item>
                            <Menu.Item onClick={sendStream} icon={<IconNote size={16} stroke={1.5}/>}>Start payment
                                stream</Menu.Item>
                            <Menu.Item icon={<IconTrash size={16} stroke={1.5}/>} color="red">
                                Terminate contract
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea sx={{overflow: "visible"}}>
            <Table sx={{minWidth: 800}} verticalSpacing="md">
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}