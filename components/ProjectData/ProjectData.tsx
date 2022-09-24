import {Anchor, Paper, SimpleGrid, Table, Tabs, Text} from '@mantine/core'
import {StyledTabs} from '../StyledTabs'
import {EditProject} from "../EditProject"
import {MemberCard} from "../MemberCard";
import {RequirementsCard} from "../RequirementsCard";

const data = [
    {
        version: "1.0.0",
        releaseDate: "2021-05-01",
        metadataUrl: "https://bafkreihyg36athx2x4ygvhil4pjmqgx57lj25glnke22knpsc3whp2wuiu.ipfs.gateway.valist.io/"
    },
    {
        version: "1.0.1",
        releaseDate: "2021-05-02",
        metadataUrl: "https://bafkreihyg36athx2x4ygvhil4pjmqgx57lj25glnke22knpsc3whp2wuiu.ipfs.gateway.valist.io/"
    },
    {
        version: "1.0.2",
        releaseDate: "2021-05-03",
        metadataUrl: "https://bafkreihyg36athx2x4ygvhil4pjmqgx57lj25glnke22knpsc3whp2wuiu.ipfs.gateway.valist.io/"
    }
]
const memberData = [
    {
        address: "0x0000000000000001234500000000000000000000",
        name: "person1"
    },
    {
        address: "0x0321000000000000000000000000000000000000",
        name: "person2"
    },
    {
        address: "0x0000000000000000000000000000000007770000",
        name: "person3"
    }
]

export function ProjectData() {
    const rows = data.map((row) => (
        <tr key={row.version}>
            <td>{row.version}</td>
            <td>{row.releaseDate}</td>
            <td><Anchor href={row.metadataUrl} target={"_blank"} weight={700}>view metadata</Anchor></td>
        </tr>
    ))

    const memberRows = memberData.map((row) => (
        <MemberCard address={row.address} name={row.name}/>
    ))

    return (
        <StyledTabs defaultValue={"readme"}>
            <Tabs.List my={"md"}>
                <Tabs.Tab value={"requirements"}>
                    Requirements
                </Tabs.Tab>
                <Tabs.Tab value="readme">
                    Readme
                </Tabs.Tab>
                <Tabs.Tab value="versions">
                    Versions
                </Tabs.Tab>
                <Tabs.Tab value="Members">
                    Members
                </Tabs.Tab>
                <Tabs.Tab value={"settings"}>
                    Settings
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={"requirements"}>
                <SimpleGrid cols={2} spacing={"md"} breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' },]}>
                    <RequirementsCard
                        description={"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "}
                        title={"Project manager"} price={"25 MATIC"} deadline={"30 Sept 2022"}
                        badges={["Defi", "Design", "Management"]}/>
                    <RequirementsCard
                        description={"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "}
                        title={"Project manager"} price={"25 MATIC"} deadline={"30 Sept 2022"}
                        badges={["Defi", "Design", "Management"]}/>
                    <RequirementsCard
                        description={"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "}
                        title={"Project manager"} price={"25 MATIC"} deadline={"30 Sept 2022"}
                        badges={["Defi", "Design", "Management"]}/>
                </SimpleGrid>
            </Tabs.Panel>
            <Tabs.Panel value={"readme"}>
                <Paper shadow="xl" radius="lg" p="md">
                    <Text p={"md"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda at commodi
                        deleniti eum expedita impedit, molestias natus nobis odit quae quis repellendus vel! Alias at
                        debitis deleniti distinctio fugit, iusto laboriosam omnis optio placeat quos rem repellat
                        repellendus tenetur totam unde veritatis voluptate! Aliquam, amet asperiores at beatae dicta
                        dolore expedita in iure iusto labore maiores modi molestias nemo numquam omnis quaerat quasi
                        quod, rerum tempora voluptatum! Animi aspernatur at distinctio dolor est eveniet excepturi
                        laborum perferendis vero voluptatum.
                    </Text>
                </Paper>
            </Tabs.Panel>
            <Tabs.Panel value={"versions"}>
                <Paper shadow="xl" radius="lg" p="md">
                    <Table striped highlightOnHover horizontalSpacing="sm" verticalSpacing="sm" fontSize="md">
                        <thead>
                        <tr>
                            <th>Version</th>
                            <th>Release Date</th>
                            <th>Metadata URL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                </Paper>
            </Tabs.Panel>
            <Tabs.Panel value={"Members"}>
                <Paper shadow="xl" radius="lg" p="md">
                    {memberRows}
                </Paper>
            </Tabs.Panel>
            <Tabs.Panel value={"settings"}>
                <Paper shadow="xl" radius="lg" p="md">
                    <EditProject/>
                </Paper>
            </Tabs.Panel>
        </StyledTabs>
    );
}