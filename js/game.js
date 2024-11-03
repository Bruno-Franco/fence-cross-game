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
		this.liveInHtml = document.getElementById('lives')
	}
	start() {
		// HIDE START SCREEN
		this.startScreen.style.display = 'none'
		// SHOW GAME SCREEN
		this.gameScreen.style.display = 'block'

		// DEFINE GAME HEIGHT AND WIDTH
		this.gameScreen.style.height = `${this.height}px`
		this.gameScreen.style.width = `${this.width}px`

		// CREATES A NEW UFO

		// SCREEN REFRESH RATE 60 FPS - FRAMES PER SECOND
		// CREATES MOVIMENT LOOPING THE UPDATES STATES OF THE GAME
		this.gameIntervalId = setInterval(() => {
			this.gameLoop()
		}, this.gameLoopFrequency)
	}

	gameLoop() {
		// CHECK IF GAME IS OVER
		// IF YES STOPS - INTERVAL, THE LOOP
		// ANS STOPS UPDATE (GAME STATE) AS WELL
		if (this.gameIsOver) {
			clearInterval(this.gameIntervalId)
			clearInterval(this.newUfo)
		}

		// UPDATE PASS NEW GAME STATE TO THE LOOP
		this.update()
	}

	update() {
		// RECEIVES ALL UPDATES FROM INSTANCES
		this.player.move()

		// UPDATE ALL PLAYER MOVEMENTS
		this.obstacles.forEach((obstacle) => {
			obstacle.move()
			// REMOVE LIVES IF EXISTS COLISIONS

			if (this.player.didCollide(obstacle)) {
				this.lives--
				this.liveInHtml.innerText = this.lives
				this.obstacles.splice(this.obstacles.indexOf(obstacle, 1))
				obstacle.element.src = '../images/explode.png'

				setTimeout(() => {
					obstacle.element.style.opacity = 0.8
				}, 500)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.6
				}, 1000)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.3
				}, 1500)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.1
					obstacle.element.remove()
				}, 1500)
			} else if (obstacle.top > 550) {
				this.obstacles.splice(this.obstacles.indexOf(obstacle, 1))
				obstacle.element.remove()
			}
		})
		if (Math.random() > 0.25 && this.obstacles.length < 1) {
			this.obstacles.push(new Obstacle(this.gameScreen))
		}

		if (this.lives === 0) {
			this.endGame()
		}
	}
	endGame() {
		this.player.element.remove()
		this.obstacles.forEach((obstacle) => {
			obstacle.element.remove()
		})
		this.gameIsOver = true
		this.gameScreen.style.display = 'none'
		this.gameEndScreen.style.display = 'block'
	}
}
