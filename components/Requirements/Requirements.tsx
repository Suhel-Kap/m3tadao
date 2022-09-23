import {Container, TextInput, Title} from "@mantine/core"

interface RequirementsProps {
    title?: string,
    description?: string,
    tags?: string[],
    price?: string,
    deadline?: string,
}

export function Requirements(props: RequirementsProps) {
    return (
        <Container>
            <TextInput  />
        </Container>
    )
}