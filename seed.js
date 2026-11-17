// Fictitious test data (dates around 12 Nov 2026). Used for local tests and to seed the published app.
var SEED = (function () {
  var jobs = [
    { jobId: 'JOB-2026-142', salesPfi: 'PFI-2611-0142', pfiDate: '2026-11-01', client: 'Client A', country: 'GA', destPort: 'Owendo', incoterm: 'CFR', units: 4, saleCcy: 'USD', saleAmount: 300000, saleRate: 1, supplier: 'Supplier X', etd: '2026-11-18', eta: '2026-12-10', status: 'Open' },
    { jobId: 'JOB-2026-131', salesPfi: 'PFI-2610-0131', pfiDate: '2026-10-14', client: 'Client B', country: 'CI', destPort: 'Abidjan', incoterm: 'CFR', units: 6, saleCcy: 'USD', saleAmount: 642000, saleRate: 1, supplier: 'Supplier Y', etd: '2026-11-25', eta: '2026-12-18', status: 'Open' },
    { jobId: 'JOB-2026-127', salesPfi: 'PFI-2610-0127', pfiDate: '2026-10-08', client: 'Client C', country: 'CM', destPort: 'Douala', incoterm: 'CFR', units: 2, saleCcy: 'USD', saleAmount: 150000, saleRate: 1, supplier: 'Supplier Z', etd: '2026-12-02', eta: '2026-12-28', status: 'Open' },
    { jobId: 'JOB-2026-118', salesPfi: 'PFI-2609-0118', pfiDate: '2026-09-20', client: 'Client D', country: 'SN', destPort: 'Dakar', incoterm: 'CFR', units: 3, saleCcy: 'USD', saleAmount: 200000, saleRate: 1, supplier: 'Supplier X', etd: '2026-10-30', eta: '2026-11-21', status: 'Open' },
    { jobId: 'JOB-2026-109', salesPfi: 'PFI-2609-0109', pfiDate: '2026-09-05', client: 'Client A', country: 'GA', destPort: 'Owendo', incoterm: 'CFR', units: 2, saleCcy: 'USD', saleAmount: 140000, saleRate: 1, supplier: 'Supplier Y', etd: '2026-10-05', eta: '2026-11-02', status: 'Open' }];
  var L = function (arr) { return arr.map(function (a) { return { model: a[0], qty: a[1], unitPrice: a[2] }; }); };
  var JL = { 'JOB-2026-142': [['GAC GS8 2026', 2, 80000], ['Toyota Hilux 2026', 2, 70000]], 'JOB-2026-131': [['Toyota Land Cruiser 300', 3, 140000], ['Toyota Hilux 2026', 3, 74000]],
    'JOB-2026-127': [['Jetour X70 Plus', 2, 75000]], 'JOB-2026-118': [['GAC GS3', 1, 50000], ['GAC GS8 2026', 2, 75000]], 'JOB-2026-109': [['Toyota Hilux 2026', 2, 70000]] };
  jobs.forEach(function (j) { j.id = j.jobId; j.createdOn = j.pfiDate; j.lines = L(JL[j.jobId]); });
  var c = function (id, jobId, category, counterparty, reference, amount, dueDate) { return { id: id, jobId: jobId, category: category, counterparty: counterparty, reference: reference, ccy: 'USD', amount: amount, rate: 1, dueDate: dueDate || '' }; };
  var commitments = [
    c('ENG-001', 'JOB-2026-142', 'Supplier', 'Supplier X', 'X-551', 220000), c('ENG-002', 'JOB-2026-131', 'Supplier', 'Supplier Y', 'Q-88213', 412000),
    c('ENG-003', 'JOB-2026-131', 'Freight', 'Carrier M', 'INV-7731', 24600, '2026-11-20'), c('ENG-004', 'JOB-2026-127', 'Supplier', 'Supplier Z', 'Z-3307', 110000),
    c('ENG-005', 'JOB-2026-118', 'Supplier', 'Supplier X', 'X-512', 160000), c('ENG-006', 'JOB-2026-118', 'Freight', 'Carrier M', 'INV-7650', 9000),
    c('ENG-007', 'JOB-2026-109', 'Supplier', 'Supplier Y', 'Q-87120', 105000), c('ENG-008', 'JOB-2026-109', 'Freight', 'Carrier N', 'FN-2210', 7700)];
  var CL = { 'ENG-001': [['GAC GS8', 2, 58000], ['Toyota Hilux', 2, 52000]], 'ENG-002': [['Toyota Land Cruiser 300', 3, 92000], ['Toyota Hilux', 3, 45000]],
    'ENG-004': [['Jetour X70 Plus', 2, 55000]], 'ENG-005': [['GAC GS3', 1, 38000], ['GAC GS8', 2, 61000]], 'ENG-007': [['Toyota Hilux', 2, 52500]] };
  commitments.forEach(function (c) { if (CL[c.id]) c.lines = CL[c.id].map(function (a) { return { model: a[0], qty: a[1], unitCost: a[2] }; }); });
  var t = function (id, jobId, dir, category, nature, mode, date, ccy, amount, rate) { return { id: id, jobId: jobId, dir: dir, category: category, nature: nature, mode: mode, date: date, ccy: ccy, amount: amount, rate: rate, enteredOn: date }; };
  var transactions = [
    t('TX-001', 'JOB-2026-142', 'IN', 'Client', 'Advance', 'Bank', '2026-11-02', 'USD', 180000, 1), t('TX-002', 'JOB-2026-142', 'OUT', 'Supplier', 'Payment', 'Bank', '2026-11-04', 'USD', 220000, 1),
    t('TX-003', 'JOB-2026-131', 'IN', 'Client', 'Advance', 'Bank', '2026-10-20', 'USD', 192600, 1), t('TX-004', 'JOB-2026-131', 'IN', 'Client', 'Balance', 'Bank', '2026-11-10', 'USD', 449400, 1),
    t('TX-005', 'JOB-2026-131', 'OUT', 'Supplier', 'Deposit', 'Bank', '2026-10-22', 'CNY', 790000, 7.12), t('TX-006', 'JOB-2026-131', 'OUT', 'Supplier', 'Deposit', 'Cash', '2026-10-23', 'AED', 50000, 3.6725),
    t('TX-007', 'JOB-2026-127', 'IN', 'Client', 'Advance', 'Bank', '2026-10-15', 'USD', 45000, 1), t('TX-008', 'JOB-2026-127', 'OUT', 'Supplier', 'Deposit', 'Bank', '2026-10-17', 'USD', 33000, 1),
    t('TX-009', 'JOB-2026-118', 'IN', 'Client', 'Payment', 'Bank', '2026-10-10', 'USD', 200000, 1), t('TX-010', 'JOB-2026-118', 'OUT', 'Supplier', 'Payment', 'Bank', '2026-10-12', 'USD', 160000, 1),
    t('TX-011', 'JOB-2026-118', 'OUT', 'Freight', 'Payment', 'Bank', '2026-10-25', 'USD', 9000, 1), t('TX-012', 'JOB-2026-109', 'IN', 'Client', 'Payment', 'Bank', '2026-09-20', 'USD', 140000, 1),
    t('TX-013', 'JOB-2026-109', 'OUT', 'Supplier', 'Payment', 'Bank', '2026-09-22', 'USD', 105000, 1), t('TX-014', 'JOB-2026-109', 'OUT', 'Freight', 'Payment', 'Bank', '2026-10-01', 'USD', 7700, 1)];
  var multi = t('TX-015', '', 'IN', 'Client', 'Balance', 'Bank', '2026-11-12', 'USD', 130000, 1);
  multi.counterparty = 'Client A'; multi.reference = 'FT26316XYZ'; multi.notes = 'Balance PFI-2611-0142 + advance on next order';
  multi.allocations = [{ jobId: 'JOB-2026-142', amount: 120000 }];
  transactions.push(multi);
  transactions.forEach(function (x) { if (!x.counterparty) { var j = jobs.filter(function (jj) { return jj.jobId === x.jobId; })[0]; x.counterparty = x.dir === 'IN' ? (j && j.client) : (x.category === 'Supplier' ? (j && j.supplier) : 'Carrier'); } });
  var types = ['Supplier PFI', 'Sales invoice', 'Freight invoice', 'BL', 'BIETC', 'Inspection'];
  var state = { 'JOB-2026-142': 'RRXXXR', 'JOB-2026-131': 'RRRXXR', 'JOB-2026-127': 'RXXXXX', 'JOB-2026-118': 'RRRRRR', 'JOB-2026-109': 'RRRRRR' };
  var documents = [], n = 1;
  Object.keys(state).forEach(function (j) {
    types.forEach(function (ty, i) {
      var rec = state[j][i] === 'R';
      var notSent = (j === 'JOB-2026-118' && ty === 'BL') || (j === 'JOB-2026-131' && ty === 'Inspection');
      documents.push({ id: 'DOC-' + ('00' + n++).slice(-3), jobId: j, type: ty, status: rec ? 'Received' : 'Expected', receivedOn: rec ? '2026-11-05' : '', sentToClient: rec && !notSent, sentOn: rec && !notSent ? '2026-11-06' : '', order: i + 1 });
    });
  });
  var quotes = [{ id: 'QUO-001', date: '2026-11-08', supplier: 'Supplier Y', reference: 'Q-90122', description: '8 SUVs, model year 2026', ccy: 'USD', amount: 296000, rate: 1, units: 8, lines: [{ model: 'Jetour X70 Plus', qty: 8, unitCost: 37000 }], jobId: '', status: 'Open' }];
  var settings = { rules: { CLIENT_DAYS_BEFORE_ETD: 10, SUPPLIER_DAYS_BEFORE_ETD: 0, FREIGHT_DAYS_BEFORE_ETD: 0, WARN_DAYS: 5, ETD_NOTICE_DAYS: 7, ETA_NOTICE_DAYS: 5, BL_DAYS_AFTER_ETD: 7, PRESHIP_DOC_DAYS_BEFORE_ETD: 3, DOC_SEND_DAYS: 2, TOLERANCE_USD: 50 },
    rates: { USD: 1, AED: 3.6725, CNY: 7.12 }, ownNames: 'TKXPORT,TAWREED,VITESSE,365', countryDocs: [{ country: 'CI', bietc: 'Yes', inspection: 'Yes', body: 'Bureau Veritas' }],
    company: { name: 'Demo Export Trading LLC', address: 'Office 000, Demo Tower, Dubai, UAE', email: 'accounts@demo-export.example', phone: '+971 4 000 0000', beneficiary: 'Demo Export Trading LLC',
      bankName: 'Demo Bank PJSC (fictitious)', iban: 'AE00 0000 0000 0000 0000 000', swift: 'DEMOAEADXXX', bankCcy: 'USD', verifyBase: '' } };
  var sealed = [];
  return { jobs: jobs, commitments: commitments, transactions: transactions, documents: documents, quotes: quotes, sealed: sealed, settings: settings };
})();
if (typeof module !== 'undefined') module.exports = SEED;
