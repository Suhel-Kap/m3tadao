import {Container, createStyles, Image, Text, Title} from "@mantine/core"

const useStyles = createStyles((theme) => {
    return {
        root: {
            marginTop: theme.spacing.xl,
        },
        image: {
            width: "100%",
            height: "auto",
            borderRadius: theme.radius.md,
            marginBottom: theme.spacing.md,
            [theme.fn.largerThan("md")]: {
                maxWidth: "800px",
            },
            [theme.fn.smallerThan("md")]: {
                width: "100%",
            }
        },
        title: {
            marginBottom: theme.spacing.md,
        },
        text: {
            marginBottom: theme.spacing.md,
        },

    }
})

export function PostContent() {
    const {classes} = useStyles()

    return (
        <>
            <Title mt={"md"}>
                lorem: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl nec aliquam
            </Title>
            <Image className={classes.image} alt="With default placeholder" fit={"contain"} src={"https://miro.medium.com/max/933/1*f95MCEeyaDBdGTQS25nyrQ.png"}
                   mt={"md"}/>
            <Container ml={0} px={0} py={"md"} style={{maxWidth: 800}}>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl nec aliquam
                    tincidunt, nunc nibh ultrices nunc, eget aliquam ante nisl eget nunc. Nullam eget
                    tincidunt nunc. Nulla facilisi. Donec euismod, nisl nec aliquam tincidunt, nunc nibh ultrices
                    nunc, eget aliquam ante nisl eget nunc. Nullam eget tincidunt nunc. Nulla facilisi. Donec
                    euismod, nisl nec aliquam tincidunt, nunc nibh ultrices nunc, eget aliquam ante nisl eget
                    nunc. Nullam eget tincidunt nunc. Nulla facilisi. Donec euismod, nisl nec aliquam tincidunt,
                    nunc nibh ultrices nunc, eget aliquam ante nisl eget nunc. Nullam eget tincidunt nunc. Nulla
                    facilisi. Donec euismod, nisl nec aliquam tincidunt, nunc nibh ultrices nunc, eget aliquam
                </Text>
            </Container>
        </>
    )
}