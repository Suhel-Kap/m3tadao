import {createStyles, Card, Avatar, Text, Group, Button, Center, Stack} from '@mantine/core';
import stats from "./stats.json"
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
        border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
}));

interface UserCardImageProps {
    image: string;
    avatar: string;
    name: string;
    job: string;
    stats: { label: string; value: string }[];
}

export function Banner({image, avatar, name, job, stats}: UserCardImageProps) {
    const {classes, theme} = useStyles();

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text align="center" size="lg" weight={500}>
                {stat.value}
            </Text>
            <Text align="center" size="sm" color="dimmed">
                {stat.label}
            </Text>
        </div>
    ));

    return (
        <Card p="xl" className={classes.card}>
            <Card.Section sx={(theme) => ({backgroundImage: `url(${image})`, height: 225, [theme.fn.smallerThan("md")]: {height: 150}})}/>
            <Avatar src={avatar} size={160} radius={80} mx="auto" mt={-30} className={classes.avatar}/>
            <Text align="center" size="lg" weight={500} mt="sm">
                {name}
            </Text>
            <Text align="center" size="sm" color="dimmed">
                {job}
            </Text>
            <Group mt="md" position="center" spacing={30}>
                {items}
            </Group>
            <Stack m={"md"}>
                <Center mb={0}>
                    <Button
                        radius="md"
                        mt="xl"
                        size="md"
                        fullWidth={false}
                        variant="gradient" gradient={{from: 'indigo', to: 'cyan'}}
                        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                    >
                        Follow
                    </Button>
                </Center>
                <Center mt={0}>
                    <Link href={"/create-organisation"} passHref>
                        <Button
                            component={"a"}
                            radius="md"
                            mt="xl"
                            size="md"
                            variant={"gradient"}
                            gradient={{from: 'teal', to: 'blue', deg: 60}}
                            color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                        >
                            Create Organisation
                        </Button>
                    </Link>
                </Center>
                <Center mt={0}>
                    <Link href={"/project"} passHref>
                        <Button
                            component={"a"}
                            radius="md"
                            mt="xl"
                            size="md"
                            variant={"gradient"}
                            gradient={{from: 'indigo', to: 'cyan'}}
                            color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                        >
                            Create Project
                        </Button>
                    </Link>
                </Center>
                <Center mt={0}>
                    <Link href={"/create-release"} passHref>
                        <Button
                            component={"a"}
                            radius="md"
                            mt="xl"
                            size="md"
                            variant={"gradient"}
                            gradient={{from: 'cyan', to: 'indigo'}}
                            color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                        >
                            Create Release
                        </Button>
                    </Link>
                </Center>
            </Stack>
        </Card>
    );
}