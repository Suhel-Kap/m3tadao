import { Card, Text, Group, Badge, Button, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        padding: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));

interface BadgeCardProps {
    description: string;
    title: string;
    price: string;
    deadline: string;
    badges: [];
}

export function RequirementsCard({ title, description, price, deadline, badges }: BadgeCardProps) {
    const { classes, theme } = useStyles();

    const features = badges.map((badge, index) => (
        <Badge
            color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
            key={index}
        >
            {badge}
        </Badge>
    ));

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section className={classes.section} mt="md">
                <Group position="apart">
                    <Text size="lg" weight={700}>
                        {title}
                    </Text>
                </Group>
                <Text size="sm" mt="xs">
                    {description}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group position="apart">
                    <Text size="lg" weight={500}>
                        <span style={{fontWeight: 700}}>Price: </span>{price}
                    </Text>
                </Group>
                <Text size="sm" mt="xs">
                    <span style={{fontWeight: 700}}>Deadline: </span>{deadline}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} color="dimmed">
                    Perfect for you, if you enjoy
                </Text>
                <Group spacing={7} mt={5}>
                    {features}
                </Group>
            </Card.Section>

            <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }}>
                    Contact project admin
                </Button>
            </Group>
        </Card>
    );
}