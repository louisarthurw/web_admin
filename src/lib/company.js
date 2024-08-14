export const companies = [
    {
        id: 1,
        name: 'PT. Abdi Jaya',
        companyId: 'C0001',
        userCount: 3,
        totalTransaction: 1,
        username: 'theabdijaya',
        location: 'Jl. ABCDE No. 111-114',
        type: 'Real Estate',
        ownershipDocument: 'PT_AbdiJaya_Ownership.pdf',
        companyDocument: 'PT_AbdiJaya_Legality.pdf',
        initialCapital: 'Rp. 2.000.000.000',
        description: 'Managing commercial real estate properties.',
        user: '1. User A\n2. User B\n3. User C',
        transactionDetail: [
            {
                name: "Building A",
                detail: [
                    {
                        meeting: 'Meeting 1',
                        date: '21 February 2024',
                        time: '09:00 WIB',
                        place: 'Office A, Jalan B No. 123',
                        notes: 'LOI for Asset Acquisition',
                        file: 'LOI_Building_A.pdf',
                        fileType: 'LOI'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'PT. Merdeka',
        companyId: 'C0002',
        userCount: 2,
        totalTransaction: 1,
        username: 'ptmerdeka',
        location: 'Jl. Merdeka No. 45',
        type: 'Retail',
        ownershipDocument: 'PT_Merdeka_Ownership.pdf',
        companyDocument: 'PT_Merdeka_Legality.pdf',
        initialCapital: 'Rp. 1.500.000.000',
        description: 'Managing retail property assets.',
        user: '1. User D\n2. User E',
        transactionDetail: [
            {
                name: "Retail Expansion",
                detail: [
                    {
                        meeting: 'Meeting 1',
                        date: '12 March 2024',
                        time: '10:00 WIB',
                        place: 'PT Merdeka Head Office, Jalan Merdeka No. 45',
                        notes: 'LOI for Retail Property Acquisition',
                        file: 'LOI_Retail_Expansion.pdf',
                        fileType: 'LOI'
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'CV. Maju Selalu',
        companyId: 'C0003',
        userCount: 1,
        totalTransaction: 2,
        username: 'cvmajuselalu',
        location: 'Jl. Maju No. 22',
        type: 'Manufacturing',
        ownershipDocument: 'CV_MajuSelalu_Ownership.pdf',
        companyDocument: 'CV_MajuSelalu_Legality.pdf',
        initialCapital: 'Rp. 3.000.000.000',
        description: 'Management of manufacturing facility assets.',
        user: '1. User F',
        transactionDetail: [
            {
                name: "Factory A",
                detail: [
                    {
                        meeting: 'Meeting 1',
                        date: '05 April 2024',
                        time: '14:00 WIB',
                        place: 'Factory A, Jalan Maju No. 22',
                        notes: 'LOI for Equipment Installation',
                        file: 'LOI_Factory_A.pdf',
                        fileType: 'LOI'
                    }
                ]
            },
            {
                name: "Factory B",
                detail: [
                    {
                        meeting: 'Meeting 1',
                        date: '12 April 2024',
                        time: '14:00 WIB',
                        place: 'Factory B, Jalan Maju No. 23',
                        notes: 'LOI for Equipment Installation',
                        file: 'LOI_Factory_B.pdf',
                        fileType: 'LOI'
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        name: 'The Wibawa Group',
        companyId: 'C0004',
        userCount: 3,
        totalTransaction: 1,
        username: 'thewibawagroup',
        location: 'Jl. Wibawa No. 8',
        type: 'Consulting',
        ownershipDocument: 'The_WibawaGroup_Ownership.pdf',
        companyDocument: 'The_WibawaGroup_Legality.pdf',
        initialCapital: 'Rp. 4.000.000.000',
        description: 'Consulting services for asset management.',
        user: '1. User G\n2. User H\n3. User I',
        transactionDetail: [
            {
                name: "Asset Management Project Z",
                detail: [
                    {
                        meeting: 'Meeting 1',
                        date: '15 May 2024',
                        time: '11:00 WIB',
                        place: 'Wibawa Consulting Office, Jalan Wibawa No. 8',
                        notes: 'LOI for Consulting Services',
                        file: 'LOI_Project_Z.pdf',
                        fileType: 'LOI'
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        name: 'CV. Adiwarna',
        companyId: 'C0005',
        userCount: 2,
        totalTransaction: 0,
        username: 'cvadiwarna',
        location: 'Jl. Adiwarna No. 9',
        type: 'Design',
        ownershipDocument: 'CV_Adiwarna_Ownership.pdf',
        companyDocument: 'CV_Adiwarna_Legality.pdf',
        initialCapital: 'Rp. 1.000.000.000',
        description: 'Designing assets for commercial branding.',
        user: '1. User J\n2. User K',
        transactionDetail: []
    },
    {
        id: 6,
        name: 'PT. HMNS',
        companyId: 'C0006',
        userCount: 2,
        totalTransaction: 2,
        username: 'pthmns',
        location: 'Jl. HMNS No. 2',
        type: 'Tech',
        ownershipDocument: 'PT_HMNS_Ownership.pdf',
        companyDocument: 'PT_HMNS_Legality.pdf',
        initialCapital: 'Rp. 5.000.000.000',
        description: 'Tech company managing digital assets.',
        user: '1. User L\n2. User M',
        transactionDetail: [
            {
                name: "Data Center X",
                detail: [
                    {
                        meeting: 'Meeting 1',
                        date: '08 June 2024',
                        time: '15:00 WIB',
                        place: 'HMNS Headquarters, Jalan HMNS No. 2',
                        notes: 'LOI for Data Center Setup',
                        file: 'LOI_Data_Center_X.pdf',
                        fileType: 'LOI'
                    }
                ]
            },
            {
                name: "Software Asset Y",
                detail: [
                    {
                        meeting: 'Meeting 1',
                        date: '30 June 2024',
                        time: '09:30 WIB',
                        place: 'HMNS Headquarters, Jalan HMNS No. 2',
                        notes: 'Addendum for Software Licensing',
                        file: 'Addendum_Software_Y.pdf',
                        fileType: 'Addendum'
                    }
                ]
            }
        ]
    },
    {
        id: 7,
        name: 'PT. Anda',
        companyId: 'C0007',
        userCount: 1,
        totalTransaction: 0,
        username: 'ptanda',
        location: 'Jl. Anda No. 3',
        type: 'Education',
        ownershipDocument: 'PT_Anda_Ownership.pdf',
        companyDocument: 'PT_Anda_Legality.pdf',
        initialCapital: 'Rp. 2.500.000.000',
        description: 'Managing educational assets and resources.',
        user: '1. User N',
        transactionDetail: []
    }
];
