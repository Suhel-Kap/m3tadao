import {useState} from 'react'
import {Stepper, Button, Group, TextInput, Code, Title, Center, Checkbox, Container} from '@mantine/core'
import {useForm} from '@mantine/form'
import {ImageInput} from "../ImageInput";

export function Registration() {
    const [active, setActive] = useState(0)
    const [image, setImage] = useState<File>()
    const [banner, setBanner] = useState<File>()
    const [skills, setSkills] = useState<string[]>([])
    const [interests, setInterests] = useState<string[]>([])

    const form = useForm({
        initialValues: {
            name: '',
            website: '',
            github: '',
            twitter: '',
            skills: [],
            interests: [],
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    name:
                        values.name.trim().length < 6
                            ? 'Name must include at least 6 characters'
                            : null,
                };
            }

            if (active === 1) {
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

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active} breakpoint="sm" style={{ marginTop: 75}}>
                <Stepper.Step label="First step" description="Your name and profile picture">
                    <Title order={4}>Your Name</Title>
                    <TextInput placeholder="Your Name" {...form.getInputProps('name')} />
                    <Title order={4}>Your Profile Picture</Title>
                    <ImageInput width={600} height={300} onChange={setImage} value={image}/>
                </Stepper.Step>

                <Stepper.Step label="Second step" description="Social media">
                    <Title order={4}>Your Banner</Title>
                    <ImageInput width={600} height={300} onChange={setBanner} value={banner}/>
                    <Title order={4}>Your Website</Title>
                    <TextInput placeholder="Your Website" {...form.getInputProps('website')} />
                    <Title order={4}>Your Github</Title>
                    <TextInput placeholder="Your Github" {...form.getInputProps('github')} />
                    <Title order={4}>Your Twitter</Title>
                    <TextInput placeholder="Your Twitter" {...form.getInputProps('twitter')} />
                </Stepper.Step>

                <Stepper.Step label="Final step" description="Your skills and interests">
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
            </Group>
        </>
    );
}