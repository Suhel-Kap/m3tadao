import {createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio, Skeleton} from '@mantine/core';
import Link from "next/link";


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
            <Link
                href={isOrganisations ? `/organisation?accHex=${article[3]}&accId=${article[2]}` : `/project?accHex=${article[3]}`}
                passHref>
                <Card p="md" radius="md" component="a"
                      className={classes.card}>
                    <AspectRatio mb={"xs"} ratio={1920 / 1080}>
                        <Image src={"https://" + article[6] + ".ipfs.w3s.link/image"}/>
                    </AspectRatio>
                    <Text className={classes.title} mt={5}>
                        {article[4]}
                    </Text>
                    <Text color="dimmed" size="sm" mt="md">
                        {article[9] || article[7]}
                    </Text>
                </Card>
            </Link>
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