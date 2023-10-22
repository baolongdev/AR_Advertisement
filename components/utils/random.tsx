import crypto from 'crypto';

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

export function generateRandomFileName() {
    const randomString = generateRandomString(10); // Change the length as needed
    return `${randomString}`;
}