class Bullet {
	constructor(positionX, positionY) {
		// GAMESCREEN CAMES FROM THE GAME CLASS
		// WITH THIS WE CAN POSITIONING THE BULLET ON THE SCREEN
		this.gameScreen = document.getElementById('game-screen')

		// BULLET POSITION ON SCREEN
		this.left = positionX
		this.top = positionY

		// BULLET POSITION

		this.bulletTop = `${this.top + 2}`
		this.bulletLeft = `${this.left + 20}`

		this.bullet = document.createElement('img')
		this.bullet.src = 'images/bullet.png'
		this.bullet.style.position = 'absolute'
		this.bullet.style.width = `20px`
		this.bullet.style.height = `20px`
		this.bullet.style.left = `${this.left}px`
		this.bullet.style.top = `${this.top}px`

		this.gameScreen.appendChild(this.bullet)
	}

	move() {
		this.top -= 10
		this.updatePosition()
	}
	updatePosition() {
		// UPDATING BULLET POSITION ON SCREEN
		this.bullet.style.top = `${this.top}px`
	}

	bulletDidCollide(obstacle) {
		const playerRect = this.bullet.getBoundingClientRect()
		const obstacleRect = obstacle.element.getBoundingClientRect()

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
