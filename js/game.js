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

		// SPACESHIP AMNO
		this.amno = []
		this.leftAmno = []
		this.rightAmno = []
		// GET SCORE IN HTML
		this.scoreInHtml = document.getElementById('score')

		// GET AND SET LEVEL IN HTML
		this.levelInHtml = document.getElementById('level')
		this.levelNumberInHtml = document.getElementById('level-number')
		this.levelNumber
		this.fiveSecRemaining = 10
		this.timer
		this.ufos = 1
		// AUDIO EXPLOSION
		this.explosion = new Audio('../sounds/bit-cannon.mp3')
		this.blasteShot = new Audio('../sounds/blaster-shot.mp3')
	}

	// if (
	// 	this.score === 50 ||
	// 	this.score === 200 ||
	// 	this.score === 400 ||
	// 	this.score === 600 ||
	// 	this.score === 700 ||
	// 	this.score === 1000
	// ) {
	// 	this.ufos += 1
	// }

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
		this.obstacles = []
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
			'../images/battleship.png'
		)

		this.amno
		this.leftAmno
		this.rightAmno
		this.amno = []
		this.leftAmno = []
		this.rightAmno = []
		this.ufos = 1

		// LEVEL INCREASING
		this.levelIncreasing = setInterval(() => {
			this.levelNumber++
			this.ufos += 1
		}, 15000)

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
		// UPDATE ALL UFO AND ITS BULLETS MOVEMENTS
		this.obstacles.forEach((obstacle, index) => {
			obstacle.move(this.levelNumber)

			// -----------
			// UFO SHOOT
			obstacle.shoot()

			// ------------------------------
			// REMOVE FROM SCREEN
			if (obstacle.top > 600) {
				this.obstacles.splice(index, 1)
				obstacle.element.remove()
				obstacle.bulletUfo.remove()
			}

			// ------------------------------
			// UFO BULLET COLLIDING SPACESHIP
			if (obstacle.bulletUfoDidCollide(this.player)) {
				// obstacle.bulletUfo.remove()
				obstacle.element.remove()
				this.lives--
				this.liveInHtml.innerText = this.lives
				this.obstacles.splice(index, 1)

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
					obstacle.bulletUfo.remove()
				}, 1600)
			}

			// ----------------------------------
			// SPACESHIP COLLIDING
			if (this.player.didCollide(obstacle)) {
				// ------------------------------
				// COLLIDING WITH PLAYER(SPACESHIP)
				obstacle.element.src = '../images/explode.png'
				obstacle.bulletUfo.src = '../images/explode.png'

				this.lives--
				this.liveInHtml.innerText = this.lives

				this.obstacles.splice(index, 1)
				// ----------------------------------------
				// BULLET DISAPPEARING AND PLAYER RECHARGING
				this.player.element.style.opacity = 0.7
				setTimeout(() => {
					obstacle.element.style.opacity = 0.8
					obstacle.bulletUfo.style.opacity = 0.8
					this.player.element.style.opacity = 0.8
				}, 500)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.6
					obstacle.bulletUfo.style.opacity = 0.6
					this.player.element.style.opacity = 0.9
				}, 1000)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.3
					obstacle.bulletUfo.style.opacity = 0.3
					this.player.element.style.opacity = 1
				}, 1500)
				setTimeout(() => {
					obstacle.element.style.opacity = 0.0
					obstacle.bulletUfo.style.opacity = 0.0
					obstacle.bulletUfo.remove()
				}, 1500)
			}
		})

		// -------------------------------
		// ADD BULLETS TO THE SCREEN AND DISAPPEARING WHEN REACHES
		// A NEGATIVE NUMBER TOP OF PLAYABLE AREA
		this.amno.forEach((bullet, index) => {
			bullet.move()
			this.obstacles.forEach((obstacle, obsIndex) => {
				if (bullet.bulletDidCollide(obstacle)) {
					obstacle.element.src = '../images/explode.png'
					obstacle.bulletUfo.src = '../images/explode.png'
					this.obstacles.splice(obsIndex, 1)
					bullet.bullet.remove()
					this.amno.splice(index, 1)
					this.score += 10

					this.scoreInHtml.innerText = this.score
					// -----------------------------
					// PLAY EXPLOSION
					this.explosion.play()
					// -----------------------------
					// OBSTACLES DISAPEARING
					obstacle.bulletUfo.style.opacity = 0.5
					setTimeout(() => {
						obstacle.element.style.opacity = 0.8
						obstacle.bulletUfo.style.opacity = 0.0
						obstacle.bulletUfo.remove()
					}, 500)
					setTimeout(() => {
						obstacle.element.style.opacity = 0.6
					}, 1000)
					setTimeout(() => {
						obstacle.element.style.opacity = 0.3
					}, 1500)
					setTimeout(() => {
						obstacle.element.style.opacity = 0.0
					}, 1500)
				}
			})
			if (bullet.top < 0) {
				this.amno.splice(index, 1)
				bullet.bullet.remove()
			}
		})

		// -------------------------------
		// ADD LEFT BULLETS TO THE SCREEN AND DISAPPEARING WHEN RACHES
		// A NEGATIVE NUMBER TOP OF PLAYABLE AREA
		this.leftAmno.forEach((bullet, index) => {
			bullet.move()
			this.obstacles.forEach((obstacle, obsIndex) => {
				if (bullet.bulletDidCollide(obstacle)) {
					obstacle.element.src = '../images/explode.png'
					obstacle.bulletUfo.src = '../images/explode.png'
					this.obstacles.splice(obsIndex, 1)
					bullet.bullet.remove()
					this.leftAmno.splice(index, 1)
					this.score += 10

					this.scoreInHtml.innerText = this.score
					// -----------------------------
					// PLAY EXPLOSION
					this.explosion.play()
					// -----------------------------
					// OBSTACLES DISAPEARING
					obstacle.bulletUfo.style.opacity = 0.5
					setTimeout(() => {
						obstacle.element.style.opacity = 0.8
						obstacle.bulletUfo.style.opacity = 0.0
						obstacle.bulletUfo.remove()
					}, 500)
					setTimeout(() => {
						obstacle.element.style.opacity = 0.6
					}, 1000)
					setTimeout(() => {
						obstacle.element.style.opacity = 0.3
					}, 1500)
					setTimeout(() => {
						obstacle.element.style.opacity = 0.0
					}, 1500)
				}
			})
			if (bullet.top < 0) {
				this.leftAmno.splice(index, 1)
				bullet.bullet.remove()
			}
		})

		// -------------------------------
		// ADD RIGHT BULLETS TO THE SCREEN AND DISAPPEARING WHEN REACHES
		// A NEGATIVE NUMBER TOP OF PLAYABLE AREA
		this.rightAmno.forEach((bullet, index) => {
			bullet.move()
			this.obstacles.forEach((obstacle, obsIndex) => {
				if (bullet.bulletDidCollide(obstacle)) {
					obstacle.element.src = '../images/explode.png'
					obstacle.bulletUfo.src = '../images/explode.png'
					this.obstacles.splice(obsIndex, 1)
					bullet.bullet.remove()
					this.rightAmno.splice(index, 1)
					this.score += 10

					this.scoreInHtml.innerText = this.score
					// -----------------------------
					// PLAY EXPLOSION
					this.explosion.play()
					// -----------------------------
					// OBSTACLES DISAPEARING
					obstacle.bulletUfo.style.opacity = 0.5
					setTimeout(() => {
						obstacle.element.style.opacity = 0.8
						obstacle.bulletUfo.style.opacity = 0.0
						obstacle.bulletUfo.remove()
					}, 500)
					setTimeout(() => {
						obstacle.element.style.opacity = 0.6
					}, 1000)
					setTimeout(() => {
						obstacle.element.style.opacity = 0.3
					}, 1500)
					setTimeout(() => {
						obstacle.element.style.opacity = 0.0
					}, 1500)
				}
			})
			if (bullet.top < 0) {
				this.rightAmno.splice(index, 1)
				bullet.bullet.remove()
			}
		})

		// ------------------------
		// ADD RANDOM UFO
		if (Math.random() > 0.9 && this.obstacles.length < this.ufos) {
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
		this.amno.forEach((obstacle) => {
			obstacle.element.remove()
		})
		this.leftAmno.forEach((obstacle) => {
			obstacle.element.remove()
		})
		this.rightAmno.forEach((obstacle) => {
			obstacle.element.remove()
		})
		this.amno = []
		this.leftAmno = []
		this.rightAmno = []
		this.obstacles = []

		this.gameIsOver = true
		this.gameScreen.style.display = 'none'
		this.gameEndScreen.style.display = 'block'
	}
}
