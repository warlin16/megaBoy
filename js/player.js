import CharImg from "./sprite";
import Bass from "./sprites/bass";

class Player {
  constructor(stage) {
    this.stage = stage;
    this.ctx = this.stage.getContext("2d");
    this.x = 0;
    this.y = 620;
    this.width = 35;
    this.height = 45;
    this.speed = 5;
    this.velX = 0;
    this.velY = 0;
    this.jumping = false;
    this.grounded = false;
    this.falling = true;
    this.gravity = 0.7;
    this.slide = 0.75;
    this.keysPressed = {};
    this.animation = new Bass().animation;
    this.currImg = this.animation.idleAnim;
    this.frames = 0;
    this.direction = "right";
    this.isColliding = this.isColliding.bind(this);
    this.lives = 3;
    this.checkpoint = { x: 20, y: 620 };
  }

  changeDirection() {
    if (this.keysPressed.Comma) {
      this.direction = "left";
    }
    if (this.keysPressed.Period) {
      this.direction = "right";
    }
  }

  moveRight() {
    if (this.keysPressed.ArrowRight) {
      this.direction = "right";
      if (this.velX < this.speed) this.velX++;
      if (this.frames === 1) {
        if (this.direction === "right") {
          this.currImg = this.animation.rightAnim1;
        } else if (this.direction === "left") {
          this.currImg = this.animation.rightMoveAnim1;
        }
      }
      if (this.frames === 17) {
        if (this.direction === "right") {
          this.currImg = this.animation.rightAnim3;
        } else if (this.direction === "left") {
          this.currImg = this.animation.rightMoveAnim3;
        }
      }
      if (this.frames === 27) {
        if (this.direction === "right") {
          this.currImg = this.animation.rightAnim2;
        } else if (this.direction === "left") {
          this.currImg = this.animation.rightMoveAnim2;
        }
      }
    }
  }

  moveLeft() {
    if (this.keysPressed.ArrowLeft && !this.keysPressed.ArrowRight) {
      this.direction = "left";
      if (this.velX > -this.speed) this.velX--;
      if (this.frames === 1) {
        if (this.direction === "right") {
          this.currImg = this.animation.leftAnim1;
        } else if (this.direction === "left") {
          this.currImg = this.animation.leftMoveAnim1;
        }
      }
      if (this.frames === 17) {
        if (this.direction === "right") {
          this.currImg = this.animation.leftAnim3;
        } else if (this.direction === "left") {
          this.currImg = this.animation.leftMoveAnim3;
        }
      }
      if (this.frames === 27) {
        if (this.direction === "right") {
          this.currImg = this.animation.leftAnim2;
        } else if (this.direction === "left") {
          this.currImg = this.animation.leftMoveAnim2;
        }
      }
    }
  }

  jump() {
    if (this.keysPressed.ArrowUp) {
      if (this.grounded || this.velY === 0) {
        this.jumping = true;
        this.velY = -9;
        this.grounded = false;
      }
      if (this.jumping) {
        if (this.frames === 1) {
          if (this.direction === "right") {
            this.currImg = this.animation.jumpAnim1;
          } else if (this.direction === "left") {
            this.currImg = this.animation.leftJumpAnim1;
          }
        }
        if (this.frames === 5) {
          if (this.direction === "right") {
            this.currImg = this.animation.jumpAnim2;
          } else if (this.direction === "left") {
            this.currImg = this.animation.leftJumpAnim2;
          }
        }
        if (this.frames === 10) {
          if (this.direction === "right") {
            this.currImg = this.animation.jumpAnim3;
          } else if (this.direction === "left") {
            this.currImg = this.animation.leftJumpAnim3;
          }
        }
      }
    }
  }

