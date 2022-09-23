import {useAccount} from "wagmi"
import {Button, Input, List, MultiSelect, Select, Skeleton, Stack, Tabs, Text, Textarea, TextInput, Title, Tooltip} from "@mantine/core"
import {useState} from "react"
import {IconCheck} from "@tabler/icons"
import {useForm, zodResolver} from "@mantine/form"
import {ImageInput} from "../ImageInput"
import {IconAlertCircle, IconWorldWww} from "@tabler/icons"
import {showNotification} from '@mantine/notifications'
import {useListState} from "@mantine/hooks";
import {schema} from "../CreateProject/schema";
import {AddressInput} from "../AddressInput";
import {MemberList} from "../MemberList";
import {GalleryInput} from "../GalleryInput";
import {DatePicker} from "@mantine/dates";

export function EditProject() {
    const {address} = useAccount()
    const [activeTab, setActiveTab] = useState("first")
    const [loading, setLoading] = useState(false)
    // TODO: Set user data as initial values
    const [image, setImage] = useState<File>()
    const [tags, setTags] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [mainCapsule, setMainCapsule] = useState<File>();
    const [gallery, setGallery] = useState<File[]>([]);
    const [members, membersHandlers] = useListState<string>([]);
    const defaultTags = [
        'game', 'protocol', 'application', 'utilities', 'storage', 'networks',
        'social', 'communication', 'nft', 'defi', 'media', 'music',
    ]
    const requiredTags = ['finance', 'digital marketing', 'development', 'design', ...defaultTags]

    const defaultTypes = [
        'web', 'native', 'cli',
    ];

    const removeMember = (member: string) => {
        membersHandlers.filter(
            (other: string) => other.toLowerCase() !== member.toLowerCase()
        );
    };

    const addMember = (member: string) => {
        removeMember(member);
        membersHandlers.append(member);
    };

    const form = useForm({
        validate: zodResolver(schema),
        validateInputOnChange: true,
        initialValues: {
            projectName: "",
            displayName: "",
            website: "",
            description: "",
            shortDescription: "",
            youTubeLink: "",
            tags: [],
            type: "",
            reqTitle: '',
            reqDescription: '',
            reqTags: [],
            reqPrice: '',
            reqDeadline: '',
        },
    })

    return (
        <>
            <button onClick={() => setLoading((prevState) => !prevState)}>Toggle Skeleton</button>
            <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List grow>
                    <Tabs.Tab value="first">Basic Info</Tabs.Tab>
                    <Tabs.Tab value="second">Description</Tabs.Tab>
                    <Tabs.Tab value="third">Members</Tabs.Tab>
                    <Tabs.Tab value="fourth">Media</Tabs.Tab>
                    <Tabs.Tab value="fifth">Requirements</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel p={"xs"} value="first">
                    <Title my={"xs"} order={4}>Project Image</Title>
                    <Skeleton visible={loading}>
                        <ImageInput width={600} height={300} onChange={setImage} value={image}/>
                    </Skeleton>
                    <Title my={"xs"} order={4}>Project Name</Title>
                    <Skeleton visible={loading}>
                        <TextInput disabled={true} placeholder="Your Name" {...form.getInputProps('projectName')} />
                    </Skeleton>
                    <Title my={"xs"} order={4}>Display Name</Title>
                    <Skeleton visible={loading}>
                        <TextInput placeholder="Display name" {...form.getInputProps('displayName')} />
                    </Skeleton>
                    <Title my={"sm"} order={4}>Website</Title>
                    <Skeleton visible={loading}>
                        <Input
                            icon={<IconWorldWww size={16}/>} my={"sm"}
                            placeholder="Your Website"
                            {...form.getInputProps('website')}
                            rightSection={
                                <Tooltip label="This is public" position="top-end" withArrow>
                                    <div>
                                        <IconAlertCircle size={18} style={{display: 'block', opacity: 0.5}}/>
                                    </div>
                                </Tooltip>
                            }
                        />
                    </Skeleton>
                    <Title my={"sm"} order={4}>Type</Title>
                    <Skeleton sx={{overflow: "visible", zIndex: 101}} visible={loading}>
                        <Select
                            data={defaultTypes}
                            value={types}
                            placeholder="Select type"
                            nothingFound="Nothing found"
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            {...form.getInputProps("type")}
                        />
                    </Skeleton>
                    <Title my={"sm"} order={4}>Tags</Title>
                    <Skeleton sx={{overflow: "visible", zIndex: 100}} visible={loading}>
                        <MultiSelect
                            data={defaultTags}
                            value={tags}
                            placeholder="Select tags"
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Create ${query}`}
                            {...form.getInputProps("tags")}
                        />
                    </Skeleton>
                </Tabs.Panel>
                <Tabs.Panel p={"xs"} value="second">
                    <Title my={"xs"} order={4}>Short Description</Title>
                    <Skeleton visible={loading}>
                        <TextInput
                            label="Short Description"
                            {...form.getInputProps("shortDescription")}
                        />
                    </Skeleton>
                    <Title my={"xs"} order={4}>Detailed Description</Title>
                    <Skeleton visible={loading}>
                        <Textarea
                            label="Description"
                            autosize={true}
                            minRows={4}
                            maxRows={12}
                            {...form.getInputProps("description")}
                        />
                    </Skeleton>
                </Tabs.Panel>
                <Tabs.Panel value="third">
                    <Stack style={{maxWidth: 784}}>
                        <Title mt="lg">Members</Title>
                        <Text color={"dimmed"}>
                            Members can perform the following actions:
                        </Text>
                        <List>
                            <List.Item>Update project info</List.Item>
                            <List.Item>Add or remove project members</List.Item>
                            <List.Item>Publish new releases</List.Item>
                        </List>
                        <Title order={2}>Project Member</Title>
                        <AddressInput onSubmit={addMember}/>
                        <Skeleton visible={loading}>
                            <MemberList
                                label="Project Member"
                                members={members}
                                editable={true}
                                onRemove={removeMember}
                            />
                        </Skeleton>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="fourth">
                    <Title my={"xs"} order={4}>YouTube Link</Title>
                    <Skeleton visible={loading}>
                        <TextInput
                            label="YouTube Link"
                            {...form.getInputProps("youTubeLink")}
                        />
                    </Skeleton>
                    <Title my={"xs"} order={4}>Header Image</Title>
                    <Text color="dimmed">
                        This can be the cover image of your game or app.
                        Recommended size is (616x353).
                    </Text>
                    <Skeleton visible={loading}>
                        <ImageInput
                            width={616}
                            height={353}
                            onChange={setMainCapsule}
                            value={mainCapsule}
                        />
                    </Skeleton>
                    <Title my={"xs"} order={4}>Gallery Images</Title>
                    <Text color="dimmed">
                        Additional images of your game or app. Recommended
                        size is (1280x720 or 1920x1080).
                    </Text>
                    <Skeleton visible={loading}>
                        <GalleryInput
                            onChange={setGallery}
                            value={gallery}
                        />
                    </Skeleton>
                </Tabs.Panel>
                <Tabs.Panel value="fifth">
                    <Title my={"xs"} order={5}>Requirements Title</Title>
                    <TextInput placeholder={"Requirements Title"} {...form.getInputProps('reqTitle')} />
                    <Title my={"xs"} order={5}>Requirements Description</Title>
                    <Textarea placeholder={"Requirements Description"} {...form.getInputProps('reqDescription')} />
                    <Title my={"xs"} order={5}>Requirements Price</Title>
                    <TextInput placeholder={"Requirements Price"} {...form.getInputProps('reqPrice')} />
                    <Title my={"xs"} order={5}>Requirements Deadline</Title>
                    <DatePicker placeholder={"Pick deadline"} {...form.getInputProps("reqDeadline")} />
                    <Title my={"xs"} order={5}>Requirements Tags</Title>
                    <Skeleton sx={{overflow: "visible", zIndex: 100}} visible={loading}>
                        <MultiSelect
                            data={requiredTags}
                            mb={"xl"}
                            placeholder="Select tags"
                            searchable
                            {...form.getInputProps("reqTags")}
                        />
                    </Skeleton>
                </Tabs.Panel>
            </Tabs>
            <Button m={"sm"} onClick={() => {
                showNotification({title: "Success", message: "Profile updated successfully.", icon: <IconCheck/>})
            }}>
                Save Changes
            </Button>
        </>
    )
}