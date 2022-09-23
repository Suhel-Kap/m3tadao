import {Container, Grid, NavLink} from "@mantine/core";
import {IconChevronRight} from "@tabler/icons";
import {useState} from "react";
import {EditUser} from "../EditUser"
import {EditOrganisation} from "../EditOrganisation";
import {EditProject} from "../EditProject";

const data = [
    {
        projectId: "1234",
        projectTitle: "Project 1",
    },
    {
        projectId: "1235",
        projectTitle: "Project 2",
    },
    {
        projectId: "1236",
        projectTitle: "Project 3",
    },
]

export function ManageProfile() {
    const [active, setActive] = useState(0)

    const items = data.map((item, index) => {
        index = index + 1
        return (
            <NavLink
                sx={(theme) => ({width: "85%", [theme.fn.smallerThan("md")]: {width: "100%"}})}
                key={item.projectId}
                active={index === active}
                label={item.projectTitle}
                rightSection={<IconChevronRight size={14} stroke={1.5}/>}
                onClick={() => setActive(index)}
            />
        )
    })

    return (
        <Container
            sx={(theme) => ({
                [theme.fn.smallerThan("md")]: {
                    width: "100%",
                }
            })}>
            <Grid>
               <Grid.Col lg={3} md={2}>
                   <NavLink
                       sx={(theme) => ({width: "85%", [theme.fn.smallerThan("md")]: {width: "100%"}})}
                       key={0}
                       active={0 === active}
                       label={"Your profile"}
                       rightSection={<IconChevronRight size={14} stroke={1.5}/>}
                       onClick={() => setActive(0)}
                   />
                     {items}
               </Grid.Col>
                <Grid.Col lg={9} md={10}>
                    <Container size={"xl"} px="xs">
                        {active === 0 && <EditUser/>}
                        {active === 1 && <EditOrganisation/>}
                        {active === 2 && <EditProject/>}
                    </Container>
                </Grid.Col>
            </Grid>

        </Container>
    )
}