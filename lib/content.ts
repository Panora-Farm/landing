export const site = {
  name: 'Panora',
  fullName: 'Panora Farm',
  domain: 'panora.farm',
  legalEntity: 'PT Jaga Dita Center (JDC Holding)',
  email: 'panorafarm@gmail.com',
  socialHandle: '@officialpanora_',
  urls: {
    marketplace: '/marketplace',
    console: '/console',
    logistics: '/logistics',
    field: 'https://field.panora.farm',
    partnership:
      'mailto:panorafarm@gmail.com?subject=Kemitraan%20B2B%20Panora%20Farm',
    linkedin: 'https://www.linkedin.com/company/officialpanora',
    twitter: 'https://x.com/officialpanora_',
    instagram: 'https://instagram.com/officialpanora_',
  },
} as const;

export const nav = {
  links: {
    id: [
      { label: 'Mengapa Panora', href: '#why' },
      { label: 'Rantai Kepemilikan', href: '#how' },
      { label: 'Komoditas', href: '#commodities' },
      { label: 'Keunggulan', href: '#advantage' },
    ],
    en: [
      { label: 'Why Panora', href: '#why' },
      { label: 'Chain of Custody', href: '#how' },
      { label: 'Commodities', href: '#commodities' },
      { label: 'Advantages', href: '#advantage' },
    ],
  },
  cta: {
    id: 'Buka Console',
    en: 'Launch Console',
  },
  href: site.urls.console,
} as const;

export const hero = {
  titleLines: {
    id: [
      { text: 'Tech-Enabled Commodity', accent: false, emphasize: [] },
      { text: 'Aggregator & Transparent', accent: false, emphasize: [] },
      { text: 'Supply Chain Infrastructure', accent: true, emphasize: [] },
    ],
    en: [
      { text: 'Tech-Enabled Commodity', accent: false, emphasize: [] },
      { text: 'Aggregator & Transparent', accent: false, emphasize: [] },
      { text: 'Supply Chain Infrastructure', accent: true, emphasize: [] },
    ],
  },
  description: {
    id: 'Menghubungkan petani kecil Indonesia dengan pembeli B2B global melalui data rantai pasok anti-manipulasi yang terverifikasi dan memenuhi standar kepatuhan regulasi ekspor.',
    en: 'Connecting Indonesian smallholder farmers with global B2B buyers through verified, tamper-proof supply chain data that meets export regulatory compliance standards.',
  },
  primaryCta: {
    label: {
      id: 'Jelajahi Digital Marketplace',
      en: 'Explore Digital Marketplace',
    },
    href: site.urls.marketplace,
  },
  secondaryCta: {
    label: {
      id: 'Mulai Kemitraan B2B',
      en: 'Start B2B Partnership',
    },
    href: site.urls.partnership,
  },
  trustBadges: {
    id: ['Selaras UN SDG 12', 'Digital Product Passport siap-EUDR'],
    en: ['UN SDG 12 aligned', 'EUDR-ready Digital Product Passport'],
  },
  slides: {
    id: [
      {
        src: '/hero.jpg',
        alt: 'Lahan pertanian petani mitra Panora Farm di Indonesia',
        caption: 'Asal-usul first-mile, Petani mitra, Indonesia',
        objectPosition: 'center 45%',
      },
      {
        src: '/hero1.jpg',
        alt: 'Agen lapangan memetakan poligon GPS lahan petani',
        caption: 'Pemetaan lahan sub-meter oleh agen lapangan',
        objectPosition: 'center center',
      },
      {
        src: '/hero2.jpg',
        alt: 'Hasil panen komoditas pertanian terverifikasi',
        caption: 'Komoditas fisik terverifikasi dari titik nol produksi',
        objectPosition: 'center 40%',
      },
      {
        src: '/hero3.jpg',
        alt: 'Petani mitra Garut & Sumatra Selatan dengan Field App Panora',
        caption: 'Petani mitra Garut & Sumatra Selatan dengan Field App Panora',
        objectPosition: 'center 35%',
      },
    ],
    en: [
      {
        src: '/hero.jpg',
        alt: "Partner farmland in Panora Farm's Indonesian pilot corridors",
        caption: 'First-mile origins, Partner farms, Indonesia',
        objectPosition: 'center 45%',
      },
      {
        src: '/hero1.jpg',
        alt: 'Field agents mapping GPS land polygons',
        caption: 'Sub-meter land mapping by field agents',
        objectPosition: 'center center',
      },
      {
        src: '/hero2.jpg',
        alt: 'Verified agricultural commodity harvest',
        caption: 'Verified physical commodities from point-zero production',
        objectPosition: 'center 40%',
      },
      {
        src: '/hero3.jpg',
        alt: 'Partner farmers in Garut & South Sumatra with the Panora Field App',
        caption:
          'Partner farmers in Garut & South Sumatra with the Panora Field App',
        objectPosition: 'center 35%',
      },
    ],
  },
} as const;

