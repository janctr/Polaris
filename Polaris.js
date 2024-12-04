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
    const angularApp = angular.module('angularApp');

    // Constants
    angularApp.constant('qlik', qlik);
    angularApp.constant('isSipr', window.location.href.includes('smil'));

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
            .when('/data-sources', {
                templateUrl: 'data-sources.ng.html',
                controller: 'DataSourcesController',
            })
            .when('/app-overview', {
                templateUrl: 'app-summary.ng.html',
                controller: 'AppSummaryController',
            })
            .when('/app-overview-2', {
                templateUrl: 'app-summary.ng.html',
                controller: 'AppSummaryController',
            })
            .otherwise({
                redirectTo: '/home',
            });

        $locationProvider.hashPrefix(''); // IMPORTANT: Grants ability to refresh page
    });

    // Services
    angularApp.service('polaris', [
        '$timeout',
        'qlik',
        'isSipr',
        'polarisAppId',
        'notionalAppId',
        function ($timeout, qlik, isSipr, polarisAppId, notionalAppId) {
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
            self.selectValues = selectValues;
            self.search = search;
            self.createHypercube = createHypercube;
            self.createList = createList;

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

            function resize(timeout) {
                if (typeof timeout !== 'undefined') {
                    $timeout(function () {
                        console.log('resizing');
                        self.qlik.resize();
                    }, timeout);
                } else {
                    console.log('resizing');
                    self.qlik.resize();
                }
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

            function selectValues(columnName, values) {
                values.map((val) => ({ qText: val }));

                self.app.field(columnName).selectValues(values, true, true);
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

            function createList({ field, currentSelections }) {
                currentSelections = currentSelections
                    .split(',')
                    .map((s) => s.trim());

                console.log('createList called: ', field, currentSelections);

                return new Promise((resolve, reject) => {
                    self.app.createList(
                        {
                            qDef: {
                                qFieldDefs: [field],
                            },
                            qInitialDataFetch: [
                                {
                                    qTop: 0,
                                    qLeft: 0,
                                    qHeight: 10000,
                                    qWidth: 1,
                                },
                            ],
                        },
                        function (reply) {
                            const list =
                                reply.qListObject.qDataPages[0].qMatrix.map(
                                    (row) => {
                                        return {
                                            label: row[0].qText,
                                            isSelected:
                                                currentSelections.indexOf(
                                                    row[0].qText
                                                ) < 0
                                                    ? false
                                                    : true,
                                        };
                                    }
                                );

                            resolve(list);
                        }
                    );
                });
            }
        },
    ]);

    //Controllers
    angularApp.controller('HomeController', [
        '$scope',
        'polaris',
        'homePage',
        'COLUMN_ALIAS',
        function ($scope, polaris, homePage, COLUMN_ALIAS) {
            const { siprObjects, notionalAppObjects, HOME_PAGE_TOGGLES } =
                homePage;

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
                'v_map_class_viii',
                'v_class_viii_blood',
                'v_class_viii_equip',
                'v_map_class_ix',
                // PDDOC
                'v_map_deploy_dist_vessel_health',
                'v_map_enemy_vessels',
                'v_map_deploy_dist_aircraft_health',
                'v_map_aws',
                'v_map_epf',
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
            $scope.isPddocTogglesOpen = false;
            $scope.isNodalHealthTogglesOpen = false;
            $scope.isEngineerTogglesOpen = false;
            $scope.isOcsTogglesOpen = false;

            $scope.pacomToggles = HOME_PAGE_TOGGLES.pacomToggles;
            $scope.classesOfSupplyToggles =
                HOME_PAGE_TOGGLES.classesOfSupplyToggles;
            $scope.pddocToggles = HOME_PAGE_TOGGLES.pddocToggles;
            $scope.nodalHealthToggles = HOME_PAGE_TOGGLES.nodalHealthToggles;
            $scope.engineerUnitsToggles =
                HOME_PAGE_TOGGLES.engineerUnitsToggles;
            $scope.ocsToggles = HOME_PAGE_TOGGLES.ocsToggles;

            // Class III Subtoggles
            polaris.createHypercube({
                dimensions: ['secretLabel', 'secretVarName', 'qlikDropdownId'],
                callback: function (reply) {
                    const subToggles = [];
                    for (const row of reply.qHyperCube.qDataPages[0].qMatrix) {
                        const [label, varName, qlikDropdownId] = row;

                        const subToggle = {
                            title: label.qText,
                            label: label.qText
                                .toLowerCase()
                                .split(' ')
                                .join('-'),
                            varName: varName.qText,
                            qlikDropdownId: qlikDropdownId.qText,
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

            // Dynamic map drilldown boxes
            $scope.drilldownBoxes = [
                // NIPR
                {
                    label: 'Proof of Concept',
                    fieldName: 'org',
                    varName: 'isOrgSelected',
                    objectId: 'XJwxAG',
                    isOpen: false,
                    position: 'bottom',
                    // height: '100px',
                    onClose: function () {
                        polaris.clearField('org');
                    },
                },
                {
                    label: 'Proof of Concept',
                    fieldName: 'soccerTeam',
                    varName: 'isSoccerTeamSelected',
                    customExpression: `=count({$<league={'La Liga'}>}distinct [soccerTeam])`,
                    objectIds: ['frXbuh', 'fsHmHP', 'mKw'],
                    isOpen: false,
                    position: 'right',
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
                    position: 'bottom',
                    height: '300px',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('dodaac_nomen_cli');
                    },
                },
                {
                    label: 'Class III',
                    fieldName: 'plant_desc',
                    varName: 'isClass3Selected',
                    objectId: 'RnwWt',
                    isOpen: false,
                    onClose: function () {
                        polaris.clear();
                    },
                },
                {
                    label: 'Class IV',
                    fieldName: 'dodaac_cliv',
                    varName: 'isClass4Selected',
                    objectId: 'JYusjn',
                    position: 'bottom',
                    height: '400px',
                    isOpen: false,
                    onClose: function () {
                        console.log('Clearing Class IV DMV');
                        polaris.clearField('dodaac_cliv');
                    },
                },
                {
                    label: 'Class V',
                    fieldName: 'base_name_muns',
                    varName: 'isClassVSelected',
                    objectId: 'ppJjJMC',
                    position: 'bottom',
                    height: '260px',
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
                {
                    label: 'Aircraft',
                    fieldName: 'asset_id',
                    varName: 'isAircraftSelected',
                    // customExpression: `=count({$<asset_category={'Air'}>}distinct [asset_id])`,
                    customExpression: '=v_map_deploy_dist_aircraft_health',
                    objectId: 'hJgyPNS',
                    position: 'bottom',
                    height: '200px',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('asset_id');
                    },
                },
                {
                    label: 'Vessels',
                    fieldName: 'asset_id',
                    customExpression:
                        "=count({$<asset_category={'Sea'}>}distinct [asset_id])",
                    varName: 'isVesselSelected',
                    objectId: 'YdCug',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('vessel');
                    },
                },
                {
                    label: 'Enemy Vessels',
                    fieldName: 'enemy_vessel',
                    varName: 'isEnemyVesselSelected',
                    objectId: 'Gnuzw',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('enemy_vessel');
                    },
                },
                {
                    label: 'Blood',
                    fieldName: 'dodaac_blood',
                    varName: 'isBloodSelected',
                    objectId: 'BWPC',
                    position: 'bottom',
                    height: '300px',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('dodaac_nomen_blood');
                    },
                },
                {
                    label: 'Medical Equipment',
                    fieldName: 'dodaac_equip',
                    varName: 'isMedicalEquipmentSelected',
                    objectId: 'pZjksCY',
                    position: 'bottom',
                    height: '200px',
                    isOpen: false,
                    onClose: function () {
                        polaris.clearField('dodaac_equip');
                    },
                },
            ];

            const genericObject = $scope.drilldownBoxes.reduce(
                (obj, drilldownBox) => {
                    obj[drilldownBox.varName] = {
                        qStringExpression:
                            drilldownBox.customExpression ||
                            `=count(distinct [${drilldownBox.fieldName}])`,
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
                    'position',
                    'width',
                    'height',
                ],
                callback: function (reply) {
                    const secretMapBoxes =
                        reply.qHyperCube.qDataPages[0].qMatrix.map((row) => {
                            const [
                                label,
                                fieldName,
                                varName,
                                objectIds,
                                position,
                                width,
                                height,
                            ] = row;
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
                                position: position.qText,
                                width: width.qText,
                                height: height.qText,
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
                                qStringExpression:
                                    drilldownBox.customExpression ||
                                    `=count(distinct [${drilldownBox.fieldName}])`,
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
            $scope.searchState = SearchState.NOT_LOADING;
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
                'dodaac_cliv', // Class IV
                'base_name_muns', // Class V
                'dodaac_blood', // Class VIII - Blood
                'dodaac_equip', // Class VIII - Medical Equipment
                'PRIMARY_DEPLOYED_DUTY_STATION_CITY', // OCS
                'engineers.uic', // Combat/Civil Engineers
                'Airport', // APODS
                'seaport', // SPODS
                'CUOPS_VESSEL', // AWS Vessels
                'cuops_vessel', // EPF Vessels
                //'tasked_flights.Airport', // Taskable Aircraft
                'enemy_vessel', // Enemy Vessels
                'asset_id', // Aircraft, Land Vehicles, Vessels
            ];

            $scope.toggleVariableBySearchField = function (searchField) {
                const searchFieldToVariableMap = {
                    '': 'v_map_classes_of_supply',
                    '': 'v_map_class_i',
                    // 'v_map_class_iii', TODO Figure out class 3
                    '': 'v_map_class_iv',
                    '': 'v_map_class_v',
                    '': 'v_map_class_viii',
                    '': 'v_class_viii_blood',
                    '': 'v_class_viii_equip',

                    // Classes of Supply
                    dodaac_nomen_cli: [
                        'v_map_classes_of_supply',
                        'v_map_class_i',
                    ],
                    plant_desc: ['v_map_classes_of_supply', 'v_map_class_iii'],
                    dodaac_cliv: ['v_map_classes_of_supply', 'v_map_class_iv'],
                    base_name_muns: [
                        'v_map_classes_of_supply',
                        'v_map_class_v',
                    ],

                    dodaac_blood: [
                        'v_map_classes_of_supply',
                        'v_map_class_viii',
                        'v_class_viii_blood',
                    ],
                    dodaac_equip: [
                        'v_map_classes_of_supply',
                        'v_map_class_viii',
                        'v_class_viii_equip',
                    ],

                    // TODO: Do classified fields

                    asset_id: [
                        'v_map_deploy_dist_aircraft_health',
                        'v_map_land_vehicles',
                        'v_map_deploy_dist_vessel_health',
                    ],

                    enemy_vessel: 'v_map_enemy_vessels',
                    CUOPS_VESSEL: 'v_map_aws',
                    '': 'v_map_epf',

                    seaport: 'v_map_seaports',
                    Airport: 'v_map_airports',

                    'engineers.uic': [
                        'v_map_combat_engineers',
                        'v_map_civil_engineers',
                    ],

                    PRIMARY_DEPLOYED_DUTY_STATION_CITY: 'v_map_ocs_cities',
                };

                const mapVariable = searchFieldToVariableMap[searchField];

                if (
                    typeof mapVariable === 'string' &&
                    !$scope.getVariable(mapVariable)
                ) {
                    $scope.toggleVariable(mapVariable);
                }

                if (typeof mapVariable === 'object') {
                    // Mapped to multiple layers
                    for (const v of mapVariable) {
                        if (!$scope.getVariable(v)) {
                            $scope.toggleVariable(v);
                        }
                    }
                }

                if (mapVariable && !scope.getVariable[mapVariable]) {
                    $scope.toggleVariable(mapVariable);
                }
            };

            $scope.getNiceColumnName = (columnName) =>
                COLUMN_ALIAS[columnName] || columnName;
            $scope.search = function (searchStr) {
                if (searchStr.length <= 3) {
                    return;
                }

                $scope.searchState = SearchState.LOADING;
                console.log('searchState: ', $scope.searchState);

                const searchFields = polaris.isSipr
                    ? $scope.siprSearchFields
                    : $scope.niprSearchFields;

                console.log('Search within these fields: ', searchFields);

                polaris
                    .search(searchStr, {
                        qSearchFields: polaris.isSipr
                            ? $scope.siprSearchFields
                            : $scope.niprSearchFields,
                        qContext: 'Cleared',
                    })
                    .then((results) => {
                        $scope.searchResults = results;

                        $scope.searchState = SearchState.NOT_LOADING;
                        console.log('searchState: ', $scope.searchState);
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
        'logFunctionsPage',
        function ($scope, polaris, logFunctionsPage) {
            const { objectElements, siprObjects, notionalAppObjects } =
                logFunctionsPage;
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

            $scope.objectElements = objectElements.map(
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
        'classesOfSupplyPage',
        function ($scope, polaris, classesOfSupplyPage) {
            console.log('classesOfSupplyPage: ', classesOfSupplyPage);
            $scope.polaris = polaris;

            const { siprObjects, notionalAppObjects, objectElements } =
                classesOfSupplyPage;

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

            $scope.objectElements = objectElements.map(
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

    angularApp.controller('DataSourcesController', [
        '$scope',
        'polaris',
        'dataSourcesPage',
        function ($scope, polaris, dataSourcesPage) {
            const { DATA_SOURCE_SECTIONS } = dataSourcesPage;

            $scope.tableOfContents = [
                {
                    title: 'All Data Sources',
                    id: 'data-sources-all',
                    onClick: function () {
                        $scope.currentSelection = this.id;
                    },
                },
                ...DATA_SOURCE_SECTIONS.map((section) => ({
                    title: section.title,
                    id: section.sectionId,
                    onClick: function () {
                        $scope.currentSelection = section.sectionId;
                    },
                })),
            ];

            $scope.dataSourceSections = DATA_SOURCE_SECTIONS;
            $scope.currentSelection = 'data-sources-all';

            angular.element(document).ready(function () {
                for (const section of DATA_SOURCE_SECTIONS) {
                    polaris.insertObjects(section.dataSourceObjects);
                }
            });
        },
    ]);

    angularApp.controller('AppSummaryController', [
        '$scope',
        'polaris',
        'appSummaryPage',
        function ($scope, polaris, appSummaryPage) {
            const { CREDITS_SECTIONS } = appSummaryPage;

            $scope.dateLastReloaded = '1/1/2024';
            $scope.lastModified = '1/2/2024';
            $scope.published = '1/3/2024';

            $scope.glossary = [];
            $scope.changeLog = [];

            polaris.createHypercube({
                dimensions: ['Term', 'Definition'],
                callback: function (reply) {
                    const changes = reply.qHyperCube.qDataPages[0].qMatrix.map(
                        (row) => {
                            const term = row[0].qText;
                            const definition = row[1].qText;

                            return { term, definition };
                        }
                    );

                    $scope.glossary = changes;
                },
            });

            polaris.createHypercube({
                dimensions: ['Version Number', 'Date', 'ChangeMade'],
                callback: function (reply) {
                    const changes = reply.qHyperCube.qDataPages[0].qMatrix.map(
                        (row) => {
                            const version = row[0].qText;
                            const date = row[1].qText;
                            const change = row[2].qText;

                            return { version, date, change };
                        }
                    );

                    $scope.changeLog = changes;
                },
            });

            $scope.creditsSections = CREDITS_SECTIONS;
        },
    ]);

    angular.bootstrap(document, ['angularApp', 'qlik-angular']);
});
