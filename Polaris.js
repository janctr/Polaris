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

            // Methods
            self.insertObject = insertObject;
            self.insertObjects = insertObjects;
            self.hideNavbar = hideNavbar;
            self.showNavbar = showNavbar;
            self.resize = resize;

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
                console.log('Fetching object: ', label);
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
        },
    ]);

    //Controllers
    angularApp.controller('NavController', [
        '$scope',
        'polaris',
        'navbarLinks',
        'landingPageLinks',
        function (
            $scope,
            polaris,
            navbarLinks,
            { niprJ4LandingPageLink, siprJ4LandingPageLink }
        ) {
            $scope.links = navbarLinks;
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
            $scope.getContainerSize = function () {
                const numVisibleTiles = $scope.objectElements.filter(
                    (objectElement) => objectElement.isShowing
                ).length;

                // console.log(numVisibleTiles);
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

    angularApp.component('qliknavbar', {
        templateUrl: 'qlik-navigation-bar.html',
        // bindings: {
        //     text2: '@',
        //     toggleMenu2: '&',
        //     changeText2: '&',
        // },
        controller: [
            '$scope',
            'polaris',
            function ($scope, polaris) {
                console.log('qliknavbar scope: ', $scope);
                console.log('qliknavbar this: ', this);

                $scope.polaris = polaris;
                $scope.isShowing = true;
                $scope.toggle = function () {
                    if ($scope.isShowing) {
                        polaris.hideNavbar();
                    } else {
                        polaris.showNavbar();
                    }

                    $scope.isShowing = !$scope.isShowing;
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
                ng-style="{{modalStyle}}">
                <div class="polaris-modal-actions">
                    <h3>{{$ctrl.modalLabel}}</h3>
                    <button ng-click="$ctrl.toggle()">
                        <close-icon></close-icon
                    </button>
                </div>
                <div class="polaris-modal-body" id="{{$ctrl.elementId}}-modal-body">
                    <span>{{$ctrl.label}}<span>
                    {{$ctrl.elementId}}
                </div>
            </div>
            <style type="text/css">
                .polaris-modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                    width: 85vw;
                    height: 90vh;

                    background-color: #FFF;

                    display: flex;
                    flex-direction: column;
                    
                    z-index: -1;

                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
                    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                }
                .polaris-modal-actions {
                    // background-color: var(--blue-2);
                    // color: #FFF;
                    padding: 0.5rem 0.5rem 0.5rem 1rem;
                    display: flex;
                    align-items: center;
                    
                }

                .polaris-modal-actions h3 {
                    flex: 1;
                }

                .polaris-modal-actions button {
                    border: none;
                    border-radius: 50%;
                    padding: 10px;
                    transition: all 0.25s ease-in-out;
                    width: 38px;
                    height: 38px;
                }

                .polaris-modal-actions button:hover {
                    cursor: pointer;
                    background-color: rgba(64, 64, 64, 0.05);
                }

                .polaris-modal-body {
                    flex: 1;
                }
            </style>
        `,
        controller: [
            '$scope',
            'polaris',
            function ($scope, polaris) {
                $scope.modalStyle = {
                    'z-index': 2,
                };
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

    angularApp.component('burgermenuicon', {
        template: burgerMenuIconTemplate,
        bindings: {
            toggleMenu: '&',
        },
    });

    angularApp.component('closeIcon', {
        template: closeIconTemplate,
    });

    angularApp.component('fullscreenIcon', {
        template: fullscreenIconTemplate,
    });

    angular.bootstrap(document, ['angularApp', 'qlik-angular']);
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

const burgerMenuIconTemplate = `
<div class="menu-icon" ng-click="$ctrl.toggleMenu()">
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round" />
        <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round" />
        <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round" />
    </svg>
</div>
`;

const closeIconTemplate = `
<svg fill="currentColor" height="8px" width="8px" version="1.1" id="Layer_1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
        xml:space="preserve">
        <g>
            <g>
                <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
512,452.922 315.076,256 		" />
            </g>
        </g>
    </svg>
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
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
	<g>
	</g>
</g>
</svg>
`;
