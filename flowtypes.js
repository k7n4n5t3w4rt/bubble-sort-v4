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

type Position = {
  x: number,
  y: number,
  z: number,
};

type Cube = {
  position: Position,
  initial_pos_x: number,
  initial_pos_y: number,
  bubble_value: number,
  pos: number,
};

type Col = Array<Cube>;

type Cubes = Array<Col>;

type SceneData = {
  stats: Object,
  scene: Object,
  camera: Object,
  renderer: Object,
};

type CubesX1Y1X2Y2 = {
  cubes: Cubes,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
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

declare module "../../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../web_modules/simplestyle-js.js" {
  declare module.exports: any;
}

declare module "../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-router.js" {
  declare module.exports: any;
}

declare module "../web_modules/history.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/three.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/libs/stats.module.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/controls/OrbitControls.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/three/examples/jsm/controls/OrbitControls.js" {
  declare module.exports: any;
}
declare module "../../web_modules/three/examples/jsm/loaders/TGALoader.js" {
  declare module.exports: any;
}
declare module "../../web_modules/anime.js" {
  declare module.exports: any;
}
