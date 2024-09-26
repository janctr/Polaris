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
    const angularApp = angular.module('angularApp', ['ngRoute']);

    // Constants
    angularApp.constant('qlik', qlik);
    angularApp.constant('isSipr', window.location.href.includes('smil'));
    angularApp.constant('polarisAppId', '8d04cc88-83c2-400a-a891-f2a07111d6bc');
    angularApp.constant(
        'notionalAppId',
        'a02ee546-bb4f-41d3-a3d0-1a93f0aed2cc'
    );
    angularApp.constant('navbarLinks', angularLinks);
    angularApp.constant('landingPageLinks', {
        niprJ4LandingPageLink:
            'https://qlik.advana.data.mil/sense/app/e2f5d8b5-998b-4fcd-b7d7-d8bed97a8695/sheet/dcf05bd5-985e-4bcc-b14e-988f86049a51/state/analysis',
        siprJ4LandingPageLink:
            'https://qlik.advana.data.smil.mil/sense/app/7b45d060-eb7d-4764-acc9-240e057176ad/sheet/546baeed-7818-4bf2-9308-afed26880120/state/analysis',
    });

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
            .when('/test', {
                templateUrl: 'test.ng.html',
                controller: 'TestController',
            })
            .otherwise({
                redirectTo: '/home',
            });

        $locationProvider.hashPrefix(''); // IMPORTANT: Grants ability to refresh page
    });

    // Services
    angularApp.service('polaris', [
        'qlik',
        'isSipr',
        'polarisAppId',
        'notionalAppId',
        function (qlik, isSipr, polarisAppId, notionalAppId) {
            const self = this;

            self.qlik = qlik;
            self.isSipr = isSipr;
            self.appId = isSipr ? polarisAppId : notionalAppId;

            console.log('opening qlik app: ', self.appId);

            // Qlik
            self.app = qlik.openApp(self.appId, config);
            self.selectionState = self.app.selectionState();

            // Qlik methods
            self.clear = clear;
            self.clearField = clearField;
            self.back = back;
            self.forward = forward;
            self.getVariable = getVariable;
            self.setVariable = setVariable;
            self.select = select;
            self.search = search;
            self.createHypercube = createHypercube;

            // Methods
            self.insertObject = insertObject;
            self.insertObjects = insertObjects;
            self.hideNavbar = hideNavbar;
            self.showNavbar = showNavbar;
            self.resize = resize;
            self.parseVariable = parseVariable;
            self.toggleVariable = toggleVariable;
            self.getContainerSize = getContainerSize;

            function insertObjects(objects) {
                for (const o of objects) {
                    self.insertObject(o);
                }
            }

            function insertObject({
                label,
                elementId,
                objectId,
                noInteraction = false,
            }) {
                console.log(
                    'Fetching object: ',
                    label,
                    ` elementId: ${elementId} objectId: ${objectId}`
                );
                self.app.getObject(elementId, objectId, { noInteraction });
            }

            function clear() {
                return self.app.clearAll();
            }

            function clearField(field) {
                self.app.field(field).clear();
            }

            function back() {
                return self.app.back();
            }

            function forward() {
                return self.app.forward();
            }

            function resize() {
                console.log('resizing');
                self.qlik.resize();
            }

            function hideNavbar() {
                $('.qlik-navigation-bar')
                    .css(
                        'height',
                        'var(--qlik-navigation-bar-height-hidden-px)'
                    )
                    .css('padding', 0);

                $('main').css(
                    'height',
                    'var(--full-viewport-height-hidden-navbar-px)'
                );
                self.qlik.resize();
            }

            function showNavbar() {
                $('.qlik-navigation-bar').css('height', '');
                $('.qlik-navigation-bar').css('padding', '');

                $('main').css('height', '');
                self.qlik.resize();
            }

            function getContainerSize(objectElements) {
                const numVisibleTiles = objectElements.filter(
                    (objectElement) => objectElement.isShowing
                ).length;

                const styles = {};

                if (numVisibleTiles % 2 === 1) {
                    styles.flex = '33%';
                }

                if (numVisibleTiles % 4 === 0) {
                    styles.flex = '25%';
                } else if (numVisibleTiles % 3 === 0) {
                    styles.flex = '33%';
                }

                if (numVisibleTiles === 4) {
                    styles.flex = '50%';
                    styles.height = '50%';
                } else if (numVisibleTiles < 4) {
                    // styles.flex = 1;
                    styles.height = '100%';
                }

                resize();

                return styles;
            }

            function getVariable(varName, scope) {
                console.log('getVariable called: ', varName, scope);
                // Gets variable and sets the value in scope
                self.app.variable.getContent(varName, function (reply) {
                    console.log(
                        'setting ',
                        varName,
                        ' to: ',
                        parseVariable(reply)
                    );
                    scope[varName] = parseVariable(reply);
                });
            }

            function setVariable({ varName, value }) {
                console.log('setVariable: ', varName, ' to: ', value);
                return new Promise((resolve, reject) => {
                    if (typeof value === 'string') {
                        self.app.variable
                            .setStringValue(varName, newVal)
                            .then(() => {
                                resolve(true);
                            });
                    } else if (typeof value === 'number') {
                        self.app.variable
                            .setNumValue(varName, value)
                            .then(() => {
                                resolve(true);
                            });
                    } else {
                        reject();
                        throw new Error('ERROR: Unknown variable value');
                    }
                });
            }

            function parseVariable(reply) {
                const value = reply.qContent.qString;

                if (reply.qContent.qIsNum) {
                    return Number(value);
                } else {
                    return value;
                }
            }

            function toggleVariable(varName, scope) {
                self.app.variable.getContent(varName, function (reply) {
                    const newVal = parseVariable(reply) === 1 ? 0 : 1;
                    self.app.variable.setNumValue(varName, newVal);

                    console.log('Toggling: ', varName, ' to: ', newVal);
                    scope[varName] = newVal;
                });
            }

            function refreshVariables({ scope, variables }) {
                for (const v of variables) {
                    getVariable({ varName: v, scope });
                }
            }

            function search(
                str,
                {
                    qOffset = 0,
                    qCount = 1000,
                    qSearchFields,
                    qContext = 'CurrentSelections',
                } = {}
            ) {
                console.log(
                    'searching with params: ',
                    str,
                    qOffset,
                    qCount,
                    qContext
                );
                const terms = str.split(' ').map((s) => s.trim());

                return new Promise((resolve, reject) => {
                    // Qlik method searchResults() docs:
                    // https://help.qlik.com/en-US/sense-developer/May2024/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/AppAPI/searchResults-method.htm
                    self.app.searchResults(
                        terms,
                        // [str],
                        { qOffset, qCount },
                        { qSearchFields, qContext },
                        function (reply) {
                            console.log('search reply: ', reply);
                            resolve(parseSearchResult(reply));
                        }
                    );
                });
            }

            function searchFields(fields, str) {
                // TODO: Search only within specified fields (dimensions)
            }

            function parseSearchResult(result) {
                const {
                    qResult: { qTotalNumberOfGroups, qSearchGroupArray },
                } = result;

                const results = [];

                for (const group of qSearchGroupArray) {
                    const { qItems } = group;

                    for (const item of qItems) {
                        const { qIdentifier: columnName, qItemMatches } = item;

                        const setOfMatches = {
                            columnName,
                            matches: qItemMatches.map((match) => match.qText),
                        };

                        console.log('setOfMatches: ', setOfMatches);
                        results.push(setOfMatches);
                    }
                }

                // Returns [{ columnName: 'myDimension', matches: ['match1', 'match2'] }];
                return results;
            }

            function select(columnName, qText) {
                self.app
                    .field(columnName)
                    .selectValues([{ qText }], true, true);
            }

            function createHypercube({
                dimensions = [],
                measures = [],
                initialDataFetch: {
                    top = 0,
                    left = 0,
                    height = 1000,
                    width = dimensions.length + measures.length,
                } = {},
                callback,
            }) {
                if (dimensions.length === 0 && measures.length === 0) {
                    throw new Error('Please define dimensions or measures.');
                }

                const hypercubeDefinition = {
                    qDimensions: dimensions.map((dim) => ({
                        qDef: {
                            qFieldDefs: [dim],
                        },
                    })),
                    qInitialDataFetch: [
                        {
                            qTop: top,
                            qLeft: left,
                            qHeight: height,
                            qWidth: width,
                        },
                    ],
                };

                self.app.createCube(hypercubeDefinition, callback);
            }
        },
    ]);

    //Controllers
    angularApp.controller('NavController', [
        '$scope',
        '$window',
        'polaris',
        'navbarLinks',
        'landingPageLinks',
        function (
            $scope,
            $window,
            polaris,
            navbarLinks,
            { niprJ4LandingPageLink, siprJ4LandingPageLink }
        ) {
            $scope.links = navbarLinks;
            $scope.j4LandingPageLink = polaris.isSipr
                ? siprJ4LandingPageLink
                : niprJ4LandingPageLink;
            $scope.classificationBannerLabel = polaris.isSipr
                ? 'SECRET'
                : 'UNCLASSIFIED';
            $scope.classificationBannerColor = polaris.isSipr ? 'red' : 'green';
            $scope.printWindow = function () {
                $window.print();
            };
        },
    ]);

    angularApp.controller('HomeController', [
        '$scope',
        'polaris',
        function ($scope, polaris) {
            $scope.polaris = polaris;

            $scope.isSidebarShowing = true;

            const appObjects = polaris.isSipr
                ? siprObjects.home
                : notionalAppObjects.home;

            const qlikVariables = [
                'v_map_usindopacom',
                'v_map_joa',
                // Classes of Supply
                'v_map_classes_of_supply',
                'v_map_class_i',
                'v_map_class_iii',
                'v_map_class_iv',
                'v_map_class_v',
                'v_map_class_ix',
                // PDDOC
                'v_map_deploy_dist_vessel_health',
                'v_map_enemy_vessels',
                'v_map_deploy_dist_aircraft_health',
                'v_map_aws',
                'v_map_land_vehicles',
                // Nodal Health
                'v_map_seaports',
                'v_map_airports',
                // Engineer Units
                'v_map_combat_engineers',
                'v_map_civil_engineers',
                // Contractors
                'v_map_ocs_cities',
            ];

            angular.element(document).ready(function () {
                polaris.insertObjects(appObjects);
            });

            for (const v of qlikVariables) {
                console.log('v: ', v);
                polaris.getVariable(v, $scope);
            }

            $scope.toggleVariable = (varName) =>
                polaris.toggleVariable(varName, $scope);
            $scope.getVariable = (varName) => $scope[varName];
            $scope.getArrowDirection = (isOpen) => (isOpen ? 'up' : 'down');

            $scope.isPacomTogglesOpen = true;
            $scope.isPddocTogglesOpen = true;
            $scope.isNodalHealthTogglesOpen = true;
            $scope.isEngineerTogglesOpen = true;
            $scope.isOcsTogglesOpen = true;

            $scope.pacomToggles = [
                {
                    title: 'USINDOPACOM',
                    label: 'usindopacom',
                    varName: 'v_map_usindopacom',
                    qlikDropdownId: polaris.isSipr ? '' : 'yRuKjT',
                },
                {
                    title: 'JOA Boundaries',
                    label: 'joa',
                    varName: 'v_map_joa',
                    qlikDropdownId: 'PvXr',
                },
                {
                    title: 'Classes of Supply',
                    label: 'classes-of-supply',
                    varName: 'v_map_classes_of_supply',
                },
            ];

            $scope.classesOfSupplyToggles = [
                {
                    title: 'Class I',
                    label: 'class-i',
                    varName: 'v_map_class_i',
                    qlikDropdownId: 'MEtjzmZ',
                },
                {
                    title: 'Class III',
                    label: 'class-iii',
                    varName: 'v_map_class_iii',
                    qlikDropdownId: 'pqjjPZ',
                },
                {
                    title: 'Class IV',
                    label: 'class-iv',
                    varName: 'v_map_class_iv',
                    qlikDropdownId: 'JnZQYx',
                },
                {
                    title: 'Class V',
                    label: 'class-v',
                    varName: 'v_map_class_v',
                    qlikDropdownId: 'fYkxMwf',
                },
                // {
                //     title: 'Class IX',
                //     label: 'class-ix',
                //     varName: 'v_map_class_ix',
                // },
            ];

            // Class III Subtoggles
            polaris.createHypercube({
                dimensions: ['secretLabel', 'secretVarName'],
                callback: function (reply) {
                    const subToggles = [];
                    for (const row of reply.qHyperCube.qDataPages[0].qMatrix) {
                        const [label, varName] = row;

                        const subToggle = {
                            title: label.qText,
                            label: label.qText
                                .toLowerCase()
                                .split(' ')
                                .join('-'),
                            varName: varName.qText,
                        };

                        subToggles.push(subToggle);

                        polaris.getVariable(subToggle.varName, $scope);
                    }

                    $scope.classesOfSupplyToggles.find(
                        (toggle) => toggle.label === 'class-iii'
                    ).subToggles = subToggles;

                    $scope.toggleSubToggle = function (varNameToToggle) {
                        // Turn off currently selected sub toggles
                        reply.qHyperCube.qDataPages[0].qMatrix
                            .filter(([label, varName]) => {
                                return varName.qText !== varNameToToggle;
                            })
                            .map(([label, varName]) => varName.qText)
                            .forEach((varName) => {
                                if ($scope.getVariable(varName)) {
                                    $scope.toggleVariable(varName);
                                }
                            });

                        // Toggle as usual
                        $scope.toggleVariable(varNameToToggle);
                    };
                },
            });

            $scope.pddocToggles = [
                {
                    title: 'Vessels',
                    label: 'vessels',
                    varName: 'v_map_deploy_dist_vessel_health',
                    qlikDropdownId: 'LPGRT',
                },
                {
                    title: 'Enemy Vessels',
                    label: 'enemy-vessels',
                    varName: 'v_map_enemy_vessels',
                    qlikDropdownId: 'eFpAKzG',
                },
                {
                    title: 'Aircraft',
                    label: 'aircraft',
                    varName: 'v_map_deploy_dist_aircraft_health',
                    qlikDropdownId: 'ZMWxmF',
                },
                {
                    title: 'AWS',
                    label: 'aws',
                    varName: 'v_map_aws',
                    qlikDropdownId: 'BcPALt',
                },
                {
                    title: 'Land Vehicles',
                    label: 'land-vehicles',
                    varName: 'v_map_land_vehicles',
                    qlikDropdownId: 'qZbxy',
                },
            ];

            $scope.nodalHealthToggles = [
                {
                    title: 'Seaports',
                    label: 'seaports',
                    varName: 'v_map_seaports',
                    qlikDropdownId: 'WPbSPF',
                },
                {
                    title: 'Airports',
                    label: 'airports',
                    varName: 'v_map_airports',
                    qlikDropdownId: 'hWvUq',
                },
            ];

            $scope.engineerUnitsToggles = [
                {
                    title: 'Combat Engineers',
                    label: 'combat-engineers',
                    varName: 'v_map_combat_engineers',
                    qlikDropdownId: 'qekyX',
                },
                {
                    title: 'Civil Engineers',
                    label: 'civil-engineers',
                    varName: 'v_map_civil_engineers',
                    qlikDropdownId: 'HzDHVu',
                },
            ];

            $scope.ocsToggles = [
                {
                    title: 'Contractors',
                    label: 'contractors',
                    varName: 'v_map_ocs_cities',
                    qlikDropdownId: 'yjprNQT',
                },
            ];

            // Dynamic map drilldown boxes
            $scope.drilldownBoxes = [
                // NIPR
                {
                    label: 'Proof of Concept',
                    fieldName: 'org',
                    varName: 'isOrgSelected',
                    objectId: 'XJwxAG',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('org');
                    },
                },
                {
                    label: 'Proof of Concept',
                    fieldName: 'soccerTeam',
                    varName: 'isSoccerTeamSelected',
                    objectIds: ['frXbuh', 'fsHmHP', 'mKw'],
                    isOpen: false,
                    onClose: function () {
                        polaris.clear();
                    },
                },
                // SIPR
                {
                    label: 'Class I',
                    fieldName: 'dodaac_nomen_cli',
                    varName: 'isClass1Selected',
                    objectId: 'CjKN',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('dodaac_nomen_cli');
                    },
                },
                {
                    label: 'Class III',
                    fieldName: 'plant_desc',
                    varName: 'isClass3Selected',
                    objectId: 'ppfj',
                    isOpen: false,
                    onClose: function () {
                        polaris.clear();
                    },
                },
                {
                    label: 'Class III Subtoggle 1 Detailed Map Viz',
                    fieldName: '',
                    varName: '',
                    objectIds: [],
                    isOpen: false,
                    onClose: function () {
                        polaris.clear();
                    },
                },
                {
                    label: 'Airports',
                    fieldName: 'Airport',
                    varName: 'isApodSelected',
                    objectId: 'gtsz',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('Airport');
                    },
                },
                {
                    label: 'Seaports',
                    fieldName: 'seaport',
                    varName: 'isSeaportSelected',
                    objectId: 'JsSDm',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('seaport');
                    },
                },
            ];

            const genericObject = $scope.drilldownBoxes.reduce(
                (obj, drilldownBox) => {
                    obj[drilldownBox.varName] = {
                        qStringExpression: `=count(distinct [${drilldownBox.fieldName}])`,
                    };
                    return obj;
                },
                {}
            );

            for (const drilldownBox of $scope.drilldownBoxes) {
                const { fieldName } = drilldownBox;
                $scope[fieldName] = false;
            }

            polaris.app.createGenericObject(genericObject, function (reply) {
                for (const box of $scope.drilldownBoxes) {
                    box.isOpen = Number(reply[box.varName]) === 1;
                }
            });

            // Secret map boxes
            $scope.secretDrilldownBoxes = [];
            polaris.createHypercube({
                dimensions: [
                    'secretMapBoxLabel',
                    'secretMapBoxFieldName',
                    'secretMapBoxVarName',
                    'secretMapBoxObjectIds',
                ],
                callback: function (reply) {
                    const secretMapBoxes =
                        reply.qHyperCube.qDataPages[0].qMatrix.map((row) => {
                            const [label, fieldName, varName, objectIds] = row;
                            const objectIdsParsed = objectIds.qText.split(' ');

                            console.log('objectIdsParsed: ', objectIdsParsed);
                            const mapBox = {
                                label: label.qText,
                                fieldName: fieldName.qText,
                                varName: varName.qText,
                                objectId:
                                    objectIdsParsed.length === 1
                                        ? objectIdsParsed[0]
                                        : undefined,
                                objectIds:
                                    objectIdsParsed.length > 0
                                        ? objectIdsParsed
                                        : undefined,
                                isOpen: false,
                                onClose: function () {
                                    polaris.clearField(fieldName.qText);
                                },
                            };

                            console.log('secret map box created: ', mapBox);

                            return mapBox;
                        });

                    $scope.secretDrilldownBoxes = secretMapBoxes;

                    // Add these search fields to the search bar
                    for (const { fieldName } of secretMapBoxes) {
                        if (polaris.isSipr) {
                            $scope.siprSearchFields.push(fieldName);
                        } else {
                            $scope.niprSearchFields.push(fieldName);
                        }
                    }

                    const secretGenericObject = secretMapBoxes.reduce(
                        (obj, drilldownBox) => {
                            obj[drilldownBox.varName] = {
                                qStringExpression: `=count(distinct [${drilldownBox.fieldName}])`,
                            };
                            return obj;
                        },
                        {}
                    );

                    for (const drilldownBox of secretMapBoxes) {
                        const { fieldName } = drilldownBox;
                        $scope[fieldName] = false;
                    }

                    polaris.app.createGenericObject(
                        secretGenericObject,
                        function (reply) {
                            console.log('got the secret boxes: ', reply);
                            for (const box of $scope.secretDrilldownBoxes) {
                                box.isOpen = Number(reply[box.varName]) === 1;
                            }
                        }
                    );
                },
            });

            // Search bar functionality
            $scope.searchStr = '';
            $scope.searchResults = [];
            $scope.niprSearchFields = [
                'org',
                'soccerTeam',
                'nbaTeam',
                'mlsTeam',
            ];
            $scope.siprSearchFields = [
                'dodaac_nomen_cli', // Class I
                'plant_desc', // Class III
                //   'poi_name', // Class III
                'base_name_muns', // Class V
                'PRIMARY_DEPLOYED_DUTY_STATION_CITY', // OCS
                'engineers.uic', // Combat/Civi; Engineers
                'Airport', // APODS
                'seaport', // SPODS
                'CUOPS_VESSEL', // AWS Vessels
                'tasked_flights.Airport', // Taskable Aircraft
                'enemy_vessel', // Enemy Vessels
                'vessel_key', //Vessels
                'asset_id', // Aircraft, Land Vehicles
            ];
            $scope.search = function (searchStr) {
                if (searchStr.length <= 3) {
                    return;
                }

                const searchFields = polaris.isSipr
                    ? $scope.siprSearchFields
                    : $scope.niprSearchFields;

                console.log('Search within these fields: ', searchFields);

                polaris
                    .search(searchStr, {
                        qSearchFields: polaris.isSipr
                            ? $scope.siprSearchFields
                            : $scope.niprSearchFields,
                    })
                    .then((results) => {
                        $scope.searchResults = results;
                    });
            };
            $scope.closeSearchBar = function () {
                $scope.searchStr = '';
                $scope.searchResults = [];
            };
        },
    ]);

    angularApp.controller('LogFunctionsController', [
        '$scope',
        'polaris',
        function ($scope, polaris) {
            $scope.polaris = polaris;

            const appObjects = polaris.isSipr
                ? siprObjects.logFunctions
                : notionalAppObjects.logFunctions;

            angular.element(document).ready(function () {
                polaris.insertObjects(appObjects);
            });

            $scope.modalElements = appObjects.map((appObject, index) => ({
                ...appObject,
                isOpen: false,
                toggleModal: function () {
                    console.log('toggling modal #', index);
                    $scope.toggleModal(index);
                },
            }));

            $scope.toggleModal = function (index) {
                $scope.modalElements[index].isOpen =
                    !$scope.modalElements[index].isOpen;
            };

            $scope.objectElements = logFunctionsPage.objectElements.map(
                (objectElement, index) => ({
                    ...objectElement,
                    isShowing: true,
                    toggleIsShowing: function () {
                        this.isShowing = !this.IsShowing;
                    },
                    toggleModal: function () {
                        console.log('toggling modal #', index);
                        $scope.toggleModal(index);
                    },
                })
            );
            $scope.isMenuOpen = false;
            $scope.toggleMenu = function () {
                console.log('toggled menu');
                $scope.isMenuOpen = !$scope.isMenuOpen;
            };
        },
    ]);

    angularApp.controller('ClassesOfSupplyController', [
        '$scope',
        'polaris',
        function ($scope, polaris) {
            $scope.polaris = polaris;

            const appObjects = polaris.isSipr
                ? siprObjects.classesOfSupply
                : notionalAppObjects.classesOfSupply;

            angular.element(document).ready(function () {
                polaris.insertObjects(appObjects);
            });

            $scope.modalElements = appObjects.map((appObject, index) => ({
                ...appObject,
                isOpen: false,
                toggleModal: function () {
                    console.log('toggling modal #', index);
                    $scope.toggleModal(index);
                },
            }));

            $scope.toggleModal = function (index) {
                $scope.modalElements[index].isOpen =
                    !$scope.modalElements[index].isOpen;
            };

            $scope.objectElements = classesOfSupplyPage.objectElements.map(
                (objectElement, index) => ({
                    ...objectElement,
                    isShowing: true,
                    toggleIsShowing: function () {
                        this.isShowing = !this.IsShowing;
                    },
                    toggleModal: function () {
                        console.log('toggling modal #', index);
                        $scope.toggleModal(index);
                    },
                })
            );
            $scope.isMenuOpen = false;
            $scope.toggleMenu = function () {
                console.log('toggled menu');
                $scope.isMenuOpen = !$scope.isMenuOpen;
            };
        },
    ]);

    angularApp.controller('TestController', [
        '$scope',
        'polaris',
        function ($scope, polaris) {
            $scope.searchStr = '';
            $scope.results = [];

            $scope.search = function (str) {
                console.log('str: ', str);
                polaris.search(str).then((results) => {
                    $scope.results = results;
                });
            };

            $scope.select = function (column, text) {
                polaris.select(column, text);
            };
        },
    ]);

    // Components
    angularApp.component('navigation', {
        templateUrl: 'navigation.html',
        bindings: {
            links: '<',
        },
        controller: 'NavController',
        controllerAs: 'self',
    });

    angularApp.component('loader', {
        template: loaderTemplate,
    });

    angularApp.component('qlikNavbar', {
        templateUrl: 'qlik-navigation-bar.html',
        controller: [
            '$scope',
            'polaris',
            function ($scope, polaris) {
                $scope.polaris = polaris;
                $scope.isShowing = true;
                $scope.isSearchBarOpen = false;
                $scope.searchStr = '';
                $scope.searchResults = [];

                $scope.getArrowDirection = function (isOpen) {
                    return isOpen ? 'up' : 'down';
                };

                $scope.toggleNavBar = function () {
                    if ($scope.isShowing) {
                        polaris.hideNavbar();
                    } else {
                        polaris.showNavbar();
                    }

                    $scope.isShowing = !$scope.isShowing;
                };

                $scope.toggleSearchBar = function () {
                    $scope.searchStr = '';
                    $scope.searchResults = [];
                    $scope.isSearchBarOpen = !$scope.isSearchBarOpen;
                };

                $scope.search = function (searchStr) {
                    polaris.search(searchStr).then((results) => {
                        $scope.searchResults = results;
                    });
                };
            },
        ],
    });

    angularApp.component('polarisModal', {
        bindings: {
            isOpen: '<',
            toggle: '&',
            modalLabel: '@',
            elementId: '@',
            objectId: '@',
        },
        template: `
            <div class="polaris-modal" id="{{$ctrl.elementId}}-wrapper"
                style="z-index: 2;">
                <div class="polaris-modal-actions">
                    <h3>{{$ctrl.modalLabel}}</h3>
                    <button ng-click="$ctrl.toggle()">
                        <close-icon></close-icon>
                    </button>
                </div>
                <div class="polaris-modal-body" id="{{$ctrl.elementId}}-modal-body">
                    <span>{{$ctrl.label}}<span>
                    {{$ctrl.elementId}}
                </div>
            </div>
        `,
        controller: [
            '$scope',
            'polaris',
            function ($scope, polaris) {
                $scope.modalElementId = this.elementId + '-modal';

                $scope.toggle = function () {
                    $scope.$ctrl.toggle();
                };

                angular.element(document).ready(function () {
                    console.log(
                        'Inserting object ',
                        $scope.$ctrl.elementId,
                        ' into modal'
                    );

                    polaris.insertObject({
                        label: $scope.$ctrl.modalLabel,
                        elementId: `${$scope.$ctrl.elementId}-modal-body`,
                        objectId: $scope.$ctrl.objectId,
                    });
                });
            },
        ],
    });

    angularApp.component('polarisToggle', {
        bindings: {
            isChecked: '<',
            toggle: '&',
            label: '@',
            id: '@',
            qlikDropdownId: '@',
        },
        template: `
            <div class="polaris-toggle">
                <h3 class="polaris-toggle-title">{{ $ctrl.label }}</h3>
                <div ng-if="$ctrl.qlikDropdownId.length" class="polaris-toggle-dropdown" id="{{$ctrl.id}}-dropdown"></div>
                <label 
                    class="polaris-toggle-box" 
                    for="{{$ctrl.id}}-checkbox"
                    ng-class="{'checked': $ctrl.isChecked}">

                    <input type="checkbox"  
                           id="{{$ctrl.id}}-checkbox"
                           ng-checked="$ctrl.isChecked"
                           ng-click="$ctrl.toggle()"
                           name="{{$ctrl.id}}">
                    <div class="circle"></div>
                </label>
            </div>
        `,
        controller: [
            '$scope',
            'polaris',
            function ($scope, polaris) {
                angular.element(document).ready(function () {
                    polaris.insertObject({
                        label: $scope.$ctrl.label,
                        elementId: `${$scope.$ctrl.id}-dropdown`,
                        objectId: $scope.$ctrl.qlikDropdownId,
                    });
                });
            },
        ],
    });

    angularApp.component('polarisMapBox', {
        bindings: {
            isShowing: '<',
            close: '&',
            objectId: '@',
            objectIds: '<',
            width: '@',
        },
        template: `
        <div class="polaris-map-box" ng-show="$ctrl.isShowing" ng-style="{'width': $ctrl.width}">       
            <div class="object-header">
                <h3> {{ polaris.selectionState.selections[0].qSelected }}</h3>
                <button ng-click="$ctrl.close()" class="tile-header-fullscreen-btn">
                    <close-icon></close-icon>
                </button>
            </div>
            <div ng-show="$ctrl.objectId.length" class="object-container" id="{{$ctrl.objectId}}-container">
                <loader></loader>
            </div>
            <div ng-show="$ctrl.objectIds.length" class="objects-container">
                <div ng-repeat="objectId in $ctrl.objectIds" id="{{objectId}}-container">
                    <loader></loader>
                </div>
            </div>
        </div>
        `,
        controller: [
            '$scope',
            'polaris',
            function ($scope, polaris) {
                $scope.polaris = polaris;

                console.log('map box created: ', $scope);
                // Only if objectIds is defined
                angular.element(document).ready(function () {
                    if ($scope.$ctrl.objectId?.length) {
                        // For single element
                        polaris.insertObject({
                            label: $scope.$ctrl.modalLabel,
                            elementId: `${$scope.$ctrl.objectId}-container`,
                            objectId: $scope.$ctrl.objectId,
                        });
                    } else if ($scope.$ctrl.objectIds?.length) {
                        // If multiple elements are defined

                        for (const objectId of $scope.$ctrl.objectIds) {
                            polaris.insertObject({
                                label: $scope.$ctrl.modalLabel,
                                elementId: `${objectId}-container`,
                                objectId: objectId,
                            });
                        }
                    }
                });
            },
        ],
    });

    angularApp.component('burgerMenuIcon', {
        template: burgerMenuIconTemplate,
        bindings: {
            toggleMenu: '&',
        },
    });

    angularApp.component('closeIcon', {
        template: closeIconTemplate,
        bindings: {
            handleClick: '&',
            size: '@',
            color: '@',
            fillColor: '@',
        },
        controller: [
            '$scope',
            function ($scope) {
                $scope.getFillColor = (fillColor) => fillColor || '#000000';
            },
        ],
    });

    angularApp.component('fullscreenIcon', {
        template: fullscreenIconTemplate,
    });

    angularApp.component('arrowIcon', {
        template: arrowIconTemplate,
        bindings: {
            direction: '<',
        },
    });

    angularApp.component('classificationBanner', {
        template: `<div class="classification-banner {{$ctrl.color}}">{{ $ctrl.label }}</div>`,
        bindings: {
            label: '<',
            color: '<',
        },
    });

    angular.bootstrap(document, ['angularApp', 'qlik-angular']);
});

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

