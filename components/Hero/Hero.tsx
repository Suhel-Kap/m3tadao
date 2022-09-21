import {createStyles, Image, Container, Title, Button, Group, Text, List, ThemeIcon,} from '@mantine/core';
import {IconCheck} from '@tabler/icons';
import {ConnectButton} from "@rainbow-me/rainbowkit";
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,
        width: "150%",
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));

export function Hero() {
    const {classes} = useStyles();
    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            <span className={classes.highlight}>M3tadao</span>
                        </Title>
                        <Text color="dimmed" mt="md">
                            A decentralised social network for web3 creators. Developers, designers, artists everyone is
                            welcome on our platform to create the next big thing seamlessly.
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <IconCheck size={12} stroke={1.5}/>
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>Build Together</b> – collaborate with other creators to build the next big thing
                            </List.Item>
                            <List.Item>
                                <b>Network</b> – connect with other creators and build your network
                            </List.Item>
                            <List.Item>
                                <b>Grow</b> – enhance your skills by working with other creators
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <ConnectButton showBalance={false}/>
                            <Link href={"https://github.com/Suhel-Kap/m3tadao"} passHref>
                                <Button component={"a"} target={"_blank"} variant="default" radius="md" size="md" className={classes.control}>
                                    Source code
                                </Button>
                            </Link>
                        </Group>
                    </div>
                    <Image src={"./hero.svg"} className={classes.image} width={"150%"}/>
                </div>
            </Container>
        </div>
    );
}