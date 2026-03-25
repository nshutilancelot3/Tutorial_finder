/* ═══════════════════════════════════════════════════════════════
   TUTO ARCHIVE — ALU Course Database
   3 programs × 4 years × 8 courses each
   No course codes — just names, icons, colors, and YouTube topics
═══════════════════════════════════════════════════════════════ */

const ALU_PROGRAMS = {
  SE:  { label: 'Software Engineering',          icon: '💻', color: '#6366f1' },
  IBT: { label: 'International Business & Trade', icon: '🌍', color: '#f59e0b' },
  EL:  { label: 'Entrepreneurial Leadership',     icon: '🚀', color: '#10b981' },
};

/* ─── SOFTWARE ENGINEERING ──────────────────────────────────── */
const SE = {
  1: [
    { id:'se_101', name:'Introduction to Programming',     icon:'💻', color:'#3b82f6', topics:['Python programming for beginners','variables loops functions Python'] },
    { id:'se_102', name:'Discrete Mathematics',            icon:'🔢', color:'#8b5cf6', topics:['discrete mathematics computer science','logic sets functions discrete math'] },
    { id:'se_103', name:'Computer Systems & Architecture', icon:'🖥️', color:'#f59e0b', topics:['computer architecture basics','how computers work CPU memory'] },
    { id:'se_104', name:'Communication & Leadership',      icon:'🗣️', color:'#10b981', topics:['technical communication skills','leadership skills engineers'] },
    { id:'se_105', name:'Data Structures',                 icon:'🗂️', color:'#ef4444', topics:['data structures tutorial','arrays linked lists stacks queues'] },
    { id:'se_106', name:'Web Fundamentals',                icon:'🌐', color:'#06b6d4', topics:['HTML CSS JavaScript tutorial','web development beginners'] },
    { id:'se_107', name:'Calculus for Computing',          icon:'📐', color:'#f97316', topics:['calculus for computer science','limits derivatives integrals tutorial'] },
    { id:'se_108', name:'Linux & Command Line',            icon:'🐧', color:'#64748b', topics:['Linux command line tutorial','bash scripting beginners'] },
  ],
  2: [
    { id:'se_201', name:'Algorithms & Complexity',         icon:'⚙️', color:'#3b82f6', topics:['algorithms tutorial','sorting searching algorithms big O notation'] },
    { id:'se_202', name:'Database Systems',                icon:'🗄️', color:'#8b5cf6', topics:['SQL database tutorial','relational database design normalization'] },
    { id:'se_203', name:'Object-Oriented Programming',     icon:'🧱', color:'#f59e0b', topics:['object oriented programming tutorial','OOP concepts classes objects'] },
    { id:'se_204', name:'Probability & Statistics',        icon:'📊', color:'#10b981', topics:['probability statistics computer science','statistics tutorial beginner'] },
    { id:'se_205', name:'Operating Systems',               icon:'🖥️', color:'#ef4444', topics:['operating systems tutorial','processes threads memory management'] },
    { id:'se_206', name:'Full Stack Web Development',      icon:'🌐', color:'#06b6d4', topics:['full stack web development tutorial','React Node.js Express MERN stack'] },
    { id:'se_207', name:'Computer Networks',               icon:'🔗', color:'#f97316', topics:['computer networks tutorial','TCP IP networking basics'] },
    { id:'se_208', name:'Software Engineering Principles', icon:'📋', color:'#64748b', topics:['software engineering principles','SDLC agile scrum tutorial'] },
  ],
  3: [
    { id:'se_301', name:'Artificial Intelligence',         icon:'🤖', color:'#3b82f6', topics:['artificial intelligence tutorial beginner','machine learning crash course'] },
    { id:'se_302', name:'Mobile App Development',          icon:'📱', color:'#8b5cf6', topics:['Flutter mobile app tutorial','React Native beginner tutorial'] },
    { id:'se_303', name:'Cloud Computing',                 icon:'☁️', color:'#f59e0b', topics:['AWS cloud computing tutorial','cloud computing basics DevOps'] },
    { id:'se_304', name:'Cybersecurity Fundamentals',      icon:'🔐', color:'#10b981', topics:['cybersecurity fundamentals tutorial','ethical hacking beginners'] },
    { id:'se_305', name:'Machine Learning',                icon:'🧠', color:'#ef4444', topics:['machine learning tutorial Python','scikit-learn neural networks beginner'] },
    { id:'se_306', name:'Distributed Systems',             icon:'🕸️', color:'#06b6d4', topics:['distributed systems tutorial','microservices Docker Kubernetes'] },
    { id:'se_307', name:'Human-Computer Interaction',      icon:'🖱️', color:'#f97316', topics:['UX UI design tutorial','Figma design tutorial beginner'] },
    { id:'se_308', name:'Entrepreneurship & Innovation',   icon:'💡', color:'#64748b', topics:['tech entrepreneurship tutorial','lean startup methodology'] },
  ],
  4: [
    { id:'se_401', name:'Advanced Algorithms',             icon:'⚡', color:'#3b82f6', topics:['advanced algorithms dynamic programming tutorial','graph algorithms explained'] },
    { id:'se_402', name:'Blockchain & Web3',               icon:'⛓️', color:'#8b5cf6', topics:['blockchain development tutorial','Solidity smart contracts beginner'] },
    { id:'se_403', name:'Data Engineering',                icon:'🔧', color:'#f59e0b', topics:['data engineering tutorial','ETL pipelines Python Apache Spark'] },
    { id:'se_404', name:'System Design',                   icon:'🏗️', color:'#10b981', topics:['system design tutorial','scalable system design interview'] },
    { id:'se_405', name:'DevOps & CI/CD',                  icon:'🔄', color:'#ef4444', topics:['DevOps tutorial beginner','CI CD pipeline GitHub Actions Docker'] },
    { id:'se_406', name:'Research Methods',                icon:'🔬', color:'#06b6d4', topics:['research methods computer science','how to write a research paper'] },
    { id:'se_407', name:'Professional Ethics in Tech',     icon:'⚖️', color:'#f97316', topics:['tech ethics tutorial','AI ethics responsible technology'] },
    { id:'se_408', name:'Capstone Project',                icon:'🎓', color:'#64748b', topics:['software capstone project tutorial','full stack project build'] },
  ],
};

