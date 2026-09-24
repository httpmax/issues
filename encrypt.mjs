// Encrypts issues.json -> issues.enc.json so the public page needs the password.
// Usage: ISSUES_PASSWORD=... node encrypt.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';

const password = process.env.ISSUES_PASSWORD;
if (!password) { console.error('Set ISSUES_PASSWORD first.'); process.exit(1); }

const ITERATIONS = 600000;
const plain = new TextEncoder().encode(readFileSync(new URL('./issues.json', import.meta.url), 'utf8'));
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain));
const b64 = (u) => Buffer.from(u).toString('base64');
writeFileSync(new URL('./issues.enc.json', import.meta.url), JSON.stringify({ v: 1, iterations: ITERATIONS, salt: b64(salt), iv: b64(iv), data: b64(ct) }));
console.log('Wrote issues.enc.json (' + ct.length + ' bytes)');