export const metrics = {
  sectionLabel: {
    id: 'Target',
    en: 'Targets',
  },
  sectionTitle: {
    id: 'Skala Rantai Pasok Berkelanjutan Berbasis Data & Aset Fisik',
    en: 'Data-Driven Sustainable Supply Chain Powered by Physical Assets',
  },
  items: {
    id: [
      {
        value: '3,500+',
        label: 'Target Petani Kecil Terhubung',
        detail: 'Jaringan petani kecil di koridor Garut dan Sumatra Selatan',
      },
      {
        value: '2,800 Ha',
        label: 'Target Lahan Ter-mapping GPS Poligon',
        detail:
          'Verifikasi batas lahan sub-meter untuk kepatuhan asal-usul',
      },
      {
        value: '12,000 Ton',
        label: 'Target Transaksi per Tahun',
        detail:
          'Kapasitas agregasi komoditas fisik untuk pasar B2B global',
      },
      {
        value: '100%',
        label: 'Target Data First-Mile Terverifikasi',
        detail: 'Setiap titik panen tercatat sejak titik nol produksi',
      },
    ],
    en: [
      {
        value: '3,500+',
        label: 'Target Smallholder Farmers Connected',
        detail:
          'Smallholder network across Garut and South Sumatra corridors',
      },
      {
        value: '2,800 Ha',
        label: 'Target GPS Polygon-Mapped Land',
        detail:
          'Sub-meter land boundary verification for origin compliance',
      },
      {
        value: '12,000 Tons',
        label: 'Annual Transaction Target',
        detail:
          'Physical commodity aggregation capacity for global B2B markets',
      },
      {
        value: '100%',
        label: 'Target First-Mile Data Verified',
        detail: 'Every harvest point recorded from point zero of production',
      },
    ],
  },
} as const;

