const POLARIS_CONSTANTS = {
    polarisAppId: 'c6106274-0193-4299-8772-d93a4043b604',
    notionalAppId: 'a02ee546-bb4f-41d3-a3d0-1a93f0aed2cc',
    navbarLinks: [
        {
            href: '#/home',
            label: 'Home',
            classNames: ['link', 'separator'],
        },
        {
            href: '#/log-functions',
            label: 'Log Functions',
            classNames: ['link', 'separator'],
        },
        {
            href: '#/data-sources',
            label: 'Data Sources',
            classNames: ['link', 'separator'],
        },
        {
            href: '#/app-overview',
            label: 'App Overview',
            classNames: ['link', 'separator'],
        },
    ],
    landingPageLinks: {
        niprJ4LandingPageLink:
            'https://qlik.advana.data.mil/sense/app/e2f5d8b5-998b-4fcd-b7d7-d8bed97a8695/sheet/dcf05bd5-985e-4bcc-b14e-988f86049a51/state/analysis',
        siprJ4LandingPageLink:
            'https://qlik.advana.data.smil.mil/sense/app/7b45d060-eb7d-4764-acc9-240e057176ad/sheet/546baeed-7818-4bf2-9308-afed26880120/state/analysis',
    },
    homePage: {
        siprObjects: {
            home: [{ elementId: 'map', objectId: 'kQBhf' }],
        },
        notionalAppObjects: {
            home: [{ elementId: 'map', objectId: 'aDEUH' }],
        },
        HOME_PAGE_TOGGLES: {
            pacomToggles: [
                {
                    title: 'Recenter to AOR',
                    label: 'usindopacom',
                    varName: 'v_map_usindopacom',
                    qlikDropdownId: 'yRuKjT',
                },
                {
                    title: 'JOA Boundaries',
                    label: 'joa',
                    varName: 'v_map_joa',
                    qlikDropdownId: 'PvXr',
                },
                {
                    title: 'TIMP',
                    label: 'timp',
                    varName: 'v_map_TIMP',
                },
                {
                    title: 'Classes of Supply',
                    label: 'classes-of-supply',
                    varName: 'v_map_classes_of_supply',
                    hasChildren: true,
                },
            ],
            classesOfSupplyToggles: [
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
                    qlikDropdownId: '',
                    hasChildren: true,
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
                {
                    title: 'Class VIII',
                    label: 'class-viii',
                    varName: 'v_map_class_viii',
                    hasChildren: true,
                    subToggles: [
                        {
                            title: 'Blood',
                            label: 'blood',
                            varName: 'v_class_viii_blood',
                            qlikDropdownId: 'pjXKSfn',
                        },
                        {
                            title: 'Medical Equipment',
                            label: 'medical-equipment',
                            varName: 'v_class_viii_equip',
                            qlikDropdownId: 'xTJgWb',
                        },
                    ],
                },
                // {
                //     title: 'Class IX',
                //     label: 'class-ix',
                //     varName: 'v_map_class_ix',
                // },
            ],
            pddocToggles: [
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
                    title: 'EPF',
                    label: 'epf',
                    varName: 'v_map_epf',
                    qlikDropdownId: 'vtYQuKL',
                },
                {
                    title: 'Land Vehicles',
                    label: 'land-vehicles',
                    varName: 'v_map_land_vehicles',
                    qlikDropdownId: 'qZbxy',
                },
            ],
            nodalHealthToggles: [
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
            ],
            engineerUnitsToggles: [
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
            ],
            ocsToggles: [
                {
                    title: 'Contractors',
                    label: 'contractors',
                    varName: 'v_map_ocs_cities',
                    qlikDropdownId: 'yjprNQT',
                },
            ],
        },
        MAP_TOGGLE_DEFAULT_VALUES: [
            { varName: 'v_map_usindopacom', defaultValue: 1 },
            { varName: 'v_map_joa', defaultValue: 0 },
            { varName: 'v_map_TIMP', defaultValue: 0 },
            { varName: 'v_map_classes_of_supply', defaultValue: 0 },
            { varName: 'v_map_class_i', defaultValue: 1 },
            { varName: 'v_map_class_iii', defaultValue: 1 },
            { varName: 'v_map_class_iv', defaultValue: 1 },
            { varName: 'v_map_class_v', defaultValue: 1 },
            { varName: 'v_map_class_viii', defaultValue: 1 },
            { varName: 'v_class_viii_blood', defaultValue: 1 },
            { varName: 'v_class_viii_equip', defaultValue: 1 },
            {
                varName: 'v_map_deploy_dist_vessel_health',
                defaultValue: 0,
            },
            { varName: 'v_map_enemy_vessels', defaultValue: 0 },
            {
                varName: 'v_map_deploy_dist_aircraft_health',
                defaultValue: 0,
            },
            { varName: 'v_map_aws', defaultValue: 0 },
            { varName: 'v_map_epf', defaultValue: 0 },
            { varName: 'v_map_land_vehicles', defaultValue: 0 },
            { varName: 'v_map_seaports', defaultValue: 0 },
            { varName: 'v_map_airports', defaultValue: 0 },
            { varName: 'v_map_combat_engineers', defaultValue: 0 },
            { varName: 'v_map_civil_engineers', defaultValue: 0 },
            { varName: 'v_map_ocs_cities', defaultValue: 0 },
        ],
        MAP_LEGEND_SECTIONS: [
            {
                title: 'Classes of Supply',
                showConditionVariable: 'v_map_classes_of_supply',
                items: [
                    {
                        label: 'Class I',
                        showConditionVariable: 'v_map_class_i',
                        icon: {
                            iconType: 'qlikVariable',
                            imageUrlVariable: 'v_class_i_img',
                        },
                    },
                    {
                        label: 'Class III',
                        showConditionVariable: 'v_map_class_iii',
                        icon: {
                            iconType: 'qlikVariable',
                            imageUrlVariable: 'v_class_iii_img',
                        },
                    },
                    {
                        label: 'Class IV',
                        showConditionVariable: 'v_map_class_iv',
                        icon: {
                            iconType: 'qlikVariable',
                            imageUrlVariable: 'v_class_iv_img',
                        },
                    },
                    {
                        label: 'Class V',
                        showConditionVariable: 'v_map_class_v',
                        icon: {
                            iconType: 'qlikVariable',
                            imageUrlVariable: 'v_class_v_img',
                        },
                    },
                    {
                        hasChildren: true,
                        label: 'Class VIII',
                        showConditionVariable: 'v_map_class_viii',
                        items: [
                            {
                                label: 'Blood',
                                showConditionVariable: 'v_class_viii_blood',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_Blood',
                                },
                            },
                            {
                                label: 'Medical Equipment',
                                showConditionVariable: 'v_class_viii_equip',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_Med_Equip',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                title: 'TIMP - Projects',
                items: [
                    {
                        label: 'Priority Level',
                        showConditionVariable: 'v_map_TIMP',
                        icon: {
                            iconType: 'timp-hexagon',
                            color: '#4477aa',
                        },
                    },
                ],
            },
            {
                title: 'PDDOC',
                items: [
                    {
                        label: 'Enemy Vessels',
                        showConditionVariable: 'v_map_enemy_vessels',
                        icon: {
                            iconType: 'url',
                            imageUrl: '/content/IR%20COP/enemy_ddg.png',
                        },
                    },
                    {
                        label: 'AWS',
                        showConditionVariable: 'v_map_aws',
                        icon: {
                            iconType: 'qlikVariable',
                            imageUrlVariable: 'v_icon_AWS',
                        },
                    },
                    {
                        label: 'EPF',
                        showConditionVariable: 'v_map_epf',
                        icon: {
                            iconType: 'qlikVariable',
                            imageUrlVariable: 'v_icon_EPF',
                        },
                    },
                    {
                        hasChildren: true,
                        label: 'Vessels',
                        showConditionVariable:
                            'v_map_deploy_dist_vessel_health',
                        items: [
                            {
                                label: 'UNK',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_sea_vessel_null',
                                },
                            },
                            {
                                label: 'FMC',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_sea_vessel_fmc',
                                },
                            },
                            {
                                label: 'PMC',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_sea_vessel_pmc',
                                },
                            },
                            {
                                label: 'NMC',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_sea_vessel_nmc',
                                },
                            },
                        ],
                    },
                    {
                        hasChildren: true,
                        label: 'Aircraft',
                        showConditionVariable:
                            'v_map_deploy_dist_aircraft_health',
                        items: [
                            {
                                label: 'UNK',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_aircraft_null',
                                },
                            },
                            {
                                label: 'FMC',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_aircraft_fmc',
                                },
                            },
                            {
                                label: 'PMC',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_aircraft_pmc',
                                },
                            },
                            {
                                label: 'NMC',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_aircraft_nmc',
                                },
                            },
                        ],
                    },
                    {
                        hasChildren: true,
                        label: 'Land Vehicles',
                        showConditionVariable: 'v_map_land_vehicles',
                        items: [
                            {
                                label: 'UNK',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable:
                                        'v_icon_land_vehicle_null',
                                },
                            },
                            {
                                label: 'FMC',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_land_vehicle_fmc',
                                },
                            },
                            {
                                label: 'PMC',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_land_vehicle_pmc',
                                },
                            },
                            {
                                label: 'NMC',
                                icon: {
                                    iconType: 'qlikVariable',
                                    imageUrlVariable: 'v_icon_land_vehicle_nmc',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Nodal Health',
                items: [
                    {
                        label: 'Seaports',
                        showConditionVariable: 'v_map_seaports',
                        icon: {
                            iconType: 'qlikVariable',
                            imageUrlVariable: 'v_icon_seaport_partner_nation',
                        },
                    },
                    {
                        label: 'Airports',
                        showConditionVariable: 'v_map_airports',
                        icon: {
                            iconType: 'qlikVariable',
                            imageUrlVariable: 'v_icon_airport_null',
                        },
                    },
                ],
            },
            {
                title: 'Engineer Units',
                items: [
                    {
                        hasChildren: true,
                        label: 'Combat Engineers - C Rating',
                        showConditionVariable: 'v_map_combat_engineers',
                        items: [
                            {
                                label: '0',
                                icon: {
                                    iconType: 'bubble',
                                    color: 'black',
                                },
                            },
                            {
                                label: '1 - 2',
                                icon: {
                                    iconType: 'bubble',
                                    color: '#074c03', // dark green
                                },
                            },
                            {
                                label: '3',
                                icon: {
                                    iconType: 'bubble',
                                    color: 'yellow',
                                },
                            },
                            {
                                label: '> 3',
                                icon: {
                                    iconType: 'bubble',
                                    color: 'red',
                                },
                            },
                        ],
                    },
                    {
                        hasChildren: true,
                        label: 'Civil Engineers - C Rating',
                        showConditionVariable: 'v_map_civil_engineers',
                        items: [
                            {
                                label: '0',
                                icon: {
                                    iconType: 'triangle',
                                    color: 'black',
                                },
                            },
                            {
                                label: '1 - 2',
                                icon: {
                                    iconType: 'triangle',
                                    color: '#074c03', // dark green
                                },
                            },
                            {
                                label: '3',
                                icon: {
                                    iconType: 'triangle',
                                    color: 'yellow',
                                },
                            },
                            {
                                label: '> 3',
                                icon: {
                                    iconType: 'triangle',
                                    color: 'red',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                title: 'OCS',
                items: [
                    {
                        label: '# of Contractors',
                        showConditionVariable: 'v_map_ocs_cities',
                        icon: {
                            iconType: 'gradient',
                            colors: [
                                '#d3d7f8',
                                '#2437db',
                                '#162183',
                                '#070b2c',
                            ],
                        },
                    },
                ],
            },
        ],
    },
    logFunctionsPage: {
        siprObjects: {
            logFunctions: [
                // {
                //     // Supply
                //     label: 'Supply',
                //     elementId: 'QV1',
                //     objectId: 'mENkwjC',
                // },
                {
                    // Logistics Nodes
                    label: 'Logistics Nodes',
                    elementId: 'QV2',
                    objectId: 'XapTPt',
                },
                {
                    // PDDOC
                    label: 'PDDOC',
                    elementId: 'QV3',
                    objectId: 'XQhhJ',
                },
                {
                    // Readiness Airframes
                    label: 'Readiness - Airframes',
                    elementId: 'QV4',
                    objectId: 'eXmHeQj',
                },
                // {
                //     // Engineering
                //     label: 'Engineering',
                //     elementId: 'QV5',
                //     objectId: 'jYtzRw',
                // },
                {
                    // Logistics Services
                    label: 'Logistics Services',
                    elementId: 'QV6',
                    objectId: 'jZJhza',
                },
                {
                    // Joint Health Services
                    label: 'Joint Health Services',
                    elementId: 'QV7',
                    objectId: 'pTMmb',
                },
                {
                    // OCS
                    label: 'OCS',
                    elementId: 'QV8',
                    objectId: 'XFwxnmH',
                },
            ],
        },
        notionalAppObjects: {
            logFunctions: [
                // {
                //     label: 'Supply',
                //     elementId: 'QV1',
                //     objectId: 'GcZB',
                // },
                {
                    label: 'Logistics Nodes',
                    elementId: 'QV2',
                    objectId: 'frXbuh',
                },
                { label: 'PDDOC', elementId: 'QV3', objectId: 'fsHmHP' },
                {
                    label: 'Aircraft Maintenance Status',
                    elementId: 'QV4',
                    objectId: 'mKw',
                },
                // { label: 'Engineering', elementId: 'QV5', objectId: 'YJgJM' },
                {
                    label: 'Logistics Services',
                    elementId: 'QV6',
                    objectId: 'mKw',
                },
                {
                    label: 'Joint Health Services',
                    elementId: 'QV7',
                    objectId: 'fsHmHP',
                },
                { label: 'OCS', elementId: 'QV8', objectId: 'frXbuh' },
            ],
        },
        objectElements: [
            // {
            //     classes: ['supply'],
            //     title: 'Supply',
            //     bodyId: 'QV1',
            //     // sources: ['USTRANSCOM Global Distribution Network'],
            //     // refreshRate: { label: 'Monthly', color: 'yellow' },
            //     // quality: { label: 'Partial', color: 'yellow' },
            // },
            {
                classes: ['logistics-nodes'],
                title: 'Logistics Nodes',
                bodyId: 'QV2',
                sources: ['USTRANSCOM Global Distribution Network'],
                refreshRate: { label: 'Monthly', color: 'yellow' },
                quality: { label: 'Partial', color: 'yellow' },
            },
            {
                classes: ['pddoc'],
                title: 'PDDOC',
                bodyId: 'QV3',
                sources: ['8th TSC', 'PACFLT0'],
                refreshRate: { label: 'Hourly', color: 'green' },
                quality: { label: 'Partial', color: 'yellow' },
            },
            {
                classes: ['readiness-airframes'],
                title: 'Aircraft Maintenance Status',
                bodyId: 'QV4',
                sources: ['AMSRR', 'G081', 'IMDS'],
                refreshRate: { label: '~Daily', color: 'green' },
                quality: { label: 'Partial', color: 'yellow' },
            },
            // {
            //     classes: ['engineering'],
            //     title: 'Engineering',
            //     bodyId: 'QV5',
            //     sources: ['Theater Infrastructure Master Plant'],
            //     refreshRate: { label: 'Bimonthly', color: 'green' },
            //     quality: { label: 'Partial', color: 'yellow' },
            // },
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
    },
    classesOfSupplyPage: {
        siprObjects: {
            classesOfSupply: [
                {
                    // Class I
                    label: 'Class I',
                    elementId: 'QV1',
                    objectId: 'NeQnbP',
                },
                {
                    // Class III
                    label: 'Class III',
                    elementId: 'QV2',
                    objectId: 'VgRvJMy',
                },
                {
                    // Class IV
                    label: 'Class IV',
                    elementId: 'QV3',
                    objectId: 'DhVTXQ',
                },
                {
                    // Class V
                    label: 'Class V',
                    elementId: 'QV4',
                    objectId: 'AQjYdx',
                },
                {
                    // Class VIII
                    label: 'Class VIII',
                    elementId: 'QV5',
                    objectId: 'nfJhN',
                },
                {
                    // Class IX
                    label: 'Class IX',
                    elementId: 'QV6',
                    objectId: 'mWQjmAm',
                },
            ],
        },
        notionalAppObjects: {
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
        },
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
    },
    dataSourcesPage: {
        DATA_SOURCE_SECTIONS: [
            {
                title: 'Class III',
                sectionId: 'class-iii',
                dataSourceObjectIds: [
                    'fBbCwmP',
                    'CJuXjPw',
                    'KpKgsE',
                    'SBVftmC',
                    'ALxmq',
                    'RxDQ',
                    'RrFCGD',
                    'RhrpVKJ',
                    'Zme',
                ],
            },
            {
                title: 'DMT & Daily Ops',
                sectionId: 'dmt-daily-ops',
                dataSourceObjectIds: [
                    'PSEqPc',
                    'ACbPYA',
                    'LAFqmc',
                    'mLXkFd',
                    'gFsjpH',
                    'haeUj',
                    'FNsmK',
                    'yjEuJ',
                    'mgpp',
                    'cVgyN',
                    'gaNtvr',
                    'jHdwgZ',
                    'RsLJDV',
                    'WAHGakx',
                    'jtCLtP',
                    'bznPCmC',
                    'eZbJC',
                    'qetkZM',
                    'GDMwbyB',
                    'PNdtyd',
                    'SVBWvj',
                    'pSFNkTJ',
                ],
            },
            {
                title: 'Vessel Tracker',
                sectionId: 'vessel-tracker',
                dataSourceObjectIds: [
                    'pWdyPfH',
                    'GbXud',
                    'hTAJQKP',
                    'YnzdsBP',
                    'QjWHu',
                    'PprpQa',
                ],
            },
            {
                title: 'Enemy Vessels',
                sectionId: 'enemy-vessels',
                dataSourceObjectIds: ['RaqbsGt'],
            },
            {
                title: 'Aircraft Laydown',
                sectionId: 'aircraft-laydown',
                dataSourceObjectIds: ['jBXpe', 'bsRzsEV'],
            },
            {
                title: 'Vehicle Laydown',
                sectionId: 'vehicle-laydown',
                dataSourceObjectIds: ['VaGuz', 'bYaFFuW'],
            },
            {
                title: 'APOD/SPOD',
                sectionId: 'apod-spod',
                dataSourceObjectIds: ['DjxKk', 'CMjsp'],
            },
            {
                title: 'Muns',
                sectionId: 'muns',
                dataSourceObjectIds: ['fAkgW'],
            },
        ].map((section) => {
            section.dataSourceObjects = section.dataSourceObjectIds.map(
                (id) => ({
                    elementId: `data-source-${id}`,
                    objectId: id,
                })
            );

            return section;
        }),
    },
    appOverviewPage: {
        logos: {
            notional: [
                {
                    title: 'Advana',
                    url: 'https://qlik.advana.data.mil/content/BA_Sheet_Logos/ADVANA%20Logo.png',
                },
                {
                    title: 'J4',
                    url: 'https://qlik.advana.data.mil/content/CCMD%20USINDOPACOM/j4-logo.jpg',
                },
                {
                    title: 'Department of Defense',
                    url: 'https://qlik.advana.data.mil/content/Org_Logos/DoD%20App%20Logo.png',
                },
                {
                    title: 'USINDOPACOM',
                    url: 'https://qlik.advana.data.mil/content/Org_Logos/indopacom.png',
                },
            ],
            sipr: [
                {
                    title: 'Advana',
                    url: 'https://qlik.advana.data.smil.mil/content/BA_Sheet_Logos/ADVANA%20Logo.png',
                },
                {
                    title: 'J4',
                    url: 'https://qlik.advana.data.smil.mil/appcontent/21fe9c1f-814e-459d-9d98-dd22769a63aa/J4.jpg',
                },
                {
                    title: 'Department of Defense',
                    url: 'https://qlik.advana.data.smil.mil/content/Org_Logos/DoD%20App%20Logo.png',
                },
                {
                    title: 'USINDOPACOM',
                    url: 'https://qlik.advana.data.smil.mil/content/Org_Logos/indopacom.png',
                },
            ],
        },
        CREDITS_SECTIONS: [
            {
                label: 'Points of Contact',
                people: [
                    {
                        name: 'Anthony Mollison',
                        title: 'Colonel',
                        contact: 'anthony.r.mollison@pacom.smil.mil',
                    },
                    {
                        name: 'Edward Maddox',
                        title: 'Information Systems Division Chief',
                        contact: 'edward.maddox@pacom.smil.mil',
                    },
                ],
            },
            {
                label: 'Key Contributors',
                people: [
                    {
                        name: 'Megan Kobayashi',
                        title: 'Data Scientist',
                        contact: 'megan.s.kobayashi.ctr@pacom.smil.mil',
                    },
                ],
            },
            {
                label: 'Primary Developer',
                people: [
                    {
                        name: 'Matthew Higa',
                        title: 'Logistics Analyst',
                        contact: 'matthew.a.higa.ctr@pacom.smil.mil',
                    },
                    {
                        name: 'Thomas Childress',
                        title: 'Data Engineer',
                        contact: 'thomas.childress.ctr@pacom.smil.mil',
                    },
                    {
                        name: 'Ryan Hamamura',
                        title: 'Data Engineer',
                        contact: 'ryan.hamamuar.ctr@pacom.smil.mil',
                    },
                    {
                        name: 'Daniel Carter',
                        title: 'Data Engineer',
                        contact: 'daniel.z.carter.ctr@pacom.smil.mil',
                    },
                ],
            },
        ],
    },
    /* Tells Qlik which columns to search for when using Qlik search. */
    NIPR_MAP_SEARCH_FIELDS: ['org', 'soccerTeam', 'nbaTeam', 'mlsTeam'],
    SIPR_MAP_SEARCH_FIELDS: [
        'Clusters_ClusterID', // TIMP
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
        // 'asset_id', // Aircraft, Land Vehicles, Vessels
        'sea_vessel_assets_id', // Vessels
        'aircraft_assets_tail_number', // Aircraft
        'land_asset_id', // Land Vehicles
    ],
    COLUMN_ALIAS: {
        // NIPR
        org: 'Organization',
        soccerTeam: 'Soccer Team',
        nbaTeam: 'NBA Team',
        mlsTeam: 'MLS Team',
        // SIPR
        Clusters_ClusterID: 'Project Cluster', // TIMP
        dodaac_nomen_cli: 'Class I', // Class I
        plant_desc: 'Class III', // Class III
        dodaac_cliv: 'Class IV', // Class IV
        base_name_muns: 'Class V', // Class V

        sea_vessel_assets_id: 'Vessel',
        enemy_vessel: 'Enemy Vessel', // Enemy Vessels
        aircraft_assets_tail_number: 'Aircraft',
        CUOPS_VESSEL: 'AWS Vessel', // AWS Vessels
        cuops_vessel: 'EPF Vessel', // EPF Vessels
        land_asset_id: 'Land Vehicle',

        seaport: 'SPOD', // SPODS
        Airport: 'APOD', // APODS

        'engineers.uic': 'Engineers', // Combat/Civil Engineers

        PRIMARY_DEPLOYED_DUTY_STATION_CITY: 'OCS', // OCS
    },
    COLUMN_MAP_VARIABLE_MAP: {
        // TIMP
        Clusters_ClusterID: 'v_map_TIMP',

        // Class I
        dodaac_nomen_cli: ['v_map_classes_of_supply', 'v_map_class_i'],
        // Class III
        plant_desc: ['v_map_classes_of_supply', 'v_map_class_iii'],
        // Class IV
        dodaac_cliv: ['v_map_classes_of_supply', 'v_map_class_iv'],
        // Class V
        base_name_muns: ['v_map_classes_of_supply', 'v_map_class_v'],

        // Class VIII
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

        sea_vessel_assets_id: 'v_map_deploy_dist_vessel_health', // Vessels
        enemy_vessel: 'v_map_enemy_vessels', // Enemy Vessels
        aircraft_assets_tail_number: 'v_map_deploy_dist_aircraft_health', // Aircraft
        CUOPS_VESSEL: 'v_map_aws', // AWS
        cuops_vessel: 'v_map_epf', // EPF
        land_asset_id: 'v_map_land_vehicles', // Land Vehicles

        seaport: 'v_map_seaports', // SPODS
        Airport: 'v_map_airports', // APODS

        // Combat/Civil Engineers
        'engineers.uic': ['v_map_combat_engineers', 'v_map_civil_engineers'],

        // OCS
        PRIMARY_DEPLOYED_DUTY_STATION_CITY: 'v_map_ocs_cities',
    },
};
(function () {
    'use strict';

    const angularApp = angular.module('angularApp');

    for (const [key, value] of Object.entries(POLARIS_CONSTANTS)) {
        console.log('Setting ng constant: ', key);
        angularApp.constant(key, value);
    }
})();

const SearchState = Object.freeze({
    NOT_LOADING: 0,
    LOADING: 1,
});
