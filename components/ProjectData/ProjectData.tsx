import {Anchor, Group, Paper, SimpleGrid, Skeleton, Table, Tabs, Text} from '@mantine/core'
import {StyledTabs} from '../StyledTabs'
import {EditProject} from "../EditProject"
import {MemberCard} from "../MemberCard";
import {RequirementsCard} from "../RequirementsCard";
import {useEffect, useState} from "react"
import {m3taDao} from "../../constants/contractAddresses.json"
import {IconBrandYoutube} from "@tabler/icons";

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

export function ProjectData(props: any) {
    const propsData = props.data
    console.log(propsData)
    const [releaseData, setReleaseData] = useState([])
    const [memberData, setMemberData] = useState([])
    const [loading, setLoading] = useState(true)
    const [meta, setMeta] = useState({
        displayName: "",
        description: "",
        website: "",
        youtubeLink: "",
        tags: []
    })

    useEffect(() => {
        if (propsData) {
            let temp = Object.keys(propsData.members).map(function (key) {
                return propsData.members[key].id
            })
            temp = temp.filter(mem => mem !== m3taDao)
            setMemberData(temp)
            setReleaseData(propsData.releases)
            const response = fetch(`https://${propsData.metaURI}.ipfs.gateway.valist.io/json`).then(res => res.json().then(data => setMeta(data)))
            setLoading(false)
        }
    }, [props.data])

    const rows = releaseData.map((row) => (
        <tr key={row.name}>
            <td>{row.name}</td>
            <td><Anchor href={row.metaURI} target={"_blank"} weight={700}>view metadata</Anchor></td>
        </tr>
    ))


    const memberRows = memberData.map((row) => (
        <MemberCard address={row} name={"Project Admin"}/>
    ))

    return (
        <StyledTabs defaultValue={"readme"}>
            <Tabs.List my={"md"}>
                <Tabs.Tab value="readme">
                    Readme
                </Tabs.Tab>
                <Tabs.Tab value={"requirements"}>
                    Requirements
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
                <SimpleGrid cols={2} spacing={"md"} breakpoints={[{maxWidth: 600, cols: 1, spacing: 'sm'},]}>
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
                <Skeleton animate={true} visible={loading}>
                    <Paper shadow="xl" radius="lg" p="md">
                        <Group>
                            {meta.website &&
                                <Text p={"md"} size="xl" weight={700} mb="x">
                                    <Anchor href={meta.website} target={"_blank"}
                                            weight={700}>{meta.displayName}</Anchor>
                                </Text>
                            }
                            {meta.youtubeLink &&
                                <Text p={"md"} size="xl" weight={700} mb="x">
                                    <Anchor href={meta.youtubeLink} target={"_blank"}
                                            weight={700}><IconBrandYoutube/></Anchor>
                                </Text>
                            }
                        </Group>
                        <Text p={"md"}>
                            {meta.description}
                        </Text>
                    </Paper>
                </Skeleton>
            </Tabs.Panel>
            <Tabs.Panel value={"versions"}>
                <Paper shadow="xl" radius="lg" p="md">
                    <Table striped highlightOnHover horizontalSpacing="sm" verticalSpacing="sm" fontSize="md">
                        <thead>
                        <tr>
                            <th>Version</th>
                            <th>Metadata URL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.length > 0 ? rows :
                            <tr>
                                <td>No releases</td>
                            </tr>
                        }
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