export const problem = {
  label: {
    id: 'Masalah yang Kami Selesaikan',
    en: 'Problem We Solve',
  },
  titleLines: {
    id: [
      'Menghapus friksi pasar komoditas',
      'pertanian, hulu ke hilir',
    ],
    en: [
      'Removing agricultural commodity',
      'market friction, upstream to downstream',
    ],
  },
  stakeholders: {
    id: [
      {
        role: 'Petani Kecil (Hulu)',
        body: 'Mengakhiri ketergantungan pada rantai perantara yang tidak transparan, dan membuka akses penyerapan hasil panen dengan harga yang adil serta skema pendanaan kerja.',
      },
      {
        role: 'Pembeli B2B Global (Hilir)',
        body: 'Memenuhi mandat regulasi ekspor ketat seperti EUDR tanpa risiko denda atau larangan impor, didukung bukti asal-usul komoditas yang auditable.',
      },
      {
        role: 'Penyedia Likuiditas / Investor',
        body: 'Menyediakan mekanisme pendanaan perdagangan yang transparan dan aman, berbasis inventaris barang fisik yang tersimpan di gudang terverifikasi.',
      },
    ],
    en: [
      {
        role: 'Smallholder Farmers (Upstream)',
        body: 'Ending dependence on opaque middlemen chains, and opening fair off-take access with transparent pricing and working-capital schemes.',
      },
      {
        role: 'Global B2B Buyers (Downstream)',
        body: 'Meeting strict export mandates like the EU Deforestation Regulation without fines or import bans, backed by auditable commodity origin proof.',
      },
      {
        role: 'Liquidity Providers / Investors',
        body: 'Delivering transparent, secure trade finance mechanisms backed by physical inventory held in verified warehouses.',
      },
    ],
  },
  intro: {
    id: [
      'Satu rantai pasok komoditas.',
      'Tiga pihak menanggung <em>friksinya</em>.',
    ],
    en: [
      'One commodity supply chain.',
      'Three parties have carried its <em>friction</em>.',
    ],
  },
  frame: {
    id: {
      url: 'console.panora.farm',
      title: 'Pelacakan Batch — Koridor Garut',
      export: 'Export Laporan EUDR',
      nav: ['Dashboard', 'Batch Tracking', 'Laporan EUDR', 'Trade Finance'],
      rows: [
        {
          party: 'Petani · Hulu',
          item: 'Kopi Arabica Garut · poligon GPS',
          status: 'Terverifikasi',
        },
        {
          party: 'Pembeli · Hilir',
          item: 'Laporan uji tuntas EUDR',
          status: 'Siap ekspor',
        },
        {
          party: 'Likuiditas',
          item: 'Inventaris gudang terverifikasi',
          status: 'Terjamin',
        },
      ],
      stats: [
        '2.800 Ha ter-mapping poligon',
        'Fase 1: 3.500+ petani',
        'Export EUDR 1 klik',
      ],
    },
    en: {
      url: 'console.panora.farm',
      title: 'Batch Tracking — Garut Corridor',
      export: 'Export EUDR Report',
      nav: ['Dashboard', 'Batch Tracking', 'EUDR Reports', 'Trade Finance'],
      rows: [
        {
          party: 'Farmer · Upstream',
          item: 'Garut Arabica · GPS polygon',
          status: 'Verified',
        },
        {
          party: 'Buyer · Downstream',
          item: 'EUDR due-diligence report',
          status: 'Export-ready',
        },
        {
          party: 'Liquidity',
          item: 'Verified warehouse inventory',
          status: 'Backed',
        },
      ],
      stats: [
        '2,800 Ha polygon-mapped',
        'Phase 1: 3,500+ farmers',
        '1-click EUDR export',
      ],
    },
  },
} as const;