/* ─── INTERNATIONAL BUSINESS & TRADE ───────────────────────── */
const IBT = {
  1: [
    { id:'ibt_101', name:'Introduction to Business',       icon:'💼', color:'#3b82f6', topics:['introduction to business tutorial','business fundamentals beginners'] },
    { id:'ibt_102', name:'Principles of Economics',        icon:'📈', color:'#f59e0b', topics:['principles of economics tutorial','microeconomics macroeconomics basics'] },
    { id:'ibt_103', name:'Business Mathematics',           icon:'📐', color:'#8b5cf6', topics:['business mathematics tutorial','financial calculations percentages'] },
    { id:'ibt_104', name:'Communication & Leadership',     icon:'🗣️', color:'#10b981', topics:['business communication skills','professional communication leadership'] },
    { id:'ibt_105', name:'Financial Accounting',           icon:'💰', color:'#ef4444', topics:['financial accounting tutorial','accounting basics debit credit bookkeeping'] },
    { id:'ibt_106', name:'Principles of Marketing',        icon:'📣', color:'#06b6d4', topics:['principles of marketing tutorial','4Ps marketing mix strategy'] },
    { id:'ibt_107', name:'Introduction to Trade',          icon:'🌍', color:'#f97316', topics:['international trade tutorial','import export basics global trade'] },
    { id:'ibt_108', name:'Critical Thinking & Ethics',     icon:'🧠', color:'#64748b', topics:['critical thinking tutorial','business ethics ethical decision making'] },
  ],
  2: [
    { id:'ibt_201', name:'Macroeconomics',                 icon:'🌍', color:'#3b82f6', topics:['macroeconomics tutorial','GDP inflation unemployment monetary policy'] },
    { id:'ibt_202', name:'International Trade Law',        icon:'⚖️', color:'#8b5cf6', topics:['international trade law tutorial','WTO rules import export regulations'] },
    { id:'ibt_203', name:'Global Supply Chain',            icon:'🔗', color:'#f59e0b', topics:['supply chain management tutorial','global logistics explained'] },
    { id:'ibt_204', name:'Cross-Cultural Management',      icon:'🤝', color:'#10b981', topics:['cross cultural management tutorial','intercultural business communication'] },
    { id:'ibt_205', name:'Corporate Finance',              icon:'🏦', color:'#ef4444', topics:['corporate finance tutorial','financial management valuation investment'] },
    { id:'ibt_206', name:'Digital Marketing',              icon:'📱', color:'#06b6d4', topics:['digital marketing tutorial','social media marketing SEO Google Ads'] },
    { id:'ibt_207', name:'Trade Finance',                  icon:'💱', color:'#f97316', topics:['trade finance tutorial','letters of credit export import financing'] },
    { id:'ibt_208', name:'Research Methods in Business',   icon:'🔬', color:'#64748b', topics:['business research methods tutorial','market research qualitative quantitative'] },
  ],
  3: [
    { id:'ibt_301', name:'International Strategy',         icon:'♟️', color:'#3b82f6', topics:['international business strategy tutorial','global competitive strategy market entry'] },
    { id:'ibt_302', name:'African Trade & Development',    icon:'🌍', color:'#8b5cf6', topics:['African trade development tutorial','doing business in Africa economic growth'] },
    { id:'ibt_303', name:'Foreign Exchange & Risk',        icon:'💹', color:'#f59e0b', topics:['foreign exchange tutorial','currency risk management forex basics'] },
    { id:'ibt_304', name:'Trade Policy & Geopolitics',     icon:'🏛️', color:'#10b981', topics:['trade policy tutorial','geopolitics international trade tariffs'] },
    { id:'ibt_305', name:'Sustainable Business',           icon:'♻️', color:'#ef4444', topics:['sustainable business practices','ESG investing green business strategy'] },
    { id:'ibt_306', name:'E-Commerce & Digital Trade',     icon:'🛒', color:'#06b6d4', topics:['ecommerce tutorial','digital trade platforms Shopify Amazon FBA'] },
    { id:'ibt_307', name:'Negotiation & Conflict',         icon:'🤜', color:'#f97316', topics:['negotiation skills tutorial','conflict resolution business win-win'] },
    { id:'ibt_308', name:'Entrepreneurship',               icon:'🚀', color:'#64748b', topics:['entrepreneurship tutorial','business plan writing startup funding Africa'] },
  ],
  4: [
    { id:'ibt_401', name:'Global Leadership',              icon:'🌐', color:'#3b82f6', topics:['global leadership tutorial','international management skills cultures'] },
    { id:'ibt_402', name:'Mergers & Acquisitions',         icon:'🏢', color:'#8b5cf6', topics:['mergers acquisitions tutorial','M&A deal process corporate restructuring'] },
    { id:'ibt_403', name:'Trade Blocs & Agreements',       icon:'📜', color:'#f59e0b', topics:['trade blocs AfCFTA NAFTA EU explained','free trade agreements regional integration'] },
    { id:'ibt_404', name:'Business Intelligence',          icon:'📊', color:'#10b981', topics:['business intelligence tutorial','Power BI Tableau data analytics business'] },
    { id:'ibt_405', name:'Export Management',              icon:'📦', color:'#ef4444', topics:['export management tutorial','how to export products international shipping'] },
    { id:'ibt_406', name:'Social Enterprise',              icon:'🤝', color:'#06b6d4', topics:['social enterprise tutorial','impact investing social business Africa'] },
    { id:'ibt_407', name:'Corporate Governance',           icon:'⚖️', color:'#f97316', topics:['corporate governance tutorial','board of directors governance Africa'] },
    { id:'ibt_408', name:'Capstone Project',               icon:'🎓', color:'#64748b', topics:['business capstone project','international business case study presentation'] },
  ],
};

