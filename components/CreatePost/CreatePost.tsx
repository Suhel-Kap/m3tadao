import {Button, Container, FileInput, Stack, Textarea, TextInput} from "@mantine/core";
import {IconPhoto} from "@tabler/icons";
import {useForm} from "@mantine/form";

export function CreatePost() {
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            image: null,
        }
    })

    return (

            <Stack sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: {
                    width: "90%"
                },
                width: "50%"
            })}>
                <TextInput
                    placeholder="Title"
                    label={"Title"}
                    required
                    {...form.getInputProps("title")}
                />
                <Textarea
                    placeholder="Description"
                    label={"Description"}
                    required
                    autosize
                    minRows={4}
                    maxRows={6}
                    {...form.getInputProps("description")}
                />
                <FileInput
                    label="Image"
                    placeholder="Choose an image"
                    icon={<IconPhoto size={16}/>}
                    accept="image/*"
                    {...form.getInputProps("image")}
                />
                <Button onClick={() => console.log(form.values)} variant={"filled"}>
                    Create Post
                </Button>
            </Stack>
    )
}