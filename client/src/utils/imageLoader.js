const BASE = 'https://images.unsplash.com';
export const unsplash = (id, w = 800, h = 600) =>
    `${BASE}/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const IMAGES = {
    hero: '1536240338851-86b77e0d8b9d',
    dashboard: '1551650975-87deedd944c3',
    videoEditor: '1574717024453-354056f1c3e6',
    ai: '1620912189539-a38903c49e88',
    scene: '1558618666-fcd25c85cd64',
    profile: '1535713875002-d1d0cf377fde',
    card1: '1611532736597-de2d4265fba3',
    card2: '1598899134739-24c46f58b8c0',
    card3: '1574375927938-2b66ca05fed8',
    feature1: '1677756119517-756a188d2d94',
    feature2: '1542744173-8e7e53415bb0',
    feature3: '1536240338851-86b77e0d8b9d',
    auth: '1516035069371-29a1b244cc32',
    notFound: '1542281826-c41d5a7c41f3',
    t1: '1500648767791-00dcc994a43e',
    t2: '1494790108377-be9c29b29330',
    t3: '1507003211169-0a1dd7228f2d',
};

export const projectImage = (i) => {
    const keys = ['card1', 'card2', 'card3'];
    return unsplash(IMAGES[keys[i % 3]], 640, 360);
};
