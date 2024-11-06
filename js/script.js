window.onload = function () {
	// BELLOW A NEW INSTANCE OF THE GAME
	// CAN BE INVOQUED WITH ALL GAME'S MOTHODS LIKE START()!!
	// BETTER, IN THIS CASE, TO CREATE THIS INSTANCE OUTSIDE FUNCTIONS!!
	// DOING THIS WE CAN INVOQUE ITS METHODS INSIDE ANY FUNCTION
	let game = new Game()

	// START BAME BTN - BELONGS TO GAME INTRO SCREEN
	// WILL BE HIDDEN AFTER GAME STARTS
	const startButton = document.getElementById('start-button')
	// RESTART BTN - BELONGS TO GAME END SCREEN (ITS HIDDEN BY NOW)
	// WILL BE DISPLAYED AFTER GAME ENDS
	const restartButton = document.getElementById('restart-button')
	// -------------------------------------
	// AVOID SHOT FOREVER
	function shot() {
		let shoot = (left, top) => game.amno.push(new Bullet(left, top))
		let shotAgain = setInterval(() => {
			shoot = (left, top) => game.amno.push(new Bullet(left, top))
		}, 1000)
		return {
			start(left, top) {
				shoot(left, top)
				game.blasteShot.play()
				shoot = () => ''
			},
			stop() {
				return shotAgain
			},
		}
	}
	function lateralShot() {
		let shotLeft = (left, top) =>
			game.leftAmno.push(new LeftBullet(left, top))
		let shotRight = (left, top) =>
			game.rightAmno.push(new RightBullet(left, top))
		let shotAgain = setInterval(() => {
			shotLeft = (left, top) =>
				game.leftAmno.push(new LeftBullet(left, top))
			shotRight = (left, top) =>
				game.rightAmno.push(new RightBullet(left, top))
		}, 1000)
		return {
			start(left, top) {
				shotLeft(left, top)
				shotRight(left, top)
				shotLeft = () => ''
				shotRight = () => ''
			},
			stop() {
				return shotAgain
			},
		}
	}
	const center = shot()
	const laterals = lateralShot()
	// ADD LISTENERS TO THE ARROW KEYS ON THE KEYBOARD
	window.addEventListener('keydown', (e) => {
		if (e.code === 'ArrowUp') {
			game.player.directionY = -4
		} else if (e.code === 'ArrowDown') {
			game.player.directionY = 4
		} else if (e.code === 'ArrowLeft') {
			game.player.directionX = -4
		} else if (e.code === 'ArrowRight') {
			game.player.directionX = 4
		} else if (e.code === 'Space') {
			let bulletLeftPos = game.player.left + 20
			let bulletTopPos = game.player.top + 2

			center.start(bulletLeftPos, bulletTopPos)

			if (game.score >= 50 && game.score < 250) {
				laterals.start(bulletLeftPos, bulletTopPos)
			} else if (game.score >= 300 && game.score < 500) {
				laterals.start(bulletLeftPos, bulletTopPos)
			} else if (game.score >= 800) {
				laterals.start(bulletLeftPos, bulletTopPos)
			}
		}
	})
	window.addEventListener('keyup', (e) => {
		e.preventDefault()
		if (e.code === 'ArrowUp') {
			game.player.directionY = 0
		} else if (e.code === 'ArrowDown') {
			game.player.directionY = 0
		} else if (e.code === 'ArrowLeft') {
			game.player.directionX = 0
		} else if (e.code === 'ArrowRight') {
			game.player.directionX = 0
		} else if (e.code === 'Space') {
			center.stop()
			laterals.stop()
		}
	})

	restartButton.addEventListener('click', () => {
		startGame()
	})

	startButton.addEventListener('click', function () {
		startGame()
	})

	function startGame() {
		// console.log('start game')
		game.start()
	}
}
