import {Button, Container, FileInput, Stack, Textarea, TextInput} from "@mantine/core"
import {IconPhoto, IconCheck, IconAlertCircle} from "@tabler/icons"
import {useForm} from "@mantine/form"
import {showNotification, updateNotification} from "@mantine/notifications"
import {useRouter, Router} from "next/router"
import useLens from "../../hooks/useLens"
import useContract from "../../hooks/useContract"
import useTableland from "../../hooks/useTableland"
import {useAccount} from "wagmi"

export function CreatePost() {
    const router = useRouter()
    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            image: null,
        },
    })

    const {address} = useAccount()

    const {getUserData} = useTableland()
    const {createLensPost} = useContract()

    const handleSubmit = async () => {
        showNotification({
            id: "load-data",
            loading: true,
            title: "Creating post...",
            message: "Please wait while we create your post",
            autoClose: false,
            disallowClose: true,
        })
        try {
            const userData: any = await getUserData(address)
            console.log("id:", userData[1])
            const res = await createLensPost(
                userData[1],
                form.values.title,
                form.values.description,
                form.values.image
            )

            console.log("res", res)

            updateNotification({
                id: "load-data",
                color: "teal",
                title: "Success",
                message: "Post created successfully",
                icon: <IconCheck size={16}/>,
                autoClose: 2000,
            })

            // router.reload()
            // router.push("/home")
        } catch (e) {
            console.log(e)
            updateNotification({
                id: "load-data",
                color: "red",
                title: "Error",
                message: "Failed to create post",
                icon: <IconAlertCircle size={16}/>,
                autoClose: 2000,
            })
        }
    }

    return (
        <Stack
            sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: {
                    width: "90%",
                },
                width: "50%",
            })}
        >
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
            <Button onClick={() => handleSubmit()} variant={"filled"}>
                Create Post
            </Button>
        </Stack>
    )
}
