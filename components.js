(function () {
    'use strict';

    const angularApp = angular.module('angularApp');

    angularApp.component('navigation', {
        bindings: {
            links: '<',
        },
        templateUrl: 'navigation.html',
        controller: [
            '$scope',
            '$window',
            '$location',
            'polaris',
            'navbarLinks',
            'landingPageLinks',
            function (
                $scope,
                $window,
                $location,
                polaris,
                navbarLinks,
                { niprJ4LandingPageLink, siprJ4LandingPageLink }
            ) {
                $scope.checkIsActive = (href) =>
                    href.slice(1) === $location.path();

                $scope.links = navbarLinks;
                $scope.j4LandingPageLink = polaris.isSipr
                    ? siprJ4LandingPageLink
                    : niprJ4LandingPageLink;
                $scope.classificationBannerLabel = polaris.isSipr
                    ? 'SECRET'
                    : 'UNCLASSIFIED';
                $scope.classificationBannerColor = polaris.isSipr
                    ? 'red'
                    : 'green';
                $scope.printWindow = function () {
                    $window.print();
                };
                $scope.currentAsOf = '';
                polaris.app.createGenericObject(
                    {
                        currentAsOf: {
                            qStringExpression: `=Timestamp(ConvertToLocalTime(Max(ReloadTime()), 'HST'), 'MM/DD/YYYY HH:mm:ss') & ' HST'`,
                        },
                    },
                    function (reply) {
                        console.log('reply.currentAsOf: ', reply);
                        $scope.currentAsOf = reply.currentAsOf;
                    }
                );
            },
        ],
        // controllerAs: 'self',
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

    angularApp.component('qlikSelectionItem', {
        bindings: {
            selectionItem: '<',
        },
        template: `
        <div class="selection-item">
            <div class="selection-info" ng-click="isDropdownOpen = true">
                <p class="selection-item-fieldname" title="{{ $ctrl.selectionItem.fieldName }}">
                    {{$ctrl.selectionItem.fieldName.length > 26 ? $ctrl.selectionItem.fieldName.slice(0, 23) + '...' :
                    $ctrl.selectionItem.fieldName}}
                </p>
                <p class="selection-item-values" title="{{ $ctrl.selectionItem.qSelected }}">
                    {{$ctrl.selectionItem.qSelected.length > 26 ? $ctrl.selectionItem.qSelected.slice(0, 23) + '...' :
                    $ctrl.selectionItem.qSelected}}
                </p>
            </div>
            <button ng-click="polaris.clearField($ctrl.selectionItem.fieldName)"
                class="qlik-action">
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    height="12px"
                    fill="currentColor"
                    aria-hidden="true"
                    role="img">
                    <path
                        d="m9.345 8 3.982 3.982a.951.951 0 0 1-1.345 1.345L8 9.345l-3.982 3.982a.951.951 0 0 1-1.345-1.345L6.655 8 2.673 4.018a.951.951 0 0 1 1.345-1.345L8 6.655l3.982-3.982a.951.951 0 1 1 1.345 1.345z">
                    </path>
                </svg>
            </button>
            <div ng-if="isDropdownOpen" ng-if="list.length > 0" class="selection-item-dropdown">
                <div class="dropdown-header">
                    <h4>{{ $ctrl.selectionItem.fieldName }}</h4>
                    <div class="actions-container" ng-show="isChangeMade" >
                        <button ng-click="confirmChanges()"
                                title="Confirm changes"
                                class="confirm-button">
                            <simple-checkmark-icon fill="#595959"></simple-checkmark-icon>
                        </button>
                        <button ng-click="cancelChanges()"
                            title="Discard changes"
                            class="cancel-button">
                            <trash-icon fill="#595959"></trash-icon>
                        </button>
                    </div>
                    
                    <button class="close-button" ng-click="toggleDropdown($event)">
                        <svg fill="#595959"
                        height="100%"
                        width="100%"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512"
                        xml:space="preserve">
                            <g>
                                <g>
                                    <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
                                    512,452.922 315.076,256 		"></polygon>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
                <ul class="dropdown-items scrollbar">
                    <li ng-if="isLoading" class="dropdown-item loader"><loader></loader></li>
                    <li ng-repeat="listItem in list" 
                        ng-click="isChangeMade = true"
                        ng-class="listItem.isSelected ? 'selected': ''"
                        class="dropdown-item">
                        <div class="dropdown-item-inner">
                            <label for="{{$ctrl.selection.fieldName}}-{{listItem.label}}">
                                {{ listItem.label }}
                            </label>
                            <input
                                ng-model="listItem.isSelected"
                                ng-change="addChange(listItem.label)"
                                name="{{$ctrl.selection.fieldName}}-{{listItem.label}}" 
                                id="{{$ctrl.selection.fieldName}}-{{listItem.label}}" 
                                type="checkbox" />
                            <checkmark-icon ng-show="listItem.isSelected"></checkmark-icon>
                        </div>
                    </li>
                </ul>
            </div>
        </div>`,
        controller: [
            '$scope',
            'polaris',
            function ($scope, polaris) {
                $scope.polaris = polaris;
                $scope.selectionItem = $scope.$ctrl.selectionItem;
                $scope.isDropdownOpen = false;
                $scope.toggleDropdown = function (event) {
                    $scope.isDropdownOpen = !$scope.isDropdownOpen;
                };
                $scope.originalList = [];
                $scope.list = [];
                $scope.changes = [];
                $scope.isChangeMade = false;
                $scope.addChange = function (label) {
                    $scope.isChangeMade = true;

                    if ($scope.changes.includes(label)) {
                        $scope.changes = $scope.changes.filter(
                            (change) => change !== label
                        );
                    } else {
                        $scope.changes.push(label);
                    }
                };

                $scope.cancelChanges = function () {
                    $scope.isChangeMade = false;
                    console.log('canceling changes: ', [
                        ...$scope.originalList,
                    ]);
                    $scope.changes = [];
                    $scope.list = JSON.parse(
                        JSON.stringify($scope.originalList)
                    );
                };
                $scope.confirmChanges = function () {
                    console.log('confirming selections: ', $scope.changes);

                    polaris.selectValues(
                        $scope.$ctrl.selectionItem.fieldName,
                        $scope.changes
                    );
                };

                angular.element(document).ready(function () {
                    console.log(
                        '$scope.$ctrl.selectionItem: ',
                        $scope.$ctrl.selectionItem
                    );

                    $scope.isLoading = true;
                    polaris
                        .createList({
                            field: $scope.$ctrl.selectionItem.fieldName,
                            currentSelections:
                                $scope.$ctrl.selectionItem.qSelected,
                        })
                        .then((list) => {
                            console.log('list: ', list);
                            const sortedList = list.sort((a, b) => {
                                return b.isSelected - a.isSelected;
                            });
                            $scope.originalList = JSON.parse(
                                JSON.stringify(sortedList)
                            );
                            $scope.list = sortedList;

                            $scope.isLoading = false;
                        });
                });
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
            hasChildren: '<',
        },
        template: `
            <div class="polaris-toggle">
                <h3 class="polaris-toggle-title">
                    {{ $ctrl.label }}
                </h3>
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
                    $scope.getDirection = function () {
                        return $scope.$ctrl.isChecked ? 'down' : 'right';
                    };
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
            height: '@',
            width: '@',
            position: '@',
        },
        template: `
        <div class="polaris-map-box {{ position }}" ng-show="$ctrl.isShowing">       
            <div class="object-header">
                <h3></h3>
                <!-- <h3> {{ polaris.selectionState.selections[0].qSelected }}</h3> -->
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

                $scope.position = 'right';

                console.log('map box created: ', $scope);
                // Only if objectIds is defined

                $scope.$watch('$ctrl.isShowing', function () {
                    polaris.resize(500);
                });

                angular.element(document).ready(function () {
                    switch ($scope.$ctrl.position) {
                        case 'bottom':
                            $scope.position = 'bottom';
                            break;
                    }

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

    angularApp.component('polarisMapLegend', {
        bindings: {
            legendTitle: '@',
            getMapVariable: '&',
        },
        template: `
            <div class="polaris-map-legend">

                <div class="polaris-map-legend-action" ng-click="isOpen = !isOpen">
                    <h3 class="polaris-map-legend-title">Legend</h3>
                </div>
                
                <ul class="legend-sections scrollbar" ng-class="[{show: isOpen}, legendPosition]">
                    <div class="actions">
                        <rotate-icon handle-click="rotateLegend(legendPosition)"></rotate-icon>
                        <div class="no-layer-selected">{{ isLegendSectionShowing() ? '' : 'NO LAYERS SELECTED' }}</div>
                        <close-icon handle-click="isOpen = !isOpen"></close-icon>
                    </div>
                    
                    <li class="legend-section" ng-repeat="section in legendSections" ng-show="getVariable(section.showConditionVariable, section.items)">
                        <div class="legend-section-header">
                            <h4>{{ section.title }}</h4>
                        </div>
                        <ul class="legend-section-items">
                            <li ng-repeat="legendItem in section.items"
                                ng-class="{'has-children': legendItem.hasChildren, 'gradient': legendItem.icon.iconType === 'gradient'}"
                                ng-switch="legendItem.icon.iconType"
                                class="legend-item"
                                ng-show="getVariable(legendItem.showConditionVariable, legendItem.items)">

                                <gradient ng-switch-when="gradient" colors="legendItem.icon.colors"></gradient>
                                <legend-icon ng-switch-default ng-if="!legendItem.hasChildren" icon="legendItem.icon"></legend-icon>
                                    
                                <span ng-if="!legendItem.hasChildren" class="legend-label">{{ legendItem.label }}</span>
                                
                                <h4 ng-if="legendItem.hasChildren" class="legend-subitem-header">{{ legendItem.label }}</h4>
                                <ul ng-if="legendItem.hasChildren" class="icon-list">
                                    <li ng-repeat="legendSubItem in legendItem.items" class="legend-item">
                                        <legend-icon icon="legendSubItem.icon"></legend-icon>
                                        <span class="legend-label">{{ legendSubItem.label }}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>
        `,
        controller: [
            '$scope',
            'polaris',
            'homePage',
            function ($scope, polaris, homePage) {
                const { MAP_LEGEND_SECTIONS } = homePage;

                // Get secret icons
                polaris.createHypercube({
                    dimensions: [
                        'legendIconLabel',
                        'legendIconUrlVariable',
                        'showConditionVariable',
                    ],
                    callback: function (reply) {
                        const secretIcons =
                            reply.qHyperCube.qDataPages[0].qMatrix.map(
                                (row) => {
                                    const label = row[0].qText;
                                    const imageUrlVariable = row[1].qText;
                                    const showConditionVariable = row[2].qText;

                                    const icon = {
                                        label: label,
                                        showConditionVariable:
                                            showConditionVariable,
                                        icon: {
                                            iconType: 'qlikVariable',
                                            imageUrlVariable: imageUrlVariable,
                                        },
                                    };

                                    return icon;
                                }
                            );

                        for (const icon of secretIcons) {
                            // Insert
                            $scope.legendSections
                                .find(
                                    (section) =>
                                        section.title === 'Classes of Supply'
                                )
                                .items.push(icon);
                        }
                    },
                });

                $scope.polaris = polaris;
                $scope.isOpen = false;
                $scope.legendPosition = 'bottom-right';
                $scope.rotateLegend = function (currentPosition) {
                    switch (currentPosition) {
                        case 'bottom-right':
                            $scope.legendPosition = 'bottom-left';
                            break;
                        case 'bottom-left':
                            $scope.legendPosition = 'top-left';
                            break;
                        case 'top-left':
                            $scope.legendPosition = 'top-right';
                            break;
                        case 'top-right':
                            $scope.legendPosition = 'bottom-right';
                            break;
                    }
                };
                $scope.legendSections = [];
                $scope.isLegendSectionShowing = false;
                $scope.getArrowDirection = (isOpen) => (isOpen ? 'up' : 'down');
                $scope.testIcon = {
                    // iconType: 'imageUrl',
                    // imageUrl: '/content/Country_Flags/Philippines.png',
                    iconType: 'triangle',
                    color: 'teal',
                };

                angular.element(document).ready(function () {
                    $scope.getVariable = (mapVariable, legendItems) => {
                        // console.log('getmapvariable called: ', mapVariable, legendItems);
                        if (!mapVariable && legendItems) {
                            // console.log('no mapvariable legendItems: ',legendItems);
                            // This means it doesn't have a showConditionVariable
                            for (const item of legendItems) {
                                if (
                                    $scope.$ctrl.getMapVariable({
                                        v: item.showConditionVariable,
                                    })
                                ) {
                                    return true;
                                }
                            }

                            return false;
                        }

                        if (legendItems) {
                            if (
                                $scope.$ctrl.getMapVariable({ v: mapVariable })
                            ) {
                                for (const item of legendItems) {
                                    if (!item.showConditionVariable) {
                                        return true;
                                    }

                                    if (
                                        $scope.$ctrl.getMapVariable({
                                            v: item.showConditionVariable,
                                        })
                                    ) {
                                        return true;
                                    }
                                }

                                return false;
                            }
                        }

                        return $scope.$ctrl.getMapVariable({ v: mapVariable });
                    };

                    $scope.legendSections = MAP_LEGEND_SECTIONS.map(
                        (section) => {
                            if (section.showConditionVariable) {
                                section.isOpen = !!$scope.getVariable(
                                    section.showConditionVariable
                                );
                            } else {
                                section.isOpen = true;
                            }

                            section.items = section.items.map((item) => {
                                item.isOpen = $scope.getVariable(
                                    item.showConditionVariable
                                );
                                return item;
                            });

                            return section;
                        }
                    );

                    $scope.isLegendSectionShowing = () =>
                        MAP_LEGEND_SECTIONS.filter((legendSection) => {
                            if (legendSection.showConditionVariable) {
                                return $scope.getVariable(
                                    legendSection.showConditionVariable
                                );
                            }

                            if (legendSection.items.length) {
                                for (const item of legendSection.items) {
                                    return $scope.getVariable(
                                        item.showConditionVariable
                                    );
                                }
                            }

                            return false;
                        }).length;

                    // console.log('$scope.isLegendSectionShowing: ', $scope.isLegendSectionShowing);
                });
            },
        ],
    });

    angularApp.component('loader', {
        template: `
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
        `,
    });

    angularApp.component('legendIcon', {
        bindings: {
            icon: '<',
        },
        template: `
            <div class="legend-icon" ng-switch="$ctrl.icon.iconType" ng-style="imageDimensionStyle">
                <img ng-switch-when="qlikVariable" ng-src="{{ getVariable($ctrl.icon.imageUrlVariable) }}"/>
                <img ng-switch-when="url" ng-src="{{ $ctrl.icon.imageUrl }}"/>
                <shape-icon ng-switch-default icon-type="$ctrl.icon.iconType" icon-color="$ctrl.icon.color"></shape-icon>
            </div>
        `,
        controller: [
            '$scope',
            'polaris',
            function ($scope, polaris) {
                $scope.getVariable = (v) => $scope[v];

                angular.element(document).ready(function () {
                    if ($scope.$ctrl.icon.isDimensionsUnrestricted) {
                        $scope.imageDimensionStyle = {
                            width: 'auto',
                            height: 'auto',
                        };
                    }

                    polaris.getVariable(
                        $scope.$ctrl.icon.imageUrlVariable,
                        $scope
                    );
                });
            },
        ],
    });

    angularApp.component('legendItem', {
        bindings: {},
        template: `
            <legend-icon ng-if="!polaris.isSipr" icon="testIcon"></legend-icon>
            <legend-icon ng-if="polaris.isSipr" icon="legendItem.icon"></legend-icon>
            <span class="legend-label">{{ legendItem.label }}</span>
        `,
        controller: ['$scope', 'polaris', function ($scope, polaris) {}],
    });

    angularApp.component('gradient', {
        bindings: {
            colors: '<',
        },
        template: `<div class="legend-gradient" ng-style="gradientStyle"></div>`,
        controller: [
            '$scope',
            function ($scope) {
                angular.element(document).ready(function () {
                    $scope.gradientStyle = {
                        background: `linear-gradient(90deg, ${$scope.$ctrl.colors
                            .map((color, index) => {
                                return `${color} ${index * 25}%`;
                            })
                            .join(', ')}`,
                    };
                    console.log('gradientStyle: ', $scope.gradientStyle);
                });
            },
        ],
    });

    angularApp.component('shapeIcon', {
        bindings: {
            iconType: '<',
            iconColor: '<',
        },
        template: `
            <div class="shape-icon" ng-switch="$ctrl.iconType" ng-style="$ctrl.iconType === 'timp-hexagon' && { 'width': '40px' }">
                <div ng-switch-when="bubble" xmlns="http://www.w3.org/2000/svg">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="30" fill="{{ $ctrl.iconColor }}" stroke="#7b7a78" stroke-width="3px"/>
                    </svg>
                </div>
                <div ng-switch-when="triangle">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="50,10 90,90 10,90" fill="{{ $ctrl.iconColor }}" stroke="#7b7a78" stroke-width="3px"/>
                    </svg>
                </div>
                <div ng-switch-when="hexagon">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="0,50 25,93.3 75,93.3 100,50 75,6.7 25,6.7" fill="{{ $ctrl.iconColor }}" stroke="#7b7a78" stroke-width="3px"/>
                    </svg>
                </div>
                <div ng-switch-when="timp-hexagon">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <!-- Define the gradient -->
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:#b01f3e;stop-opacity:1" />
                                <stop offset="25%" style="stop-color:#f19767;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#e7f4fc;stop-opacity:1" />
                                <stop offset="75%" style="stop-color:#8bc4eb;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#3d53a1;stop-opacity:1" />
                            </linearGradient>
                        </defs>

                        <!-- Hexagon -->
                        <polygon class="gradient" points="50,10 80,25 80,55 50,70 20,55 20,25" fill="url(#grad1)" />
                    </svg>
                </div>
            </div>
        `,
    });

    angularApp.component('burgerMenuIcon', {
        bindings: {
            toggleMenu: '&',
        },
        template: `
            <div class="menu-icon" ng-click="$ctrl.toggleMenu()">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18L20 18" stroke="#FFF" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 12L20 12" stroke="#FFF" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 6L20 6" stroke="#FFF" stroke-width="2" stroke-linecap="round" />
                </svg>
            </div>
        `,
    });

    angularApp.component('closeIcon', {
        bindings: {
            handleClick: '&',
            size: '@',
            color: '@',
            fillColor: '@',
        },
        template: `
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
        `,
        controller: [
            '$scope',
            function ($scope) {
                $scope.getFillColor = (fillColor) => fillColor || '#000000';
            },
        ],
    });

    angularApp.component('rotateIcon', {
        bindings: {
            handleClick: '&',
            width: '@',
            height: '@',
        },
        template: `
        <div class="rotate-icon" ng-style="iconStyle" ng-click="$ctrl.handleClick()">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M85.9,87c0,1.7-1.3,3-3,3H70.9c-1.7,0-3-1.3-3-3V75.1c0-1.7,1.3-3,3-3s3,1.3,3,3v5.3c9.3-7.3,14.9-18.6,14.9-30.6  C88.8,28.4,71.4,11,50,11c-1.7,0-3-1.3-3-3s1.3-3,3-3c24.7,0,44.8,20.1,44.8,44.8c0,13.3-6,25.8-15.9,34.2h4  C84.5,84,85.9,85.4,85.9,87z M50,89c-21.4,0-38.8-17.4-38.8-38.8c0-12,5.6-23.3,14.9-30.6v5.3c0,1.7,1.3,3,3,3s3-1.3,3-3V13  c0-1.7-1.3-3-3-3H17.1c-1.7,0-3,1.3-3,3s1.3,3,3,3h4c-10,8.4-15.9,20.9-15.9,34.2C5.2,74.9,25.3,95,50,95c1.7,0,3-1.3,3-3  S51.7,89,50,89z"/></svg>
        </div>
        `,
        controller: [
            '$scope',
            function ($scope) {
                angular.element(document).ready(function () {
                    $scope.width = $scope.$ctrl.width || '1rem';
                    $scope.height = $scope.$ctrl.height || '1rem';

                    $scope.iconStyle = {
                        width: $scope.width,
                        height: $scope.height,
                    };
                });
            },
        ],
    });

    angularApp.component('fullscreenIcon', {
        template: `
            <svg fill="#000000" height="100%" width="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384.97 384.97" xml:space="preserve">
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
        `,
    });

    angularApp.component('arrowIcon', {
        bindings: {
            direction: '<',
        },
        template: `
        <svg ng-class="$ctrl.direction" fill="#000000" height="100%" width="100%" version="1.1" id="Layer_1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 330 330" xml:space="preserve">
            <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
            c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
            s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
        </svg>
        `,
        controller: [
            '$scope',
            function ($scope) {
                angular.element(document).ready(function () {
                    $scope.getDirectionStyle = function (direction) {
                        const directionStyle = {};
                        switch (direction) {
                            case 'up':
                                $scope.directionStyle.transform =
                                    'rotate(180deg)';
                                break;
                            case 'down':
                                break;
                            case 'right':
                                $scope.directionStyle.transform =
                                    'rotate(270deg)';
                                break;
                            case 'left':
                                $scope.directionStyle.transform =
                                    'rotate(90deg)';
                                break;
                        }

                        return directionStyle;
                    };
                });
            },
        ],
    });

    angularApp.component('trashIcon', {
        bindings: {
            fill: '@',
        },
        template: `
        <svg fill="{{$ctrl.fill || '#7a0012'}}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            width="100%" height="100%" viewBox="0 0 408.483 408.483"
            xml:space="preserve">
            <g>
                <g>
                    <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
                        H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
                        c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
                        c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
                        c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
                        c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"/>
                    <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
                        c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"/>
                </g>
            </g>
        </svg>
        `,
    });

    angularApp.component('checkmarkIcon', {
        template: `
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1280.000000 1185.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,1185.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M12525 11747 c-1052 -607 -2241 -1476 -3359 -2456 -901 -790 -1862
                -1742 -2752 -2726 -614 -680 -1276 -1471 -1874 -2240 -208 -268 -746 -986
                -915 -1223 -87 -122 -135 -181 -145 -178 -8 2 -769 430 -1690 950 l-1675 947
                -38 -43 c-20 -24 -42 -50 -47 -59 -9 -16 133 -182 3754 -4381 l291 -338 40 0
                40 0 227 453 c1121 2231 2222 4068 3471 5792 1377 1899 2936 3648 4690 5259
                125 115 227 212 227 216 0 5 -69 103 -82 116 -2 1 -75 -39 -163 -89z"/>
            </g>
        </svg>
        `,
    });

    angularApp.component('simpleCheckmarkIcon', {
        bindings: {
            fill: '@',
        },
        template: `
        <svg width="100%" height="100%" viewBox="0 0 48 48" version="1" enable-background="new 0 0 48 48">
            <polygon fill="{{$ctrl.fill || '#595959'}}" points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"/>
        </svg>
        `,
    });

    angularApp.component('classificationBanner', {
        bindings: {
            label: '<',
            color: '<',
        },
        template: `<div class="classification-banner {{$ctrl.color}}">{{ $ctrl.label }}</div>`,
    });
})();
