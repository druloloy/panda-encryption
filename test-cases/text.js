const {Panda} = require('../panda');

const plaintext = "Dolore voluptate magna minim veniam cupidatat id laboris.";
const key = 'supercalifragilisticexpialidocious';
const plaintextBuffer = Panda.stringToBuffer(plaintext);


console.time('encrypt');
const encrypted = Panda.encryptSync(plaintextBuffer, { key });
console.log("ENCRYPTED: "+ Panda.bufferToBase64(encrypted));
console.timeEnd('encrypt');

console.time('decrypt');
const decrypted = Panda.decryptSync(encrypted, { key });
console.log("DECRYPTED: " + Panda.bufferToUtf8(decrypted));
console.timeEnd('decrypt');