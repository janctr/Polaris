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
        label: 'Supply',
        elementId: 'QV1',
        objectId: 'mENkwjC',
    },
    {
        // Logistics Nodes
        label: 'Logistics Nodes',
        elementId: 'QV2',
        objectId: 'dndvmjp',
    },
    {
        // PDDOC
        label: 'PDDOC',
        elementId: 'QV3',
        objectId: 'tJAutGe',
    },
    {
        // Readiness Airframes
        label: 'Readiness - Airframes',
        elementId: 'QV4',
        objectId: 'bWLGCT',
    },
    {
        // Engineering
        label: 'Engineering',
        elementId: 'QV5',
        objectId: 'jYtzRw',
    },
    {
        // Logistics Services
        label: 'Logistics Services',
        elementId: 'QV6',
        objectId: 'Vby',
    },
    {
        // Joint Health Services
        label: 'Joint Health Services',
        elementId: 'QV7',
        objectId: 'dgkMzt',
    },
    {
        // OCS
        label: 'OCS',
        elementId: 'QV8',
        objectId: 'nPeqdTV',
    },
];
const classOfSupplyObjects = [
    {
        // Class I
        label: 'Class I',
        elementId: 'QV1',
        objectId: 'ACjABHm',
    },
    {
        // Class III
        label: 'Class III',

        elementId: 'QV2',
        objectId: 'jXhfrmR',
    },
    {
        // Class IV
        label: 'Class IV',
        elementId: 'QV3',
        objectId: 'uvcy',
    },
    {
        // Class V
        label: 'Class V',
        elementId: 'QV4',
        objectId: 'pKJXJtS',
    },
    {
        // Class VIII
        label: 'Class VIII',
        elementId: 'QV5',
        objectId: 'qvPEkB',
    },
    {
        // Class IX
        label: 'Class IX',
        elementId: 'QV6',
        objectId: 'WPytt',
    },
];
const copObjects = [
    { elementId: 'map', objectId: 'cf0bfaac-b1b2-41ba-bc58-f2612a8d1f17' },
];

const Pages = {
    Home: 'Polaris.html',
    LogFunctions: 'log-functions.html',
    ClassOfSupply: 'class-of-supply.html',
    COP: 'cop.html',
};

class Polaris {
    constructor(qlik, isSipr, currentPage) {
        this.qlik = qlik;
        this.isSipr = isSipr;
        this.currentPage;
        this.polarisAppId = '9c32823e-8ffc-4989-9b9f-1f2ad1b281a3'; // SIPR
        this.notionalAppId = '14577065-da6a-4955-9617-bd0cb094b032'; // SIPR
        this.niprJ4LandingPageLink =
            'https://qlik.advana.data.mil/sense/app/e2f5d8b5-998b-4fcd-b7d7-d8bed97a8695/sheet/dcf05bd5-985e-4bcc-b14e-988f86049a51/state/analysis';
        this.siprJ4LandingPageLink =
            'https://qlik.advana.data.smil.mil/sense/app/0581ae17-1481-4851-a56c-286205267f92/sheet/546baeed-7818-4bf2-9308-afed26880120/state/analysis';

        this.applyLandingPageLink();

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

        const sidebar = new Sidebar();

        const appId = this.isSipr ? this.polarisAppId : this.notionalAppId;
        const appObjects = this.isSipr
            ? logFunctionObjects
            : notionalAppObjects.logFunctions;

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            sidebar.addToggleableElement(
                appObject.label || 'No label',
                appObject.elementId
            );

            app.getObject(appObject.elementId, appObject.objectId, {
                noInteraction: false,
            });

            sidebar.resizeTiles();
            this.qlik.resize();
        });
    }

    ClassOfSupply() {
        console.log('ClassOfSupply called');
        const sidebar = new Sidebar();

        const appId = this.isSipr ? this.polarisAppId : this.notionalAppId;
        const appObjects = this.isSipr
            ? classOfSupplyObjects
            : notionalAppObjects.classOfSupply;

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            sidebar.addToggleableElement(
                appObject.label || 'No label',
                appObject.elementId
            );

            app.getObject(appObject.elementId, appObject.objectId, {
                noInteraction: false,
            });

            sidebar.resizeTiles();
            this.qlik.resize();
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

    applyLandingPageLink() {
        const link = this.isSipr
            ? this.siprJ4LandingPageLink
            : this.niprJ4LandingPageLink;

        $('.j4-landing-page-link').attr('href', link);
    }
}

class Sidebar {
    constructor() {
        console.log('sidebar created');
        this.isOpen = false;
        this.sidebar = this.createSidebarEl();
        this.sidebarBody = this.sidebar.children('.sidebar-body');
        this.toggleableElements = [];

        this.applyEventHandlerToBurgerIcon();
        $('body').prepend(this.sidebar);
    }

