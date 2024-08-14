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
    // AngularJS version 1.8.3 (ultimate-farewell)
    const isSipr = window.location.href.includes('smil');
    const currentPage = window.location.href.split('/').slice(-1)[0];
    const polarisAppId = '9c32823e-8ffc-4989-9b9f-1f2ad1b281a3'; // SIPR
    const notionalAppId = 'a02ee546-bb4f-41d3-a3d0-1a93f0aed2cc'; // NIPR
    const niprJ4LandingPageLink =
        'https://qlik.advana.data.mil/sense/app/e2f5d8b5-998b-4fcd-b7d7-d8bed97a8695/sheet/dcf05bd5-985e-4bcc-b14e-988f86049a51/state/analysis';
    const siprJ4LandingPageLink =
        'https://qlik.advana.data.smil.mil/sense/app/7b45d060-eb7d-4764-acc9-240e057176ad/sheet/546baeed-7818-4bf2-9308-afed26880120/state/analysis';

    const angularApp = angular.module('angularApp', ['ngRoute']);

    // Constants
    angularApp.constant('qlik', qlik);
    angularApp.constant('isSipr', isSipr);
    angularApp.constant('polarisAppId', polarisAppId);
    angularApp.constant('notionalAppId', notionalAppId);
    angularApp.constant('angularLinks', angularLinks);
    angularApp.constant('niprJ4LandingPageLink', niprJ4LandingPageLink);
    angularApp.constant('siprJ4LandingPageLink', siprJ4LandingPageLink);

    // Routes
    angularApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/home',
            })
            .when('/home', {
                templateUrl: 'home.ng.html',
                controller: 'HomeController',
            })
            .when('/log-functions', {
                templateUrl: 'log-functions.ng.html',
                controller: 'LogFunctionsController',
            })
            .when('/classes-of-supply', {
                templateUrl: 'classes-of-supply.ng.html',
                controller: 'ClassesOfSupplyController',
            })
            .otherwise({
                redirectTo: '/home',
            });

        $locationProvider.hashPrefix('');
    });

    // Services
    angularApp.service('polaris', [
        'qlik',
        'isSipr',
        'polarisAppId',
        'notionalAppId',
        function (qlik, isSipr, polarisAppId, notionalAppId) {
            const self = this;

            self.isSipr = isSipr;
            self.appId = isSipr ? polarisAppId : notionalAppId;
            console.log('opening qlik app: ', self.appId);
            self.app = qlik.openApp(self.appId, config);
            self.insertObjects = insertObjects;
            self.getObject = getObject;

            function insertObjects(objects) {
                for (const o of objects) {
                    console.log('Fetching object: ', o.label);
                    self.getObject(o);
                }
            }

            function getObject({ elementId, objectId, noInteraction = false }) {
                self.app.getObject(elementId, objectId, { noInteraction });
            }
        },
    ]);

    //Controllers
    angularApp.controller('NavController', [
        '$scope',
        'polaris',
        'angularLinks',
        'niprJ4LandingPageLink',
        'siprJ4LandingPageLink',
        function (
            $scope,
            polaris,
            angularLinks,
            niprJ4LandingPageLink,
            siprJ4LandingPageLink
        ) {
            $scope.links = angularLinks;
            $scope.j4LandingPageLink = polaris.isSipr
                ? siprJ4LandingPageLink
                : niprJ4LandingPageLink;
        },
    ]);

    angularApp.controller('HomeController', [
        '$scope',
        'polaris',
        function ($scope, polaris) {
            const appObjects = polaris.isSipr
                ? siprObjects.home
                : notionalAppObjects.template;

            angular.element(document).ready(function () {
                polaris.insertObjects(appObjects);
            });
        },
    ]);

    angularApp.controller('LogFunctionsController', [
        '$scope',
        'polaris',
        function ($scope, polaris) {
            const appObjects = polaris.isSipr
                ? siprObjects.logFunctions
                : notionalAppObjects.logFunctions;

            angular.element(document).ready(function () {
                polaris.insertObjects(appObjects);
            });

            $scope.objectElements = logFunctionsPage.objectElements.map(
                (objectElement) => ({
                    ...objectElement,
                    isShowing: true,
                    toggleIsShowing: function () {
                        this.isShowing = !this.IsShowing;
                    },
                })
            );
            $scope.isMenuOpen = false;
            $scope.toggleMenu = function () {
                console.log('toggled menu');
                $scope.isMenuOpen = !$scope.isMenuOpen;
            };
            $scope.getContainerSize = function () {
                const numVisibleTiles = $scope.objectElements.filter(
                    (objectElement) => objectElement.isShowing
                ).length;

                console.log(numVisibleTiles);
                const styles = {};

                // if (numVisibleTiles % 4 === 0) {
                //     styles.flex = '25%';
                // } else if (numVisibleTiles % 3 === 0) {
                //     styles.flex = '33%';
                // }

                // if (numVisibleTiles === 4) {
                //     styles.flex = '50%';
                //     styles.height = '50%';
                // } else if (numVisibleTiles < 4) {
                //     styles.height = '100%';
                // }
                return styles;
            };
        },
    ]);

    angularApp.controller('ClassesOfSupplyController', [
        '$scope',
        'polaris',
        function ($scope, polaris) {
            const appObjects = polaris.isSipr
                ? siprObjects.classesOfSupply
                : notionalAppObjects.classesOfSupply;

            angular.element(document).ready(function () {
                polaris.insertObjects(appObjects);
            });

            $scope.objectElements = classesOfSupplyPage.objectElements.map(
                (objectElement) => ({
                    ...objectElement,
                    isShowing: true,
                    toggleIsShowing: function () {
                        this.isShowing = !this.IsShowing;
                    },
                })
            );
            $scope.isMenuOpen = false;
            $scope.toggleMenu = function () {
                console.log('toggled menu');
                $scope.isMenuOpen = !$scope.isMenuOpen;
            };
            $scope.getContainerSize = function () {
                const numVisibleTiles = $scope.objectElements.filter(
                    (objectElement) => objectElement.isShowing
                ).length;

                console.log(numVisibleTiles);
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
                return styles;
            };
        },
    ]);

    // Components
    angular.module('angularApp').component('navigation', {
        templateUrl: 'navigation.html',
        bindings: {
            links: '<',
        },
        controller: 'NavController',
        controllerAs: 'self',
    });

    angular.module('angularApp').component('loader', {
        template: loaderTemplate,
    });

    angular.module('angularApp').component('qliknavbar', {
        template: qlikNavigationBarTemplate,
        bindings: {
            text2: '@',
            toggleMenu2: '&',
            changeText2: '&',
        },
        controller: function ($scope) {
            console.log('qliknavbar scope: ', $scope);

            console.log('qliknavbar this: ', this);
            // $scope.$ctrl.changeText('yay 2');
            // $scope.text = $scope.$parent.text;
            // $scope.changeText = function () {
            //     console.log('changing text');
            //     $scope.$parent.changeText('new text');
            //     console.log('$scope: ', $scope);
            // };

            $scope.changeText = $scope.$ctrl.changeText;
            $scope.onMenuClick = function () {
                console.log('yo');
            };
        },
    });

    angular.module('angularApp').component('burgermenuicon', {
        template: burgerMenuIconTemplate,
        bindings: {
            toggleMenu: '&',
        },
    });

    angular.bootstrap(document, ['angularApp', 'qlik-angular']);

    // new Polaris(qlik, isSipr, currentPage);
});