export const chainOfCustody = {
  label: {
    id: 'Rantai Kepemilikan',
    en: 'Chain of Custody',
  },
  title: {
    id: 'Dari gerbang kebun ke <em>ruang rapat.</em>',
    en: 'From farm gate to <em>boardroom.</em>',
  },
  sub: {
    id: 'Lima serah terima terverifikasi. Setiap titik data tercatat sejak titik nol produksi, auditable, dan bisa ditarik seketika.',
    en: 'Five verified handoffs. Every data point recorded from point zero of production, auditable, and instantly retrievable.',
  },
  steps: {
    id: [
      {
        n: '01',
        title: 'Rekam',
        desc: 'Agen lapangan memetakan setiap petak sebagai poligon GPS dengan akurasi sub-meter dan mendaftarkan petani sebelum panen pertama.',
        tag: 'Poligon GPS sub-meter',
        image: '/hero.jpg',
      },
      {
        n: '02',
        title: 'Verifikasi',
        desc: 'Asal panen, identitas petani, dan batas lahan direkam serta diberi stempel waktu di titik nol produksi. Berjalan offline-first untuk kondisi lapangan terpencil.',
        tag: 'Terekam di titik nol',
        image: '/padi.jpg',
      },
      {
        n: '03',
        title: 'Paspor',
        desc: 'Setiap batch memperoleh Digital Product Passport: catatan anti-manipulasi berisi koordinat, sertifikasi, dan seluruh serah terima yang menyusul.',
        tag: 'Digital Product Passport',
        image: '/coffee.jpg',
      },
      {
        n: '04',
        title: 'Pindah',
        desc: 'Check-in gudang dan transportasi ber-GPS mencatat setiap perpindahan. Pindai QR mengonfirmasi kepemilikan di tiap serah terima.',
        tag: 'Titik gudang & transportasi',
        image: '/hero1.jpg',
      },
      {
        n: '05',
        title: 'Laporan',
        desc: 'Enterprise Console memantau setiap batch secara real time dan mengekspor laporan EUDR yang siap audit dalam satu klik.',
        tag: 'Laporan EUDR satu klik',
        image: '/hero3.jpg',
      },
    ],
    en: [
      {
        n: '01',
        title: 'Capture',
        desc: 'Field agents map every plot as a GPS polygon with sub-meter accuracy and enroll the farmer before the first harvest.',
        tag: 'Sub-meter GPS polygons',
        image: '/hero.jpg',
      },
      {
        n: '02',
        title: 'Verify',
        desc: 'Harvest origin, farmer identity, and land boundary are recorded and timestamped at point zero of production. Offline-first for remote field conditions.',
        tag: 'Recorded at point zero',
        image: '/padi.jpg',
      },
      {
        n: '03',
        title: 'Passport',
        desc: 'Each batch receives a Digital Product Passport: a tamper-evident record of coordinates, certifications, and every handoff that follows.',
        tag: 'Digital Product Passport',
        image: '/coffee.jpg',
      },
      {
        n: '04',
        title: 'Move',
        desc: 'Warehouse check-ins and GPS-tracked transport record every movement. A QR scan confirms custody at each handoff.',
        tag: 'Warehouse & transport nodes',
        image: '/hero1.jpg',
      },
      {
        n: '05',
        title: 'Report',
        desc: 'The Enterprise Console tracks every batch in real time and exports an audit-ready EUDR report in one click.',
        tag: 'One-click EUDR reports',
        image: '/hero3.jpg',
      },
    ],
  },
} as const;

export const unifiedEcosystem = {
  label: {
    id: 'Cara Kerja Panora',
    en: 'How Panora Works',
  },
  title: {
    id: 'Satu ekosistem menghubungkan petani, modal, dan pembeli global',
    en: 'One ecosystem connecting farmers, capital, and global buyers',
  },
  nodes: {
    id: [
      {
        num: '01',
        title: 'Petani (Hulu)',
        body: 'Menanam dan memanen komoditas di lahan yang koordinat poligon GPS-nya telah dipetakan oleh agen lapangan.',
      },
      {
        num: '02',
        title: 'Panora Farm',
        subtitle: 'Agregasi & Verifikasi',
        body: 'Menyerap hasil panen fisik, mengelola sortir di gudang, dan menerbitkan Digital Product Passport (DPP).',
      },
      {
        num: '03',
        title: 'Pembeli B2B (Hilir)',
        body: 'Membeli komoditas terverifikasi yang siap memenuhi aturan EUDR melalui Panora Enterprise Console.',
      },
      {
        num: '04',
        title: 'Penyedia Likuiditas',
        subtitle: 'Trade Finance',
        body: 'Mendanai pembiayaan inventaris komoditas dan menerima imbal hasil berbasis aset nyata.',
      },
    ],
    en: [
      {
        num: '01',
        title: 'Farmers (Upstream)',
        body: 'Grow and harvest commodities on land mapped with GPS polygon coordinates by field agents.',
      },
      {
        num: '02',
        title: 'Panora Farm',
        subtitle: 'Aggregation & Verification',
        body: 'Absorbs physical harvests, manages warehouse sorting, and issues Digital Product Passports (DPP).',
      },
      {
        num: '03',
        title: 'B2B Buyers (Downstream)',
        body: 'Purchase verified commodities ready for EUDR compliance via the Panora Enterprise Console.',
      },
      {
        num: '04',
        title: 'Liquidity Providers',
        subtitle: 'Trade Finance',
        body: 'Fund commodity inventory financing and earn returns backed by real assets.',
      },
    ],
  },
} as const;

