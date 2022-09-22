import {useAccount} from "wagmi"
import {Button, Checkbox, Container, Input, Skeleton, Tabs, Textarea, TextInput, Title, Tooltip} from "@mantine/core"
import {useState} from "react"
import {IconCheck} from "@tabler/icons"
import {useForm} from "@mantine/form"
import {ImageInput} from "../ImageInput"
import {IconAlertCircle, IconBrandGithub, IconBrandTwitter, IconWorldWww} from "@tabler/icons"
import {showNotification} from '@mantine/notifications'

export function EditUser() {
    const {address} = useAccount()
    const [activeTab, setActiveTab] = useState("first")
    const [loading, setLoading] = useState(false)
    // TODO: Set user data as initial values
    const [image, setImage] = useState<File>()
    const [banner, setBanner] = useState<File>()
    const [skills, setSkills] = useState<string[]>()
    const [interests, setInterests] = useState<string[]>([])

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            designation: '',
            website: '',
            github: '',
            twitter: '',
        },

        validate: (values) => {
            if (activeTab === "first") {
                return {
                    name:
                        values.name.trim().length < 6
                            ? 'Name must include at least 6 characters'
                            : null,
                };
            }

            if (activeTab === "second") {
                const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                return {
                    website: regex.test(values.website) ? null : 'Invalid website link',
                    github: regex.test(values.github) ? null : 'Invalid github link',
                    twitter: regex.test(values.twitter) ? null : 'Invalid twitter link',
                };
            }

            return {};
        },
    })

    return (
        <>
            <button onClick={() => setLoading((prevState) => !prevState)}>Toggle Skeleton</button>
            <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List grow>
                    <Tabs.Tab value="first">Basic Info</Tabs.Tab>
                    <Tabs.Tab value="second">Social Media</Tabs.Tab>
                    <Tabs.Tab value="third">Skills and Interests</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel p={"xs"} value="first">
                    <Title my={"xs"} order={4}>Your Profile Picture</Title>
                    <Skeleton visible={loading}>
                        <ImageInput width={600} height={300} onChange={setImage} value={image}/>
                    </Skeleton>
                    <Title my={"xs"} order={4}>Your Name <span style={{color: "red"}}>*</span></Title>
                    <Skeleton visible={loading}>
                        <TextInput required placeholder="Your Name" {...form.getInputProps('name')} />
                    </Skeleton>
                    <Title my={"xs"} order={4}>Your Designation <span style={{color: "red"}}>*</span></Title>
                    <Skeleton visible={loading}>
                        <TextInput required
                                   placeholder="Student / web3 developer / full stack engineer" {...form.getInputProps('designation')} />
                    </Skeleton>
                    <Title my={"xs"} order={4}>Something About Yourself <span style={{color: "red"}}>*</span></Title>
                    <Skeleton visible={loading}>
                        <Textarea required
                                  placeholder="I am a web3 enthusiast..." {...form.getInputProps('description')} />
                    </Skeleton>
                </Tabs.Panel>
                <Tabs.Panel p={"xs"} value="second">
                    <Title my={"xs"} order={4}>Your Banner</Title>
                    <Skeleton visible={loading}>
                        <ImageInput width={600} height={300} onChange={setBanner} value={banner}/>
                    </Skeleton>
                    <Title my={"xs"} order={4}>Your Website</Title>
                    <Skeleton visible={loading}>
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
                    </Skeleton>
                    <Title my={"xs"} order={4}>Your Github</Title>
                    <Skeleton visible={loading}>
                        <Input
                            icon={<IconBrandGithub size={16}/>}
                            placeholder="Your GitHub"
                            {...form.getInputProps('github')}
                            rightSection={
                                <Tooltip label="This is public" position="top-end" withArrow>
                                    <div>
                                        <IconAlertCircle size={18} style={{display: 'block', opacity: 0.5}}/>
                                    </div>
                                </Tooltip>
                            }
                        />
                    </Skeleton>
                    <Title my={"xs"} order={4}>Your Twitter</Title>
                    <Skeleton visible={loading}>
                        <Input
                            icon={<IconBrandTwitter size={16}/>}
                            placeholder="Your twitter"
                            {...form.getInputProps('twitter')}
                            rightSection={
                                <Tooltip label="This is public" position="top-end" withArrow>
                                    <div>
                                        <IconAlertCircle size={18} style={{display: 'block', opacity: 0.5}}/>
                                    </div>
                                </Tooltip>
                            }
                        />
                    </Skeleton>
                </Tabs.Panel>
                <Tabs.Panel value="third">
                    <Container p={"sm"} m={"md"}>
                        <Checkbox.Group
                            defaultValue={skills}
                            value={skills}
                            onChange={setSkills}
                            orientation="vertical"
                            label="What are your skills"
                            description="Select some stuff that you're good at"
                            spacing="xl"
                            size="md"
                        >
                            <Checkbox value="development" label="Development"/>
                            <Checkbox value="design" label="Design"/>
                            <Checkbox value="dim" label="Digital Marketing"/>
                            <Checkbox value="pm" label="Project Management"/>
                            <Checkbox value="fm" label="Finance Management"/>
                        </Checkbox.Group>
                    </Container>
                    <Container>
                        <Checkbox.Group
                            value={interests}
                            defaultValue={interests}
                            onChange={setInterests}
                            orientation="vertical"
                            label="What are your interests"
                            description="Select some stuff that you're interested in"
                            spacing="xl"
                            size="md"
                        >
                            <Checkbox value="nft" label="NFTs"/>
                            <Checkbox value="defi" label="DeFi"/>
                            <Checkbox value="dao" label="DAOs"/>
                            <Checkbox value="crypto" label="Crypto"/>
                            <Checkbox value="did" label="DIDs"/>
                        </Checkbox.Group>
                    </Container>
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