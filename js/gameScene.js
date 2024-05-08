
// class for the game scene
class GameScene extends Phaser.Scene {
  
  //constructs keywords
  constructor() {
    super({key: "gameScene"})
  }
  init(data) {
    // sets the background color
    this.cameras.main.setBackgroundColor('#1111f')
  }
  preload() {
    // really just to check if stuff is working
    console.log("Game Scene")
  }


  create(data) {
   
  }
  
  update(time, delta) {
  } 
}

export default GameScene