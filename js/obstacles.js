class Obstacle {
	constructor(gameScreen) {
		// GAMESCREEN TO POSITIONING THE UFO IN THE GAME SCREEN
		this.gameScreen = gameScreen
		// WIDTH AND HEIGTH OF UFO
		this.width = 60
		this.height = 60

		// LEFT - RANDON POSITIONING THE UFO IN THE X AXIS
		// this.left = Math.floor(Math.random() * 300 + 50)
		this.left = Math.floor(Math.random() * 300 + 30)

		// TOP - WHERE THE UFO WILL SPAWN
		this.top = -60

		//  UFO BULLET
		this.bulletUfo = document.createElement('img')
		this.bulletUfo.src = 'images/ufo_bullet.png'
		this.bulletUfo.style.position = 'absolute'
		this.bulletUfo.style.width = `20px`
		this.bulletUfo.style.height = `20px`
		this.bulletUfo.style.top = `${this.top}px`
		this.bulletUfo.style.left = `${this.left}px`
		this.bulletUfo.style.opacity = 1

		// BULLETUFO POSITION
		this.bulletUfoTop
		this.bulletUfoLeft

		// BULLETUFO SHOOT
		this.bulletUfoShoot

		// CREATE THE UFO IMG
		this.element = document.createElement('img')
		this.element.src = `images/ufo.png`
		this.element.style.position = 'absolute'
		this.element.style.height = `${this.height}px`
		this.element.style.width = `${this.width}px`
		this.element.style.left = `${this.left}px`
		this.element.style.top = `${this.top}px`

		this.gameScreen.appendChild(this.element)
	}

	shoot() {
		// INSERT BULLETUFO ON SEREEN AND POSITIONING
		this.gameScreen.appendChild(this.bulletUfo)
		this.element.style.left = `${this.left - 20}px`
		this.element.style.top = `${this.top - 60}px`
	}
	move(level) {
		this.top += level

		// BULLETUFO MOVEMENT
		this.bulletUfoTop = this.top * 3

		this.updatePosition()
	}
	updatePosition() {
		this.element.style.top = `${this.top}px`
		this.element.style.left = `${this.left}px`

		// UPDATING BULLETUFO POSITION ON SCREEN
		this.bulletUfo.style.top = `${this.bulletUfoTop}px`
		this.bulletUfo.style.left = `${this.bulletUfoLeft}px`
	}
	bulletUfoDidCollide(player) {
		const playerRect = this.bulletUfo.getBoundingClientRect()
		const obstacleRect = player.element.getBoundingClientRect()

		if (
			playerRect.left < obstacleRect.right &&
			playerRect.right > obstacleRect.left &&
			playerRect.top < obstacleRect.bottom &&
			playerRect.bottom > obstacleRect.top
		) {
			return true
		} else {
			return false
		}
	}
}
