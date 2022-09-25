import {useState} from 'react'
import {
    Stepper, Button, Group, TextInput, Code, Title, Text, List, Stack, Tooltip, Input, Select, MultiSelect, Textarea
} from '@mantine/core'
import {useForm, zodResolver} from '@mantine/form'
import {ImageInput} from "../ImageInput"
import {NameInput} from "../NameInput"
import {AddressInput} from "../AddressInput";
import {useListState} from "@mantine/hooks";
import {MemberList} from "../MemberList";
import {schema} from "./schema";
import {IconAlertCircle, IconWorldWww, IconCheck} from "@tabler/icons";
import {GalleryInput} from "../GalleryInput";
import useContract from "../../hooks/useContract";
import {showNotification, updateNotification} from '@mantine/notifications'
import {useRouter} from 'next/router'
import {useAccount} from "wagmi";

export function CreateProject() {
    const [active, setActive] = useState(0)
    const [image, setImage] = useState<File>()
    const [mainCapsule, setMainCapsule] = useState<File>();
    const [gallery, setGallery] = useState<File[]>([]);
    const [members, membersHandlers] = useListState<string>([]);
    const {createSubProject} = useContract()
    const router = useRouter()
    const defaultTags = [
        'game', 'protocol', 'application', 'utilities', 'storage', 'networks',
        'social', 'communication', 'nft', 'defi', 'media', 'music',
    ];

    const defaultTypes = [
        'web', 'native', 'cli',
    ];
    const {address} = useAccount()
    const handleSubmit = async () => {
        addMember(address)
        console.log(form.values)
        showNotification({
            id: 'load-data',
            loading: true,
            title: 'Creating project',
            message: 'Please wait while we create project for your organisation on Valist',
            autoClose: false,
            disallowClose: true,
        })
        console.log(router.query.accId)
        try {
            await createSubProject(
                router.query.accId,
                form.values.projectName,
                form.values.type,
                image,
                form.values.description,
                members,
                form.values.displayName,
                form.values.website,
                form.values.shortDescription,
                form.values.youTubeLink,
                form.values.tags,
            )
            updateNotification({
                id: 'load-data',
                color: 'teal',
                title: 'Success',
                message: 'Project created successfully',
                icon: <IconCheck size={16}/>,
                autoClose: 2000,
            })
            router.push("/home")
        } catch (e) {
            console.log(e)
            updateNotification({
                id: 'load-data',
                color: 'red',
                title: 'Error',
                message: 'Failed to create organisation',
                icon: <IconAlertCircle size={16}/>,
                autoClose: 2000,
            })
        }

    }

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
        },
    })

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 4 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active} breakpoint="sm" style={{marginTop: 75}}>
                <Stepper.Step my={"sm"} label="Basic Info">
                    <Title mt="lg">Basic Info</Title>
                    <Text color="dimmed">
                        This is your public project info.
                    </Text>
                    <Title my={"sm"} order={4}>Project Image</Title>
                    <ImageInput width={600} height={300} onChange={setImage} value={image}/>
                    <Title my={"sm"} order={4}>Project Name (cannot be changed) <span
                        style={{color: "red"}}>*</span></Title>
                    <NameInput
                        parentId={"fdsfsf"} // TODO: pass the organisation name here
                        required
                        placeholder="Unique Account Name"
                        {...form.getInputProps("projectName")}
                    />
                    <Title my={"sm"} order={4}>Display Name <span style={{color: "red"}}>*</span></Title>
                    <TextInput placeholder="Display Name" {...form.getInputProps('displayName')} />
                    <Title my={"sm"} order={4}>Website</Title>
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
                    <Title my={"sm"} order={4}>Type</Title>
                    <Select
                        data={defaultTypes}
                        placeholder="Select type"
                        nothingFound="Nothing found"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        {...form.getInputProps("type")}
                    />
                    <Title my={"sm"} order={4}>Tags</Title>
                    <MultiSelect
                        data={defaultTags}
                        placeholder="Select tags"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        {...form.getInputProps("tags")}
                    />
                </Stepper.Step>

                <Stepper.Step label="Description">
                    <Stack style={{maxWidth: 784}}>
                        <Title mt="lg">Descriptions</Title>
                        <Text color="dimmed">
                            Let everyone know about your project.
                        </Text>
                        <Title order={2}>Short Description</Title>
                        <Text color="dimmed">
                            Enter a brief summary of the project. This will be
                            displayed on the project card or thumbnail.
                        </Text>
                        <TextInput
                            label="Short Description"
                            {...form.getInputProps("shortDescription")}
                        />
                        <Title order={2}>Description</Title>
                        <Text color="dimmed">
                            Give an extensive overview of your project. This
                            will be displayed on your project landing page.
                        </Text>
                        <Textarea
                            label="Description"
                            autosize={true}
                            minRows={4}
                            maxRows={12}
                            {...form.getInputProps("description")}
                        />
                    </Stack>
                </Stepper.Step>

                <Stepper.Step label="Members">
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
                        <MemberList
                            label="Project Member"
                            members={members}
                            editable={true}
                            onRemove={removeMember}
                        />
                    </Stack>
                </Stepper.Step>

                <Stepper.Step label="Media">
                    <Stack style={{maxWidth: 784}}>
                        <Title mt="lg">Media</Title>
                        <Text color="dimmed">
                            Show off your project with videos and images.
                        </Text>
                        <Title order={2}>YouTube Link</Title>
                        <Text color="dimmed">Paste a link to your video.</Text>
                        <TextInput
                            label="YouTube Link"
                            {...form.getInputProps("youTubeLink")}
                        />
                        <Title order={2}>Header Image</Title>
                        <Text color="dimmed">
                            This can be the cover image of your game or app.
                            Recommended size is (616x353).
                        </Text>
                        <ImageInput
                            width={616}
                            height={353}
                            onChange={setMainCapsule}
                            value={mainCapsule}
                        />
                        <Title order={2}>Gallery Images</Title>
                        <Text color="dimmed">
                            Additional images of your game or app. Recommended
                            size is (1280x720 or 1920x1080).
                        </Text>
                        <GalleryInput
                            onChange={setGallery}
                            value={gallery}
                        />
                    </Stack>
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.values, null, 2)}
                        {JSON.stringify(members, null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>

            <Group position="right" mt="xl">
                {active !== 0 && (
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                )}
                {active !== 4 && <Button onClick={nextStep}>Next step</Button>}
                {active === 4 && <Button onClick={() => handleSubmit()}>Confirm</Button>}
            </Group>
        </>
    );
}
