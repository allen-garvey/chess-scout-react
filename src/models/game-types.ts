export interface IGameType {
    title: string;
    key: string;
    isChecked: boolean;
};

const getGameTypes =  (): IGameType[] => [
    {
        title: 'Ultra Bullet',
        key: 'ultraBullet',
        isChecked: true,
    },
    {
        title: 'Bullet',
        key: 'bullet',
        isChecked: true,
    },
    {
        title: 'Blitz',
        key: 'blitz',
        isChecked: true,
    },
    {
        title: 'Rapid',
        key: 'rapid',
        isChecked: true,
    },
    {
        title: 'Classical',
        key: 'classical',
        isChecked: true,
    },
];

export default getGameTypes;