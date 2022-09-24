import {createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper, Image, Container} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    },

    body: {
        paddingLeft: 54,
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },

    image: {
        width: '75%',
        height: 'auto',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.sm,
        marginBottom: "xs",
    }
}));

interface CommentHtmlProps {
    postedAt: string;
    body: string;
    author: {
        name: string;
        image: string;
    };
}

export function HomePost({postedAt, body, author, image}: CommentHtmlProps) {
    const {classes} = useStyles();
    return (
        <Paper mb={"lg"} radius="md" className={classes.comment}>
            <Group>
                <Avatar src={author.image} alt={author.name} radius="xl"/>
                <div>
                    <Text size="sm">{author.name}</Text>
                    <Text size="xs" color="dimmed">
                        {postedAt}
                    </Text>
                </div>
            </Group>
            {image && <Container>
                <Image className={classes.image} src={image} alt={author.name} radius="md"/>
            </Container>}
            <TypographyStylesProvider className={classes.body}>
                <div className={classes.content} dangerouslySetInnerHTML={{__html: body}}/>
            </TypographyStylesProvider>
        </Paper>
    );
}