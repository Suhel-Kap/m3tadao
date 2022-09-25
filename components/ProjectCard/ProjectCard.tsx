import {Avatar, Text, Button, Paper} from '@mantine/core';
import Link from "next/link";

interface ProjectInfoActionProps {
    avatar: string;
    name: string;
    shortDescription: string;
    projectId: string;
    organisationName: string;
}

export function ProjectCard({avatar, name, shortDescription, projectId, organisationName}: ProjectInfoActionProps) {
    return (
        <Paper radius="md" withBorder p="lg"
               sx={(theme) => ({
                   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
               })}>
            <Avatar
                src={avatar}
                size={120} radius={120} mx="auto"/>
            <Text align="center" size="lg" weight={500} mt="md">
                {name}
            </Text>
            <Text align="center" size={"md"}>
                {shortDescription}
            </Text>

            <Link href={`/project?projId=${projectId}&orgName=${organisationName}`} passHref>
                <Button component={"a"} variant="default" fullWidth mt="md">
                    Show Details
                </Button>
            </Link>
        </Paper>
    );
}