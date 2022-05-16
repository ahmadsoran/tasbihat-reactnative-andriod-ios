
import { makeUrl } from 'expo-linking';


const linking = {
    prefixes: [makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    home: {
                        screens: {
                            home: 'zikr',
                        },
                    },
                    About: {
                        screens: {
                            About: 'About',
                        },
                    },
                },
            },
            Modal: 'modal',
            NotFound: '*',
        },
    },
};

export default linking;
