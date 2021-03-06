import Player from "./player";
import Block from "./block";
import Button from "./sprites/button";

class Game {
  constructor() {
    this.canvas = document.getElementById("main");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 700;
    this.canvas.height = 685;
    this.player = new Player(this.canvas);
    this.start = false;
    this.blocks = {
      moving: new Block(-60, 500, 60, 20, this.canvas),
      tutorial: new Block(-60, 350, 60, 20, this.canvas),
      floating: new Block(200, 770, 80, 20, this.canvas),
      floating2: new Block(0, 770, 50, 20, this.canvas)
    };
    this.buttons = {};
    this.makeBlocks();
    this.makeButtons();
    this.theme = document.getElementById("theme");
    this.playSong = true;
  }

  makeBlocks() {
    // => main platforn
    // => S stands for secret
    this.blocks["main"] = new Block(0, 667, 40, 50, this.canvas);
    this.blocks["main1"] = new Block(50, 667, 40, 50, this.canvas);
    this.blocks["main2"] = new Block(100, 667, 40, 50, this.canvas);
    this.blocks["main3"] = new Block(150, 667, 40, 50, this.canvas);
    this.blocks["main4"] = new Block(200, 667, 40, 50, this.canvas);
    this.blocks["main5"] = new Block(250, 667, 40, 50, this.canvas);
    // => Platform above player or ap
    this.blocks["ap1"] = new Block(0, 566, 40, 20, this.canvas);
    this.blocks["ap2"] = new Block(50, 566, 40, 50, this.canvas);
    this.blocks["ap4"] = new Block(620, 566, 40, 50, this.canvas);
    // => second row or sr
    this.blocks["sr1"] = new Block(670, 546, 40, 20, this.canvas);
    this.blocks["sr2"] = new Block(0, 450, 40, 20, this.canvas);
    // => third row or tr
    this.blocks["tr1"] = new Block(0, 270, 40, 20, this.canvas);
    // => secret doors
    this.blocks["1stDoor"] = new Block(580, 500, 15, 88, this.canvas);
  }

  makeButtons() {
    this.buttons["1"] = new Button(248, 641, 20, 30, this.canvas);
    this.buttons["3"] = new Button(8, 538, 20, 30, this.canvas);
    this.buttons["4"] = new Button(675, 520, 20, 30, this.canvas);
    this.buttons["5"] = new Button(8, 419, 20, 30, this.canvas);
  }

  renderBlocks() {
    let grounded;
    Object.values(this.blocks).forEach(block => {
      block.render();
      this.player.isColliding(block);
      if (!grounded) {
        grounded = this.player.shouldFall(block);
      }
    });
    if (!grounded) {
      this.player.grounded = false;
    }
  }

  renderButtons() {
    Object.values(this.buttons).forEach(button => {
      button.render();
    });
  }

