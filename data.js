const angularLinks = [
    { href: 'Polaris.html', label: 'Home', classNames: ['link'] },
    {
        href: '#/log-functions',
        label: 'Log Functions',
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
            objectId: 'QxFN',
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
