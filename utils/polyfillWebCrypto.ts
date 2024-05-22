// crypto-shim.ts
import {getRandomValues as expoCryptoGetRandomValues} from 'expo-crypto';

class Crypto {
  getRandomValues = expoCryptoGetRandomValues;
}

const webCrypto = typeof crypto !== 'undefined' ? crypto : new Crypto();

export function polyfillWebCrypto(): void {
  if (typeof crypto === 'undefined') {
    Object.defineProperty(window, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
}
