import {useState} from 'react'
import {Stepper, Button, Group, TextInput, Code, Title, Text, List, Stack, Tooltip, Input} from '@mantine/core'
import {useForm, zodResolver} from '@mantine/form'
import {ImageInput} from "../ImageInput"
import {schema} from "./schema"
import {NameInput} from "../NameInput"
import {AddressInput} from "../AddressInput";
import {useListState} from "@mantine/hooks";
import {MemberList} from "../MemberList";
import {IconAlertCircle, IconCheck, IconWorldWww} from "@tabler/icons";
import {showNotification, updateNotification} from "@mantine/notifications";
import useContract from "../../hooks/useContract";
import {useRouter} from "next/router";
import {useAccount} from "wagmi";

export function CreateOrganisation() {
    const [active, setActive] = useState(0)
    const [image, setImage] = useState<File>()
    const [members, membersHandlers] = useListState<string>([]);
    const {createProjectAccount} = useContract()
    const router = useRouter()

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
            accountName: '',
            displayName: '',
            website: '',
            description: '',
        },
    })

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))
    const {address} = useAccount()

    const handleSubmit = async () => {
        addMember(address)
        showNotification({
            id: 'load-data',
            loading: true,
            title: 'Creating your organisation on m3tadao',
            message: 'Please wait while we create your organisation on Valist',
            autoClose: false,
            disallowClose: true,
        })
        try {
            await createProjectAccount(
                form.values.accountName,
                form.values.website,
                "organisation",
                "",
                image,
                "",
                form.values.description,
                members
            )
            updateNotification({
                id: 'load-data',
                color: 'teal',
                title: 'Success',
                message: 'Organisation created successfully',
                icon: <IconCheck size={16}/>,
                autoClose: 2000,
            })
            router.push("/home")
        } catch (e) {
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

    return (
        <>
            <Stepper active={active} breakpoint="sm" style={{marginTop: 75}}>
                <Stepper.Step label="Basic Info" description={"This is your public organisation info."}>
                    <Title order={4}>Organisation Image</Title>
                    <ImageInput width={600} height={300} onChange={setImage} value={image}/>
                    <Title order={4}>Account Name (cannot be changed) <span style={{color: "red"}}>*</span></Title>
                    <NameInput
                        parentId={80001}
                        required
                        placeholder="Unique Account Name"
                        {...form.getInputProps("accountName")}
                    />
                    <Title order={4}>Display Name <span style={{color: "red"}}>*</span></Title>
                    <TextInput placeholder="Display Name" {...form.getInputProps('displayName')} />
                    <Title order={4}>Website</Title>
                    <Input
                        icon={<IconWorldWww size={16}/>}
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
                    <Title order={4}>Description</Title>
                    <TextInput placeholder="Description of your project" {...form.getInputProps('description')} />
                </Stepper.Step>

                <Stepper.Step label="Members" description="Members of this organisation">
                    <Stack style={{maxWidth: 784}}>
                        <Title mt="lg">Members</Title>
                        <Text color={"dimmed"}>
                            Members can perform the following actions:
                        </Text>
                        <List>
                            <List.Item>Update account info</List.Item>
                            <List.Item>Add or remove account members</List.Item>
                            <List.Item>Create new projects</List.Item>
                            <List.Item>Add or remove project members</List.Item>
                            <List.Item>Update project info</List.Item>
                            <List.Item>Publish new releases</List.Item>
                        </List>
                        <Title order={2}>Account Admins</Title>
                        <AddressInput onSubmit={addMember}/>
                        <MemberList
                            label="Account Admin"
                            members={members}
                            editable={true}
                            onRemove={removeMember}
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
                {active !== 2 && <Button onClick={nextStep}>Next step</Button>}
                {active === 2 && <Button onClick={() => handleSubmit()}>Confirm</Button>}
            </Group>
        </>
    );
}