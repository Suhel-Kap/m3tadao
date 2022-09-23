import {createStyles, Container, Group, ActionIcon, Title} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    footer: {
        padding: "45px 0px",
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export function Footer() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Title color={"dimmed"} order={1}>M3tadao</Title>
                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <ActionIcon size="lg">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}