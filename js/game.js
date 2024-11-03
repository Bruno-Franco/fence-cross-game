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
		this.player
		// HEIGHT AND WIDTH OF THE SCREEN
		this.height = 600
		this.width = 400
		// THIS.OBSTACLES RECEIVES A FEW OBSTACLES INSTANCES WITH ALL
		// OF ITS METOHDS
		// ALL HIS BEHAVIOUR WILL BE GRABBED BY GAME UPDATE
		// (UPDATING OBSTACLES STATE)
		// AND PASSED TO THE GAME LOOP
		this.obstacles = []
		this.score
		this.lives
		this.gameIsOver
		this.gameIntervalId
		this.gameLoopFrequency = Math.round(1000 / 60)
		this.liveInHtml = document.getElementById('lives')
		this.score = 0
		this.level = 0.98
		this.levelIncreasing

		// GET SCORE IN HTML
		this.scoreInHtml = document.getElementById('score')

		// GET AND SET LEVEL IN HTML
		this.levelInHtml = document.getElementById('level')
		this.levelNumberInHtml = document.getElementById('level-number')
		this.levelNumber
		this.fiveSecRemaining = 10
		this.timer
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

		// FOR RESTART
		this.obstacles = [new Obstacle(this.gameScreen)]
		this.gameIsOver = false
		this.lives = 3
		this.player = new Player(
			this.gameScreen,
			170,
			500,
			60,
			60,
			'../images/aircraft.png'
		)
		this.score = 0
		this.levelNumber = 1

		// LEVEL INCREASING
		this.levelIncreasing = setInterval(() => {
			// this.level -= 0.1
			this.levelNumber++
		}, 10000)

		// LEVEL TIMER
		this.timer = setInterval(() => {
			this.fiveSecRemaining--
			if (this.fiveSecRemaining === 0) {
				this.fiveSecRemaining = 10
			}
		}, 1000)
	}

	gameLoop() {
		// CHECK IF GAME IS OVER
		// IF YES STOPS - INTERVAL, THE LOOP
		// ANS STOPS UPDATE (GAME STATE) AS WELL
		if (this.gameIsOver) {
			clearInterval(this.gameIntervalId)
			clearInterval(this.levelIncreasing)
			clearInterval(this.timer)
		}

		// UPDATE PASS NEW GAME STATE TO THE LOOP
		this.update()
	}

	update() {
		// RECEIVES ALL UPDATES FROM INSTANCES
		this.player.move()

		// LEVEL UPDATE
		this.levelInHtml.innerText = `${this.fiveSecRemaining}sec`
		this.levelNumberInHtml.innerText = `${this.levelNumber}`
		// UPDATE ALL PLAYER MOVEMENTS
		this.obstacles.forEach((obstacle) => {
			obstacle.move(this.levelNumber)

			// REMOVE LIVES IF EXISTS COLISIONS
			if (this.player.didCollide(obstacle)) {
				this.lives--
				this.liveInHtml.innerText = this.lives
				this.obstacles.splice(this.obstacles.indexOf(obstacle, 1))
				obstacle.element.src = '../images/explode.png'
				this.player.element.style.opacity = 0.7
				setTimeout(() => {
					obstacle.element.style.opacity = 0.8
					this.player.element.style.opacity = 0.8
				}, 500)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.6
					this.player.element.style.opacity = 0.9
				}, 1000)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.3
					this.player.element.style.opacity = 1
				}, 1500)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.1

					obstacle.element.remove()
				}, 1500)
			} else if (obstacle.top > 550) {
				this.obstacles.splice(this.obstacles.indexOf(obstacle, 1))
				obstacle.element.remove()
			}

			// ADD POINTS TO THE SCORE
			if (this.player.bulletDidCollide(obstacle)) {
				this.score += 5
				this.scoreInHtml.innerText = this.score
				this.obstacles.splice(this.obstacles.indexOf(obstacle, 1))
				obstacle.element.src = '../images/explode.png'
				this.player.bullet.remove()
				this.player.element.style.opacity = 0.7
				setTimeout(() => {
					obstacle.element.style.opacity = 0.8
					this.player.element.style.opacity = 0.8
				}, 500)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.6
					this.player.element.style.opacity = 0.9
				}, 1000)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.3
					this.player.element.style.opacity = 1
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
		if (Math.random() > this.level && this.obstacles.length < 1) {
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
