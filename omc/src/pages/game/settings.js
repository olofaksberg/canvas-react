/** @format */

export const settings = {
  // general
  lives: 10,
  scorePerSave: 50,
  canvasWidth: 1200,
  canvasHeight: 800,
  gameSpeed: 5,
  // boat
  boat: {
    speed: 6,
    animationSpeed: 10,
    startPositionX: 100,
    startPositionY: 300,
  },
  // stones
  stones: {
    spawnRate: 30,
    speed: 3,
    minimumSize: 30,
    maximumSize: 90,
    speedModifier: {
      boatMovement: {
        right: 4,
        left: 2,
      },
    },
  },
  // drowning people
  drowningPeople: {
    spawnRate: 30,
    speed: 3,
    minimumSize: 50,
    maximumSize: 50,
    speedModifier: {
      boatMovement: {
        right: 4,
        left: 2,
      },
    },
  },
  // background
  background: {
    height: 125,
    mainSpeed: 4,
    bg1: {
      speed: 10,
    },
    bg2: {
      speed: 8,
    },
    bg3: {
      speed: 6,
    },
    bg4: {
      speed: 1,
    },
    speedModifier: {
      boatMovement: {
        right: 2,
        left: 6,
      },
    },
  },
};