    addToggleableElement(label, elementId, isOpen = true) {
        const toggleableElement = new ToggleableElement(
            label,
            elementId,
            isOpen
        );
        this.toggleableElements.push(toggleableElement);

        const toggleWrapper = $('<div></div>').addClass('polaris-checkbox');
        const inputEl = $(`
            <input 
                type="checkbox" 
                id="${elementId}-checkbox" 
                name="${label}" 
                ${isOpen ? 'checked' : ''}
            />
        `).click((e) => {
            console.log('e: ', e);
            e.stopPropagation();
            toggleableElement.toggle();
        });

        const labelEl = $(
            `<label for="${elementId}-checkbox">${label}</label>`
        );

        toggleWrapper.append(inputEl);
        toggleWrapper.append(labelEl);

        this.sidebarBody.append(toggleWrapper);
    }

    open() {
        this.isOpen = true;
        this.sidebar.addClass('open');

        console.log('opening');
    }

    close() {
        this.isOpen = false;
        this.sidebar.removeClass('open');

        console.log('closing');
    }

    applyEventHandlerToBurgerIcon() {
        $('.menu-icon').click(() => {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        });
    }

    createSidebarEl() {
        const sidebar = $(`
            <section class="polaris-sidebar"></section>
        `);

        const closeIconWrapper = $(`
            <div class="close-icon-wrapper">
                
            </div>
        `);

        const closeIcon = $(`
            <div class="close-icon">
                <svg fill="#000000" height="100%" width="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 512 512" xml:space="preserve">
                <g>
                    <g>
                        <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
                            512,452.922 315.076,256 		"/>
                    </g>
                </g>
                </svg>
            </div>
        `).click(() => {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        });

        const bodyEl = $('<div class="sidebar-body"></div>');

        closeIconWrapper.append(closeIcon);
        sidebar.append(closeIconWrapper);
        sidebar.append(bodyEl);

        return sidebar;
    }

    resizeTiles() {
        const numVisibleTiles = this.toggleableElements.filter(
            (toggleableElement) => toggleableElement.isOpen
        ).length;

        for (const toggleableElement of this.toggleableElements) {
            toggleableElement.resize(numVisibleTiles);
        }
    }
}

// Only works with how we have the markup right now
class ToggleableElement {
    constructor(label, elementId, isOpen) {
        this.elementId = elementId;
        this.label = label;
        this.isOpen = isOpen;
        this.element = $(`#${elementId}`).parent();
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    open() {
        console.log('Showing ', this.label);
        this.isOpen = true;
        this.element.removeClass('hide');

        console.log(this.element);
    }

    close() {
        console.log('Hiding ', this.label);
        this.isOpen = false;

        this.element.addClass('hide');
    }

    resize(numVisibleTiles) {
        console.log('numVisibleTiles', numVisibleTiles);
        const styles = {};

        if (numVisibleTiles % 4 === 0) {
            styles.flex = '25%';
        } else if (numVisibleTiles % 3 === 0) {
            styles.flex = '33%';
        }

        if (numVisibleTiles === 4) {
            styles.flex = '50%';
            styles.height = '50%';
        } else if (numVisibleTiles < 4) {
            styles.height = '100%';
        }

        console.log('styles: ', styles);

        // const styleStr = Object.entries(styles)
        //     .map(([key, value]) => {
        //         return `${key}: ${value}`;
        //     })
        //     .join(';');

        for (const [property, value] of Object.entries(styles)) {
            this.element.css(property, `${value} !important`);
        }
    }
}

const notionalAppObjects = {
    logFunctions: [
        {
            label: 'Supply',
            elementId: 'QV1',
            objectId: 'GcZB',
        },
        {
            label: 'Logistics Nodes',
            elementId: 'QV2',
            objectId: 'frXbuh',
        },
        { label: 'PDDOC', elementId: 'QV3', objectId: 'fsHmHP' },
        { label: 'Readiness - Airframes', elementId: 'QV4', objectId: 'mKw' },
        { label: 'Engineering', elementId: 'QV5', objectId: 'YJgJM' },
        { label: 'Logistics Services', elementId: 'QV6', objectId: 'mKw' },
        {
            label: 'Joint Health Services',
            elementId: 'QV7',
            objectId: 'fsHmHP',
        },
        { label: 'OCS', elementId: 'QV8', objectId: 'frXbuh' },
    ],
    classOfSupply: [
        {
            label: 'Class I',
            elementId: 'QV1',
            objectId: 'GcZB',
        },
        {
            label: 'Class III',
            elementId: 'QV2',
            objectId: 'frXbuh',
        },
        {
            label: 'Class IV',
            elementId: 'QV3',
            objectId: 'fsHmHP',
        },
        {
            label: 'Class V',
            elementId: 'QV4',
            objectId: 'mKw',
        },
        {
            label: 'Class VIII',
            elementId: 'QV5',
            objectId: 'YJgJM',
        },
        {
            label: 'Class IX',
            elementId: 'QV6',
            objectId: 'mKw',
        },
    ],
    cop: [{ elementId: 'map', objectId: 'GcZB' }],
};
