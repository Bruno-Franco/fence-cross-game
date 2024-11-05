class Player {
	constructor(gameScreen, left, top, width, height, imgSrc) {
		// GAMESCREEN CAMES FROM THE GAME CLASS
		// WITH THIS WE CAN POSITIONING THE PLANE ON THE SCREEN
		this.gameScreen = gameScreen

		// PLANE POSITION ON SCREEN
		this.left = left
		this.top = top
		// PLANE MEASURES
		this.width = width
		this.height = height

		// DIRECTIONX GIVES HORIZONTAL MOVEMENT TO THE PLANE
		// 0 - DON'T MOVE
		// 1 - MOVE TO THE RIGHT
		// -1 - MOVE TO THE LEFT
		this.directionX = 0

		// DIRECTIONY GIVES VERTICAL MOVEMENT TO THE PLANE
		// 0 - DON'T MOVE
		// 1 - MOVE DOWN
		// -1 - MOVE UP
		this.directionY = 0

		// CREATE PLANE ELEMENT TO INSERT IN THE DOM
		// WHAT WILL BE? CAR IMAGE, GIF... WHAT
		this.element = document.createElement('img')
		this.element.src = imgSrc
		this.element.style.position = 'absolute'
		this.element.style.width = `${width}px`
		this.element.style.height = `${height}px`
		this.element.style.left = `${left}px`
		this.element.style.top = `${top}px`

		// INSERT PLAYER ON GAME SCREEN
		this.gameScreen.appendChild(this.element)
	}

	move() {
		this.left += this.directionX
		this.top += this.directionY

		if (this.left < 10) {
			this.left = 10
		}

		if (this.top < 10) {
			this.top = 10
		}

		if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
			this.left = this.gameScreen.offsetWidth - this.width - 10
		}

		if (this.top > this.gameScreen.offsetHeight - this.height - 100) {
			this.top = this.gameScreen.offsetHeight - this.height - 100
		}

		this.updatePosition()
	}
	updatePosition() {
		this.element.style.left = `${this.left}px`
		this.element.style.top = `${this.top}px`
	}
	didCollide(obstacle) {
		const playerRect = this.element.getBoundingClientRect()
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
