import RNFS from 'react-native-fs';

export const downLoadFile = (url, des) => {
    return new Promise((resolve, reject) => {

        const progress = data => {
            if (data.statusCode != 200) {
                reject(new Error('Down load failed!'));
            }

            if (data.bytesWritten == data.contentLength) {
                return resolve(des);
            }
        };

        RNFS.downloadFile({
            fromUrl: url,
            toFile: des,
            begin: null,
            progress: progress,
            background: null,
            progressDivider: 10
        });
    })
};