import { CrisisItem, SolutionItem, RoadmapPhase, ProgressMetric, DialogueCircle, DailyAction, HistoricalHealingCase } from '../types';

export const CRISES_DATA: CrisisItem[] = [
  {
    id: 1,
    title: 'Geopolitical polarization',
    category: 'Geopolitical',
    status: 'US–China rivalry, Russia–Ukraine war, Middle East conflicts, Taiwan & Indo-Pacific tensions',
    trend: 'worsening',
    severity: 'critical',
    description: 'Major power rivalry fracturing international diplomatic channels, with bloc-building and hot proxy conflicts displacing peaceful dispute mechanisms.',
    keyStat: '30+ active wars worldwide',
    worseScenario2050: 'Hot war between nuclear superpowers and collapse of diplomatic multilateralism.'
  },
  {
    id: 2,
    title: 'Economic inequality',
    category: 'Economic',
    status: 'The wealthiest 1% owns ~45% of global wealth; over 700 million survive in extreme poverty',
    trend: 'widening',
    severity: 'critical',
    description: 'Structural capital concentration outpaces wage gains, creating profound domestic precarity and widening North-South developmental gulfs.',
    keyStat: '1% owns 45% of wealth',
    worseScenario2050: 'Severe economic fragmentation into hostile trade blocks, mass strikes, and systemic civil instability.'
  },
  {
    id: 3,
    title: 'Climate emergency',
    category: 'Environmental',
    status: '1.5°C Paris threshold nearly breached; unprecedented extreme weather displacing millions',
    trend: 'accelerating',
    severity: 'critical',
    description: 'Planetary boundaries transgressed in ocean acidification, atmospheric greenhouse gas concentration, and freshwater cycles.',
    keyStat: '424 ppm atmospheric CO2',
    worseScenario2050: '1 billion climate refugees, massive regional droughts, and agricultural breadbasket collapse.'
  },
  {
    id: 4,
    title: 'AI disruption & autonomous weapons',
    category: 'Technological',
    status: 'Mass cognitive labor displacement, algorithmic radicalization, and autonomous weapons race',
    trend: 'accelerating',
    severity: 'critical',
    description: 'Pace of frontier model capability leapfrogs global safety standards and treaty mechanisms, creating destabilizing military asymmetry.',
    keyStat: '0 binding global AI treaties in force',
    worseScenario2050: 'Autonomous conflict loops, catastrophic misaligned actions, and widespread epistemological crisis.'
  },
  {
    id: 5,
    title: 'Pandemic vulnerability',
    category: 'Social',
    status: 'Fragmented global pathogen surveillance, unequal vaccine access, and depleted health buffers',
    trend: 'rising',
    severity: 'high',
    description: 'International health coordination remains chronically underfunded while zoonotic spillover risk multiplies due to habitat destruction.',
    keyStat: 'Weak global health accord adoption',
    worseScenario2050: 'A pathogen outbreak with fatality rates exceeding COVID-19 by 10x paralyzing world transit.'
  },
  {
    id: 6,
    title: 'Migration & displacement crises',
    category: 'Social',
    status: '110+ million people forcibly displaced across continents due to conflict and climate disruption',
    trend: 'worsening',
    severity: 'high',
    description: 'Border communities and transit countries bear disproportionate burdens while legal asylum pathways contract.',
    keyStat: '110M+ forcibly displaced',
    worseScenario2050: 'Refugee flows surging past 500 million, precipitating political breakdown in border states.'
  },
  {
    id: 7,
    title: 'Resource competition',
    category: 'Economic',
    status: 'Escalating disputes over transboundary water basins, rare earth minerals, arable soil, and clean energy inputs',
    trend: 'rising',
    severity: 'high',
    description: 'National export bans and securitization of vital materials trigger zero-sum territorial tensions.',
    keyStat: 'Critical mineral choke points in <3 countries',
    worseScenario2050: 'Water and famine wars in vulnerable river basins across the Sahel, Central Asia, and the Middle East.'
  },
  {
    id: 8,
    title: 'Nuclear proliferation',
    category: 'Geopolitical',
    status: '9 nuclear-armed states with ~12,000 active warheads; non-proliferation treaties expiring without replacement',
    trend: 'rising',
    severity: 'critical',
    description: 'Deterrence doctrines shifting toward battlefield tactical weapons and hypersonic delivery vehicles, reducing response times.',
    keyStat: '12,000 active nuclear warheads',
    worseScenario2050: 'Regional nuclear exchange resulting in over 100 million immediate fatalities and nuclear winter.'
  },
  {
    id: 9,
    title: 'Democratic backsliding & authoritarianism',
    category: 'Social',
    status: 'Authoritarian governance on the rise in 40+ countries; civil liberties and independent judiciaries eroded',
    trend: 'spreading',
    severity: 'high',
    description: 'Populist polarization and rule-of-law dismantling weaken institutional immunity to internal and external corruption.',
    keyStat: '40+ nations backsliding',
    worseScenario2050: 'Collapse of representative oversight, normalized censorship, and criminalization of international civil society.'
  },
  {
    id: 10,
    title: 'Information warfare & reality fracture',
    category: 'Technological',
    status: 'Social media algorithms incentivizing outrage; synthetic media destroying shared empirical consensus',
    trend: 'deepening',
    severity: 'high',
    description: 'Domestic and foreign disinformation operations weaponize historical grievances to erode public trust in science and elections.',
    keyStat: 'Global public trust index at 35%',
    worseScenario2050: 'Total collapse of shared consensus reality, enabling widespread extremist mobilization and chronic institutional paralysis.'
  }
];

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 1,
    number: 1,
    title: 'Great Power Dialogue Council (GCSF)',
    category: 'Political & Diplomatic',
    summary: 'Permanent US–China–EU–Russia–India–Brazil dialogue forum with 30 rotating regional members and binding conflict-prevention protocols.',
    what: 'A formal 30-member global body with balanced regional representation that meets quarterly and convenes immediately during acute flashpoints.',
    why: 'Current international formats either lack binding authority or are crippled by gridlock during existential risks.',
    how: 'Created via UN General Assembly mandate and voluntary charter treaty among participating nuclear and regional powers.',
    when: 'Phase 1 (2025–2027) inaugural summit; full operational treaty by 2028.',
    kpi: '30 nations ratified; zero direct great-power military skirmishes.',
    actors: 'UN Secretariat, G20 leadership, African Union, ASEAN, CELAC.',
    investmentNeeded: '$500M / year for diplomatic operations and early-warning monitoring.',
    tag: 'Diplomacy'
  },
  {
    id: 2,
    number: 2,
    title: 'Global Ceasefire Initiative & Peace Hubs',
    category: 'Political & Diplomatic',
    summary: 'Mandate mediated negotiation within 12 months for active wars and establish 5 permanent neutral peace hubs.',
    what: 'Permanent neutral negotiation compounds located in Switzerland, Singapore, UAE, Costa Rica, and New Zealand equipped for backchannel mediation.',
    why: 'Active wars in Ukraine, Gaza, Sudan, and Myanmar bleed resources and risk spiral escalation into regional or world war.',
    how: 'Co-sponsored diplomatic track backed by regional guarantor states providing security monitoring and humanitarian corridors.',
    when: 'Immediate 1–3 year short-term priority.',
    kpi: '5 major signed ceasefire agreements; 50% drop in civilian casualties by 2028.',
    actors: 'Neutral host nations, UN Special Envoys, respected civil elders, peace NGOs.',
    investmentNeeded: '$2.5B / year for peacekeeping, corridor monitoring, and mediation teams.',
    tag: 'Conflict Resolution'
  },
  {
    id: 3,
    number: 3,
    title: 'Historical Healing & Reconciliation Commission',
    category: 'Political & Diplomatic',
    summary: 'Acknowledge colonial, war, and systemic injustices through victim-led truth commissions and a Shared Future Investment Fund.',
    what: 'A structured 5-step global healing infrastructure: Acknowledge → Listen → Apologize → Repair → Integrate into a shared story.',
    why: 'Historical grievances that remain unhealed are repeatedly weaponized by politicians to fuel new conflicts.',
    how: 'Victim-first national and regional commissions modeled on South Africa, Rwanda, and the Good Friday Agreement, funding community restoration.',
    when: '100 national commissions launched between 2025 and 2030.',
    kpi: '100 national commissions seated; $100B Shared Future Fund pledged by 2035.',
    actors: 'Civil society, historians, indigenous councils, religious elders, national parliaments.',
    investmentNeeded: '$4B / year for community repair projects and truth platforms.',
    tag: 'Historical Justice'
  },
  {
    id: 4,
    number: 4,
    title: 'Positive Competition Charter ("Olympics of Progress")',
    category: 'Political & Diplomatic',
    summary: 'Shift competition from destructive conquest to creative elevation: nations compete on SDG metrics, clean innovation, and wellbeing.',
    what: 'A biennial global summit celebrating and ranking countries on progress in literacy, renewable adoption, poverty alleviation, and happiness.',
    why: 'Competition is innate and healthy when it raises everyone’s game (like sports), but toxic when aimed at eliminating rivals.',
    how: 'Transparent open-source index verified by international scientific academies, awarding prestigious prizes and investment capital.',
    when: 'First biennial Olympics of Progress held in 2028.',
    kpi: '150 nations participating; global trust score lifting from 35% to 55% by 2030.',
    actors: 'World Happiness Report team, UN SDSN, Olympic Committee, academic consortiums.',
    investmentNeeded: '$250M biennial prize and event budget.',
    tag: 'Cultural Shift'
  },
  {
    id: 5,
    number: 5,
    title: 'International AI Safety Agency (IASA)',
    category: 'Technology & AI',
    summary: 'IAEA-style international agency with inspection authority, frontier safety evaluations, and a strict ban on autonomous lethal weapons.',
    what: 'A global oversight body with scientific inspectors, mandatory red-teaming protocols, compute monitoring, and digital safety standards.',
    why: 'Autonomous killer drones and algorithmic arms races create hair-trigger escalation risks without human moral oversight.',
    how: 'Frontier AI developer nations sign a binding treaty restricting compute clusters above designated FLOP thresholds without safety clearance.',
    when: 'Treaty signed by 20 states by 2027; fully operational by 2029.',
    kpi: 'Binding safety standards enforced in all frontier AI labs; complete ban on autonomous lethal weapons by 2030.',
    actors: 'Leading tech nations (US, China, UK, EU, Japan, India), major frontier AI labs, IEEE.',
    investmentNeeded: '$1.5B / year for inspection laboratories, compute audits, and security researchers.',
    tag: 'AI Safety'
  },
  {
    id: 6,
    number: 6,
    title: 'Global Carbon Price with Revenue Redistribution',
    category: 'Climate & Environment',
    summary: 'Universal price on carbon starting at $50/ton in 2027, rising to $150/ton by 2035, with revenues funding adaptation and development.',
    what: 'Border-adjusted carbon fee system redistributing 50% to climate adaptation, 30% to global South development, and 20% to clean tech innovation.',
    why: 'Emissions remain free externalities while vulnerable tropical and coastal nations bear devastating economic losses.',
    how: 'Coordinated tariff and domestic pricing mechanisms harmonized across key trading blocs (EU, US, China, BRICS).',
    when: 'Enacted 2027 across first 50 nations; expanding to 100+ nations by 2030.',
    kpi: 'Over 100 nations participating; global emissions peaking by 2030 and declining sharply.',
    actors: 'Ministries of Finance, IMF, WTO, regional development banks, climate scientists.',
    investmentNeeded: 'Self-financing; generates $2T–$4T annually in cooperative transition revenue.',
    tag: 'Climate Economy'
  },
  {
    id: 7,
    number: 7,
    title: 'Global Peace Dividend (10% Military Redirection)',
    category: 'Economic',
    summary: 'Redirect 10% of annual world military spending ($200 Billion/year) to SDG eradication, climate resilience, and public health.',
    what: 'Treaty-verified mutual defense budget cuts of 2% annually over 5 years, allocating redirected funds to poverty, health, and clean energy.',
    why: 'The world spends $2.4 Trillion annually on war machines while global peace-building and clean water initiatives face chronic deficits.',
    how: 'Bilateral and multilateral verification inspections through satellite and budget transparency, guaranteeing mutual security balance.',
    when: 'Pilot commitments signed 2027; full $200B/year flow achieved by 2032.',
    kpi: '$200B/year redirected; extreme poverty cut by more than half by 2030.',
    actors: 'Top 10 military spenders, SIPRI, UN Development Programme, civil peace coalitions.',
    investmentNeeded: 'Zero new cost: reallocates existing waste and destructive expenditure.',
    tag: 'Peace Economy'
  },
  {
    id: 8,
    number: 8,
    title: 'World Youth Peace Corps',
    category: 'Social & Cultural',
    summary: '10 million young people deployed by 2035 on cross-border civic service for climate restoration, healthcare, and education.',
    what: 'A global service program offering 18–26 year olds fully funded 1-year service tours in cross-border community building and crisis recovery.',
    why: 'When young people work side-by-side with peers from historically rival cultures, propaganda and xenophobia lose their power.',
    how: 'Funded via the Peace Dividend and accredited universally as university service credit and career leadership certification.',
    when: 'Pilot in 50 countries with 100K volunteers in 2026; scaling to 10M by 2035.',
    kpi: '10 million alumni by 2035; over 80% cross-cultural friendship durability across former conflict lines.',
    actors: 'Universities, youth organizations, UNESCO, regional NGOs.',
    investmentNeeded: '$15B / year (funded entirely via a portion of the Peace Dividend).',
    tag: 'Next Generation'
  },
  {
    id: 9,
    number: 9,
    title: 'Global Commons Protection Treaty',
    category: 'Climate & Environment',
    summary: 'Collective planetary governance of oceans, atmosphere, Antarctica, cyberspace, and outer space—never to be weaponized or privatized.',
    what: 'Legal designation of the 5 planetary commons as the shared heritage of all humanity under international stewardship councils.',
    why: 'Scramble for deep-sea mining, lunar resource exploitation, and militarized satellite orbits threatens catastrophic escalation.',
    how: 'Expansion of the Outer Space Treaty and Antarctic Treaty systems into enforceable maritime and orbital stewardship regimes.',
    when: 'Drafting initiated in 2026; comprehensive ratification by 2032.',
    kpi: 'Zero orbital kinetic weapons; 30% of global oceans fully protected from extraction.',
    actors: 'UN Law of the Sea, international maritime organizations, space agencies (NASA, CNSA, ESA, ISRO).',
    investmentNeeded: '$1B / year for joint orbital and maritime environmental monitoring.',
    tag: 'Commons'
  },
  {
    id: 10,
    number: 10,
    title: 'The Decade of Healing & Shared Prosperity (2025–2035)',
    category: 'Social & Cultural',
    summary: 'A globally mobilized 10-year transition framework inviting every city, enterprise, and citizen into measurable transformation.',
    what: 'A shared global banner unifying citizen dialogue circles, civic campaigns, youth corps, and institutional reforms into a single decade of action.',
    why: 'Fragmented single-issue activism lacks the civilizational momentum needed to outpace accelerating existential risks.',
    how: 'Citizen mobilization (#SharedFuture), monthly dialogue circles, open progress dashboards, and public accountability summits.',
    when: 'Official proclamation 2025; culminating in 2035 global progress review.',
    kpi: '1 billion citizens actively reached; 100,000 community dialogue circles operational.',
    actors: 'Civil society coalitions, faith networks, educators, creative influencers, forward-looking cities.',
    investmentNeeded: 'Open-source movement infrastructure powered by grassroots giving and civic partners.',
    tag: 'Civilization'
  }
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'phase-1',
    phaseNumber: 1,
    name: 'AWAKEN',
    years: '2025–2027',
    goal: 'Shift Consciousness & Stop Active Bleeding',
    tagline: 'Stop active wars, seed dialogue circles, and plant the institutional seeds for binding cooperation.',
    progressPercent: 65,
    actions: [
      {
        title: 'Ceasefires in 5 Major Active Conflicts',
        actor: 'UN Special Envoys, neutral hosts (Switzerland, UAE, Singapore)',
        kpi: '5 signed ceasefire frameworks with verified monitors',
        details: 'Establish humanitarian corridors and permanent mediation hubs for Ukraine, Gaza, Sudan, Myanmar, and the Sahel.'
      },
      {
        title: 'Launch Global Council for Shared Future (GCSF)',
        actor: '30 founder nations & regional bodies',
        kpi: 'Inaugural Geneva summit convened; crisis protocols ratified',
        details: 'Establish a rapid-response council with rotating regional seats directly addressing great-power flashpoints.'
      },
      {
        title: 'Global Narrative & Dialogue Campaign',
        actor: 'Civil society, creative ambassadors, educators',
        kpi: '1 Billion people reached; 10,000 dialogue circles formed',
        details: 'Launch the #SharedFuture movement, counter outrage bait with bridge-building, and seed monthly dialogue circles.'
      },
      {
        title: 'International AI Safety Agency (IASA) Treaty',
        actor: 'Top tech nations, major lab consortiums',
        kpi: 'Treaty signed by 20 states; autonomous lethal weapons moratorium',
        details: 'Formulate safety benchmarks, model evaluations, and compute-monitoring accords modeled on nuclear non-proliferation.'
      },
      {
        title: 'World Youth Peace Corps Pilot',
        actor: 'Universities, youth organizations in 50 countries',
        kpi: '100,000 active service volunteers deployed',
        details: 'Cross-border service missions focusing on regional water security, ecological reforestation, and digital literacy.'
      },
      {
        title: 'Historical Healing National Commissions',
        actor: 'Independent civil society councils, historians, reconciliation elders',
        kpi: '100 national truth & healing commission dialogues seated',
        details: 'Provide platforms where victims speak first, historical injustices are recorded, and mutual dignity is rebuilt.'
      }
    ]
  },
  {
    id: 'phase-2',
    phaseNumber: 2,
    name: 'RESTRUCTURE',
    years: '2027–2032',
    goal: 'Rebuild Global Governance & Economic Systems',
    tagline: 'Transform Bretton Woods and UN structures, redirect military spending, and enact planetary pricing.',
    progressPercent: 30,
    actions: [
      {
        title: 'UN Security Council Structural Reform',
        actor: 'UN General Assembly & reform coalition',
        kpi: 'Veto limited on genocide and climate; 6 new permanent regional seats',
        details: 'Expand permanent seats to include Africa, Latin America, and South Asia while ending unilateral veto paralysis.'
      },
      {
        title: 'Global Carbon Price Live',
        actor: '100+ participating nations, WTO, IMF',
        kpi: '$50–$150/ton pricing live across 100 economies; $2T+ redistributed',
        details: 'Enforce border carbon adjustments and funnel half of revenues into clean infrastructure adaptation for the Global South.'
      },
      {
        title: 'Global Peace Dividend Redirected',
        actor: 'Leading defense spenders, SIPRI, development funds',
        kpi: '$200B/year systematically moved from weapons to SDGs',
        details: 'Reallocate 10% of military budgets to clean energy, disease eradication, and youth education pipelines.'
      },
      {
        title: 'IASA Fully Operational with Inspection Mandate',
        actor: 'Global AI Safety inspectors and computational research labs',
        kpi: 'Binding frontier safety audits in effect across all top models',
        details: 'Conduct regular evaluations and ensure strict ban on autonomous weapons deployment.'
      },
      {
        title: 'Universal Digital Rights & AI Dividend Pilots',
        actor: '20 partner states, economic think-tanks',
        kpi: 'UBI-style automation dividend pilots active in 20 economies',
        details: 'Tax automation windfalls to fund local basic dividends, human health, and digital commons protection.'
      },
      {
        title: 'Regional Economic Integration in the Global South',
        actor: 'African Union, ASEAN, Mercosur/CELAC',
        kpi: '3 major unified trading and clean energy microgrids established',
        details: 'Build intra-regional supply chains, common currencies or settlement systems, and joint manufacturing capacity.'
      }
    ]
  },
  {
    id: 'phase-3',
    phaseNumber: 3,
    name: 'FLOURISH',
    years: '2032–2045',
    goal: 'Institutionalize Lasting Peace, Health & Prosperity',
    tagline: 'Eradicate extreme poverty, drop nuclear warheads below 500, and shift to 90% clean energy civilization.',
    progressPercent: 10,
    actions: [
      {
        title: 'World Federation of Nations Inauguration',
        actor: '100+ member states, global civic parliaments',
        kpi: '100+ nations joined under subsidiarity (local sovereignty protected)',
        details: 'A cooperative federation managing global existential risks without bureaucratic interference in domestic culture.'
      },
      {
        title: 'Extreme Poverty Eradication',
        actor: 'Global development alliance, World Bank reformed',
        kpi: 'Extreme poverty rate below 1% globally',
        details: 'Universal clean water, nutrition security, primary healthcare, and electricity access guaranteed worldwide.'
      },
      {
        title: 'Decarbonized Clean Energy Grid',
        actor: 'Energy utilities, national governments, solar/wind/fusion commons',
        kpi: '90% of all global electricity derived from clean energy',
        details: 'Fossil fuel extraction largely decommissioned and replaced by decentralized solar, wind, storage, and advanced clean power.'
      },
      {
        title: 'Deep Nuclear Disarmament Accords',
        actor: 'All 9 nuclear powers, IAEA',
        kpi: 'Total active nuclear stockpile reduced to <500 warheads globally',
        details: 'Coordinated dismantling with verified fissile material down-blending and irreversible silo closures.'
      },
      {
        title: 'Global Universal Literacy & Longevity',
        actor: 'Global health network, open education systems',
        kpi: '99% global literacy; average life expectancy reaching 85+ globally',
        details: 'Eradicate preventable endemic diseases (malaria, tuberculosis) and democratize AI-assisted personalized education.'
      }
    ]
  },
  {
    id: 'phase-4',
    phaseNumber: 4,
    name: 'TRANSCEND',
    years: '2045–2075',
    goal: 'Post-Scarcity & Cooperative Human Destiny',
    tagline: 'Consciousness evolution: empathy as our default operating system, earth healed, and cooperative space exploration.',
    progressPercent: 2,
    actions: [
      {
        title: 'Cooperative Lunar & Martian Commons',
        actor: 'United Earth Space Agency, international science teams',
        kpi: 'Zero national military claims in space; shared planetary research bases',
        details: 'Space exploration pursued as a shared human legacy for knowledge and resource security, not geopolitical conquest.'
      },
      {
        title: 'Post-Scarcity Economics via AI & Clean Energy',
        actor: 'Universal public trusts, open-source automated fabrication',
        kpi: 'Material essentials provided as public utilities; work driven by purpose',
        details: 'Abundant renewable energy and precision automation divorce human survival from exploitative labor.'
      },
      {
        title: 'Consciousness Evolution & Historical Reconciliation',
        actor: 'Humanity across all civilizational heritages',
        kpi: 'War regarded as an obsolete relic like slavery and dueling',
        details: 'Deep cultural integration of "Ubuntu" (I am because we are) and institutionalized positive competition for knowledge and beauty.'
      }
    ]
  }
];

