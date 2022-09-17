import {Registration} from "../components/Registration";
import {Container, Center} from "@mantine/core";

/*
* name
* imageUri
* description or about yourself
* */

const UserRegistration = () => {
    return (
        <Container size="xs">
            <Registration/>
        </Container>
    )
}

export default UserRegistration