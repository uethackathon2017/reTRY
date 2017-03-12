import {default as Sound} from 'react-native-sound';

// Enable playback in silence mode (iOS only)
Sound.setCategory('Playback');


export const play = (fileName, basePath) => {

    return new Promise((resolve, reject) => {
        const sound = new Sound(fileName, basePath, (error) => {
            if (error) {
                return reject(error);
            }

            sound.setVolume(0.5);

            sound.play((success) => {
                if (success) {
                    return resolve();
                } else {
                    return reject(new Error('playback failed due to audio decoding errors'));
                }
            });
        });


    });
};