export const consolePreview = {
  label: {
    id: 'Enterprise Console',
    en: 'Enterprise Console',
  },
  title: {
    id: 'Pratinjau Dashboard Kepatuhan EUDR',
    en: 'EUDR Compliance Dashboard Preview',
  },
  subtitle: {
    id: 'Pembeli B2B mengunduh dokumen kepatuhan EUDR dan ESG dalam satu klik.',
    en: 'B2B buyers download EUDR and ESG compliance documents in one click.',
  },
  exportLabel: {
    id: 'Export Laporan EUDR',
    en: 'Export EUDR Report',
  },
  tableHeaders: {
    id: ['ID Batch', 'Komoditas', 'Status', 'Asal'],
    en: ['Batch ID', 'Commodity', 'Status', 'Origin'],
  },
  batches: {
    id: [
      {
        id: 'PAN-2841',
        commodity: 'Kopi Arabica Garut',
        status: 'Verified',
        origin: 'GPS ✓',
      },
      {
        id: 'PAN-2840',
        commodity: 'Kakao Fermentasi',
        status: 'In Transit',
        origin: 'GPS ✓',
      },
      {
        id: 'PAN-2839',
        commodity: 'VCO Premium',
        status: 'Warehouse',
        origin: 'GPS ✓',
      },
    ],
    en: [
      {
        id: 'PAN-2841',
        commodity: 'Garut Arabica Coffee',
        status: 'Verified',
        origin: 'GPS ✓',
      },
      {
        id: 'PAN-2840',
        commodity: 'Fermented Cocoa',
        status: 'In Transit',
        origin: 'GPS ✓',
      },
      {
        id: 'PAN-2839',
        commodity: 'Premium VCO',
        status: 'Warehouse',
        origin: 'GPS ✓',
      },
    ],
  },
  sidebar: {
    id: [
      'Dashboard',
      'Batch Tracking',
      'EUDR Reports',
      'ESG Metrics',
      'Settings',
    ],
    en: [
      'Dashboard',
      'Batch Tracking',
      'EUDR Reports',
      'ESG Metrics',
      'Settings',
    ],
  },
} as const;

export const commodities = {
  label: {
    id: 'Portofolio Komoditas',
    en: 'Commodity Portfolio',
  },
  title: {
    id: 'Komoditas Pertanian & Perkebunan Unggulan',
    en: 'Core Agricultural & Plantation Commodities',
  },
  href: site.urls.marketplace,
  items: {
    id: [
      {
        id: 'coffee',
        title: 'Kopi (Coffee Beans)',
        tag: 'Arabica & Robusta',
        description:
          'Greenbean Arabica Garut & Robusta Sumatra Selatan pilihan dengan keterlacakan asal-usul lahan.',
        image: '/commodity/Coffee.jpeg',
      },
      {
        id: 'cocoa',
        title: 'Kakao (Cocoa Beans)',
        tag: 'Biji fermentasi',
        description:
          'Biji kakao berkualitas tinggi dengan keterlacakan asal-usul lahan dan sertifikasi petani kecil.',
        image: '/commodity/Cocoa.jpeg',
      },
      {
        id: 'coconut',
        title: 'Derivatif Kelapa',
        tag: 'VCO & turunan',
        description:
          'Produk olahan kelapa terstandarisasi untuk pasar internasional dengan asal-usul terverifikasi.',
        image: '/commodity/Coconut.jpeg',
      },
      {
        id: 'greenhouse',
        title: 'Hortikultura Greenhouse',
        tag: 'Greenhouse',
        description:
          'Hasil panen produk premium untuk pasokan B2B domestik dengan standar kualitas terjamin.',
        image: '/commodity/Greenhouse.jpeg',
      },
    ],
    en: [
      {
        id: 'coffee',
        title: 'Coffee Beans',
        tag: 'Arabica & Robusta',
        description:
          'Premium Garut Arabica & South Sumatra Robusta green beans with full land-origin traceability.',
        image: '/commodity/Coffee.jpeg',
      },
      {
        id: 'cocoa',
        title: 'Cocoa Beans',
        tag: 'Fermented beans',
        description:
          'High-grade cocoa beans with land-origin traceability and smallholder farmer certification.',
        image: '/commodity/Cocoa.jpeg',
      },
      {
        id: 'coconut',
        title: 'Coconut Derivatives',
        tag: 'VCO & derivatives',
        description:
          'Standardized coconut processed products for international markets with verified origins.',
        image: '/commodity/Coconut.jpeg',
      },
      {
        id: 'greenhouse',
        title: 'Greenhouse Horticulture',
        tag: 'Greenhouse',
        description:
          'Premium product harvest for domestic B2B supply with guaranteed quality standards.',
        image: '/commodity/Greenhouse.jpeg',
      },
    ],
  },
} as const;

