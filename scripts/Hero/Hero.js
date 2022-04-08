class Hero {
  super()
  constructor(initialPosition) {
    this.initialPosition = initialPosition;
    this.currentPosition = this.releaseHero();

    this.state = {

    }
  }

  createHero() {

  }

  releaseHero() {
    this.currentPosition = this.initialPosition
  }
}