class QlikVariable {
    static Type = {
        String: 'string',
        Number: 'number',
    };

    constructor({
        app,
        varName,
        varCommonName,
        varType,
        isSessionVariable = true,
        value,
    }) {
        this.app = app;
        this.varName = varName;
        this.varCommonName = varCommonName;
        this.varType = varType;
        this.isSessionVariable = isSessionVariable;

        if (isSessionVariable) {
            app.variable.createSessionVariable({
                qName: varName,
                qDefinition: varCommonName,
            });
        }

        if (typeof value !== 'undefined') {
            this.setValue(value);
        }
    }

    getValue() {
        console.log('getValue');
        const self = this;

        return new Promise((resolve, reject) => {
            this.app.variable.getContent(this.varName, function (reply) {
                let value = reply.qContent.qString;

                if (self.varType === QlikVariable.Type.Number) {
                    value = Number(value);
                }

                console.log('value: ', value);
                resolve(value);
            });
        });
    }

    setValue(value) {
        if (this.varType === QlikVariable.Type.String) {
            this.app.variable.setStringValue(this.varName, value);
        } else if (this.varType === QlikVariable.Type.Number) {
            this.app.variable.setNumValue(this.varName, value);
        }

        return value;
    }

    toggle() {
        // Assumes variable is a number in the domain [0, 1]
        const self = this;
        return new Promise((resolve, reject) => {
            self.getValue().then((val) => {
                const newVal = val === 0 ? 1 : 0;
                console.log(
                    `Toggling [${self.varName}] with value [${val}] to [${newVal}]`
                );

                self.setValue(newVal);
                resolve(newVal);
            });
        });
    }

    async exists(varName) {
        const self = this;
        try {
            const content = await self.app.variable.getByName(varName);
            console.log(content);
            return false;
        } catch (e) {
            console.log('e: ', e);
            return true;
        }
    }
}

