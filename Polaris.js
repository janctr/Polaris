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
    { elementId: 'map', objectId: 'cf0bfaac-b1b2-416a-bc58-f2612a8d1f17' },
];
const templateObjects = [
    { elementId: 'map', objectId: '7ea8e67c-3241-42ee-8250-de8cadfc303a' },
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

const Pages = {
    Home: 'Polaris.html',
    LogFunctions: 'log-functions.html',
    ClassOfSupply: 'class-of-supply.html',
    COP: 'cop.html',
    Template: 'template.html',
};

class Polaris {
    constructor(qlik, isSipr, currentPage) {
        this.qlik = qlik;
        this.isSipr = isSipr;
        this.currentPage;
        this.polarisAppId = '9c32823e-8ffc-4989-9b9f-1f2ad1b281a3'; // SIPR
        this.notionalAppId = 'a02ee546-bb4f-41d3-a3d0-1a93f0aed2cc'; // NIPR
        this.niprJ4LandingPageLink =
            'https://qlik.advana.data.mil/sense/app/e2f5d8b5-998b-4fcd-b7d7-d8bed97a8695/sheet/dcf05bd5-985e-4bcc-b14e-988f86049a51/state/analysis';
        this.siprJ4LandingPageLink =
            'https://qlik.advana.data.smil.mil/sense/app/7b45d060-eb7d-4764-acc9-240e057176ad/sheet/546baeed-7818-4bf2-9308-afed26880120/state/analysis';

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
            case Pages.Template:
                this.Template();
                break;
        }

        this.applyLandingPageLink();
    }

    HomeDeprecated() {
        console.log('Home called');
        const page = new Page();
        const navbar = new Navbar().createNavbar();

        page.body.prepend(navbar);
    }

    LogFunctions() {
        console.log('LogFunctions called');

        const page = new Page();
        const navbar = new Navbar().createNavbarWithMenuIcon();
        const sidebar = new Sidebar();

        page.body.prepend(navbar);

        const appId = this.isSipr ? this.polarisAppId : this.notionalAppId;
        const appObjects = this.isSipr
            ? logFunctionObjects
            : notionalAppObjects.logFunctions;

        this.applyDataSources(dataSources.logFunctions);

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            sidebar.addToggleableElement(
                appObject.label || 'No label',
                appObject.elementId
            );

            // Add loader svg when loading
            $(`#${appObject.elementId}`).append(loaderEl());

            app.getObject(appObject.elementId, appObject.objectId, {
                noInteraction: false,
            });

            sidebar.resizeTiles();
            this.qlik.resize();
        });
    }

    ClassOfSupply() {
        console.log('ClassOfSupply called');
        const page = new Page();
        const navbar = new Navbar().createNavbarWithMenuIcon();
        const sidebar = new Sidebar();

        page.body.prepend(navbar);

        const appId = this.isSipr ? this.polarisAppId : this.notionalAppId;
        const appObjects = this.isSipr
            ? classOfSupplyObjects
            : notionalAppObjects.classOfSupply;

        this.applyDataSources(dataSources.classesOfSupply);

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            sidebar.addToggleableElement(
                appObject.label || 'No label',
                appObject.elementId
            );

            // Add loader svg when loading
            $(`#${appObject.elementId}`).append(loaderEl());

            app.getObject(appObject.elementId, appObject.objectId, {
                noInteraction: false,
            });

            sidebar.resizeTiles();
            this.qlik.resize();
        });
    }

    Cop() {
        const page = new Page();
        const navbar = new Navbar().createNavbar();

        page.body.prepend(navbar);

        const appId = this.isSipr ? this.polarisAppId : this.notionalAppId;
        const appObjects = this.isSipr ? copObjects : notionalAppObjects.cop;

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            // Add loader svg when loading
            $(`#${appObject.elementId}`).append(loaderEl());

            app.getObject(appObject.elementId, appObject.objectId, {
                noInteraction: false,
            });
        });
    }

    Home() {
        const page = new Page();
        const navbar = new Navbar().createNavbar();

        page.body.prepend(navbar);

        const appId = this.isSipr ? this.polarisAppId : this.notionalAppId;
        const appObjects = this.isSipr
            ? templateObjects
            : notionalAppObjects.template;

        const app = this.qlik.openApp(appId, config);

        appObjects.forEach((appObject) => {
            // Add loader svg when loading
            $(`#${appObject.elementId}`).append(loaderEl());

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

    applyDataSources(dataSources) {
        for (const dataSource of dataSources) {
            const {
                tileClass,
                dataSources,
                refreshRate: {
                    label: refreshRateLabel,
                    color: refreshRateColor,
                },
                quality: { label: qualityLabel, color: qualityColor },
            } = dataSource;

            const tile = $(`.tile.${tileClass}`);
            tile.find('.log-function-sources').remove();

            const dataSourceEl = $(`
                <div class="log-function-sources">
                    <p class="sources">
                        <span>Sources:</span>
                        <span>${dataSources.join('; ')}</span>
                    </p>
                    <p class="refresh-rate">
                        <span>Refresh Rate</span>
                        <span class="${refreshRateColor}">${refreshRateLabel}</span>
                    </p>
                    <p class="quality">
                        <span>Quality</span>
                        <span class="${qualityColor}">${qualityLabel}</span>
                    </p>
                </div>
            `);

            tile.append(dataSourceEl);
        }
    }
}

class Sidebar {
    constructor() {
        console.log('sidebar created');
        this.isOpen = false;
        this.sidebar = this.createSidebarEl();
        this.sidebarBody = this.sidebar.children('.sidebar-body');
        this.toggleableElements = [];
        this.isMenuIconEventSet = false;
        this.setMenuIconEventInterval = null;

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
        this.setMenuIconEventInterval = setInterval(() => {
            if ($('.menu-icon').length) {
                $('.menu-icon').click(() => {
                    if (this.isOpen) {
                        this.close();
                    } else {
                        this.open();
                    }
                });

                clearInterval(this.setMenuIconEventInterval);
            } else {
                console.log('menu-icon not present');
            }
        }, 1000);
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
            objectId: 'UNDffs',
        },
    ],
    cop: [{ elementId: 'map', objectId: 'aDEUH' }],
    template: [
        { elementId: 'map', objectId: 'aDEUH' },
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
            objectId: 'UNDffs',
        },
    ],
};