export const PROGRESS_METRICS: ProgressMetric[] = [
  {
    id: 'active-wars',
    name: 'Active Wars & Major Armed Conflicts',
    category: 'Peace & Security',
    current2025: '30+ active wars',
    target2030: '10 conflicts',
    target2040: '0 armed conflicts',
    currentVal: 32,
    target2030Val: 10,
    target2040Val: 0,
    unit: 'conflicts',
    higherIsBetter: false,
    status: 'critical',
    description: 'Tracked armed conflicts with >1,000 annual casualties, monitored by the Uppsala Conflict Data Program and Crisis Group.',
    source: 'UCDP / International Crisis Group'
  },
  {
    id: 'nuclear-warheads',
    name: 'Global Nuclear Warhead Stockpile',
    category: 'Peace & Security',
    current2025: '12,100 warheads',
    target2030: '5,000 warheads',
    target2040: '<500 warheads',
    currentVal: 12100,
    target2030Val: 5000,
    target2040Val: 500,
    unit: 'warheads',
    higherIsBetter: false,
    status: 'critical',
    description: 'Total estimated warheads held by the 9 nuclear-armed states, targeted for verified dismantlement.',
    source: 'SIPRI & Federation of American Scientists'
  },
  {
    id: 'conflict-deaths',
    name: 'Annual Conflict Fatalities',
    category: 'Peace & Security',
    current2025: '230,000 deaths / yr',
    target2030: '50,000 deaths / yr',
    target2040: '<10,000 deaths / yr',
    currentVal: 230000,
    target2030Val: 50000,
    target2040Val: 10000,
    unit: 'deaths/yr',
    higherIsBetter: false,
    status: 'critical',
    description: 'Direct battle deaths and civilian casualties resulting directly from violent political conflicts.',
    source: 'Global Peace Index / PRIO'
  },
  {
    id: 'extreme-poverty',
    name: 'People in Extreme Poverty (<$2.15/day)',
    category: 'Prosperity & Equality',
    current2025: '712 Million',
    target2030: '300 Million',
    target2040: '<50 Million',
    currentVal: 712,
    target2030Val: 300,
    target2040Val: 50,
    unit: 'Million people',
    higherIsBetter: false,
    status: 'needs-work',
    description: 'World Bank benchmark measuring population surviving beneath minimum physiological caloric and shelter limits.',
    source: 'World Bank Poverty & Inequality Platform'
  },
  {
    id: 'wealth-concentration',
    name: 'Wealth Owned by Richest 1%',
    category: 'Prosperity & Equality',
    current2025: '45.6% of global wealth',
    target2030: '35.0%',
    target2040: '<25.0%',
    currentVal: 45.6,
    target2030Val: 35.0,
    target2040Val: 25.0,
    unit: '% of wealth',
    higherIsBetter: false,
    status: 'needs-work',
    description: 'Proportion of global private net assets controlled by the top percentile, targeted for redistribution via global minimum tax.',
    source: 'Credit Suisse / UBS Global Wealth Databook'
  },
  {
    id: 'co2-concentration',
    name: 'Atmospheric CO2 Concentration',
    category: 'Planetary Health',
    current2025: '424 ppm',
    target2030: '430 ppm (peak limit)',
    target2040: '400 ppm (declining)',
    currentVal: 424,
    target2030Val: 430,
    target2040Val: 400,
    unit: 'ppm',
    higherIsBetter: false,
    status: 'critical',
    description: 'Direct planetary measure of greenhouse gas trapping heat at the Mauna Loa Observatory.',
    source: 'NOAA Global Monitoring Laboratory'
  },
  {
    id: 'clean-energy-share',
    name: 'Clean Electricity Share',
    category: 'Planetary Health',
    current2025: '30.2% of global supply',
    target2030: '60.0%',
    target2040: '90.0%',
    currentVal: 30.2,
    target2030Val: 60.0,
    target2040Val: 90.0,
    unit: '% clean energy',
    higherIsBetter: true,
    status: 'on-track',
    description: 'Percentage of world electricity generated from renewables (solar, wind, hydro, geothermal) and zero-carbon sources.',
    source: 'International Energy Agency (IEA)'
  },
  {
    id: 'ai-safety-treaties',
    name: 'Binding Global AI Safety Treaties',
    category: 'Governance & Trust',
    current2025: '0 treaties ratified',
    target2030: '5 binding accords',
    target2040: '20 international protocols',
    currentVal: 0,
    target2030Val: 5,
    target2040Val: 20,
    unit: 'treaties',
    higherIsBetter: true,
    status: 'critical',
    description: 'Multilateral instruments regulating frontier autonomous systems and banning lethal autonomous robotics.',
    source: 'UN Office for Disarmament Affairs'
  },
  {
    id: 'global-trust-index',
    name: 'Global Interpersonal & Institutional Trust',
    category: 'Governance & Trust',
    current2025: '35% public trust',
    target2030: '55% public trust',
    target2040: '75% public trust',
    currentVal: 35,
    target2030Val: 55,
    target2040Val: 75,
    unit: '% trust',
    higherIsBetter: true,
    status: 'needs-work',
    description: 'Percentage of respondents across 50 countries expressing confidence in institutions and cross-cultural neighbors.',
    source: 'Edelman Trust Barometer & World Values Survey'
  },
  {
    id: 'youth-exchange',
    name: 'Youth in Cross-Border Service & Exchange',
    category: 'Governance & Trust',
    current2025: '1.2 Million',
    target2030: '20 Million',
    target2040: '100 Million',
    currentVal: 1.2,
    target2030Val: 20,
    target2040Val: 100,
    unit: 'Million youth',
    higherIsBetter: true,
    status: 'needs-work',
    description: 'Students and young volunteers completing service tours across historically estranged or rival borders.',
    source: 'UNESCO & World Youth Peace Corps'
  }
];