export const whyPanora = {
  label: {
    id: 'Keunggulan Panora',
    en: 'Why Panora',
  },
  title: {
    id: 'Kenapa bermitra dengan Panora Farm?',
    en: 'Why partner with Panora Farm?',
  },
  items: {
    id: [
      { title: '100% Automated GPS Geotagging' },
      { title: 'Built-in Digital Product Passport' },
      { title: 'Zero Friction B2B Integration' },
      { title: 'Corporate Trade Finance Access' },
    ],
    en: [
      { title: '100% Automated GPS Geotagging' },
      { title: 'Built-in Digital Product Passport' },
      { title: 'Zero Friction B2B Integration' },
      { title: 'Corporate Trade Finance Access' },
    ],
  },
} as const;

export const faq = {
  label: {
    id: 'Pertanyaan Umum',
    en: 'Common Questions',
  },
  title: {
    id: 'Pertanyaan yang sering diajukan',
    en: 'Frequently asked questions',
  },
  items: {
    id: [
      {
        question: 'Apa itu Panora Farm?',
        answer:
          'Panora Farm adalah agregator komoditas berbasis teknologi sekaligus penyedia infrastruktur rantai pasok. Kami menghubungkan petani kecil Indonesia dengan pembeli B2B global — menyerap hasil panen fisik, mengelola sortir di gudang, dan menerbitkan Digital Product Passport terverifikasi untuk setiap batch sejak titik nol produksi.',
      },
      {
        question: 'Apa yang sebenarnya dituntut kepatuhan EUDR?',
        answer:
          'EU Deforestation Regulation menuntut bukti bahwa komoditas tidak berasal dari lahan yang mengalami deforestasi setelah Desember 2020. Panora merekam koordinat poligon GPS di titik panen, dengan stempel waktu dan anti-manipulasi, lalu mengekspor laporan uji tuntas yang siap audit dari Enterprise Console.',
      },
      {
        question: 'Apakah tim kami perlu memahami blockchain?',
        answer:
          'Tidak. Staf lapangan masuk dengan email atau Google; pembeli enterprise memakai single sign-on. Tidak ada yang melihat alamat dompet atau menandatangani transaksi. Catatan terverifikasi berjalan di balik layar — tim Anda bekerja dengan laporan, batch, dan dashboard.',
      },
      {
        question: 'Bagaimana Panora terhubung ke sistem kami saat ini?',
        answer:
          'Enterprise Console menyediakan REST API dan webhook yang terintegrasi dengan ERP atau sistem pengadaan Anda, sehingga tidak perlu perombakan infrastruktur. Field App bersifat offline-first untuk kondisi konektivitas rendah di koridor Garut dan Sumatra Selatan.',
      },
      {
        question: 'Bagaimana modal kerja dilindungi di lapangan?',
        answer:
          'Pendanaan perdagangan dijamin oleh inventaris fisik yang tersimpan di gudang terverifikasi. Pencairan terikat pada peristiwa pengiriman yang terverifikasi, sehingga modal yang disalurkan ke rantai pasok terpencil tetap selaras dengan aset nyata, lengkap dengan jejak audit untuk setiap pelepasan.',
      },
      {
        question: 'Apakah ini sudah berjalan di lapangan?',
        answer:
          'Fase 1 menargetkan jaringan 3.500+ petani kecil dan 2.800 Ha lahan ter-mapping poligon di koridor Garut dan Sumatra Selatan. Koridor percontohan mencakup jalur lengkap dari kebun hingga gudang ekspor: perekaman, verifikasi, agregasi, dan pelaporan.',
      },
    ],
    en: [
      {
        question: 'What is Panora Farm?',
        answer:
          'Panora Farm is a tech-enabled commodity aggregator and supply-chain infrastructure provider. It connects Indonesian smallholder farmers with global B2B buyers — absorbing physical harvests, managing warehouse sorting, and issuing a verified Digital Product Passport for every batch from point zero of production.',
      },
      {
        question: 'What does EUDR compliance actually require?',
        answer:
          'The EU Deforestation Regulation requires evidence that a commodity did not originate from land deforested after December 2020. Panora records GPS polygon coordinates at the point of harvest, timestamped and tamper-evident, then exports an audit-ready due-diligence report from the Enterprise Console.',
      },
      {
        question: 'Does our team need to understand blockchain?',
        answer:
          'No. Field staff sign in with email or Google; enterprise buyers use single sign-on. Nobody sees a wallet address or signs a transaction. The verified record runs under the hood — your team works with reports, batches, and dashboards.',
      },
      {
        question: 'How does Panora fit our existing systems?',
        answer:
          'The Enterprise Console exposes REST APIs and webhooks that integrate with your ERP or procurement stack, so no infrastructure overhaul is required. The Field App is offline-first for low-connectivity conditions across the Garut and South Sumatra corridors.',
      },
      {
        question: 'How is working capital protected in the field?',
        answer:
          'Trade finance is backed by physical inventory held in verified warehouses. Disbursement is tied to verified delivery events, so capital deployed into remote supply chains stays matched to real assets, with a complete audit trail for every release.',
      },
      {
        question: 'Is this operating in the field today?',
        answer:
          'Phase 1 targets a smallholder network of 3,500+ farmers and 2,800 Ha of polygon-mapped land across the Garut and South Sumatra corridors. Pilot corridors cover the full path from farm to export warehouse: capture, verification, aggregation, and reporting.',
      },
    ],
  },
} as const;

