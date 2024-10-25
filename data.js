const angularLinks = [
    { href: 'Polaris.html', label: 'Home', classNames: ['link'] },
    {
        href: '#/log-functions',
        label: 'Log Functions',
        classNames: ['link'],
    },
    {
        href: '#/data-sources',
        label: 'Data Sources',
        classNames: ['link'],
    },
    // {
    //     href: '#/classes-of-supply',
    //     label: 'Classes of Supply',
    //     classNames: ['link'],
    //     childLinks: [
    //         {
    //             href: '#',
    //             label: 'Class I',
    //             classNames: ['child-link'],
    //             anchorClassNames: [],
    //         },
    //         {
    //             href: '#',
    //             label: 'Class III',
    //             classNames: ['child-link'],
    //             anchorClassNames: [],
    //         },
    //         {
    //             href: '#',
    //             label: 'Class IV',
    //             classNames: ['child-link'],
    //             anchorClassNames: [],
    //         },
    //         {
    //             href: '#',
    //             label: 'Class V',
    //             classNames: ['child-link'],
    //             anchorClassNames: [],
    //         },
    //         {
    //             href: '#',
    //             label: 'Class VIII',
    //             classNames: ['child-link'],
    //             anchorClassNames: [],
    //         },
    //         {
    //             href: '#',
    //             label: 'Class IX',
    //             classNames: ['child-link'],
    //             anchorClassNames: [],
    //         },
    //     ],
    // },
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
            title: 'Readiness - Airframes',
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
        { elementId: 'map', objectId: 'kQBhf' },
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
            objectId: 'wNjwj',
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
    cop: [
        { elementId: 'map', objectId: 'cf0bfaac-b1b2-416a-bc58-f2612a8d1f17' },
    ],
};

const notionalAppObjects = {
    home: [{ elementId: 'map', objectId: 'aDEUH' }],
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
        { label: 'Readiness - Airframes', elementId: 'QV4', objectId: 'mKw' },
        // { label: 'Engineering', elementId: 'QV5', objectId: 'YJgJM' },
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
};

const SearchState = Object.freeze({
    NOT_LOADING: 0,
    LOADING: 1,
});

const COLUMN_ALIAS = {
    // NIPR
    org: 'Organization',
    soccerTeam: 'Soccer Team',
    nbaTeam: 'NBA Team',
    mlsTeam: 'MLS Team',
    // SIPR
    dodaac_nomen_cli: 'Class I', // Class I
    plant_desc: 'Class III', // Class III
    dodaac_cliv: 'Class IV', // Class IV
    base_name_muns: 'Class V', // Class V
    PRIMARY_DEPLOYED_DUTY_STATION_CITY: 'OCS', // OCS
    'engineers.uic': 'Engineers', // Combat/Civil Engineers
    Airport: 'APOD', // APODS
    seaport: 'SPOD', // SPODS
    CUOPS_VESSEL: 'AWS Vessel', // AWS Vessels
    'tasked_flights.Airport': 'no_vis', // Taskable Aircraft
    enemy_vessel: 'Enemy Vessel', // Enemy Vessels
    asset_id: 'Aircraft, Vessel, Land Vehicle ID', // Aircraft, Land Vehicles, Vessels
};

const MAP_LEGEND_SECTIONS = [
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
                items: [
                    {
                        label: 'Blood',
                        showConditionVariable: 'v_map_class_viii',
                        icon: {
                            iconType: 'qlikVariable',
                            imageUrlVariable: 'v_icon_blood',
                        },
                    },
                    {
                        label: 'Medical Equipment',
                        showConditionVariable: 'v_map_class_viii',
                        icon: {
                            iconType: 'bubble',
                            color: 'blue',
                        },
                    },
                ],
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
                    iconType: 'bubble',
                    color: 'purple',
                },
            },
            {
                label: 'EPF',
                showConditionVariable: 'v_map_epf',
                icon: {
                    iconType: 'bubble',
                    color: 'yellow',
                },
            },
            {
                hasChildren: true,
                label: 'Vessels',
                showConditionVariable: 'v_map_deploy_dist_vessel_health',
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
                showConditionVariable: 'v_map_deploy_dist_aircraft_health',
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
                            imageUrlVariable: 'v_icon_land_vehicle_null',
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
                    colors: ['#d3d7f8', '#2437db', '#162183', '#070b2c'],
                },
            },
        ],
    },
];

const DATA_SOURCE_SECTIONS = [
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
    section.dataSourceObjects = section.dataSourceObjectIds.map((id) => ({
        elementId: `data-source-${id}`,
        objectId: id,
    }));

    return section;
});