  shoot() {
    if (this.keysPressed.Space) {
      if (this.frames === 2) {
        if (this.direction === "right") {
          this.currImg = this.animation.shootAnim1;
        } else if (this.direction === "left") {
          this.currImg = this.animation.leftShootAnim1;
        }
      }
      if (this.frames === 5) {
        if (this.direction === "right") {
          this.currImg = this.animation.shootAnim2;
        } else if (this.direction === "left") {
          this.currImg = this.animation.leftShootAnim2;
        }
      }
      if (this.frames === 10) {
        if (this.direction === "right") {
          this.currImg = this.animation.shootAnim3;
        } else if (this.direction === "left") {
          this.currImg = this.animation.leftShootAnim3;
        }
      }
      if (this.frames === 15) {
        if (this.direction === "right") {
          this.currImg = this.animation.shootAnim4;
        } else if (this.direction === "left") {
          this.currImg = this.animation.leftShootAnim4;
        }
      }
      if (this.frames === 45) this.frames = 0;
    }
  }

  idle() {
    if (
      !this.keysPressed.ArrowRight &&
      !this.keysPressed.ArrowLeft &&
      !this.keysPressed.ArrowUp &&
      !this.keysPressed.Space
    ) {
      this.frames = 0;
      if (this.direction === "right") {
        this.currImg = this.animation.idleAnim;
      }
      if (this.direction === "left") {
        this.currImg = this.animation.leftIdleAnim;
      }
    }
  }

  renderFace() {
    this.ctx.drawImage(
      this.animation.face.img,
      this.animation.face.sX,
      this.animation.face.sY,
      this.animation.face.sWidth,
      this.animation.face.sHeight,
      0,
      0,
      50,
      50
    );
  }

  physics() {
    if (this.x + this.width > this.stage.width) {
      this.x = this.stage.width - this.width;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.velY = 0;
      this.y = 0;
    }
    if (this.x >= 235 && this.y === 622) this.first = true;
    if (this.x >= 437 && this.y === 521) {
      this.second = true;
      this.checkpoint.x = 450;
      this.checkpoint.y = 470;
    }
    if (this.x <= 10 && this.y === 521) this.third = true;
    if (this.x >= 650 && this.y === 501) this.fourth = true;
    if (this.x <= 10 && this.y === 405) {
      this.fifth = true;
      this.checkpoint.x = 9;
      this.checkpoint.y = 395;
    }
    if (this.x >= 650 && this.y === 405) {
      this.sixth = true;
      this.checkpoint.x = 655;
      this.checkpoint.y = 390;
    }
    if (this.x <= 220 && this.y === 310) {
      this.seventh = true;
      this.checkpoint.x = 566;
      this.checkpoint.y = 390;
    }
    if (this.x <= 10 && (this.y <= 225 && this.y >= 223)) {
      this.seventh = false;
      this.boss = true;
    }
    if (this.boss) {
      this.checkpoint.x = 55;
      this.checkpoint.y = 290;
    }
    if (this.x >= 655 && this.y === 75) {
      this.won = true;
    }
    this.velX *= this.slide;
    this.velY += this.gravity;
    if (this.grounded) this.velY = 0;

    this.x += this.velX;
    this.y += this.velY;

    this.frames++;
    this.changeDirection();
    this.moveRight();
    this.moveLeft();
    this.jump();
    this.shoot();
    this.idle();
    this.renderFace();
    this.ctx.drawImage(
      this.currImg.img,
      this.currImg.sX,
      this.currImg.sY,
      this.currImg.sWidth,
      this.currImg.sHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  isColliding(obj) {
    const vX = this.x + this.width / 2 - (obj.x + obj.width / 2);
    const vY = this.y + this.height / 2 - (obj.y + obj.height / 2);
    const hWidth = this.width / 2 + obj.width / 2;
    const hHeight = this.height / 2 + obj.height / 2;
    if (Math.abs(vX) < hWidth && Math.abs(vY) < hHeight) {
      const oX = hWidth - Math.abs(vX);
      const oY = hHeight - Math.abs(vY);
      if (oX >= oY) {
        if (vY < 0) {
          this.y -= oY;
          this.grounded = true;
        } else if (vY > 0) {
          this.y += oY + 5;
          this.velY = 0;
        }
      } else {
        if (vX > 0) {
          this.x += oX;
          this.velX = 0;
        } else {
          this.x -= oX;
          this.velX = 0;
        }
      }
    }
  }

  shouldFall(obj) {
    if (this.x + this.width >= obj.x && this.x < obj.x + obj.width) {
      if (this.y + this.height === obj.y) {
        return true;
      }
    } else {
      return false;
    }
  }
}

export default Player;
