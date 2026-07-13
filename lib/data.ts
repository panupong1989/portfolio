import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'panupong.piw@gmail.com',

    emailSubject: "Let's build something",
    emailBody: 'Hi Panupong, I am reaching out to you because...',

    github: 'https://github.com/panupong1989',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: GENERAL_INFO.github },
    { name: 'email', url: `mailto:${GENERAL_INFO.email}` },
];

export const MY_STACK = {
    ai: [
        {
            name: 'Claude',
            icon: '/logo/claude.svg',
        },
        {
            name: 'OpenAI',
            icon: '/logo/openai.svg',
        },
        {
            name: 'Stitch',
            icon: '/logo/stitch.svg',
        },
    ],
    frontend: [
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'Three.js',
            icon: '/logo/threejs.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MSSQL',
            icon: '/logo/mssql.svg',
        },
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'Supabase',
            icon: '/logo/supabase.svg',
        },
        {
            name: 'Python',
            icon: '/logo/python.svg',
        },
        {
            name: 'C#',
            icon: '/logo/csharp.svg',
        },
    ],
    'iot & hardware': [
        {
            name: 'ESP32',
            icon: '/logo/esp32.svg',
        },
        {
            name: 'Arduino',
            icon: '/logo/arduino.svg',
        },
        {
            name: 'MQTT',
            icon: '/logo/mqtt.svg',
        },
        {
            name: 'Node-RED',
            icon: '/logo/nodered.svg',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'Vercel',
            icon: '/logo/vercel.svg',
        },
        {
            name: 'Electron',
            icon: '/logo/electron.svg',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Venjoin',
        slug: 'venjoin',
        techStack: [
            'Next.js',
            'TypeScript',
            'PostgreSQL',
            'MQTT',
            'ESP32',
            'Ksher/PromptPay',
        ],
        thumbnail: '/assets/venjoin-dashboard.png',
        longThumbnail: '/assets/venjoin-dashboard.png',
        images: ['/assets/venjoin-dashboard.png', '/assets/venjoin-login.png'],
        year: 2025,
        description: `
        A multi-tenant IoT platform to provision, monitor and bill networks of vending and laundry machines — owned end to end, from the firmware on the device to the dashboard the operator uses. <br/><br/>

        Key features:
        <ul>
            <li>🏢 Multi-tenant SaaS: isolated data and billing per operator on a shared PostgreSQL schema</li>
            <li>📡 Realtime device layer over MQTT — provision, monitor and control machines live</li>
            <li>💳 PromptPay / Ksher payments with HMAC-signed webhooks</li>
            <li>🔌 ESP32 firmware talking to the same backend that runs the web app</li>
            <li>📊 Admin dashboards for machine health, sales and reporting</li>
        </ul>
        `,
        role: `
        Founder & Full-Stack Developer — I owned the whole product:
        <ul>
            <li>🗄️ Designed the multi-tenant PostgreSQL data model and backend</li>
            <li>📡 Built the realtime MQTT device layer and ESP32 firmware</li>
            <li>💳 Integrated PromptPay/Ksher payments with signed webhooks</li>
            <li>🎨 Built the operator dashboards in Next.js + TypeScript</li>
        </ul>
        `,
    },
    {
        title: 'Kiln Monitoring & Reporting',
        slug: 'kiln-monitoring',
        techStack: ['Next.js', 'TypeScript', 'MSSQL', 'Node-RED', 'Siemens S7'],
        thumbnail: '/assets/kiln-dashboard.png',
        longThumbnail: '/assets/kiln-dashboard.png',
        images: ['/assets/kiln-dashboard.png', '/assets/kiln-report.png'],
        year: 2024,
        description: `
        Live monitoring and cycle reporting for lime-kiln production, bridging a Siemens S7-300 PLC to a modern web app through Node-RED. <br/><br/>

        Key features:
        <ul>
            <li>📈 Realtime gauges and min/max tracking straight off the PLC</li>
            <li>🧾 Printable cycle reports for each production run</li>
            <li>🗄️ Historical data stored in MSSQL for analysis</li>
            <li>🔗 Node-RED bridge from S7 industrial protocol to the web layer</li>
        </ul>
        `,
        role: `
        Full-Stack Developer — connected the factory floor to the browser:
        <ul>
            <li>🔗 Built the Node-RED pipeline from the Siemens S7 PLC</li>
            <li>🗄️ Modeled the MSSQL schema for cycle data and reporting</li>
            <li>🎨 Built the realtime dashboard and printable reports in Next.js</li>
        </ul>
        `,
    },
    {
        title: 'Mushroom House Climate Control',
        slug: 'mushroom-house',
        techStack: ['ESP32', 'Supabase', 'Next.js', 'LINE API'],
        thumbnail: '/assets/mushroom.png',
        longThumbnail: '/assets/mushroom.png',
        images: ['/assets/mushroom.png'],
        year: 2024,
        description: `
        An IoT system that holds temperature and humidity steady across a straw-mushroom grow cycle. <br/><br/>

        Key features:
        <ul>
            <li>🌡️ Dual-mode ESP32 that keeps running even when offline</li>
            <li>⚡ Supabase realtime backend syncing device state to the cloud</li>
            <li>📱 Mobile dashboard for live readings and control</li>
            <li>🔔 LINE alerts when a reading drifts out of range</li>
        </ul>
        <br/>
        Safety-hardened after an AI-written race condition was caught in review — the pump could energize before the water-level check settled, which on real hardware burns out the pump. Fixed before it ever reached the relay.
        `,
        role: `
        Full-Stack IoT Developer — firmware, cloud and mobile UI, solo. AI wrote the pump-control logic fast; my review kept it safe.
        `,
    },
    {
        title: 'Laundromat Layout Planner',
        slug: 'laundromat-planner',
        techStack: ['React', 'Three.js', 'WebGL'],
        thumbnail: '/assets/laundry-3d.png',
        longThumbnail: '/assets/laundry-3d.png',
        images: ['/assets/laundry-3d.png', '/assets/laundry-2d.png'],
        year: 2025,
        description: `
        A drag-and-drop floor planner for coin-laundry shops: place washers, dryers and vending units on a scaled 2D grid, then walk the finished room in 3D. <br/><br/>

        Key features:
        <ul>
            <li>🧩 Drag-and-drop placement on a scaled 2D grid</li>
            <li>🏠 One-click switch to an explorable 3D room (Three.js / WebGL)</li>
            <li>📐 Real-world dimensions so layouts actually fit the space</li>
        </ul>
        `,
        role: `Full-Stack Developer — built the 2D planner and the 3D WebGL renderer end to end.`,
    },
    {
        title: 'Factory Flasher Station',
        slug: 'factory-flasher',
        techStack: ['Electron', 'Node.js', 'Modbus TCP', 'Serial'],
        thumbnail: '/assets/factory-flasher-rig.jpg',
        longThumbnail: '/assets/factory-flasher-rig.jpg',
        images: [
            '/assets/factory-flasher-rig.jpg',
            '/assets/factory-flasher.png',
        ],
        year: 2023,
        description: `
        A desktop station that automates PCBA firmware flashing on the production line. <br/><br/>

        Flow: scan board → Excel lot lookup → PLC/CVD signal control → serial flash, with a live log console for operators.
        <ul>
            <li>🖥️ Electron desktop app built for factory operators</li>
            <li>🔌 Talks to the line over Modbus TCP and serial</li>
            <li>📋 Excel lot lookup and a live log console</li>
        </ul>
        `,
        role: `Full-Stack / Hardware-bridge Developer — built the desktop app and the Modbus/serial hardware integration.`,
    },
    {
        title: 'VendingROI Pro',
        slug: 'vendingroi-pro',
        techStack: ['Next.js', 'Chart.js', 'LINE LIFF'],
        thumbnail: '/assets/vendingroi.png',
        longThumbnail: '/assets/vendingroi.png',
        images: ['/assets/vendingroi.png'],
        year: 2024,
        description: `
        An interactive ROI calculator for vending-machine investors — payback period, break-even, and a 12-month cash-flow projection — delivered as a LINE LIFF app.
        <ul>
            <li>📊 Live payback, break-even and cash-flow charts (Chart.js)</li>
            <li>📱 Runs inside LINE as a LIFF app</li>
        </ul>
        `,
        role: `Full-Stack Developer — built the calculator, data-viz and LINE LIFF integration.`,
    },
    {
        title: 'Batch Process Control HMI',
        slug: 'batch-hmi',
        techStack: ['React', 'Web HMI', 'PLC'],
        thumbnail: '/assets/process-hmi.png',
        longThumbnail: '/assets/process-hmi.png',
        images: ['/assets/process-hmi.png'],
        year: 2023,
        description: `
        An operator interface for a chemical batch line: a numbered step sequencer with live vacuum, temperature and time control, delivered as a web HMI talking to a PLC.
        `,
        role: `Full-Stack Developer — built the web HMI and the PLC data integration.`,
    },
    {
        title: 'RACE OPS',
        slug: 'race-ops',
        techStack: ['Next.js', 'TypeScript'],
        thumbnail: '/assets/raceops.png',
        longThumbnail: '/assets/raceops.png',
        images: ['/assets/raceops.png', '/assets/raceops-plan.png'],
        year: 2025,
        description: `
        A half-marathon countdown and 21-week periodized training-plan tracker I built for my own running. A personal project — the kind of tool I build for myself.
        `,
        role: `Solo developer — designed and built it end to end in Next.js + TypeScript.`,
    },
    {
        title: 'Shuttle Match',
        slug: 'shuttle-match',
        techStack: ['Next.js', 'TypeScript'],
        thumbnail: '/assets/shuttle-match.png',
        longThumbnail: '/assets/shuttle-match.png',
        images: ['/assets/shuttle-match.png'],
        year: 2024,
        description: `
        A small web app that builds fair badminton match-ups from a player roster. A personal project I use with my own badminton group.
        `,
        role: `Solo developer — built it end to end in Next.js + TypeScript.`,
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Founder & Full-Stack Developer',
        company: 'INTERNOVATE Co., Ltd.',
        duration: '2025 - Present',
    },
    {
        title: 'Technical Solution Manager',
        company: 'TSR Living Solution',
        duration: '2024 - Present',
    },
    {
        title: 'Project Manager',
        company: 'Aztec Service',
        duration: '2019 - 2023',
    },
    {
        title: 'Project Engineer',
        company: 'Golden Lime Engineering',
        duration: '2014 - 2018',
    },
];