const burgerMenuIconTemplate = `
<div class="menu-icon" ng-click="$ctrl.toggleMenu()">
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18L20 18" stroke="#FFF" stroke-width="2" stroke-linecap="round" />
        <path d="M4 12L20 12" stroke="#FFF" stroke-width="2" stroke-linecap="round" />
        <path d="M4 6L20 6" stroke="#FFF" stroke-width="2" stroke-linecap="round" />
    </svg>
</div>
`;

const closeIconTemplate = `
<div class="close-icon" ng-click="$ctrl.handleClick()">
    <svg fill="{{ getFillColor($ctrl.fillColor) }}" height="100%" width="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
        <g>
            <g>
                <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
                512,452.922 315.076,256 		" />
            </g>
        </g>
    </svg>
</div>
`;

const fullscreenIconTemplate = `
<svg fill="#000000" height="100%" width="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 384.97 384.97" xml:space="preserve">
<g>
	<g id="Fullscreen_1_">
		<path d="M372.939,216.545c-6.123,0-12.03,5.269-12.03,12.03v132.333H24.061V24.061h132.333c6.388,0,12.03-5.642,12.03-12.03
			S162.409,0,156.394,0H24.061C10.767,0,0,10.767,0,24.061v336.848c0,13.293,10.767,24.061,24.061,24.061h336.848
			c13.293,0,24.061-10.767,24.061-24.061V228.395C384.97,221.731,380.085,216.545,372.939,216.545z"/>
		<path d="M372.939,0H252.636c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h91.382L99.635,268.432
			c-4.668,4.668-4.668,12.235,0,16.903c4.668,4.668,12.235,4.668,16.891,0L360.909,40.951v91.382c0,6.641,5.39,12.03,12.03,12.03
			s12.03-5.39,12.03-12.03V12.03l0,0C384.97,5.558,379.412,0,372.939,0z"/>
	</g>
    <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
</g>
</svg>
`;

const arrowIconTemplate = `
<svg ng-style="$ctrl.direction === 'up' ? { 'transform': 'rotate(180deg)'} : {}" fill="#000000" height="100%" width="100%" version="1.1" id="Layer_1"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 330 330" xml:space="preserve">
    <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
    s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
</svg>
`;
