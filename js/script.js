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
			console.log('moving to the top')
			game.player.directionY = -2
		} else if (e.code === 'ArrowDown') {
			console.log('moving down')
			game.player.directionY = 2
		} else if (e.code === 'ArrowLeft') {
			console.log('moving left')
			game.player.directionX = -2
		} else if (e.code === 'ArrowRight') {
			console.log('moving right')
			game.player.directionX = 2
		} else if (e.code === 'Space') {
			console.log('SHOOT!!! ')
		}
	})
	window.addEventListener('keyup', (e) => {
		e.preventDefault()
		if (e.code === 'ArrowUp') {
			console.log('moving to the top')
			game.player.directionY = 0
		} else if (e.code === 'ArrowDown') {
			console.log('moving down')
			game.player.directionY = 0
		} else if (e.code === 'ArrowLeft') {
			console.log('moving left')
			game.player.directionX = 0
		} else if (e.code === 'ArrowRight') {
			console.log('moving right')
			game.player.directionX = 0
		}
	})

	startButton.addEventListener('click', function () {
		startGame()
	})

	function startGame() {
		console.log('start game')
		game.start()
	}
}
