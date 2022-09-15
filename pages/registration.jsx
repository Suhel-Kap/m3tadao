import {Registration} from "../components/Registration";
import {Container, Center} from "@mantine/core";

const UserRegistration = () => {
    return (
        <Center style={{ width: 1550, height: 700}}>
            <Container size={"md"} px={"lg"} py={"lg"}>
                <Registration/>
            </Container>
        </Center>
    )
}

export default UserRegistration