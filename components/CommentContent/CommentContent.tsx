import {Grid, Image, Text} from "@mantine/core";

export function CommentContent(){
    return (
        <Grid m={"lg"}>
            <Grid.Col span={2}>
                <Image src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"} alt={"Avatar"} height={50} width={50} radius={"sm"}/>
            </Grid.Col>
            <Grid.Col span={10}>
                <Text weight={700}>Random person</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab eius, ullam. Ab atque distinctio dolore dolores doloribus error eum, illo laborum, magni nisi quis recusandae sed similique, temporibus ut velit.</Text>
            </Grid.Col>
        </Grid>
    )
}