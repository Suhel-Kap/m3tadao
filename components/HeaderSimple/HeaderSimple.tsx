import {useState} from 'react';
import {createStyles, Header, Container, Group, Burger, Paper, Transition, Title, Stack} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {DarkModeToggle} from "../DarkModeToggle";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import Link from 'next/link';
import {useRouter} from "next/router";

const HEADER_HEIGHT = 60;
const links = [
    {
        "link": "/create-organisation",
        "label": "Organisation"
    },
    {
        "link": "/create-project",
        "label": "Projects"
    },
    {
        "link": "/user-profile",
        "label": "Settings"
    },

]

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1,
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        maxWidth: 1200,
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
        },
    },
}));


export function HeaderSimple() {
    const router = useRouter()
    const currentPath = router.pathname
    const [opened, {toggle, close}] = useDisclosure(false);
    const [active, setActive] = useState(currentPath || null);
    const {classes, cx} = useStyles();

    const items = links.map((link) => (
        <Link href={link.link} key={link.label}>
            <a
                key={link.label}
                className={cx(classes.link, {[classes.linkActive]: active === link.link})}
                onClick={(event) => {
                    event.preventDefault();
                    setActive(link.link);
                    router.push(link.link)
                    close();
                }}
            >
                {link.label}
            </a>
        </Link>
    ));

    return (
        <Header height={HEADER_HEIGHT} mb={0} className={classes.root}>
            <Container className={classes.header}>
                <Link href={"/"}>
                        <Title style={{ cursor: "pointer", marginRight: "7.5%"}} order={3}>M3tadao</Title>
                </Link>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Group position={"right"} className={classes.links}>
                    <DarkModeToggle/>
                    <ConnectButton showBalance={false}/>
                </Group>
                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>
                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {items}
                            <Stack pl={"2%"} align={"flex-start"} justify={"flex-start"}>
                                <DarkModeToggle/>
                                <ConnectButton showBalance={false}/>
                            </Stack>
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}