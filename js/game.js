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
		// HIDE END SCREEN
		this.gameEndScreen.style.display = 'none'

		// DEFINE GAME HEIGHT AND WIDTH
		this.gameScreen.style.height = `${this.height}px`
		this.gameScreen.style.width = `${this.width}px`

		// SCREEN REFRESH RATE 60 FPS - FRAMES PER SECOND
		// CREATES MOVIMENT LOOPING THE UPDATES STATES OF THE GAME
		this.gameIntervalId = setInterval(() => {
			this.gameLoop()
		}, this.gameLoopFrequency)

		// FOR RESTART
		this.obstacles = [new Obstacle(this.gameScreen)]
		this.gameIsOver = false
		this.lives = 3
		this.liveInHtml.innerText = this.lives
		this.score = 0
		this.levelNumber = 1
		this.player = new Player(
			this.gameScreen,
			170,
			500,
			60,
			60,
			'../images/aircraft.png'
		)

		// LEVEL INCREASING
		this.levelIncreasing = setInterval(() => {
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
		// --------------------------------
		// RECEIVES ALL UPDATES FROM INSTANCES
		this.player.move()

		// ------------------------------
		// LEVEL UPDATE
		this.levelInHtml.innerText = `${this.fiveSecRemaining}sec`
		this.levelNumberInHtml.innerText = `${this.levelNumber}`

		// ------------------------------
		// UPDATE ALL PLAYER MOVEMENTS
		this.obstacles.forEach((obstacle, index) => {
			obstacle.move(this.levelNumber)

			// -----------
			// UFO SHOOT
			obstacle.shoot()

			// ------------------------------
			// REMOVE FROM SCREEN
			if (obstacle.top > 650) {
				this.obstacles.splice(this.obstacles.indexOf(obstacle, 1))
				obstacle.element.remove()
				obstacle.bulletUfo.remove()
			}

			// ---------------------------------
			// REMOVE LIVES IF EXISTS COLISIONS
			if (this.player.didCollide(obstacle)) {
				obstacle.bulletUfo.remove()
				obstacle.element.src = '../images/explode.png'
				obstacle.bulletUfo.src = '../images/explode.png'

				this.lives--

				this.liveInHtml.innerText = this.lives
				this.obstacles.splice(index, 1)

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
					obstacle.element.style.opacity = 0.0

					obstacle.element.remove()
				}, 1500)
			}

			// ---------------------------------
			// UFOSBULLET HITS PLAYER
			if (obstacle.bulletUfoDidCollide(this.player)) {
				this.obstacles.splice(index, 1)
				this.player.bullet.remove()
				obstacle.element.remove()
				this.lives--
				this.liveInHtml.innerText = this.lives

				obstacle.bulletUfo.src = '../images/explode.png'

				this.player.element.style.opacity = 0.7
				setTimeout(() => {
					this.player.element.style.opacity = 0.8
					obstacle.bulletUfo.style.opacity = 0.8
				}, 500)
				setTimeout(() => {
					this.player.element.style.opacity = 0.9
					obstacle.bulletUfo.style.opacity = 0.7
				}, 1000)
				setTimeout(() => {
					this.player.element.style.opacity = 1
					obstacle.bulletUfo.style.opacity = 0.4
				}, 1500)
				setTimeout(() => {
					obstacle.bulletUfo.style.opacity = 0.0
				}, 1600)
			}

			// --------------------------------------
			// ADD POINTS TO THE SCORE
			if (this.player.bulletDidCollide(obstacle)) {
				this.player.bullet.remove()
				obstacle.bulletUfo.remove()

				this.score += 5
				this.scoreInHtml.innerText = this.score
				this.obstacles.splice(this.obstacles.indexOf(obstacle, 1))
				obstacle.element.src = '../images/explode.png'
				obstacle.element.style.opacity = 0.8
				setTimeout(() => {
					obstacle.element.style.opacity = 0.6
				}, 100)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.4
				}, 200)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.0
					obstacle.element.remove()
				}, 300)
			}
		})

		// ------------------------
		// ADD RANDOM UFO
		if (Math.random() > 0.97 && this.obstacles.length < 1) {
			this.obstacles.push(new Obstacle(this.gameScreen))
		}

		// -----------------
		// GAME ENDS
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
