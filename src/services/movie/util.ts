import crypto from 'crypto';

export const aes128Encrypt = async (key: string, data: string) => {
    const padding = 16 - (data.length % 16);
    const paddedData = data + String.fromCharCode(padding).repeat(padding);
    const keySize = 16;
    const ivSize = 16;
    
    let genKeyData = '';
    while (genKeyData.length < 32) {
        genKeyData += crypto.createHash('md5').update(genKeyData + key).digest('binary');
    }
    
    const generatedKey = genKeyData.substring(0, keySize);
    const generatedIV = genKeyData.substring(16, 32);
    
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(generatedKey, 'binary'), Buffer.from(generatedIV, 'binary'));
    let encrypted = cipher.update(paddedData, 'utf8', 'binary');
    encrypted += cipher.final('binary');
    
    return Buffer.from(encrypted, 'binary').toString('hex');
}

export const getRealIp = async (req: any) => {
    return req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || '0.0.0.0';
}

export const generateSignedLink = async (req: any) => {
    const ip = await getRealIp(req);
    const time = Date.now() + '000';
    const key = 'btc369369';
    const sign = await aes128Encrypt(key, `timestamp=${time}&ip=${ip}`);
    
    return {
        timestamp: time,
        ip,
        sign: sign
    };
}