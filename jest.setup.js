// Desactivar el registro dinámico de imports de Expo en tests
jest.mock("expo/src/winter/ImportMetaRegistry", () => ({
  ImportMetaRegistry: {
    get url() {
      return null;
    },
  },
}));

// Polyfill para structuredClone en entornos de Node antiguos o Jest
if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (object) => JSON.parse(JSON.stringify(object));
}

// Mock para evitar advertencias de clonado interno de Expo
jest.mock("@ungap/structured-clone", () => ({
  default: (obj) => JSON.parse(JSON.stringify(obj)),
}));