  renderSecrets() {
    if (this.player.first) {
      this.blocks["Smain"] = new Block(350, 646, 40, 50, this.canvas);
      this.blocks["Smain2"] = new Block(400, 606, 40, 50, this.canvas);
      this.blocks["Smain3"] = new Block(450, 566, 40, 50, this.canvas);
      this.buttons["2"] = new Button(455, 540, 20, 30, this.canvas);
      delete this.buttons["1"];
    }
    if (this.player.second) {
      delete this.buttons["2"];
      this.blocks["Sap1"] = new Block(350, 566, 40, 50, this.canvas);
      this.blocks["Sap2"] = new Block(250, 566, 40, 50, this.canvas);
      this.blocks["Sap3"] = new Block(150, 566, 40, 50, this.canvas);
      delete this.blocks["main1"];
      delete this.blocks["main2"];
      delete this.blocks["main3"];
      delete this.blocks["main4"];
      delete this.blocks["main5"];
    }
    if (this.player.third) {
      delete this.blocks["1stDoor"];
      delete this.buttons["3"];
      this.blocks["ap3"] = new Block(530, 566, 40, 50, this.canvas);
    }
    if (this.player.fourth) {
      delete this.buttons["4"];
      delete this.blocks["Smain"];
      delete this.blocks["Smain2"];
      delete this.blocks["Smain3"];
      delete this.blocks["Sap1"];
      delete this.blocks["Sap2"];
      delete this.blocks["Sap3"];
      this.blocks["Ssr1"] = new Block(450, 546, 40, 20, this.canvas);
      this.blocks["Ssr2"] = new Block(350, 546, 40, 20, this.canvas);
      this.blocks["Ssr3"] = new Block(250, 546, 40, 20, this.canvas);
      this.blocks["Ssr4"] = new Block(200, 500, 40, 20, this.canvas);
      this.blocks["Ssr5"] = new Block(150, 450, 40, 20, this.canvas);
      this.blocks["Ssr6"] = new Block(100, 400, 40, 20, this.canvas);
    }
    if (this.player.fifth) {
      delete this.buttons["5"];
      delete this.blocks["Ssr1"];
      delete this.blocks["Ssr2"];
      delete this.blocks["Ssr3"];
      delete this.blocks["Ssr4"];
      delete this.blocks["Ssr5"];
      delete this.blocks["Ssr6"];
      this.blocks.moving.x += 1;
      this.blocks["1stDoor"] = new Block(550, 450, 15, 50, this.canvas);
      this.blocks["2ndDoor"] = new Block(400, 450, 15, 50, this.canvas);
      this.blocks["3rdDoor"] = new Block(300, 450, 15, 50, this.canvas);
      this.blocks["4thDoor"] = new Block(150, 450, 15, 50, this.canvas);
      this.buttons["6"] = new Button(675, 420, 20, 30, this.canvas);
      this.blocks["6thPlat"] = new Block(670, 450, 40, 20, this.canvas);
      delete this.blocks["ap1"];
      delete this.blocks["ap2"];
      delete this.blocks["ap3"];
      delete this.blocks["ap4"];
    }
    if (this.player.sixth) {
      delete this.buttons["6"];
      delete this.blocks["1stDoor"];
      delete this.blocks["2ndDoor"];
      delete this.blocks["3rdDoor"];
      delete this.blocks["4thDoor"];
      this.buttons["8"] = new Button(8, 239, 20, 30, this.canvas);
      this.buttons["7"] = new Button(205, 324, 20, 30, this.canvas);
      this.blocks["1st"] = new Block(570, 450, 40, 20, this.canvas);
      this.blocks["2nd"] = new Block(470, 440, 40, 20, this.canvas);
      this.blocks["3rd"] = new Block(380, 410, 40, 20, this.canvas);
      this.blocks["4th"] = new Block(290, 380, 40, 20, this.canvas);
      this.blocks["5th"] = new Block(200, 355, 40, 20, this.canvas);
    }
    if (this.player.seventh) {
      delete this.buttons["7"];
      delete this.blocks["5th"];
      delete this.blocks["sr2"];
      this.blocks.floating.y -= 2;
      this.blocks["6th"] = new Block(140, 200, 40, 20, this.canvas);
      if (this.blocks.floating && this.blocks.floating.y < -10) {
        this.blocks.floating.y = 770;
      }
    }
    if (this.player.boss) {
      delete this.buttons["7"];
      delete this.buttons["8"];
      delete this.blocks["1st"];
      delete this.blocks["2nd"];
      delete this.blocks["3rd"];
      delete this.blocks["4th"];
      delete this.blocks["5th"];
      delete this.blocks["floating"];
      delete this.blocks["sr1"];
      delete this.blocks["tr1"];
      delete this.blocks["main"];
      delete this.blocks["6th"];
      delete this.blocks["6thPlat"];
      this.blocks.floating2.y -= 2;
      this.buttons["win"] = new Button(670, 92, 20, 30, this.canvas);
      this.blocks["boss"] = new Block(355, 120, 40, 20, this.canvas);
      this.blocks["boss3"] = new Block(465, 120, 40, 20, this.canvas);
      this.blocks["boss5"] = new Block(565, 120, 40, 20, this.canvas);
      this.blocks["boss7"] = new Block(665, 120, 40, 20, this.canvas);
      this.blocks["1st"] = new Block(50, 350, 40, 50, this.canvas);
      this.blocks["2nd"] = new Block(100, 300, 40, 50, this.canvas);
      this.blocks["3rd"] = new Block(150, 250, 40, 50, this.canvas);
      this.blocks["4th"] = new Block(200, 200, 40, 50, this.canvas);
      this.blocks["5th"] = new Block(250, 150, 40, 50, this.canvas);
    }

    if (this.player.won) {
      delete this.buttons["win"];
    }
  }

