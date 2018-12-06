import { cryptography } from 'medjs';

export const decryptData = (password, encData) => cryptography.decryptData(password, encData);

export const encryptData = (password, data) => cryptography.encryptData(password, data);
