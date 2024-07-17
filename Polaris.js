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

const logFunctionObjects = [
    {
        // Supply
        elementId: 'QV1',
        objectId: 'mENkwjC',
    },
    {
        // Logistics Nodes
        elementId: 'QV2',
        objectId: 'dndvmjp',
    },
    {
        // PDDOC
        elementId: 'QV3',
        objectId: 'tJAutGe',
    },
    {
        // Readiness Airframes
        elementId: 'QV4',
        objectId: 'bWLGCT',
    },
    {
        // Engineering
        elementId: 'QV5',
        objectId: '',
    },
    {
        // Logistics Services
        elementId: 'QV6',
        objectId: 'Vby',
    },
    {
        // Joint Health Services
        elementId: 'QV7',
        objectId: 'dgkMzt',
    },
    {
        // OCS
        elementId: 'QV8',
        objectId: 'nPeqdTV',
    },
];
const classOfSupplyObjects = [
    {
        // Class I
        elementId: 'QV1',
        objectId: 'ACjABHm',
    },
    {
        // Class III
        elementId: 'QV2',
        objectId: 'jXhfrmR',
    },
    {
        // Class IV
        elementId: 'QV3',
        objectId: 'uvcy',
    },
    {
        // Class V
        elementId: 'QV4',
        objectId: 'pKJXJtS',
    },
    {
        // Class VIII
        elementId: 'QV5',
        objectId: 'qvPEkB',
    },
    {
        // Class IX
        elementId: 'QV6',
        objectId: 'WPytt',
    },
];
const copObjects = [{ elementId: 'map', objectId: 'WPytt' }];

const Pages = {
    Home: 'Polaris.html',
    LogFunctions: 'log-functions.html',
    ClassOfSupply: 'class-of-supply.html',
    COP: 'cop.html',
};

class Polaris {
    constructor(qlik, isSipr, currentPage) {
        this.polarisAppId = '9c32823e-8ffc-4989-9b9f-1f2ad1b281a3'; // SIPR
        this.notionalAppId = '14577065-da6a-4955-9617-bd0cb094b032'; // SIPR
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

        const appId = this.isSipr ? this.polarisAppId : this.notionalAppId;
        const appObjects = this.isSipr
            ? logFunctionObjects
            : notionalAppObjects.logFunctions;

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            app.getObject(appObject.elementId, appObject.objectId, {
                noInteraction: false,
            });
        });
    }

    ClassOfSupply() {
        console.log('ClassOfSupply called');

        const appId = this.isSipr ? this.polarisAppId : this.notionalAppId;
        const appObjects = this.isSipr
            ? classOfSupplyObjects
            : notionalAppObjects.classOfSupply;

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            app.getObject(appObject.elementId, appObject.objectId, {
                noInteraction: false,
            });
        });
    }

    Cop() {
        const appId = this.isSipr ? this.polarisAppId : this.notionalAppId;
        const appObjects = this.isSipr ? copObjects : notionalAppObjects.cop;

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            app.getObject(appObject.elementId, appObject.objectId, {
                noInteraction: false,
            });
        });
    }
}

const notionalAppObjects = {
    logFunctions: [
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
    ],
    classOfSupply: [
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
    ],
    cop: [{ elementId: 'map', objectId: 'GcZB' }],
};
