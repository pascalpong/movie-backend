import crypto from 'crypto';
import MovieType from '../../types/movie.type';

export const aes128Encrypt = (key: string, data: string): string => {
    const padding = 16 - (data.length % 16);
    const paddedData = data + String.fromCharCode(padding).repeat(padding);
    const keySize = 16;
    const ivSize = 16;
    
    let genKeyData = '';
    do {
        genKeyData += crypto.createHash('md5').update(genKeyData + key).digest('binary');
    } while (genKeyData.length < 32);
    
    const generatedKey = genKeyData.substring(0, keySize);
    const generatedIV = genKeyData.substring(16, 32);
    
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(generatedKey, 'binary'), Buffer.from(generatedIV, 'binary'));
    cipher.setAutoPadding(false);
    let encrypted = cipher.update(paddedData, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return encrypted;
}

export const getRealIp = (req: any): string => {
    return req.ip || req.connection.remoteAddress || '0.0.0.0';
}

export const generateSignedLink = async (req: any) => {
    const ip = getRealIp(req);
    console.log(ip,'------------------------')
    const time = Date.now() + '000';
    const key = 'btc369369';
    const sign = aes128Encrypt(key, `timestamp=${time}&ip=${ip}`);
    console.log(sign,'signsignsignsignsignsign')
    
    return {
        timestamp: time,
        ip,
        sign: sign
    };
}

export const orderByRank = async (movies: MovieType[]) => {
    return movies.sort((a: MovieType, b: MovieType) => parseInt(a.view_count || '0') - parseInt(b.view_count || '0'));
}