  renderText() {
    this.ctx.font = '20px "Press Start 2P"';
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "Press N to start a new game!",
      100,
      250,
      500
    );
  }

  renderWinMessage() {
    this.ctx.font = '20px "Press Start 2P"';
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "You did it! You won! Press R to restart!",
      100,
      250,
      500
    );
  }

  renderGameOver() {
    this.ctx.font = '20px "Press Start 2P"';
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "You lost! Try again...  Press s to try again!",
      100,
      250,
      500
    );
  }

  toggleMusic() {
    if (this.playSong) {
      this.theme.play();
    } else {
      this.theme.pause();
    }
  }

  restart() {
    this.blocks = {
      moving: new Block(-60, 500, 60, 20, this.canvas),
      tutorial: new Block(-60, 350, 60, 20, this.canvas),
      floating: new Block(200, 770, 80, 20, this.canvas),
      floating2: new Block(0, 770, 50, 20, this.canvas)
    };
    this.player.checkpoint = { x: 20, y: 620 };
    this.makeBlocks();
    this.makeButtons();
    this.player.lives = 3;
    this.player.first = false;
    this.player.second = false;
    this.player.third = false;
    this.player.fourth = false;
    this.player.fifth = false;
    this.player.sixth = false;
    this.player.seventh = false;
    this.player.boss = false;
    this.player.won = false;
    this.player.lost = false;
    delete this.buttons["win"];
    delete this.blocks["boss"];
    delete this.blocks["boss3"];
    delete this.blocks["boss5"];
    delete this.blocks["boss7"];
    delete this.blocks["1st"];
    delete this.blocks["2nd"];
    delete this.blocks["3rd"];
    delete this.blocks["4th"];
    delete this.blocks["5th"];
    delete this.buttons["2"];
    delete this.buttons["6"];
    delete this.buttons["7"];
    delete this.buttons["8"];
    this.player.x = 0;
    this.player.y = 620;
    this.start = true;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.start && !this.player.won && !this.player.lost) {
      delete this.blocks.tutorial;
      this.toggleMusic();
      this.player.physics();
      this.renderSecrets();
      this.renderButtons();
      this.renderBlocks();
      if (this.player.y > this.canvas.height) {
        this.player.lives -= 1;
        this.player.x = this.player.checkpoint.x;
        this.player.y = this.player.checkpoint.y;
        if (this.player.fifth && !this.player.sixth) {
          this.blocks.moving.x = -60;
        }
        if (this.player.lives === 0) {
          this.player.lost = true;
        }
      }
    } else if (this.player.lost) {
      this.start = false;
      this.renderGameOver();
      this.theme.pause();
    } else if (this.player.won) {
      this.start = false;
      this.renderWinMessage();
      this.theme.pause();
    } else {
      this.renderText();
      this.blocks.tutorial.render();
      this.blocks.tutorial.x += 1;
    }
    requestAnimationFrame(this.render.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.render();

  document.addEventListener("keydown", e => {
    if (e.code === "KeyQ") {
      game.playSong = !game.playSong;
    }
    if (e.code === "KeyN") game.start = true;
    if (e.code === "KeyR" && game.player.won) {
      game.restart();
    }
    if (e.code === "KeyS" && game.player.lost) {
      game.restart();
    }
    game.player.keysPressed[e.code] = true;
  });

  document.addEventListener("keyup", e => {
    game.player.keysPressed[e.code] = false;
  });
});
