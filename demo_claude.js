// Stand-alone demo runtime: replaces Claude's storage with this browser's localStorage. Fictitious data only.
(function () {
  var KEY = 'tkx-demo-store-v1', BLOBS = 'tkx-demo-blobs-v1';
  var store = null, blobs = {};
  try { store = JSON.parse(localStorage.getItem(KEY) || 'null'); blobs = JSON.parse(localStorage.getItem(BLOBS) || '{}'); } catch (e) { store = null; }
  function seed() {
    var s = {};
    ['jobs', 'commitments', 'transactions', 'documents', 'quotes'].forEach(function (c) { SEED[c].forEach(function (r) { s[c + '/' + r.id] = JSON.parse(JSON.stringify(r)); }); });
    s['settings/main'] = JSON.parse(JSON.stringify(SEED.settings));
    return s;
  }
  if (!store) store = seed();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { console.warn('demo storage full'); } }
  save();
  var subs = [];
  function notify() { subs.forEach(function (f) { f(); }); }
  window.addEventListener('storage', function (e) { if (e.key === KEY) { try { store = JSON.parse(e.newValue); notify(); } catch (x) {} } });
  function snapDoc(path) { var d = store[path]; return { id: path.split('/').pop(), exists: !!d, data: function () { return d ? JSON.parse(JSON.stringify(d)) : undefined; }, metadata: { fromCache: false, hasPendingWrites: false } }; }
  function collSnap(coll) {
    var docs = Object.keys(store).filter(function (p) { return p.split('/').slice(0, -1).join('/') === coll; }).sort().map(snapDoc);
    return { docs: docs, size: docs.length, empty: !docs.length, docChanges: function () { return []; }, metadata: { fromCache: false, hasPendingWrites: false } };
  }
  function docRef(path) {
    return { id: path.split('/').pop(), path: path,
      get: function () { return Promise.resolve(snapDoc(path)); },
      set: function (d) { store[path] = JSON.parse(JSON.stringify(d)); save(); setTimeout(notify, 0); return Promise.resolve(); },
      update: function (d) { store[path] = Object.assign(store[path] || {}, d); save(); setTimeout(notify, 0); return Promise.resolve(); },
      delete: function () { delete store[path]; save(); setTimeout(notify, 0); return Promise.resolve(); },
      onSnapshot: function (next) { var f = function () { next(snapDoc(path)); }; subs.push(f); setTimeout(f, 0); return function () {}; } };
  }
  var db = { doc: docRef, collection: function (coll) { return { path: coll, doc: function (id) { return docRef(coll + '/' + (id || Math.random().toString(36).slice(2))); },
    onSnapshot: function (next) { var f = function () { next(collSnap(coll)); }; subs.push(f); setTimeout(f, 0); return function () {}; } }; } };
  var assets = { upload: function (file) {
    return new Promise(function (res) {
      var id = 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      if (file.size > 1500000) { res({ id: id, url: '', sizeBytes: file.size, contentType: file.type }); return; } // large files are not kept in the demo
      var r = new FileReader();
      r.onload = function () { blobs[id] = r.result; try { localStorage.setItem(BLOBS, JSON.stringify(blobs)); } catch (e) { delete blobs[id]; } res({ id: id, url: r.result, sizeBytes: file.size, contentType: file.type }); };
      r.readAsDataURL(file);
    });
  } };
  window.__demoFileUrl = function (id) { return blobs[id] || '#'; };
  var downloads = { save: function (req) {
    var blob = req.data instanceof Blob ? req.data : new Blob([req.data]);
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = req.filename; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    return Promise.resolve({ status: 'saved' });
  } };
  var user = { isOwner: function () { return true; }, canEdit: function () { return true; }, can: function () { return Promise.resolve(true); },
    id: function () { return Promise.resolve('demo'); }, me: function () { return Promise.resolve({ id: 'demo', name: 'Demo user' }); }, profiles: function () { return Promise.resolve({}); } };
  var caps = { db: db, user: user, assets: assets, sample: null, downloads: downloads };
  window.claude = { use: function (n) { return Promise.resolve(caps[n] || null); } };
  window.resetDemo = function () { store = seed(); blobs = {}; save(); try { localStorage.removeItem(BLOBS); } catch (e) {} notify(); };
})();
