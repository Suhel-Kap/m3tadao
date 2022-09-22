import {Avatar, Text, Button, Paper} from '@mantine/core';
import Link from "next/link";

interface ProjectInfoActionProps {
    avatar: string;
    name: string;
    shortDescription: string;
}

export function ProjectCard({avatar, name, shortDescription}: ProjectInfoActionProps) {
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

            <Link href={"/project"} passHref>
                <Button component={"a"} variant="default" fullWidth mt="md">
                    Show Details
                </Button>
            </Link>
        </Paper>
    );
}