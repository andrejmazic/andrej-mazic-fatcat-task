import PageGenerator, {PageGeneratorProps, Section} from './PageGenerator';

const PageData: Section[] = [
    {
        type: 'layoutSection',
        props: ['bg-gray20', 'p-5', 'w-full'],
        components: [
            {
                type: 'Hero',
                props: {
                    title: 'Brace yourself for the future!',
                    image: '/media/hero.png',
                },
            },
        ],
    },
    {
        type: 'layoutSection',
        props: ['w-full', 'p-5', 'rounded-md', 'mt-12'],
        components: [
            {
                type: 'ItemsShowcase',
                props: {
                    items: [
                        {
                            title: 'Code Blitz',
                            description: 'Fast debug, bro',
                        },
                        {
                            title: 'Byte Boss',
                            description: 'Mega data, mini code',
                        },
                        {
                            title: 'Pixel Surge',
                            description: 'Sharp pixels, rad display',
                        },
                        {
                            title: 'Hack Wave',
                            description: 'Stealth code, epic hacks',
                        },
                    ],
                },
            },
        ],
    },
    {
        type: 'layoutSection',
        title: 'Meet our FatCat team!',
        props: ['w-full', 'p-5', 'flex', 'flex-col', 'gap-10', 'mt-12'],
        components: [
            {
                type: 'PanelShowcase',
                props: {
                    items: [
                        {
                            title: 'Byte Ninja',
                            description: 'Code warrior',
                            image: '/media/cats/cat_9.png',
                        },
                        {
                            title: 'Server Swag',
                            description: 'SysAdmin legend',
                            image: '/media/cats/cat_8.png',
                        },
                        {
                            title: 'Script King',
                            description: 'Frontend wizard',
                            image: '/media/cats/cat_3.png',
                        },
                        {
                            title: 'CSS Beast',
                            description: 'Style maestro',
                            image: '/media/cats/cat_6.png',
                        },
                        {
                            title: 'Pixel Guru',
                            description: 'Design maestro',
                            image: '/media/cats/cat_4.png',
                        },
                        {
                            title: 'Hack Champ',
                            description: 'DevOps vibe',
                            image: '/media/cats/cat_2.png',
                        },
                    ],
                },
            },
        ],
    },
    {
        type: 'layoutSection',
        title: 'Slide into Our DMs, Tech Maestro!',
        props: ['w-full', 'flex', 'flex-col', 'gap-5', 'mt-12'],
        components: [
            {
                type: 'ContactUsForm',
                props: {},
            }
        ]
    },
    {
        type: 'layoutSection',
        props: ['w-full', 'pt-3', 'pb-3', 'flex', 'flex-col', 'gap-10'],
        components: [
            {
                type: 'TrustBar',
                props: {
                    images: ['/media/cards/shape1.svg', '/media/cards/shape2.svg', '/media/cards/shape3.svg', '/media/cards/shape4.svg'],
                },
            },
        ],
    }
]

const PageProps: PageGeneratorProps = {
    data: PageData,
}

const MyPage = () => <PageGenerator {...PageProps} />;

export default MyPage;