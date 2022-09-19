import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

interface UserInfoIconsProps {
    avatar: string;
    name: string;
    title: string;
    address: string;
}

export function AuthorCard({ avatar, name, title, address }: UserInfoIconsProps) {
    const { classes } = useStyles();
    return (
        <div>
            <Group noWrap>
                <Avatar src={avatar} size={94} radius="md" />
                <div>
                    <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                        {title}
                    </Text>

                    <Text size="lg" weight={500} className={classes.name}>
                        {name}
                    </Text>

                    <Group noWrap spacing={10} mt={3}>
                        <IconAt stroke={1.5} size={16} className={classes.icon} />
                        <Text size="xs" color="dimmed">
                            {address.slice(0, 6) + '...' + address.slice(-4)}
                        </Text>
                    </Group>

                </div>
            </Group>
        </div>
    );
}