export const INITIAL_CIRCLES: DialogueCircle[] = [
  {
    id: 'circle-1',
    name: 'Nairobi Peace Builders',
    city: 'Nairobi',
    country: 'Kenya',
    region: 'Africa',
    membersCount: 6,
    maxMembers: 8,
    languages: ['English', 'Swahili'],
    meetingTime: '1st Saturday monthly · 10:00 AM EAT',
    topic: 'Historical Healing & Resource Cooperation',
    format: 'in-person',
    contactPerson: 'Amara Okafor',
    description: 'A community circle bringing together regional pastoralists, tech youth, and community elders to discuss shared water stewardship and land healing.',
    coordinates: { lat: -1.2921, lng: 36.8219 }
  },
  {
    id: 'circle-2',
    name: 'Geneva Diplomatic Bridge',
    city: 'Geneva',
    country: 'Switzerland',
    region: 'Europe',
    membersCount: 7,
    maxMembers: 8,
    languages: ['English', 'French'],
    meetingTime: 'Every 2nd Tuesday · 6:30 PM CET',
    topic: 'Great Power Dialogue & Ceasefire Protocols',
    format: 'hybrid',
    contactPerson: 'Jean-Luc Meyer',
    description: 'Convening international civil servants, legal scholars, and citizen advocates to discuss backchannel peace frameworks and UN reform.',
    coordinates: { lat: 46.2044, lng: 6.1432 }
  },
  {
    id: 'circle-3',
    name: 'Singapore Crossroads Dialogue',
    city: 'Singapore',
    country: 'Singapore',
    region: 'East Asia & Oceania',
    membersCount: 8,
    maxMembers: 8,
    languages: ['English', 'Mandarin', 'Malay'],
    meetingTime: '3rd Thursday monthly · 7:30 PM SGT',
    topic: 'US–China Positive Competition & Tech Governance',
    format: 'hybrid',
    contactPerson: 'Lin Wei-Ting',
    description: 'Focused on de-escalating great-power rivalry in the Indo-Pacific through joint scientific initiatives and shared AI safety benchmarks.',
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    id: 'circle-4',
    name: 'São Paulo Eco-Solidarity',
    city: 'São Paulo',
    country: 'Brazil',
    region: 'South America',
    membersCount: 5,
    maxMembers: 8,
    languages: ['Portuguese', 'Spanish', 'English'],
    meetingTime: 'Last Sunday monthly · 4:00 PM BRT',
    topic: 'Amazon Commons Protection & Fair Trade Reset',
    format: 'in-person',
    contactPerson: 'Beatriz Da Silva',
    description: 'Indigenous leaders, urban youth, and economists discussing planetary boundary treaties and sustainable community investments.',
    coordinates: { lat: -23.5505, lng: -46.6333 }
  },
  {
    id: 'circle-5',
    name: 'Global AI Safety Citizen Circle',
    city: 'Virtual / Global',
    country: 'Online',
    region: 'Global',
    membersCount: 8,
    maxMembers: 8,
    languages: ['English'],
    meetingTime: 'Every other Wednesday · 5:00 PM UTC',
    topic: 'Digital Bill of Rights & Autonomous Weapons Moratorium',
    format: 'online',
    contactPerson: 'Dr. Aaron Patel',
    description: 'Software engineers, ethicists, and citizens across 6 continents reviewing safety guidelines and lobbying against autonomous weapons.',
    coordinates: { lat: 51.5074, lng: -0.1278 }
  },
  {
    id: 'circle-6',
    name: 'Mumbai Interfaith Harmony Circle',
    city: 'Mumbai',
    country: 'India',
    region: 'South Asia',
    membersCount: 6,
    maxMembers: 8,
    languages: ['Hindi', 'English', 'Marathi'],
    meetingTime: '2nd Saturday monthly · 11:00 AM IST',
    topic: 'Healing Historical Wounds & Building Civil Trust',
    format: 'in-person',
    contactPerson: 'Pooja Sharma & Tariq Khan',
    description: 'Interfaith dialogue circle breaking polarization through shared neighborhood service and cross-community meals.',
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: 'circle-7',
    name: 'Tokyo-Seoul Youth Bridge',
    city: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    membersCount: 6,
    maxMembers: 8,
    languages: ['Japanese', 'Korean', 'English'],
    meetingTime: '2nd Sunday monthly · 3:00 PM JST',
    topic: 'Generational Reconciliation & East Asian Commons',
    format: 'hybrid',
    contactPerson: 'Kenji Sato',
    description: 'University researchers and artists from Tokyo and Seoul exploring joint textbook projects and cultural exchange.',
    coordinates: { lat: 35.6762, lng: 139.6503 }
  },
  {
    id: 'circle-8',
    name: 'Bogotá Cordillera Peace Council',
    city: 'Bogotá',
    country: 'Colombia',
    region: 'Latin America',
    membersCount: 7,
    maxMembers: 8,
    languages: ['Spanish', 'English'],
    meetingTime: '1st Thursday monthly · 6:00 PM COT',
    topic: 'Restorative Justice & Rural Community Reintegration',
    format: 'in-person',
    contactPerson: 'Valentina Morales',
    description: 'Bringing together former combatants, human rights advocates, and community leaders practicing restorative dialogue.',
    coordinates: { lat: 4.7110, lng: -74.0721 }
  },
  {
    id: 'circle-9',
    name: 'Cairo Nile Basin Dialogue',
    city: 'Cairo',
    country: 'Egypt',
    region: 'North Africa & Middle East',
    membersCount: 6,
    maxMembers: 8,
    languages: ['Arabic', 'English'],
    meetingTime: '3rd Saturday monthly · 4:00 PM EEST',
    topic: 'Transboundary Water Security & Eco-Diplomacy',
    format: 'hybrid',
    contactPerson: 'Dr. Youssef Mansour',
    description: 'Hydrologists, youth activists, and regional thinkers examining cooperative dam management and climate adaptation along the Nile.',
    coordinates: { lat: 30.0444, lng: 31.2357 }
  },
  {
    id: 'circle-10',
    name: 'Vancouver Coast Salish Truth & Future',
    city: 'Vancouver',
    country: 'Canada',
    region: 'North America',
    membersCount: 8,
    maxMembers: 8,
    languages: ['English'],
    meetingTime: '4th Tuesday monthly · 7:00 PM PST',
    topic: 'Indigenous Sovereignty & Ecosystem Co-Management',
    format: 'in-person',
    contactPerson: 'Maya Henderson',
    description: 'Indigenous knowledge-holders and civic urban planners working on salmon run restoration and treaty truth recognition.',
    coordinates: { lat: 49.2827, lng: -123.1207 }
  },
  {
    id: 'circle-11',
    name: 'Berlin Pan-European Healing Circle',
    city: 'Berlin',
    country: 'Germany',
    region: 'Europe',
    membersCount: 7,
    maxMembers: 8,
    languages: ['German', 'English', 'Ukrainian', 'Polish'],
    meetingTime: '1st Wednesday monthly · 7:00 PM CET',
    topic: 'Refugee Welcoming & Post-Conflict European Architecture',
    format: 'in-person',
    contactPerson: 'Hannah Schmidt',
    description: 'Cross-European volunteers, migrants, and community mediators discussing collective trauma healing and inclusive democracy.',
    coordinates: { lat: 52.5200, lng: 13.4050 }
  },
  {
    id: 'circle-12',
    name: 'Sydney Oceanic Climate Circle',
    city: 'Sydney',
    country: 'Australia',
    region: 'Oceania & Pacific',
    membersCount: 6,
    maxMembers: 8,
    languages: ['English'],
    meetingTime: '2nd Monday monthly · 6:30 PM AEST',
    topic: 'Pacific Island Climate Asylum & Maritime Solidarity',
    format: 'hybrid',
    contactPerson: 'Liam O’Connor',
    description: 'Pacific Islander diaspora and Australian climate legal specialists co-designing climate refugee protocols and marine protections.',
    coordinates: { lat: -33.8688, lng: 151.2093 }
  }
];

