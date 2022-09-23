import {Registration} from "../components/Registration";
import {Container, Center} from "@mantine/core";
import Head from "next/head";

/*
* name
* imageUri
* description or about yourself
* */

const UserRegistration = () => {
    return (
        <>
            <Head>
                <title>Registration - m3tadao</title>
            </Head>
            <Container size="xs">
                <Registration/>
            </Container>
        </>
    )
}

export default UserRegistration