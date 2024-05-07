class SplashScene extends Phaser.Scene {

  constructor() {
    super({key: "splashScene"})
  }
  init(data) {
    this.cameras.main.setBackgroundColor('ffffff')
  }
  preload() {
    console.log("Splash Scene")
  }


  create(data) {
  //pass  
  }
  update(time, delta) {
    //pass
  } 
}

export default SplashScene