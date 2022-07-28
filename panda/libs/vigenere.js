class Vigenere{
    // vigenere cipher
    static generateKey = (keyBuffer, bufferSize) => {
        const initialKeyLength = keyBuffer.length;
        let index = 0;
        while(keyBuffer.length < bufferSize) {
            if(index >= initialKeyLength) 
                index = 0;
            const byte = Buffer.from([keyBuffer[index]], 'hex');
            keyBuffer = Buffer.concat([keyBuffer, byte]);
            index++;
        }
        return keyBuffer;
    }

    static encrypt = (buffer, keyBuffer) => {    
        // encrpyt vigenere
        const FILE_BUFFER_LENGTH = buffer.length;
        const KEY_BUFFER_LENGTH = keyBuffer.length;
        
        let index = 0;
        let keyIndex = 0;
        let encryptedBuffer = Buffer.alloc(FILE_BUFFER_LENGTH);
        while(index < FILE_BUFFER_LENGTH) {
            const byte = buffer[index];
            const keyByte = keyBuffer[keyIndex];
            let encryptedByte = (byte + keyByte) % 256; 
            encryptedBuffer[index] = encryptedByte;
            index++;
            keyIndex++;
            if(keyIndex >= KEY_BUFFER_LENGTH)
                keyIndex = 0;
        }
        return encryptedBuffer;
    }

    static decrypt = (buffer, keyBuffer)  => {
        // decrypt vigenere
        const FILE_BUFFER_LENGTH = buffer.length;
        const KEY_BUFFER_LENGTH = keyBuffer.length;
        let index = 0;
        let keyIndex = 0;
        let decryptedBuffer = Buffer.alloc(FILE_BUFFER_LENGTH);
        while(index < FILE_BUFFER_LENGTH) {
            const byte = buffer[index];
            const keyByte = keyBuffer[keyIndex];
            let decryptedByte = (byte - keyByte) % 256;
            decryptedBuffer[index] = decryptedByte;
            index++;
            keyIndex++;
            if(keyIndex >= KEY_BUFFER_LENGTH)
                keyIndex = 0;
        }
        return decryptedBuffer;
    }
};

module.exports = Vigenere;