/* ─── ENTREPRENEURIAL LEADERSHIP ────────────────────────────── */
const EL = {
  1: [
    { id:'el_101', name:'Foundations of Entrepreneurship', icon:'🚀', color:'#3b82f6', topics:['entrepreneurship foundations tutorial','what is entrepreneurship startup basics'] },
    { id:'el_102', name:'Leadership & Self Development',   icon:'🌟', color:'#f59e0b', topics:['leadership development tutorial','self development personal growth emotional intelligence'] },
    { id:'el_103', name:'Communication & Storytelling',    icon:'🗣️', color:'#8b5cf6', topics:['communication skills tutorial','storytelling for business public speaking'] },
    { id:'el_104', name:'Critical Thinking & Creativity',  icon:'🧠', color:'#10b981', topics:['critical thinking tutorial','creative thinking design thinking explained'] },
    { id:'el_105', name:'Financial Literacy',              icon:'💰', color:'#ef4444', topics:['financial literacy tutorial','personal finance basics money management'] },
    { id:'el_106', name:'Introduction to Business',        icon:'💼', color:'#06b6d4', topics:['introduction to business tutorial','business model canvas explained'] },
    { id:'el_107', name:'Innovation & Design Thinking',    icon:'💡', color:'#f97316', topics:['design thinking tutorial','innovation process how to innovate products'] },
    { id:'el_108', name:'African History & Context',       icon:'🌍', color:'#64748b', topics:['entrepreneurship in Africa','African economic development history'] },
  ],
  2: [
    { id:'el_201', name:'Venture Creation',                icon:'🏗️', color:'#3b82f6', topics:['venture creation tutorial','how to start a startup business idea validation'] },
    { id:'el_202', name:'Marketing & Customer Discovery',  icon:'📣', color:'#8b5cf6', topics:['customer discovery tutorial','marketing for startups target market'] },
    { id:'el_203', name:'Team Building & Management',      icon:'👥', color:'#f59e0b', topics:['team building tutorial','managing a startup team leadership small business'] },
    { id:'el_204', name:'Business Finance',                icon:'🏦', color:'#10b981', topics:['business finance tutorial','startup funding options financial modelling'] },
    { id:'el_205', name:'Digital Skills for Entrepreneurs',icon:'💻', color:'#ef4444', topics:['digital skills entrepreneurs tutorial','tools for startups Notion productivity'] },
    { id:'el_206', name:'Social Impact & Ethics',          icon:'⚖️', color:'#06b6d4', topics:['social impact business tutorial','ethical entrepreneurship B Corp'] },
    { id:'el_207', name:'Product Development',             icon:'🔧', color:'#f97316', topics:['product development tutorial','MVP minimum viable product lean startup'] },
    { id:'el_208', name:'Research Methods',                icon:'🔬', color:'#64748b', topics:['research methods business','market research tutorial qualitative quantitative'] },
  ],
  3: [
    { id:'el_301', name:'Scaling a Business',              icon:'📈', color:'#3b82f6', topics:['scaling a business tutorial','how to grow a startup business growth strategies'] },
    { id:'el_302', name:'Fundraising & Investment',        icon:'💸', color:'#8b5cf6', topics:['startup fundraising tutorial','venture capital how to pitch investors'] },
    { id:'el_303', name:'Strategic Leadership',            icon:'♟️', color:'#f59e0b', topics:['strategic leadership tutorial','vision mission strategy leading with purpose'] },
    { id:'el_304', name:'Operations & Systems',            icon:'⚙️', color:'#10b981', topics:['business operations tutorial','systems thinking process management startups'] },
    { id:'el_305', name:'Brand Building',                  icon:'🎨', color:'#ef4444', topics:['brand building tutorial','how to build a brand brand identity design'] },
    { id:'el_306', name:'Negotiation & Influence',         icon:'🤝', color:'#06b6d4', topics:['negotiation skills tutorial','influence persuasion win win techniques'] },
    { id:'el_307', name:'Technology for Entrepreneurs',    icon:'🤖', color:'#f97316', topics:['technology for entrepreneurs tutorial','AI tools for business no code tools'] },
    { id:'el_308', name:'Global Entrepreneurship',         icon:'🌍', color:'#64748b', topics:['global entrepreneurship tutorial','African startups global market expansion'] },
  ],
  4: [
    { id:'el_401', name:'Executive Leadership',            icon:'🌟', color:'#3b82f6', topics:['executive leadership tutorial','CEO skills development transformational leadership'] },
    { id:'el_402', name:'Mergers, Exits & Acquisitions',   icon:'🏢', color:'#8b5cf6', topics:['startup exit strategy tutorial','mergers acquisitions how to sell a business'] },
    { id:'el_403', name:'Policy & Governance',             icon:'🏛️', color:'#f59e0b', topics:['business policy governance tutorial','regulatory environment Africa government relations'] },
    { id:'el_404', name:'Sustainable Entrepreneurship',    icon:'♻️', color:'#10b981', topics:['sustainable entrepreneurship tutorial','green business ideas Africa climate'] },
    { id:'el_405', name:'Data-Driven Decision Making',     icon:'📊', color:'#ef4444', topics:['data driven decision making tutorial','business analytics data for entrepreneurs'] },
    { id:'el_406', name:'Social Enterprise Leadership',    icon:'🤝', color:'#06b6d4', topics:['social enterprise leadership tutorial','NGO management impact measurement'] },
    { id:'el_407', name:'Personal Branding & Legacy',      icon:'✨', color:'#f97316', topics:['personal branding tutorial','thought leadership LinkedIn personal brand'] },
    { id:'el_408', name:'Capstone Project',                icon:'🎓', color:'#64748b', topics:['business capstone project startup pitch deck','entrepreneurship final project'] },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
const COURSE_MAP = { SE, IBT, EL };

function getCourses(program, year) {
  return COURSE_MAP[program]?.[year] || [];
}
