/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
     
    // L'environnement 'jsdom' simule un navigateur pour tester les composants.
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // Ce module permet de résoudre les chemins alias comme "@/".
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      // Ces lignes gèrent les fichiers CSS et les images.
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      // Ces mocks simplifient les composants Next.js pour les tests.
      '^next/image$': '<rootDir>/_mocks_/nextImageMock.cjs',
      '^next/link$': '<rootDir>/_mocks_/nextLinkMock.cjs',
    },
    transform: {
      '^.+\\.(ts|tsx)$': ['@swc/jest'],
    },
    // Les fichiers dans 'node_modules' ne sont pas transformés.
    transformIgnorePatterns: ['/node_modules/'],
  };