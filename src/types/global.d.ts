export {};

declare global {
  interface Window {
    __APOLLO_STATE__: any;
    __ASSETS_PATH__: string;
  }
}
