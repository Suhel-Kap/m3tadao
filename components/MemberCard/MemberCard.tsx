import {
    UnstyledButton, UnstyledButtonProps, Group, Avatar, Text, createStyles, Container, Tooltip,
} from '@mantine/core'
import makeBlockie from "ethereum-blockies-base64"
import {Divider} from "../Divider";
import {useRouter} from "next/router";
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },
}));

interface UserButtonProps extends UnstyledButtonProps {
    address: string;
    name: string;
}

export function MemberCard({name, address}: UserButtonProps) {
    const {classes} = useStyles()
    const router = useRouter()

    return (
        <>
            <Container className={classes.user}>
                <Group>
                    <Avatar src={makeBlockie(address)} radius="xl"/>
                    <Link href={`/user-profile?address=${address}`} passHref>
                        <div style={{flex: 1}}>
                            {name && <Text size="lg" weight={700}>
                                {name}
                            </Text>}

                            <Tooltip transition="scale-y" closeDelay={500} transitionDuration={300} label={address}
                                     position="left-end" withArrow>
                                <Text color="dimmed" size="xs">
                                    {router.pathname === "/project" && address}
                                    {router.pathname !== "/project" && (address.slice(0, 6) + '...' + address.slice(-4))}
                                </Text>
                            </Tooltip>
                        </div>
                    </Link>
                </Group>
            </Container>
            <Divider/>
        </>
    );
}