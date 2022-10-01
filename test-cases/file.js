const Panda = require('../panda').Panda;
const fs = require('fs');
const path = require('path');
const key = 'OGEntHOrTYpoTEBumEDONTurVALRYMorTionInAUteRYWaYeAl';
const seed = 'pjTC4@xl@1R@%6HUxDCvenDvf1zZo9MfVi0ZaKK8qI731BtR88';

const fileName = 'pexels-cong-h-1404819.jpg';
const filePath = path.join(__dirname, 'testFiles', fileName);

function encryptFile() {
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        const encrypted = Panda.encryptSync(data, { key, seed });
        fs.writeFileSync(
            path.join(__dirname, 'testFiles', 'encrypted', fileName + '.enc'),
            encrypted
        );
    });
}

function decryptFile() {
    fs.readFile(
        path.join(__dirname, 'testFiles', 'encrypted', fileName + '.enc'),
        (err, data) => {
            if (err) throw err;
            const decrypted = Panda.decryptSync(data, { key, seed });
            fs.writeFileSync(
                path.join(__dirname, 'testFiles', 'decrypted', fileName),
                decrypted
            );
        }
    );
}

// console.time('= encryption time taken');
// encryptFile();
// console.timeEnd('= encryption time taken');
// console.log();

console.time('= decryption time taken');
decryptFile();
console.timeEnd('= decryption time taken');
console.log();
