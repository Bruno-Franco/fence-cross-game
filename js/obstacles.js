class Obstacle {
	constructor(gameScreen) {
		// GAMESCREEN TO POSITIONING THE OVNI IN THE GAME SCREEN
		this.gameScreen = gameScreen
		// WIDTH AND HEIGTH OF UFO
		this.width = 60
		this.height = 60

		// LEFT - RANDON POSITIONING THE OVNI IN THE X AXIS
		this.left = Math.floor(Math.random() * 300 + 70)

		// TOP - WHERE THE CAR WILL SPAWN
		this.top = 0

		// CREATE THE OVNI IMG
		this.element = document.createElement('img')
		this.element.src = `../images/ufo.png`
		this.element.style.position = 'absolute'
		this.element.style.height = `${this.height}px`
		this.element.style.width = `${this.width}px`
		this.element.style.left = `${this.left}px`
		this.element.style.top = `${this.top}px`

		this.gameScreen.appendChild(this.element)
	}
	move() {
		this.top += 3
		this.updatePosition()
	}
	updatePosition() {
		this.element.style.top = `${this.top}px`
		this.element.style.left = `${this.left}px`
	}
}
