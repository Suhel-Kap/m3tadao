import {useMantineColorScheme, ActionIcon, Group, createStyles} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

const useStyle = createStyles((theme) => ({
    responsive: {
        [theme.fn.smallerThan('md')]: {
            marginTop: 0,
            marginBottom: 0,
        },
    }
}))

export function DarkModeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const {classes, cx} = useStyle()

    return (
        <Group position="center" my="xl" className={classes.responsive}>
            <ActionIcon
                onClick={() => toggleColorScheme()}
                size="lg"
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
                })}
            >
                {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
        </Group>
    );
}