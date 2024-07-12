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
    qlik.setOnError(function (error) {
        console.error('Qlik Error: ', error);
    });

    const isSipr = window.location.href.includes('smil');
    const currentPage = window.location.href.split('/').slice(-1)[0];

    new Polaris(qlik, isSipr, currentPage);
});

const logFunctionObjects = [];
const classOfSupplyObjects = [];
const copObjects = [];

const Pages = {
    Home: 'Polaris.html',
    LogFunctions: 'log-functions.html',
    ClassOfSupply: 'class-of-supply.html',
    COP: 'cop.html',
};

class Polaris {
    constructor(qlik, isSipr, currentPage) {
        console.log('polaris constructor called');
        this.qlik = qlik;
        this.isSipr = isSipr;
        this.currentPage;

        switch (currentPage) {
            case Pages.Home:
                this.Home();
                break;
            case Pages.LogFunctions:
                this.LogFunctions();
                break;
            case Pages.ClassOfSupply:
                this.ClassOfSupply();
                break;
            case Pages.COP:
                this.Cop();
                break;
        }
    }

    Home() {
        console.log('Home called');
    }

    LogFunctions() {
        console.log('LogFunctions called');

        const appId = this.isSipr ? '' : notionalAppId;
        const appObjects = this.isSipr
            ? logFunctionObjects
            : notionalAppObjects;

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            app.getObject(appObject.elementId, appObject.objectId, {
                noInteraction: false,
            });
        });
    }
}

const notionalAppId = '14577065-da6a-4955-9617-bd0cb094b032';
const notionalAppObjects = [
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
];
