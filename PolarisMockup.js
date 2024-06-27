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

    //callbacks -- inserted here --
    //open apps -- inserted here --
    //get objects -- inserted here --
    //create cubes and lists -- inserted here --
});
