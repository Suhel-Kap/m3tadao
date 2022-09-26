import {
    createStyles,
    Card,
    ActionIcon,
    Avatar,
    Text,
    Group,
    Button,
    Center,
    Stack,
    Badge,
    Title,
} from "@mantine/core"
import Link from "next/link"
import {
    IconBrandGithub,
    IconBrandTwitter,
    IconWorldWww,
    IconCheck,
    IconAlertCircle,
} from "@tabler/icons"
import { showNotification, updateNotification } from "@mantine/notifications"
import { Worldcoin } from "../Worldcoin"
import useContract from "../../hooks/useContract"
import { useRouter } from "next/router"
import useTableland from "../../hooks/useTableland"
import useEPNS from "../../hooks/useEPNS"

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
        border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
    },
}))

interface UserCardImageProps {
    image: string
    avatar: string
    name: string
    stats: { label: string; value: string }[]
    website: string
    twitter: string
    github: string
    interests: string[]
    skills: string[]
    designation: string
    isOwner: boolean
    profId: string
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
    twitter,
    isOwner,
    profId,
}: UserCardImageProps) {
    const { classes, theme } = useStyles()
    console.log("stats", stats)

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text align="center" size="lg" weight={500}>
                {stat.value}
            </Text>
            <Text align="center" size="sm" color="dimmed">
                {stat.label}
            </Text>
        </div>
    ))

    const skillBadges = skills?.map((skill, index) => (
        <Badge key={index} color={"red"}>
            {skill}
        </Badge>
    ))
    const interestBadges = interests?.map((interest, index) => (
        <Badge key={index} color={"green"}>
            {interest}
        </Badge>
    ))

    const router = useRouter()
    const { optIn } = useEPNS()

    const { createFollow } = useContract()
    const { getUserData } = useTableland()

    const handleFollow = async () => {
        showNotification({
            id: "load-data",
            loading: true,
            title: "Following user",
            message: "Please wait!",
            autoClose: false,
            disallowClose: true,
        })
        try {
            console.log("router query address", router.query.address)
            const userData = await getUserData(router.query.address)
            const res = await createFollow([userData[1]])
            console.log("res", res)

            updateNotification({
                id: "load-data",
                color: "teal",
                title: "Success",
                message: "Followed successfully",
                icon: <IconCheck size={16} />,
                autoClose: 2000,
            })

            router.reload()
            // router.push("/home")
        } catch (e) {
            console.log(e)
            updateNotification({
                id: "load-data",
                color: "red",
                title: "Error",
                message: "Failed to follow",
                icon: <IconAlertCircle size={16} />,
                autoClose: 2000,
            })
        }
    }

    return (
        <Card p="xl" className={classes.card}>
            <Card.Section
                sx={(theme) => ({
                    backgroundImage: `url(${image})`,
                    height: 225,
                    [theme.fn.smallerThan("md")]: {
                        height: 150,
                    },
                })}
            />
            <Avatar
                src={avatar}
                size={160}
                radius={80}
                mx="auto"
                mt={-30}
                className={classes.avatar}
            />
            <Text align="center" size="lg" weight={500} mt="sm">
                {name}
            </Text>
            <Text align="center" size="sm" color="dimmed">
                {designation}
            </Text>
            <Group mt={"md"} position={"center"} spacing={30}>
                {twitter && (
                    <Link href={twitter ? twitter : "https://twitter.com"} passHref>
                        <ActionIcon component={"a"} target={"_blank"}>
                            <IconBrandTwitter size={32} />
                        </ActionIcon>
                    </Link>
                )}
                {github && (
                    <Link href={github ? github : "https://github.com"} passHref>
                        <ActionIcon component={"a"} target={"_blank"}>
                            <IconBrandGithub size={32} />
                        </ActionIcon>
                    </Link>
                )}
                {website && (
                    <Link href={website ? website : "#"} passHref>
                        <ActionIcon component={"a"} target={"_blank"}>
                            <IconWorldWww size={32} />
                        </ActionIcon>
                    </Link>
                )}
            </Group>
            <Group mt="md" position="center" spacing={30}>
                {items}
            </Group>
            <Stack mt={"lg"}>
                {skillBadges && (
                    <>
                        <Center>
                            <Title order={5}>Skills</Title>
                        </Center>
                        <Center>
                            <Group
                                mt={"xs"}
                                position={"center"}
                                spacing={20}
                                sx={(theme) => ({
                                    width: "25%",
                                    [theme.fn.smallerThan("sm")]: {
                                        width: "100%",
                                    },
                                })}
                            >
                                {skillBadges}
                            </Group>
                        </Center>
                    </>
                )}
                {interestBadges && (
                    <>
                        <Center>
                            <Title order={5}>Interests</Title>
                        </Center>
                        <Center>
                            <Group
                                mt={"xs"}
                                position={"center"}
                                spacing={20}
                                sx={(theme) => ({
                                    width: "25%",
                                    [theme.fn.smallerThan("sm")]: {
                                        width: "100%",
                                    },
                                })}
                            >
                                {interestBadges}
                            </Group>
                        </Center>
                    </>
                )}
            </Stack>
            {!isOwner && (
                <Stack m={"md"}>
                    <Center mb={0}>
                        <Button
                            radius="md"
                            mt="xl"
                            size="md"
                            fullWidth={false}
                            variant="gradient"
                            gradient={{ from: "indigo", to: "cyan" }}
                            color={theme.colorScheme === "dark" ? undefined : "dark"}
                            onClick={() => {
                                handleFollow()
                            }}
                        >
                            Follow
                        </Button>
                    </Center>
                </Stack>
            )}
            {isOwner && (
                <Stack m={"md"}>
                    <Center mb={0}>
                        <Button.Group>
                            <Worldcoin profId={profId} />
                            {/* <Button
                                radius="md"
                                mt="xl"
                                size="md"
                                fullWidth={false}
                                color={theme.colorScheme === "dark" ? undefined : "dark"}
                                onClick={() => {
                                    console.log("hehe")
                                }}
                            >
                                Verify Profile on Worldcoin
                            </Button> */}
                            <Button
                                radius="md"
                                mt="xl"
                                size="md"
                                fullWidth={false}
                                color={theme.colorScheme === "dark" ? undefined : "dark"}
                                onClick={() => {
                                    optIn()
                                }}
                            >
                                Opt In To EPNS Notification Channel
                            </Button>
                        </Button.Group>
                    </Center>
                </Stack>
            )}
        </Card>
    )
}
