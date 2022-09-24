import {createStyles, Card, ActionIcon, Avatar, Text, Group, Button, Center, Stack, Badge, Title} from '@mantine/core';
import Link from "next/link"
import {IconBrandGithub, IconBrandTwitter, IconWorldWww} from "@tabler/icons";

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
    stats: { label: string; value: string }[];
    website: string;
    twitter: string;
    github: string;
    interests: string[];
    skills: string[];
    designation: string;
}

export function Banner({
                           image,
                           avatar,
                           name,
                           designation,
                           stats,
                           website,
                           interests,
                           skills,
                           github,
                           twitter
                       }: UserCardImageProps) {
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

    const skillBadges = skills?.map((skill) => (
        <Badge color={"red"}>
            {skill}
        </Badge>
    ))
    const interestBadges = interests?.map((interest) => (
        <Badge color={"green"}>
            {interest}
        </Badge>
    ))

    return (
        <Card p="xl" className={classes.card}>
            <Card.Section sx={(theme) => ({
                backgroundImage: `url(${image})`,
                height: 225,
                [theme.fn.smallerThan("md")]: {
                    height: 150
                }
            })}/>
            <Avatar src={avatar} size={160} radius={80} mx="auto" mt={-30} className={classes.avatar}/>
            <Text align="center" size="lg" weight={500} mt="sm">
                {name}
            </Text>
            <Text align="center" size="sm" color="dimmed">
                {designation}
            </Text>
            <Group mt={"md"} position={"center"} spacing={30}>
                {twitter && <Link href={twitter ? twitter : "https://twitter.com"} passHref>
                    <ActionIcon component={"a"} target={"_blank"}>
                        <IconBrandTwitter size={32}/>
                    </ActionIcon>
                </Link>}
                {github && <Link href={github ? github : "https://github.com"} passHref>
                    <ActionIcon component={"a"} target={"_blank"}>
                        <IconBrandGithub size={32}/>
                    </ActionIcon>
                </Link>}
                {website && <Link href={website ? website : "#"} passHref>
                    <ActionIcon component={"a"} target={"_blank"}>
                        <IconWorldWww size={32}/>
                    </ActionIcon>
                </Link>}
            </Group>
            <Group mt="md" position="center" spacing={30}>
                {items}
            </Group>
            <Stack mt={"lg"}>
                <Center>
                    <Title order={5}>Skills</Title>
                </Center>
                <Center>
                    <Group mt={"xs"} position={"center"} spacing={20} sx={(theme) => ({
                        width: "25%", [theme.fn.smallerThan("sm")]: {
                            width: "100%"
                        }
                    })}>
                        {skillBadges}
                    </Group>
                </Center>
                <Center>
                    <Title order={5}>Interests</Title>
                </Center>
                <Center>
                    <Group mt={"xs"} position={"center"} spacing={20} sx={(theme) => ({
                        width: "25%", [theme.fn.smallerThan("sm")]: {
                            width: "100%"
                        }
                    })}>
                        {interestBadges}
                    </Group>
                </Center>
            </Stack>
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
            </Stack>
        </Card>
    );
}