import RNFS from 'react-native-fs';

const downLoadFile = (url) => {
    const des = `${RNFS.DocumentDirectoryPath}/${(new Date()).getTime()}.jpg`;

    return new Promise((resolve, reject) => {
        const progress = data => {
            if (data.bybytesWritten == data.contentLength) {
                return resolve(des);
            }
        };

        RNFS.downloadFile({
            fromUrl: url,
            toFile: des,
            begin: null,
            progress: progress,
            background: null,
            10
        });
    })
};