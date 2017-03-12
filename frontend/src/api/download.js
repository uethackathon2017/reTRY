import RNFS from 'react-native-fs';

export const downLoadFile = (url, des) => {
    return new Promise((resolve, reject) => {

        const progress = data => {
            console.log('on process!');
            // if (data.statusCode != 200) {
            //     console.log(data.statusCode);
            //     reject(new Error('Down load failed!'));
            // }

            console.log(data.bytesWritten + "/" + data.contentLength);

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
            progressDivider: 1
        });
    })
};