const loaderTemplate = `
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
`;

const qlikNavigationBarTemplate = `
<div class="qlik-navigation-bar">
    <div>
        <div class="selections-container">
        </div>
        <div>
            <button ng-click="">Clear Filters</button>
        </div>
    </div>
</div>
`;

const burgerMenuIconTemplate = `
<div class="menu-icon" ng-click="$ctrl.toggleMenu()">
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round" />
        <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round" />
        <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round" />
    </svg>
</div>
`;

const angularLinks = [
    {
        href: '#/',
        label: 'POLARIS',
        classNames: ['polaris-logo', 'no-underline'],
        anchorClassNames: ['polaris'],
    },
    { href: 'Polaris.html', label: 'Home', classNames: ['link'] },
    {
        href: '#/log-functions',
        label: 'Log Functions',
        classNames: ['link'],
    },
    {
        href: '#/classes-of-supply',
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
    // { href: 'cop.html', label: 'COP', classNames: ['link'] },
    // {
    //     href: '',
    //     label: 'J4 Landing Page',
    //     classNames: ['link'],
    //     anchorClassNames: ['j4-landing-page-link'],
    // },
];

const logFunctionsPage = {
    objectElements: [
        {
            classes: ['supply'],
            title: 'Supply',
            bodyId: 'QV1',
            // sources: ['USTRANSCOM Global Distribution Network'],
            // refreshRate: { label: 'Monthly', color: 'yellow' },
            // quality: { label: 'Partial', color: 'yellow' },
        },
        {
            classes: ['logistics-nodes'],
            title: 'Logistics Nodes',
            bodyId: 'QV2',
            sources: ['USTRANSCOM Global Distribution Network'],
            refreshRate: { label: 'Monthly', color: 'yellow' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            classes: ['readiness-airframes'],
            title: 'PDDOC',
            bodyId: 'QV3',
            sources: ['8th TSC', 'PACFLT0'],
            refreshRate: { label: 'Hourly', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            classes: ['readiness-airframes'],
            title: 'Readiness - Airframes',
            bodyId: 'QV4',
            sources: ['AMSRR', 'G081', 'IMDS'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            classes: ['engineering'],
            title: 'Engineering',
            bodyId: 'QV5',
            sources: ['Theater Infrastructure Master Plant'],
            refreshRate: { label: 'Bimonthly', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            classes: ['logistics-services'],
            title: 'Logistics Services',
            bodyId: 'QV6',
        },
        {
            classes: ['joint-health-services'],
            title: 'Joint Health Services',
            bodyId: 'QV7',
            sources: ['CarePoint'],
            refreshRate: { label: 'Static', color: 'red' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            classes: ['ocs'],
            title: 'OCS',
            bodyId: 'QV8',
            sources: ['SPOT-ES'],
            refreshRate: { label: 'Static', color: 'red' },
            quality: { label: 'Partial', color: 'yellow' },
        },
    ],
};

const classesOfSupplyPage = {
    objectElements: [
        {
            classes: ['class-i'],
            title: 'Class I',
            bodyId: 'QV1',
            sources: ['DLA EBS', 'GCSS-A'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            classes: ['class-iii'],
            title: 'Class III',
            bodyId: 'QV2',
            sources: ['DLA-EBS', 'IAWT'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            classes: [' class-iv'],
            title: 'Class IV',
            bodyId: 'QV3',
            sources: ['DLA EBS', 'GCSS-A', 'GCSS-MC', 'LMP', 'Navy ERP'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
        {
            classes: ['class-v'],
            title: 'Class V',
            bodyId: 'QV4',
            sources: ['AESIP', 'DAAS', 'LMP', 'OIS', 'SAAS', 'TICIMS'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Good', color: 'green' },
        },
        {
            classes: ['class-viii'],
            title: 'Class VIII',
            bodyId: 'QV5',
            sources: ['MEDCOP', 'CarePoint'],
            refreshRate: { label: 'N/A', color: '' },
            quality: { label: 'N/A', color: '' },
        },
        {
            classes: ['class-ix'],
            title: 'Class IX',
            bodyId: 'QV6',
            sources: ['DLA EBS', 'GCSS-A', 'GCSS-MC', 'LMP', 'Navy ERP'],
            refreshRate: { label: '~Daily', color: 'green' },
            quality: { label: 'Partial', color: 'yellow' },
        },
    ],
};

const siprObjects = {
    home: [
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
    ],
    logFunctions: [
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
    ],
    classesOfSupply: [
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
    ],
    cop: [
        { elementId: 'map', objectId: 'cf0bfaac-b1b2-416a-bc58-f2612a8d1f17' },
    ],
    template: [
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
    ],
};

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
    classesOfSupply: [
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