export const DAILY_ACTIONS: DailyAction[] = [
  {
    id: 'act-1',
    title: 'Reach out to someone with opposing views',
    category: 'connection',
    durationMinutes: 10,
    points: 25,
    description: 'Send a respectful message to someone whose political or cultural views differ from yours. Ask one genuine question about their lived experience and listen without debating.',
    suggestedPrompt: '"Hey, I’ve been thinking about our different perspectives on [topic]. Could you help me understand how you came to see it that way? I want to listen."'
  },
  {
    id: 'act-2',
    title: 'Practice the 5-Minute Forgiveness Ritual',
    category: 'healing',
    durationMinutes: 5,
    points: 15,
    description: 'Spend 5 uninterrupted minutes reflecting on a person or past grievance that created bitterness. Acknowledge the pain without justifying revenge, mentally releasing the demand for punishment.',
    suggestedPrompt: '"Holding onto bitterness harms my own future. Today I choose dignity over retaliation."'
  },
  {
    id: 'act-3',
    title: 'Fact-check and refuse outrage bait',
    category: 'digital',
    durationMinutes: 5,
    points: 20,
    description: 'Before sharing or reacting to polarizing social media news today, inspect the primary source. Refuse to amplify posts crafted specifically to incite collective anger.',
    suggestedPrompt: 'Does this headline inform my understanding, or does it seek to make me hate my neighbor?'
  },
  {
    id: 'act-4',
    title: 'Advocate for peace to one representative',
    category: 'advocacy',
    durationMinutes: 15,
    points: 30,
    description: 'Send a concise email or letter to an elected official asking them to prioritize diplomatic ceasefire mediation, international AI safety standards, or climate funding over military escalation.',
    suggestedPrompt: '"As your constituent, I urge you to support diplomatic mediation, multilateral AI safeguards, and humanitarian investments in peace."'
  },
  {
    id: 'act-5',
    title: 'Support a peace-building organization',
    category: 'service',
    durationMinutes: 10,
    points: 25,
    description: 'Learn about or make a small donation ($5 or equivalent) to organizations doing front-line mediation work like International Crisis Group, Interpeace, or Search for Common Ground.',
    suggestedPrompt: 'Invest in stability and de-escalation today.'
  },
  {
    id: 'act-6',
    title: 'Teach empathy or history to a child',
    category: 'learning',
    durationMinutes: 20,
    points: 25,
    description: 'Share a story with a young person illustrating that people with different backgrounds share identical human feelings, or discuss how past conflicts were resolved through cooperation.',
    suggestedPrompt: '"Ubuntu: I am because we are. We succeed when our community thrives together."'
  },
  {
    id: 'act-7',
    title: 'Make one ethical & fair-trade choice',
    category: 'physical',
    durationMinutes: 10,
    points: 15,
    description: 'Choose a sustainable, local, or fair-trade product today to support transparent supply chains that respect worker dignity and environmental stewardship.',
    suggestedPrompt: 'Vote with your daily economic decisions for shared prosperity.'
  }
];

