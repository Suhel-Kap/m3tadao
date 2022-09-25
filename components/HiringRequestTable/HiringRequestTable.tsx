import {Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Modal, Title, Center} from '@mantine/core';
import {IconMessages, IconNote, IconTrash, IconDots,} from '@tabler/icons'
import makeBlockie from "ethereum-blockies-base64"
import {useState} from 'react';
import {CreateStream} from '../CreateStream';

interface UsersStackProps {
    data: { title: string; description: string; address: string; }[];
}

export function HiringRequestTable({someotheredata}: UsersStackProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [receiver, setReceiver] = useState("")


    let postModal = <Modal
        opened={isModalOpen}
        size="60%"
        transition="fade"
        transitionDuration={500}
        transitionTimingFunction="ease"
        title={<Title>Send Stream</Title>}
        onClose={() => setIsModalOpen(false)}>
        <Center>
            <CreateStream receiver={receiver}/>
        </Center>
    </Modal>

    const handleClick = (address) => {
        setReceiver(address)
        setIsModalOpen(true)
    }
    
    // TODO: set data to actual end
    const data = [
        {
            title: "some title",
            description: "some description",
            address: "0x044B595C9b94A17Adc489bD29696af40ccb3E4d2",
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
                            <Menu.Item onClick={() => handleClick(item.address)}
                                       icon={<IconNote size={16} stroke={1.5}/>}>Start
                                payment
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

    return (<>
            <ScrollArea sx={{overflow: "visible"}}>
                <Table sx={{minWidth: 800}} verticalSpacing="md">
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
            {postModal}
        </>
    );
}