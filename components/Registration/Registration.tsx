import {useEffect, useState} from "react"
import {
    Stepper,
    Button,
    Group,
    TextInput,
    Code,
    Title,
    Checkbox,
    Container,
    Tooltip,
    Input,
    Textarea,
} from "@mantine/core"
import {useForm} from "@mantine/form"
import {ImageInput} from "../ImageInput"
import {
    IconAlertCircle,
    IconBrandTwitter,
    IconBrandGithub,
    IconWorldWww,
    IconCheck,
} from "@tabler/icons"
import useContract from "../../hooks/useContract"
import {useAccount} from "wagmi"
import {showNotification, updateNotification} from "@mantine/notifications"
import {useRouter} from "next/router"
import useTableland from "../../hooks/useTableland"

export function Registration() {
    const [active, setActive] = useState(0)
    const [image, setImage] = useState<File>()
    const [banner, setBanner] = useState<File>()
    const [skills, setSkills] = useState<string[]>([])
    const [interests, setInterests] = useState<string[]>([])
    const {address} = useAccount()
    const {createLensProfile} = useContract()
    const router = useRouter()

    const {isConnected, isDisconnected, status} = useAccount()

    const {getUserExists} = useTableland()

    useEffect(() => {
        checkStatus()
    }, [])

    const checkStatus = async () => {
        const isUserExists = await getUserExists()
        if (isUserExists) {
            router.push("/home")
        }
    }

    // useEffect(() => {
    //     console.log("checking")
    //     console.log("isConnected", isConnected)
    //     if (isConnected) {
    //         router.push("/")
    //     }
    //     console.log("checked")
    // }, [status])

    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            designation: "",
            website: "",
            github: "",
            twitter: "",
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    name:
                        values.name.trim().length < 6
                            ? "Name must include at least 6 characters"
                            : null,
                }
            }
            return {}
        },
    })

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current
            }
            return current < 3 ? current + 1 : current
        })

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

    const handleSubmit = async () => {
        showNotification({
            id: "load-data",
            loading: true,
            title: "Registering you on m3tadao",
            message:
                "Please wait while we upload your images to web3.storage and create your lens profile",
            autoClose: false,
            disallowClose: true,
        })
        try {
            await createLensProfile(
                address,
                form.values.name,
                image,
                banner,
                form.values.description,
                form.values.designation,
                form.values.github,
                form.values.twitter,
                form.values.website,
                interests,
                skills
            )
            updateNotification({
                id: "load-data",
                color: "teal",
                title: "Success",
                message: "Registered successfully",
                icon: <IconCheck size={16}/>,
                autoClose: 2000,
            })
            router.push("/home")
        } catch (e) {
            console.log(e)
            updateNotification({
                id: "load-data",
                color: "red",
                title: "Error",
                message: "Failed to register",
                icon: <IconAlertCircle size={16}/>,
                autoClose: 2000,
            })
        }
    }

    return (
        <>
            <Stepper active={active} breakpoint="sm" style={{marginTop: 75}}>
                <Stepper.Step label="Basic Info">
                    <Title order={4}>Your Profile Picture</Title>
                    <ImageInput width={600} height={300} onChange={setImage} value={image}/>
                    <Title order={4}>
                        Your Name <span style={{color: "red"}}>*</span>
                    </Title>
                    <TextInput required placeholder="Your Name" {...form.getInputProps("name")} />
                    <Title order={4}>
                        Your Designation <span style={{color: "red"}}>*</span>
                    </Title>
                    <TextInput
                        required
                        placeholder="Student / web3 developer / full stack engineer"
                        {...form.getInputProps("designation")}
                    />
                    <Title order={4}>
                        Something About Yourself <span style={{color: "red"}}>*</span>
                    </Title>
                    <Textarea
                        required
                        placeholder="I am a web3 enthusiast..."
                        {...form.getInputProps("description")}
                    />
                </Stepper.Step>

                <Stepper.Step label="Social Media">
                    <Title order={4}>Your Banner</Title>
                    <ImageInput width={600} height={300} onChange={setBanner} value={banner}/>
                    <Title order={4}>Your Website</Title>
                    <Input
                        icon={<IconWorldWww size={16}/>}
                        placeholder="Your Website"
                        {...form.getInputProps("website")}
                        rightSection={
                            <Tooltip label="This is public" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle
                                        size={18}
                                        style={{display: "block", opacity: 0.5}}
                                    />
                                </div>
                            </Tooltip>
                        }
                    />
                    <Title order={4}>Your Github</Title>
                    <Input
                        icon={<IconBrandGithub size={16}/>}
                        placeholder="Your GitHub"
                        {...form.getInputProps("github")}
                        rightSection={
                            <Tooltip label="This is public" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle
                                        size={18}
                                        style={{display: "block", opacity: 0.5}}
                                    />
                                </div>
                            </Tooltip>
                        }
                    />
                    <Title order={4}>Your Twitter</Title>
                    <Input
                        icon={<IconBrandTwitter size={16}/>}
                        placeholder="Your twitter"
                        {...form.getInputProps("twitter")}
                        rightSection={
                            <Tooltip label="This is public" position="top-end" withArrow>
                                <div>
                                    <IconAlertCircle
                                        size={18}
                                        style={{display: "block", opacity: 0.5}}
                                    />
                                </div>
                            </Tooltip>
                        }
                    />
                </Stepper.Step>

                <Stepper.Step label="Your skills and interests">
                    <Container p={"sm"} m={"md"}>
                        <Checkbox.Group
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
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.values, null, 2)}
                        {JSON.stringify(skills, null, 2)}
                        {JSON.stringify(interests, null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>

            <Group position="right" mt="xl">
                {active !== 0 && (
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                )}
                {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
                {active === 3 && <Button onClick={() => handleSubmit()}>Confirm</Button>}
            </Group>
        </>
    )
}
