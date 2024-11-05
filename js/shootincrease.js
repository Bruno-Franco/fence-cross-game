class ShootIncreaser {
	constructor(gameScreen) {
		// GAMESCREEN TO POSITIONING THE BULLETS IN THE GAME SCREEN
		this.gameScreen = gameScreen
		// WIDTH AND HEIGTH OF BULLETS
		this.width = 60
		this.height = 60

		// LEFT - RANDON POSITIONING THE BULLETS IN THE X AXIS
		this.left = Math.floor(Math.random() * 300 + 30)

		// TOP - WHERE THE BULLETS WILL SPAWN
		this.top = -60

		// CREATE THE BULLETS IMG
		this.element = document.createElement('img')
		this.element.src = `../images/bullets.png`
		this.element.style.position = 'absolute'
		this.element.style.height = `${this.height}px`
		this.element.style.width = `${this.width}px`
		this.element.style.left = `${this.left}px`
		this.element.style.top = `${this.top}px`
		// this.element.classList.add('anime')

		this.gameScreen.appendChild(this.element)
	}

	move() {
		this.top += 2
		this.updatePosition()
	}
	updatePosition() {
		this.element.style.top = `${this.top}px`
		this.element.style.left = `${this.left}px`
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