function loaderEl() {
    return $(`
        <div class="loader-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 44 44" stroke="blue">
                <g fill="none" fill-rule="evenodd" stroke-width="2">
                    <circle cx="22" cy="22" r="1">
                        <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx="22" cy="22" r="1">
                        <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate>
                    </circle>
                </g>
            </svg>
        </div>
    `);
}

class Navbar {
    constructor() {
        console.log('navbar created');
    }

    createNavbar() {
        const links = [
            {
                href: 'Polaris.html',
                label: 'POLARIS',
                classNames: ['polaris-logo', 'no-underline'],
                anchorClassNames: ['polaris'],
            },
            { href: 'Polaris.html', label: 'Home', classNames: ['link'] },
            {
                href: 'log-functions.html',
                label: 'Log Functions',
                classNames: ['link'],
            },
            {
                href: 'class-of-supply.html',
                label: 'Classes of Supply',
                classNames: ['link'],
                childLinks: [
                    {
                        href: '#',
                        label: 'Class I',
                        classNames: ['child-link'],
                        anchorClassNames: [],
                    },
                    {
                        href: '#',
                        label: 'Class III',
                        classNames: ['child-link'],
                        anchorClassNames: [],
                    },
                    {
                        href: '#',
                        label: 'Class IV',
                        classNames: ['child-link'],
                        anchorClassNames: [],
                    },
                    {
                        href: '#',
                        label: 'Class V',
                        classNames: ['child-link'],
                        anchorClassNames: [],
                    },
                    {
                        href: '#',
                        label: 'Class VIII',
                        classNames: ['child-link'],
                        anchorClassNames: [],
                    },
                    {
                        href: '#',
                        label: 'Class IX',
                        classNames: ['child-link'],
                        anchorClassNames: [],
                    },
                ],
            },
            { href: 'cop.html', label: 'COP', classNames: ['link'] },
            {
                href: '',
                label: 'J4 Landing Page',
                classNames: ['link'],
                anchorClassNames: ['j4-landing-page-link'],
            },
        ];

        const linkEls = links.map(
            ({
                href,
                label,
                classNames,
                anchorClassNames = [],
                childLinks = [],
            }) => {
                const li = $(`<li></li>`);
                const anchor = $(`<a href="${href}">${label}</a>`);

                for (const className of classNames) {
                    li.addClass(className);
                }

                for (const anchorClassName of anchorClassNames) {
                    anchor.addClass(anchorClassName);
                }

                li.append(anchor);

                if (childLinks.length) {
                    anchor.append(this.createDropdownIcon());
                    li.append(this.createDropdown(childLinks));
                }

                return li;
            }
        );

        const navbar = $(`
            <header class="header">
                <nav class="navbar">
                    <ul class="nav-links">
                    </ul>
                </nav>
            </header>
        `);

        for (const linkEl of linkEls) {
            navbar.find('.nav-links').append(linkEl);
        }

        return navbar;
    }

