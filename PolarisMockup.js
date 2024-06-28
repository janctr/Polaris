/*
 * @owner Jan Iverson Eligio
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(
    0,
    window.location.pathname.toLowerCase().lastIndexOf('/extensions') + 1
);
var config = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === 'https:',
};
require.config({
    baseUrl:
        (config.isSecure ? 'https://' : 'http://') +
        config.host +
        (config.port ? ':' + config.port : '') +
        config.prefix +
        'resources',
});

require(['js/qlik'], function (qlik) {
    const Pages = {
        Home: 'PolarisMockup.html',
    };
    qlik.setOnError(function (error) {
        console.error('Qlik Error: ', error);
    });

    const currentPage = window.location.href.split('/').slice(-1)[0];

    switch (currentPage) {
        case Pages.Home:
            break;
    }

    console.log('currentPage: ', currentPage);

    const exampleApp = qlik.openApp(
        '14577065-da6a-4955-9617-bd0cb094b032',
        config
    );

    [
        {
            elementId: 'QV1',
            objectId: 'GcZB',
        },
        {
            elementId: 'QV2',
            objectId: 'frXbuh',
        },
        {
            elementId: 'QV3',
            objectId: 'fsHmHP',
        },
        {
            elementId: 'QV4',
            objectId: 'mKw',
        },
        {
            elementId: 'QV5',
            objectId: 'YJgJM',
        },
        {
            elementId: 'QV6',
            objectId: 'mKw',
        },
        {
            elementId: 'QV7',
            objectId: 'fsHmHP',
        },
        {
            elementId: 'QV8',
            objectId: 'frXbuh',
        },
    ].forEach((o) => {
        exampleApp.getObject(o.elementId, o.objectId, {
            noInteraction: false,
        });
    });

    //callbacks -- inserted here --
    //open apps -- inserted here --
    //get objects -- inserted here --
    //create cubes and lists -- inserted here --
});
