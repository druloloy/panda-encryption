/**
 * MIT License

Copyright (c) 2022 Andrew Loloy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

const { create } = require('./sequence');
const {
    shuffle,
    unshuffle,
    shuffleSync,
    unshuffleSync,
} = require('./shuffler');
const { encrypt, decrypt } = require('./vigenere');

const defaultOption = {
    key: 'supercalifragilisticexpialidocious',
    seed: 'default',
};

class Panda {
    /**
     * Converts a utf-8 string to a buffer
     * @param {String} str
     * @returns Buffer
     */
    static stringToBuffer(str) {
        return Buffer.from(str, 'utf8');
    }

    /**
     * Converts hex encoded string to a buffer
     * @param {String} hex
     * @returns Buffer
     */
    static hexToBuffer(hex) {
        return Buffer.from(hex, 'hex');
    }

    /**
     * Converts base64 encoded string to buffer
     * @param {String} base64
     * @returns Buffer
     */
    static base64ToBuffer(base64) {
        return Buffer.from(base64, 'base64');
    }

    /**
     * Converts a buffer to hex encoded string
     * @param {Buffer} buffer
     * @returns hex encoded string
     */
    static bufferToHex(buffer) {
        return buffer.toString('hex');
    }

    /**
     * Convert a buffer to base64 encoded string
     * @param {Buffer} buffer
     * @returns base64 encoded string
     */
    static bufferToBase64(buffer) {
        return buffer.toString('base64');
    }

    /**
     * Convert a buffer to utf-8 string
     * @param {Buffer} buffer
     * @returns utf-8 string
     */
    static bufferToUtf8(buffer) {
        return buffer.toString('utf8');
    }

    /**
     * Encrypts a buffer asynchronously using vigenere cipher and shuffles the result using a sequence of random numbers.
     * @param {*} buffer BufferArray to be encrypted
     * @param {*} option Option object containing key and seed for the sequence of random numbers default is {key: 'supercalifragilisticexpialidocious', seed: 'default'}
     * @returns encrypted buffer
     */
    static encrypt(buffer, option = defaultOption) {
        return new Promise(async (resolve, reject) => {
            let { key, seed } = option;

            /**
             * If seed is not provided, key is used as seed
             */
            if (!seed) seed = Panda.bufferToHex(key);
            /**
             * If seed is provided, but is a buffer, it is converted to hex string
             */
            if (typeof seed !== 'string' && Buffer.isBuffer(seed))
                seed = Panda.bufferToHex(seed);

            /**
             * If key is a string, it is converted to buffer
             */
            if (typeof key === 'string') key = Panda.stringToBuffer(key);

            const sequence = Panda.#createSequence(seed, buffer.length); // generating sequence
            const encryptedBuffer = encrypt(buffer, key); // applying vigenere cipher

            await shuffle(encryptedBuffer, sequence).then((shuffled) => {
                resolve(Buffer.from(shuffled));
            });
        });
    }

    /**
     * Encrypts a buffer using vigenere cipher and shuffles the result using a sequence of random numbers.
     * @param {String | Buffer} buffer BufferArray to be encrypted
     * @param {*} option Option object containing key and seed for the sequence of random numbers default is {key: 'supercalifragilisticexpialidocious', seed: 'default'}
     * @returns encrypted buffer
     */
    static encryptSync(buffer, option = defaultOption) {
        let { key, seed } = option;

        if (typeof buffer === 'string') buffer = Panda.stringToBuffer(buffer);

        if (!seed) seed = Panda.bufferToHex(key);
        if (typeof seed !== 'string') seed = Panda.bufferToHex(seed);
        if (typeof key === 'string') key = Panda.stringToBuffer(key);

        const sequence = Panda.#createSequence(seed, buffer.length); // generating sequence
        const encryptedBuffer = encrypt(buffer, key); // applying vigenere cipher
        return Buffer.from(shuffleSync(encryptedBuffer, sequence));
    }

    /**
     * Decrypts a buffer asynchronously using vigenere cipher and shuffles the result using a sequence of random numbers.
     * @param {*} buffer BufferArray to be decrypted
     * @param {*} option Option object containing key and seed for the sequence of random numbers default is {key: 'supercalifragilisticexpialidocious', seed: 'default'}
     * @returns decrypted buffer
     */
    static decrypt(buffer, option = defaultOption) {
        return new Promise(async (resolve, reject) => {
            let { key, seed } = option;

            if (!seed) seed = Panda.bufferToHex(key);
            if (typeof seed !== 'string') seed = Panda.bufferToHex(seed);
            if (typeof key === 'string') key = Panda.stringToBuffer(key);

            // unshuffle buffer
            const sequence = Panda.#createSequence(seed, buffer.length);
            await unshuffle(buffer, sequence).then((unshuffled) => {
                resolve(decrypt(unshuffled, key));
            });
        });
    }

    /**
     * Decrypts a buffer using vigenere cipher and shuffles the result using a sequence of random numbers.
     * @param {String | Buffer} buffer BufferArray to be decrypted
     * @param {*} option Option object containing key and seed for the sequence of random numbers default is {key: 'supercalifragilisticexpialidocious', seed: 'default'}
     * @returns decrypted buffer
     */
    static decryptSync(buffer, option = defaultOption) {
        let { key, seed } = option;
        if (typeof buffer === 'string') buffer = Panda.stringToBuffer(buffer);

        if (!seed) seed = Panda.bufferToHex(key);
        if (typeof seed !== 'string') seed = Panda.bufferToHex(seed);
        if (typeof key === 'string') key = Panda.stringToBuffer(key);

        // unshuffle buffer
        const sequence = Panda.#createSequence(seed, buffer.length);
        const unshuffled = unshuffleSync(buffer, sequence);
        return decrypt(unshuffled, key);
    }

    /**
     * Creates a sequence of random numbers
     * @param {String} seed Seed for the sequence of random numbers
     * @param {Number} length Length of the sequence
     * @returns sequence of random numbers
     * @example
     * Panda.#createSequence('supercalifragilisticexpialidocious', 3);
     * returns [2, 4, 12]
     */
    static #createSequence(seed, bufferSize) {
        return create(seed, bufferSize);
    }
}
module.exports = Panda;
