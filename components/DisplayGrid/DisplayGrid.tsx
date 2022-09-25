import {createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio, Skeleton} from '@mantine/core';

const mockdata = [
    {
        title: 'Top 10 places to visit in Norway this summer',
        image:
            'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'August 18, 2022',
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl.",
    },
    {
        title: 'Best forests to visit in North America',
        image:
            'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'August 27, 2022',
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam .",
    },
    {
        title: 'Hawaii beaches review: better than you think',
        image:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 9, 2022',
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl.",
    },
    {
        title: 'Mountains at night: 12 best locations to enjoy the view',
        image:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 12, 2022',
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl.",
    }, {
        title: 'Hawaii beaches review: better than you think',
        image:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 9, 2022',
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl.",
    },
    {
        title: 'Mountains at night: 12 best locations to enjoy the view',
        image:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 12, 2022',
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl.",
    }, {
        title: 'Hawaii beaches review: better than you think',
        image:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 9, 2022',
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl.",
    },
    {
        title: 'Mountains at night: 12 best locations to enjoy the view Mountains at night: 12 best locations to enjoy the viewMountains at night: 12 best locations to enjoy the view',
        image:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 12, 2022',
        shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl. Sed euismod, nunc ut aliquam ultrices, nunc nisl ultricies nunc, ut aliquam ante nisl sit amet nisl.",
    },
];

const useStyles = createStyles((theme) => ({
    card: {
        transition: 'transform 150ms ease, box-shadow 150ms ease',

        '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: theme.shadows.md,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 600,
    },
}));

export function DisplayGrid({onLoad, data, isOrganisations}) {
    const {classes} = useStyles();

    const cards = data && data.map((article) => (
        <Skeleton key={article[1]} visible={onLoad}>
            <Card p="md" radius="md" component="a"
                  href={isOrganisations ? `/organisation?accHex=${article[3]}&accId=${article[2]}` : `/project?accHex=${article[3]}`}
                  className={classes.card}>
                <AspectRatio mb={"xs"} ratio={1920 / 1080}>
                    <Image src={"https://" + article[6] + ".ipfs.w3s.link/image"}/>
                </AspectRatio>
                <Text className={classes.title} mt={5}>
                    {article[4]}
                </Text>
                <Text color="dimmed" size="sm" mt="md">
                    {article[9]}
                </Text>
            </Card>
        </Skeleton>
    ));

    return (
        <Container py="xl">
            <SimpleGrid cols={2} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                {cards}
            </SimpleGrid>
        </Container>
    );
}