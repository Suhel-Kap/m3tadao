import {useState} from 'react'
import {Stepper, Button, Group, TextInput, Code, Title, Text, Stack, Textarea, ScrollArea} from '@mantine/core'
import {useForm, zodResolver} from '@mantine/form'
import {ImageInput} from "../ImageInput"
import {NameInput} from "../NameInput"
import {File} from "../File"
import {schema} from "./schema"
import {FileInput} from "../FileInput";
import type {FileWithPath} from "file-selector"

export function CreateRelease() {
    const [active, setActive] = useState(0)
    const [image, setImage] = useState<File>()
    const [files, setFiles] = useState<FileWithPath[]>([])

    const form = useForm({
        validate: zodResolver(schema),
        validateInputOnChange: true,
        initialValues: {
            releaseName: "",
            displayName: "",
            description: ""
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
                <Stepper.Step label="Basic Info">
                    <Title mt="lg">Basic Info</Title>
                    <Text color="dimmed">
                        This is your public project info.
                    </Text>
                    <Title my={"sm"} order={4}>Release Image</Title>
                    <ImageInput width={600} height={300} onChange={setImage} value={image}/>
                    <Title my={"sm"} order={4}>Release Name (cannot be changed) <span
                        style={{color: "red"}}>*</span></Title>
                    <NameInput
                        parentId={80001}
                        required
                        placeholder="Unique Account Name"
                        {...form.getInputProps("releaseName")}
                    />
                    <Title my={"sm"} order={4}>Display Name <span style={{color: "red"}}>*</span></Title>
                    <TextInput mb={"lg"} placeholder="Display Name" {...form.getInputProps('displayName')} />
                    <Title order={2}>Description</Title>
                    <Text mb={"lg"} size={"sm"} color="dimmed">
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
                </Stepper.Step>

                <Stepper.Step label="Files">
                    <Stack style={{maxWidth: 784}}>
                        <Title mt="lg">File</Title>
                        <>
                            <Text color="dimmed">
                                Upload your executable release file.
                            </Text>
                            <FileInput
                                onChange={setFiles}
                                value={files}
                            />
                            <ScrollArea style={{height: 300}}>
                                <Stack spacing={12}>
                                    {files.map(
                                        (
                                            file: FileWithPath,
                                            index: number
                                        ) => (
                                            <File
                                                key={index}
                                                path={
                                                    file.path ??
                                                    file.name
                                                }
                                                size={file.size}
                                            />
                                        )
                                    )}
                                </Stack>
                            </ScrollArea>
                        </>
                    </Stack>
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
                {active !== 2 && <Button onClick={nextStep}>Next step</Button>}
                {active === 2 && <Button onClick={() => console.log("submit todo")}>Confirm</Button>}
            </Group>
        </>
    );
}
