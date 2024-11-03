class Game {
	constructor() {
		this.startScreen = document.getElementById('game-intro')
		this.gameScreen = document.getElementById('game-screen')
		this.gameEndScreen = document.getElementById('game-end')
		// THIS.PLAYER RECEIVES A PLAYER INSTANCE WITH ALL
		// OF ITS METOHDS
		// ALL HIS BEHAVIOUR WILL BE GRABBED BY
		// GAME UPDATE(UPDATING PLAYER STATE)
		// AND PASSED TO GAME LOOP (CREATING MOVMENT)
		this.player = new Player(
			this.gameScreen,
			170,
			500,
			60,
			60,
			'../images/aircraft.png'
		)
		// HEIGHT AND WIDTH OF THE SCREEN
		this.height = 600
		this.width = 400
		// THIS.OBSTACLES RECEIVES A FEW OBSTACLES INSTANCES WITH ALL
		// OF ITS METOHDS
		// ALL HIS BEHAVIOUR WILL BE GRABBED BY GAME UPDATE
		// (UPDATING OBSTACLES STATE)
		// AND PASSED TO THE GAME LOOP
		this.obstacles = [new Obstacle(this.gameScreen)]
		this.score = 0
		this.lives = 3
		this.gameIsOver = false
		this.gameIntervalId
		this.gameLoopFrequency = Math.round(1000 / 60)
	}
	start() {
		// HIDE START SCREEN
		this.startScreen.style.display = 'none'
		// SHOW GAME SCREEN
		this.gameScreen.style.display = 'block'

		// DEFINE GAME HEIGHT AND WIDTH
		this.gameScreen.style.height = `${this.height}px`
		this.gameScreen.style.width = `${this.width}px`

		// SCREEN REFRESH RATE 60 FPS - FRAMES PER SECOND
		// CREATES MOVIMENT LOOPING THE UPDATES STATES OF THE GAME
		this.gameIntervalId = setInterval(() => {
			this.gameLoop()
		}, this.gameLoopFrequency)
	}

	gameLoop() {
		// console.warn('IN THE LOOP GAME!')
		// CHECK IF GAME IS OVER
		// IF YES STOPS - INTERVAL, THE LOOP
		// ANS STOPS UPDATE (GAME STATE) AS WELL
		if (this.gameIsOver) return clearInterval(this.gameIntervalId)

		// UPDATE PASS NEW GAME STATE TO THE LOOP
		this.update()
	}

	update() {
		// console.warn('IN THE UPDATE GAME!')
		// RECEIVES ALL UPDATES FROM INSTANCES

		// UPDATE ALL PLAYER MOVEMENTS
		this.player.move()
		this.obstacles[0].move()
	}
}
