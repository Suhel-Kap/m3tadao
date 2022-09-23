import { CreateOrganisation } from "../components/CreateOrganisation"
import { Container } from "@mantine/core"
import { Layout } from "../components/Layout"
import Head from "next/head"
import { uploadFileToIpfs, uploadJsonToIpfs } from "../utils/uploadToIpfs"

export default function CreateOrg() {
    // const checkJsonIpfs = async () => {
    //     const jsonObject = { name: "try", description: "yrt" }
    //     const cid = await uploadJsonToIpfs(jsonObject)
    //     console.log("cid", cid)
    // }
    // const checkFileIpfs = async (file) => {
    //     console.log(file)
    //     const cid = await uploadFileToIpfs(file)
    //     console.log("cid", cid)
    // }
    return (
        <Layout>
            <Head>
                <title>Create Organisation</title>
            </Head>
            {/* <button onClick={checkJsonIpfs}>check ipfs</button>
            <input
                onChange={(file) => {
                    checkFileIpfs(file)
                }}
                type="file"
            ></input> */}
            <Container size={"xs"}>
                <CreateOrganisation />
            </Container>
        </Layout>
    )
}
