const wbm = require('wbm');

wbm.start({showBrowser: true, qrCodeData: true, session: false})

.then(async () => {
    const phones = ['966502699023','966559368077','966506468068','966552116012'];
    const message = 'Good Morning.';
    await wbm.send(phones, message);
    // await wbm.end();
}).catch(err => console.log(err));




// 966502699023