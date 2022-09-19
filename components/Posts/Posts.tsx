import {ActionIcon, Container, createStyles, Divider, Grid, Group, Space, Title, Tooltip} from "@mantine/core";
import {AuthorCard} from "../AuthorCard";
import {Layout} from "../Layout"
import {PostContent} from "../PostContent";
import {IconBookmark, IconHeart, IconShare} from "@tabler/icons";
import {useClipboard} from "@mantine/hooks";
import {useRouter} from "next/router";
import {CommentInput} from "../CommentInput";
import {CommentContent} from "../CommentContent/CommentContent";
import Head from "next/head";

export function Posts() {
    const {theme} = useStyles()
    const clipboard = useClipboard()
    const router = useRouter()

    return (
        <Layout>
            <Head>
                <title>Post Title - m3tadao</title>
            </Head>
            <Container style={{maxWidth: 800}}>
                <Title mt={"sm"}>
                    Posts
                </Title>
                <Divider m={"sm"} my={"md"}/>
                <Grid justify={"space-between"}>
                    <AuthorCard
                        avatar={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"}
                        name={"Random person"} title={"Web3 Developer"}
                        address={"0x87f5311daD4AbC84a79d31F6c19566129417F026"}/>
                    <Group spacing={0}>
                        <ActionIcon>
                            <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5}/>
                        </ActionIcon>
                        <ActionIcon>
                            <IconBookmark size={18} color={theme.colors.yellow[6]} stroke={1.5}/>
                        </ActionIcon>
                        <Tooltip
                            label="Link copied!"
                            offset={5}
                            position="bottom"
                            radius="xl"
                            transition="slide-down"
                            transitionDuration={100}
                            opened={clipboard.copied}>
                            <ActionIcon onClick={() => clipboard.copy(`https://localhost:3000${router.asPath}`)}>
                                <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5}/>
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Grid>
                <PostContent/>
                <Divider m={"sm"}/>
                <Container>
                    <CommentInput/>
                    <CommentContent/>
                    <CommentContent/>
                    <CommentContent/>
                </Container>
            </Container>
        </Layout>
    )
}

const useStyles = createStyles((theme) => ({}))
