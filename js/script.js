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
		if (e.code === 'ArrowUp') {
			game.player.directionY = -4
		} else if (e.code === 'ArrowDown') {
			game.player.directionY = 4
		} else if (e.code === 'ArrowLeft') {
			game.player.directionX = -4
		} else if (e.code === 'ArrowRight') {
			game.player.directionX = 4
		} else if (e.code === 'Space') {
			game.blasteShot.play()
			let bulletLeftPos = game.player.left + 20
			let bulletTopPos = game.player.top + 2
			game.amno.push(new Bullet(bulletLeftPos, bulletTopPos))

			if (game.score >= 50 && game.score < 200) {
				game.leftAmno.push(new LeftBullet(bulletLeftPos, bulletTopPos))
				game.leftAmno.push(new RightBullet(bulletLeftPos, bulletTopPos))
			} else if (game.score >= 600 && game.score < 700) {
				game.leftAmno.push(new LeftBullet(bulletLeftPos, bulletTopPos))
				game.leftAmno.push(new RightBullet(bulletLeftPos, bulletTopPos))
			} else if (game.score >= 2000) {
				game.leftAmno.push(new LeftBullet(bulletLeftPos, bulletTopPos))
				game.leftAmno.push(new RightBullet(bulletLeftPos, bulletTopPos))
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
