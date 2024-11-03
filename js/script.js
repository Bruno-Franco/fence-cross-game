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

	// ADD LISTENERS TO THE ARROW KEYS ON THE KEYBOARD
	window.addEventListener('keydown', (e) => {
		e.preventDefault()
		if (e.code === 'ArrowUp') {
			game.player.directionY = -3
		} else if (e.code === 'ArrowDown') {
			game.player.directionY = 3
		} else if (e.code === 'ArrowLeft') {
			game.player.directionX = -3
		} else if (e.code === 'ArrowRight') {
			game.player.directionX = 3
		} else if (e.code === 'Space') {
			game.player.shoot()
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
		}
	})

	// CALL PLAYER SHOOT EVERYTIME PULL SPACE
	window.addEventListener('keypress', (e) => {
		// e.preventDefault()
		if (e.code === 'Space') {
			game.player.shoot()
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
