import {Layout} from "../components/Layout";
import {Center, Button, Modal, ActionIcon, Title, Text, Group} from "@mantine/core";
import {CreatePost} from "../components/CreatePost"
import Head from "next/head"
import {IconCirclePlus} from "@tabler/icons"
import {useEffect, useState} from "react";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        console.log("hello")
    }, [])

    const postModal = <Modal
        opened={isModalOpen}
        size="60%"
        transition="fade"
        transitionDuration={500}
        transitionTimingFunction="ease"
        title={<Title>Add a post</Title>}
        onClose={() => setIsModalOpen(false)}>
        <Center>
            <CreatePost/>
        </Center>
    </Modal>

    return (
        <>
            <Layout>
                <Head>
                    <title>Home</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                </Head>

                <Button onClick={() => setIsModalOpen(true)} leftIcon={<IconCirclePlus size={14} />}>
                    Create Post
                </Button>
                {postModal}
            </Layout>
        </>
    )
}