export const finalCta = {
  title: {
    id: 'Bangun masa depan perdagangan komoditas yang transparan dan berkelanjutan bersama kami',
    en: 'Build a transparent and sustainable future for commodity trade together',
  },
  description: {
    id: 'Bermitra dengan Panora Farm untuk mengakses komoditas Indonesia terverifikasi, data rantai pasok auditable, dan pembiayaan perdagangan berbasis aset nyata.',
    en: 'Partner with Panora Farm for verified Indonesian commodities, auditable supply chain data, and real-asset-backed trade finance.',
  },
  primaryCta: {
    label: {
      id: 'Jelajahi Digital Marketplace',
      en: 'Explore Digital Marketplace',
    },
    href: site.urls.marketplace,
  },
  secondaryCta: {
    label: {
      id: 'Mulai Kemitraan B2B',
      en: 'Start B2B Partnership',
    },
    href: site.urls.partnership,
  },
} as const;

export const footer = {
  brandDesc: {
    id: 'Infrastruktur agregator komoditas dan rantai pasok transparan berbasis data untuk petani kecil Indonesia.',
    en: 'Tech-enabled commodity aggregation and transparent, data-driven supply chain infrastructure for Indonesian smallholders.',
  },
  columns: {
    id: [
      {
        title: 'Produk',
        links: [
          { label: 'Field App', href: site.urls.field },
          { label: 'Enterprise Console', href: site.urls.console },
          { label: 'Digital Marketplace', href: site.urls.marketplace },
        ],
      },
      {
        title: 'Perusahaan',
        links: [
          { label: 'Tentang Kami', href: '#why' },
          { label: 'PT Jaga Dita Center', href: '#' },
          { label: 'Keberlanjutan & ESG', href: '#advantage' },
        ],
      },
      {
        title: 'Kontak',
        links: [
          { label: 'panorafarm@gmail.com', href: 'mailto:panorafarm@gmail.com' },
          { label: 'panora.farm', href: 'https://panora.farm' },
          { label: site.socialHandle, href: site.urls.twitter },
        ],
      },
    ],
    en: [
      {
        title: 'Products',
        links: [
          { label: 'Field App', href: site.urls.field },
          { label: 'Enterprise Console', href: site.urls.console },
          { label: 'Digital Marketplace', href: site.urls.marketplace },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '#why' },
          { label: 'PT Jaga Dita Center', href: '#' },
          { label: 'Sustainability & ESG', href: '#advantage' },
        ],
      },
      {
        title: 'Contact',
        links: [
          { label: 'panorafarm@gmail.com', href: 'mailto:panorafarm@gmail.com' },
          { label: 'panora.farm', href: 'https://panora.farm' },
          { label: site.socialHandle, href: site.urls.twitter },
        ],
      },
    ],
  },
  copy: {
    id: `© 2026 ${site.name} · ${site.legalEntity} · Hak cipta dilindungi`,
    en: `© 2026 ${site.name} · ${site.legalEntity} · All rights reserved`,
  },
} as const;