    createDropdown(links) {
        const dropdownEl = $(`<ul class="link-dropdown"></ul>`);

        const linkEls = links.map(
            ({ href, label, classNames = [], anchorClassNames = [] }) => {
                const li = $(`<li></li>`);
                const anchor = $(`<a href="${href}">${label}</a>`);

                for (const className of classNames) {
                    li.addClass(className);
                }

                for (const anchorClassName of anchorClassNames) {
                    anchor.addClass(anchorClassName);
                }

                li.append(anchor);

                return li;
            }
        );

        for (const linkEl of linkEls) {
            dropdownEl.append(linkEl);
        }
        return dropdownEl;
    }

    createDropdownIcon() {
        return $(`
            <div class="dropdown-icon">
                <svg fill="#000000" height="100%" width="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 330 330" xml:space="preserve">
                <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                    s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                </svg>
            </div>
        `);
    }

    createNavbarWithMenuIcon() {
        const navbar = this.createNavbar();

        const menuIcon = $(`
            <li class="menu-icon">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                </svg>
            </li>
        `);

        navbar.find('.nav-links').prepend(menuIcon);

        return navbar;
    }
}

class Page {
    constructor() {
        this.body = $('.page');
        this.main = $('.main');
    }
}

const dataSources = {
    logFunctions: [
        // {
        //     tileClass: 'supply',
        //     dataSources: [],
        //     refreshRate: { label: '', color: '' },
        //     quality: { label: '', color: '' },
        // },
        {
            tileClass: 'logistics-nodes',
            dataSources: ['USTRANSCOM Global Distribution Network'],
            refreshRate: { label: 'Monthly', color: 'yellow' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            tileClass: 'pddoc',
            dataSources: ['8th TSC', 'PACFLT0'],
            refreshRate: { label: 'Hourly', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            tileClass: 'readiness-airframes',
            dataSources: ['AMSRR', 'G081', 'IMDS'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            tileClass: 'engineering',
            dataSources: ['Theater Infrastructure Master Plant'],
            refreshRate: { label: 'Bimonthly', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        // {
        //     tileClass: 'logistics-services',
        //     dataSources: [],
        //     refreshRate: { label: '', color: '' },
        //     quality: { label: '', color: '' },
        // },
        {
            tileClass: 'joint-health-services',
            dataSources: ['CarePoint'],
            refreshRate: { label: 'Static', color: 'red' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            tileClass: 'ocs',
            dataSources: ['SPOT-ES'],
            refreshRate: { label: 'Static', color: 'red' },
            quality: { label: 'Partial', color: 'yellow' },
        },
    ],
    classesOfSupply: [
        {
            tileClass: 'class-i',
            dataSources: ['DLA EBS', 'GCSS-A'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            tileClass: 'class-iii',
            dataSources: ['DLA-EBS', 'IAWT'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            tileClass: 'class-iv',
            dataSources: ['DLA EBS', 'GCSS-A', 'GCSS-MC', 'LMP', 'Navy ERP'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            tileClass: 'class-v',
            dataSources: ['AESIP', 'DAAS', 'LMP', 'OIS', 'SAAS', 'TICIMS'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Good', color: 'green' },
        },
        {
            tileClass: 'class-viii',
            dataSources: ['MEDCOP', 'CarePoint'],
            refreshRate: { label: 'N/A', color: '' },
            quality: { label: 'N/A', color: '' },
        },
        {
            tileClass: 'class-ix',
            dataSources: ['DLA EBS', 'GCSS-A', 'GCSS-MC', 'LMP', 'Navy ERP'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
    ],
};
