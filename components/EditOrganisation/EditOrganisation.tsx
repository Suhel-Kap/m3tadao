import { useAccount } from "wagmi"
import {
    Button,
    Input,
    List,
    MultiSelect,
    Skeleton,
    Stack,
    Tabs,
    Text,
    Textarea,
    TextInput,
    Title,
    Tooltip,
} from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useEffect, useState } from "react"
import { IconCheck } from "@tabler/icons"
import { useForm, zodResolver } from "@mantine/form"
import { ImageInput } from "../ImageInput"
import { IconAlertCircle, IconWorldWww } from "@tabler/icons"
import { showNotification, updateNotification } from "@mantine/notifications"
import { useListState } from "@mantine/hooks"
import { schema } from "../CreateOrganisation/schema"
import { NameInput } from "../NameInput"
import { AddressInput } from "../AddressInput"
import { MemberList } from "../MemberList"
import { useRouter } from "next/router"
import useContract from "../../hooks/useContract"

export function EditOrganisation(props) {
    const { address } = useAccount()
    // const [activeTab, setActiveTab] = useState("first")
    const [activeTab, setActiveTab] = useState("third")
    const [loading, setLoading] = useState(false)
    // TODO: Set user data as initial values
    const [image, setImage] = useState<File>()
    const [members, membersHandlers] = useListState<string>(props.members)
    const defaultTags = [
        "finance",
        "digital marketing",
        "development",
        "design",
        "game",
        "protocol",
        "application",
        "utilities",
        "storage",
        "networks",
        "social",
        "communication",
        "nft",
        "defi",
        "media",
        "music",
    ]

    const router = useRouter()

    const { updateProjectAccountRequirements } = useContract()

    useEffect(() => {
        membersHandlers.setState([...props.members])
        // props.members.map((member) => {
        //     membersHandlers.append(member)
        // })
    }, [props.members])

    const removeMember = (member: string) => {
        membersHandlers.filter((other: string) => other.toLowerCase() !== member.toLowerCase())
    }

    const addMember = (member: string) => {
        removeMember(member)
        membersHandlers.append(member)
    }

    const form = useForm({
        validate: zodResolver(schema),
        validateInputOnChange: true,
        initialValues: {
            accountName: "",
            displayName: "",
            website: "",
            description: "",
            reqTitle: "",
            reqDescription: "",
            reqTags: [],
            reqPrice: "",
            reqDeadline: "",
        },
    })

    const handleRequirements = async () => {
        showNotification({
            id: "load-data",
            loading: true,
            title: "Adding requirements",
            message: "Please wait while we add requirements!",
            autoClose: false,
            disallowClose: true,
        })
        try {
            console.log("router query accId", router.query.accId)
            const res = await updateProjectAccountRequirements(
                router.query.accId,
                form.values.reqTitle,
                form.values.reqDescription,
                form.values.reqTags,
                form.values.reqPrice,
                form.values.reqDeadline
            )
            console.log("res", res)

            updateNotification({
                id: "load-data",
                color: "teal",
                title: "Success",
                message: "Requirements added successfully",
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
                message: "Failed to add requirements",
                icon: <IconAlertCircle size={16} />,
                autoClose: 2000,
            })
        }
    }

    return (
        <>
            <button onClick={() => setLoading((prevState) => !prevState)}>Toggle Skeleton</button>
            <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List grow>
                    {/* <Tabs.Tab value="first">Basic Info</Tabs.Tab>
                    <Tabs.Tab value="second">Members</Tabs.Tab> */}
                    <Tabs.Tab value="third">Requirements</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel p={"xs"} value="first">
                    <Title my={"xs"} order={4}>
                        Organisation Image
                    </Title>
                    <Skeleton visible={loading}>
                        <ImageInput width={600} height={300} onChange={setImage} value={image} />
                    </Skeleton>
                    <Title my={"xs"} order={4}>
                        Account Name
                    </Title>
                    <Skeleton visible={loading}>
                        <NameInput
                            parentId={80001}
                            required
                            disabled={true}
                            placeholder="Unique Account Name"
                            {...form.getInputProps("accountName")}
                        />
                    </Skeleton>
                    <Title my={"xs"} order={4}>
                        Website
                    </Title>
                    <Skeleton visible={loading}>
                        <Input
                            icon={<IconWorldWww size={16} />}
                            placeholder="Your Website"
                            {...form.getInputProps("website")}
                            rightSection={
                                <Tooltip label="This is public" position="top-end" withArrow>
                                    <div>
                                        <IconAlertCircle
                                            size={18}
                                            style={{ display: "block", opacity: 0.5 }}
                                        />
                                    </div>
                                </Tooltip>
                            }
                        />
                    </Skeleton>
                    <Title my={"xs"} order={4}>
                        Description
                    </Title>
                    <Skeleton visible={loading}>
                        <TextInput
                            placeholder="Description of your project"
                            {...form.getInputProps("description")}
                        />
                    </Skeleton>
                </Tabs.Panel>
                <Tabs.Panel p={"xs"} value="second">
                    <Stack style={{ maxWidth: 784 }}>
                        <Title mt="lg">Members</Title>
                        <Text color={"dimmed"}>Members can perform the following actions:</Text>
                        <List>
                            <List.Item>Update account info</List.Item>
                            <List.Item>Add or remove account members</List.Item>
                            <List.Item>Create new projects</List.Item>
                            <List.Item>Add or remove project members</List.Item>
                            <List.Item>Update project info</List.Item>
                            <List.Item>Publish new releases</List.Item>
                        </List>
                        <Title order={2}>Account Admins</Title>
                        <AddressInput onSubmit={addMember} />
                        <Skeleton visible={loading}>
                            <MemberList
                                label="Account Admin"
                                members={members}
                                editable={true}
                                onRemove={removeMember}
                            />
                        </Skeleton>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel p={"xs"} value={"third"}>
                    <Title my={"xs"} order={5}>
                        Requirements Title
                    </Title>
                    <TextInput
                        placeholder={"Requirements Title"}
                        {...form.getInputProps("reqTitle")}
                    />
                    <Title my={"xs"} order={5}>
                        Requirements Description
                    </Title>
                    <Textarea
                        placeholder={"Requirements Description"}
                        {...form.getInputProps("reqDescription")}
                    />
                    <Title my={"xs"} order={5}>
                        Requirements Price
                    </Title>
                    <TextInput
                        placeholder={"Requirements Price"}
                        {...form.getInputProps("reqPrice")}
                    />
                    <Title my={"xs"} order={5}>
                        Requirements Deadline
                    </Title>
                    <DatePicker
                        placeholder={"Pick deadline"}
                        {...form.getInputProps("reqDeadline")}
                    />
                    <Title my={"xs"} order={5}>
                        Requirements Tags
                    </Title>
                    <Skeleton sx={{ overflow: "visible", zIndex: 100 }} visible={loading}>
                        <MultiSelect
                            data={defaultTags}
                            mb={"xl"}
                            placeholder="Select tags"
                            searchable
                            {...form.getInputProps("reqTags")}
                        />
                    </Skeleton>
                </Tabs.Panel>
            </Tabs>
            <Button
                m={"sm"}
                onClick={() => {
                    handleRequirements()
                    showNotification({
                        title: "Success",
                        message: "Profile updated successfully.",
                        icon: <IconCheck />,
                    })
                }}
            >
                Save Changes
            </Button>
        </>
    )
}
