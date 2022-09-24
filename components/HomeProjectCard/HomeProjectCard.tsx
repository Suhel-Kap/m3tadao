import { Card, Image, Text } from '@mantine/core';

export function HomeProjectCard(props: any) {
    return (
        <Card
            shadow="sm"
            p="xl"
            mb={"xl"}
            component="a"
            href="http://localhost:3000/projects" // TODO: Change this to the actual project page
        >
            <Card.Section>
                <Image
                    src={props.image}
                    height={160}
                    alt="No way!"
                />
            </Card.Section>

            <Text weight={500} size="lg" mt="md">
                {props.title}
            </Text>

            <Text mt="xs" color="dimmed" size="sm">
                {props.description}
            </Text>
        </Card>
    );
}