export const stubPages = {
  marketplace: {
    eyebrow: { id: 'Digital Marketplace', en: 'Digital Marketplace' },
    title: { id: 'Marketplace', en: 'Marketplace' },
    body: {
      id: 'Panora B2B Commodity Marketplace sedang disiapkan. Pembeli institusional akan segera menyerap kopi, kakao, dan derivatif kelapa Indonesia yang terverifikasi di sini.',
      en: 'The Panora B2B Commodity Marketplace is being prepared. Institutional buyers will soon source verified Indonesian coffee, cocoa, and coconut derivatives here.',
    },
  },
  logistics: {
    eyebrow: { id: 'Logistical Nodes', en: 'Logistical Nodes' },
    title: { id: 'Logistik', en: 'Logistics' },
    body: {
      id: 'Jaringan gudang dan transportasi ber-GPS Panora sedang diperluas di koridor Garut dan Sumatra Selatan.',
      en: "Panora's network of GPS-tracked warehouses and transport is being expanded across the Garut and South Sumatra corridors.",
    },
  },
  console: {
    eyebrow: { id: 'Enterprise Console', en: 'Enterprise Console' },
    title: { id: 'Enterprise Console', en: 'Enterprise Console' },
    body: {
      id: 'Enterprise Console — pemantauan batch real time dan ekspor laporan EUDR — segera hadir untuk mitra pembeli.',
      en: 'The Enterprise Console — real-time batch monitoring and one-click EUDR report export — is coming soon for buyer partners.',
    },
  },
  launchConsole: { id: 'Buka Console', en: 'Launch Console' },
  backHome: { id: 'Kembali ke Beranda', en: 'Back to Home' },
} as const;

export const metadataContent = {
  title: {
    id: 'Panora Farm — Agregator Komoditas & Infrastruktur Rantai Pasok Transparan',
    en: 'Panora Farm — Commodity Aggregator & Transparent Supply Chain Infrastructure',
  },
  description: {
    id: 'Menghubungkan petani kecil Indonesia dengan pembeli B2B global melalui data rantai pasok terverifikasi dan kepatuhan EUDR.',
    en: 'Connecting Indonesian smallholder farmers with global B2B buyers through verified supply chain data and EUDR compliance.',
  },
} as const;