export const HISTORICAL_HEALING_CASES: HistoricalHealingCase[] = [
  {
    id: 'south-africa',
    country: 'South Africa',
    title: 'Truth and Reconciliation Commission (TRC)',
    period: '1995–2002',
    conflict: 'Apartheid racial segregation and state violence',
    mechanism: 'Public hearings presided over by Archbishop Desmond Tutu where victims testified publicly and perpetrators disclosed crimes for amnesty consideration.',
    outcomes: [
      'Over 21,000 victim testimonies documented the institutional reality of apartheid.',
      'Prevented widespread retaliatory civil war during transition to democracy.',
      'Institutionalized truth-telling as a bedrock of constitutional equality.'
    ],
    keyLesson: 'Truth without humiliation: you cannot build a shared democratic future if the past is denied.'
  },
  {
    id: 'rwanda',
    country: 'Rwanda',
    title: 'Gacaca Community Courts & National Unity',
    period: '2001–2012',
    conflict: '1994 Genocide against the Tutsi (800,000 killed in 100 days)',
    mechanism: 'Traditional village-level courts where neighbors faced neighbors, confessions were heard, restitution was agreed, and perpetrators worked alongside survivors on community infrastructure.',
    outcomes: [
      'Over 1.9 million cases adjudicated with community participation.',
      'Restored social fabric and communal trust in hundreds of rural villages.',
      'Rwanda emerged as one of the safest and most unified societies in the region.'
    ],
    keyLesson: 'Healing through shared projects: when adversaries build homes and plant crops together, the identity of "enemy" transforms into "partner".'
  },
  {
    id: 'northern-ireland',
    country: 'Northern Ireland & United Kingdom',
    title: 'The Good Friday Agreement',
    period: '1998–Present',
    conflict: 'The Troubles (30 years of sectarian paramilitary violence)',
    mechanism: 'Cross-community power-sharing, release of political prisoners, decommission of weapons, police reform, and dual-identity recognition (allowing citizens to be British, Irish, or both).',
    outcomes: [
      'Ended three decades of daily bombings and shootings.',
      'Dismantled militarized internal borders across Ireland.',
      'Created lasting joint cross-border councils and institutional cooperation.'
    ],
    keyLesson: 'Layered identity: people do not have to abandon their cultural affinity when political structures allow co-existence and shared power.'
  },
  {
    id: 'germany',
    country: 'Germany',
    title: 'Vergangenheitsbewältigung (Overcoming the Past)',
    period: '1945–Present',
    conflict: 'Holocaust and Nazi aggression in World War II',
    mechanism: 'Compulsory school curriculum on state crimes, public memorials (Stolpersteine), institutional apologies, state reparations to survivors and Israel, and strict anti-extremism laws.',
    outcomes: [
      'Germany became a foundational pillar of European democratic integration and peace.',
      'Total societal consensus rejecting historical whitewashing or revanchism.',
      'Model of institutional contrition enabling deep reconciliation with former adversaries.'
    ],
    keyLesson: 'Acknowledge without defense: genuine contrition from state institutions transforms international pariah status into respected leadership.'
  }
];
