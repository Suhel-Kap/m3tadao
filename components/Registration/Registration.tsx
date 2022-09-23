import { useState } from "react"
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
import { useForm } from "@mantine/form"
import { ImageInput } from "../ImageInput"
import { IconAlertCircle, IconBrandTwitter, IconBrandGithub, IconWorldWww } from "@tabler/icons"
import { useAccount, useContractEvent } from "wagmi"
import useContract from "../../hooks/useContract"

export function Registration() {
    const { createLensProfile } = useContract()
    const [active, setActive] = useState(0)
    const [image, setImage] = useState<File>()
    const [banner, setBanner] = useState<File>()
    const [skills, setSkills] = useState<string[]>([])
    const [interests, setInterests] = useState<string[]>([])
    const { address: useAddress } = useAccount()

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

            if (active === 1) {
                const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
                return {
                    website: regex.test(values.website) ? null : "Invalid website link",
                    github: regex.test(values.github) ? null : "Invalid github link",
                    twitter: regex.test(values.twitter) ? null : "Invalid twitter link",
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
        // userAddress,
        // handle,
        // imageURI,
        // followNFTURI,
        // description,
        // github,
        // twitter,
        // website,
        // profileURI
        const formValuesToSubmit = JSON.stringify(form.values, null, 2)
        const skillsToSubmit = JSON.stringify(skills, null, 2)
        const interestsToSubmit = JSON.stringify(interests, null, 2)
        const tx = await createLensProfile(
            useAddress,
            form.values.name,
            "https://bafybeiccvnw7mg24h7yrzst743gl5jymwxi52hnmvm2gvec5bwxso2wv2e.ipfs.w3s.link/image",
            "https://bafybeiccvnw7mg24h7yrzst743gl5jymwxi52hnmvm2gvec5bwxso2wv2e.ipfs.w3s.link/image",
            form.values.description,
            form.values.github,
            form.values.twitter,
            form.values.website,
            "https://bafybeiccvnw7mg24h7yrzst743gl5jymwxi52hnmvm2gvec5bwxso2wv2e.ipfs.w3s.link/image"
        )
        console.log(tx)
        const response = await tx.wait()
        console.log(response)
    }

    return (
        <>
            <Stepper active={active} breakpoint="sm" style={{ marginTop: 75 }}>
                <Stepper.Step label="Basic Info">
                    <Title order={4}>Your Profile Picture</Title>
                    <ImageInput width={600} height={300} onChange={setImage} value={image} />
                    <Title order={4}>
                        Your Name <span style={{ color: "red" }}>*</span>
                    </Title>
                    <TextInput required placeholder="Your Name" {...form.getInputProps("name")} />
                    <Title order={4}>
                        Your Designation <span style={{ color: "red" }}>*</span>
                    </Title>
                    <TextInput
                        required
                        placeholder="Student / web3 developer / full stack engineer"
                        {...form.getInputProps("designation")}
                    />
                    <Title order={4}>
                        Something About Yourself <span style={{ color: "red" }}>*</span>
                    </Title>
                    <Textarea
                        required
                        placeholder="I am a web3 enthusiast..."
                        {...form.getInputProps("description")}
                    />
                </Stepper.Step>

                <Stepper.Step label="Social Media">
                    <Title order={4}>Your Banner</Title>
                    <ImageInput width={600} height={300} onChange={setBanner} value={banner} />
                    <Title order={4}>Your Website</Title>
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
                    <Title order={4}>Your Github</Title>
                    <Input
                        icon={<IconBrandGithub size={16} />}
                        placeholder="Your GitHub"
                        {...form.getInputProps("github")}
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
                    <Title order={4}>Your Twitter</Title>
                    <Input
                        icon={<IconBrandTwitter size={16} />}
                        placeholder="Your twitter"
                        {...form.getInputProps("twitter")}
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
                            <Checkbox value="development" label="Development" />
                            <Checkbox value="design" label="Design" />
                            <Checkbox value="dim" label="Digital Marketing" />
                            <Checkbox value="pm" label="Project Management" />
                            <Checkbox value="fm" label="Finance Management" />
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
                            <Checkbox value="nft" label="NFTs" />
                            <Checkbox value="defi" label="DeFi" />
                            <Checkbox value="dao" label="DAOs" />
                            <Checkbox value="crypto" label="Crypto" />
                            <Checkbox value="did" label="DIDs" />
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
