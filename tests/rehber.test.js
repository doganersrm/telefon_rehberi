const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(require('node:path').join(__dirname, '../rehber.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements = new Map();
function element(id) {
    if (!elements.has(id)) elements.set(id, {
        value: '', style: {}, dataset: {}, children: [], checked: false,
        replaceChildren(...children) { this.children = children; },
        append(...children) { this.children.push(...children); },
        querySelector() { return element('emptyTitle'); },
        classList: {toggle() {}, remove() {}, add() {}}
    });
    return elements.get(id);
}
const context = vm.createContext({
    document: {
        addEventListener() {},
        getElementById: element,
        querySelector() { return element('table'); },
        querySelectorAll() { return []; },
        createElement(tag) { return {...element('__' + Math.random()), tagName: tag.toUpperCase()}; }
    },
    localStorage: {getItem() { return null; }, setItem() {}},
    crypto: require('node:crypto').webcrypto,
    console, setTimeout() {}
});
vm.runInContext(script, context);
const run = expression => vm.runInContext(expression, context);
assert.equal(run('parseCSV("\uFEFFAd,Soyad,Telefon1,Telefon2,Email,Sirket\\r\\n\\"Ayşe, Nur\\",Yılmaz,05321234567,,a@b.com,\\"Ar-Ge, AŞ\\"")[0].firstName'), 'Ayşe, Nur');
assert.equal(run('parseCSV("Ad,Soyad\\nAli,Deniz")[0].lastName'), 'Deniz');
assert.throws(() => run('parseCSV("Ad,Soyad\\n\\"Ali,Deniz")'), /tırnak/);
assert.throws(() => run('parseCSV("Ad,Soyad\\nAli")'), /sütun/);
assert.equal(run('parseVCF("BEGIN:VCARD\\r\\nVERSION:3.0\\r\\nN:Yılmaz;Ayşe;;;\\r\\nFN:Ayşe Yılmaz\\r\\nTEL;TYPE=CELL:05321234567\\r\\nEMAIL:ayse@example.com\\r\\nORG:Ar-Ge\\, AŞ\\r\\nEND:VCARD\\r\\n")[0].firstName'), 'Ayşe');
assert.equal(run('parseVCF("BEGIN:VCARD\\nVERSION:3.0\\nFN:Tek Satır\\nTEL:1234567\\nEND:VCARD")[0].phone1'), '1234567');
assert.equal(run('normalizedPhone("0 (532) 123 45 67")'), run('normalizedPhone("+90 532 123 45 67")'));
assert.equal(run('escapeHtml("<img src=x onerror=alert(1)>")'), '&lt;img src=x onerror=alert(1)&gt;');
assert.equal(run('csvCell("=1+1")'), '"\'=1+1"');
run('contacts = [newContact({id:"a",phone1:"0532 123 45 67",phone2:"+90 532 123 45 67"}),newContact({id:"b",phone1:"+90 532 123 45 67"})]; findDuplicateContacts()');
assert.equal(run('duplicates.length'), 1);
assert.equal(run('duplicates[0].people.length'), 2);
run('contacts = []; findDuplicateContacts()');
assert.equal(run('duplicates.length'), 0);
console.log('10 checks passed');
