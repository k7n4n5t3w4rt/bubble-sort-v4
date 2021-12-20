type config = {
  CONTAINER_ID: string,
  SHOW_WORKING: boolean,
  FPS: number,
  ACCELLERATION: number,
  CLICK?: number,
  COLS: number,
  ROWS: number,
  MAX_SECONDS_TRANSITION_INTERVAL: number,
  CONSTANT_TRANSITION_SPEED: boolean,
  LOOP: boolean,
  RELOAD_INTERVAL: number,
  FINISH_COUNTER: Object,
};

declare module "finalhandler" {
  declare module.exports: any;
}

declare module "../web_modules/immer.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-render-to-string.js" {
  declare module.exports: any;
}

declare module "serve-static" {
  declare module.exports: any;
}

declare module "glob" {
  declare module.exports: any;
}

declare module "../web_modules/should/as-function.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../web_modules/simplestyle-js.js" {
  declare module.exports: any;
}

declare module "../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-router.js" {
  declare module.exports: any;
}

declare module "../web_modules/history.js" {
  declare module.exports: any;
}
