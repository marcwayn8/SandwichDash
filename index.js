kaboom({
	// Scale the whole game up
	scale: 2,
	// Set the default font
	font: "sinko",
});

//Timer
var timeOfGame = 120
// while(timeOfGame>0)
// {
// timeOfGame=timeOfGame-1}
const li = () => { timeOfGame-- }
let autocount = setInterval(li, 1000)
var timerText = `Timer:${new Date((timeOfGame)* 1000).toISOString().substring(14, 19)}`;

add([
	text(`${timerText}`)
])
if (timeOfGame = 0) {
	go("outro")
}


var score = 0
loadSprite("clearsky", "DinerPic.jpg")
loadSprite("meat", "meat.png")
loadSprite("lettuce", "lettuce.png")
loadSprite("onions", "onions.png")
loadSprite("tomatoes", "tomatoes.png")
loadSprite("bread", "bread.png")
loadSprite("bread2", "bread.png")
loadSprite("cheese", "cheese.png")
// Load assets
loadSprite("bean", "bread.png")
loadSprite("bone", "bone1.png")
loadSprite("bomb", "bomb1.png")
loadSprite("boot", "boot1.png")


//Opening scene

scene('intro', () => {
	let background = add([
		sprite("clearsky"),
		pos(width() / 2, height() / 2),
		origin("center"),
		scale(1),
		fixed()
	]);

	add([

		text("Welcome to SandWich Dash"),
		pos(500, 250)
	])

	//create Landing page buttons
	function addButton(txt, p, f) {

		const btn = add([
			text(txt),
			pos(p),
			area({ cursor: "pointer", }),
			scale(1),
			origin("center"),
		])

		btn.onClick(f)

		btn.onUpdate(() => {
			if (btn.isHovering()) {
				const t = time() * 10
				btn.color = rgb(
					wave(0, 255, t),
					wave(0, 255, t + 2),
					wave(0, 255, t + 4),
				)
				btn.scale = vec2(1.2)
			}
			else {
				btn.scale = vec2(1)
				btn.color = rgb()
			}
		})

	}
	addButton("start", (500, 100), function() {

		go('game')
	})

	addButton("How to Play", (200, 200), function() { document.open("instructions.html", "How To Play", "width=600,height=600") })
})
go('intro')



//Ending scene
scene('outro', () => {
	let background = add([
		sprite("clearsky"),
		pos(width() / 2, height() / 2),
		origin("center"),
		scale(1),
		fixed()
	]);

	add([

		text("Sorry You Ran out of time"),
		pos(500, 250)
	])

	//create Landing page buttons
	function addButton(txt, p, f) {

		const btn = add([
			text(txt),
			pos(p),
			area({ cursor: "pointer", }),
			scale(1),
			origin("center"),
		])

		btn.onClick(f)

		btn.onUpdate(() => {
			if (btn.isHovering()) {
				const t = time() * 10
				btn.color = rgb(
					wave(0, 255, t),
					wave(0, 255, t + 2),
					wave(0, 255, t + 4),
				)
				btn.scale = vec2(1.2)
			}
			else {
				btn.scale = vec2(1)
				btn.color = rgb()
			}
		})

	}
	addButton("Play Again", (500, 100), function() {

		go('game')
	})

	addButton("How to Play", (200, 200), function() { document.open("instructions.html", "How To Play", "width=600,height=600") })


	add([
		// text() component is similar to sprite() but renders text
		text(`Your New High Score is ${score}`),
		pos(550, 12),
	])
})



//Game logic scene

scene('game', () => {
	let background = add([
		sprite("clearsky"),
		pos(width() / 2, height() / 2),
		origin("center"),
		scale(1),
		fixed()
	]);


	function addButton(txt, p, f) {

		const btn = add([
			text(txt),
			pos(p),
			area({ cursor: "pointer", }),
			scale(1),
			origin("center"),
		])

		btn.onClick(f)

		btn.onUpdate(() => {
			if (btn.isHovering()) {
				const t = time() * 10
				btn.color = rgb(
					wave(0, 255, t),
					wave(0, 255, t + 2),
					wave(0, 255, t + 4),
				)
				btn.scale = vec2(1.2)
			}
			else {
				btn.scale = vec2(1)
				btn.color = rgb()
			}
		})

	}

	addButton("Restart", (90, 35), function() {

		go('outro')
	})


	//Movement
	// Define player movement speed (pixels per second)
	const SPEED = 320;
	// Add player game object
	const player = add([
		sprite("bean"),
		scale(0.2),
		area(),
		// solid() component makes the object can't move pass other solid objects
		solid(),
		// center() returns the center point vec2(width() / 2, height() / 2)
		pos(center()),
	])
	// onKeyDown() registers an event that runs every frame as long as user is holding a certain key
	onKeyDown("left", () => {
		// .move() is provided by pos() component, move by pixels per second
		player.move(-SPEED, 0)
	})
	onKeyDown("right", () => {
		player.move(SPEED, 0)
	})
	onKeyDown("up", () => {
		player.move(0, -SPEED)
	})
	onKeyDown("down", () => {
		player.move(0, SPEED)
	})
	// onClick() registers an event that runs once when left mouse is clicked
	onClick(() => {
		// .moveTo() is provided by pos() component, changes the position
		player.moveTo(mousePos())
	})


	add([
		// text() component is similar to sprite() but renders text
		text(`Score ${score}`),
		pos(550, 12),
	])



	//Randomizer
	const toxic = ["boot", "bone", "bomb"]
	const options = ["meat", "lettuce", "onions", "bread", "tomatoes", "cheese"]
	const randomizer = () => options[Math.floor(Math.random() * options.length)]

	const looper = () => {
		loop(5, () => {
			add([
				sprite(randomizer()),
				pos(rand(vec2(width())).x, 10),
				`tag1`,
				area(),
				solid(),
				scale(.2),
				move(DOWN, 240),
				'friendly'
			])
		});
	}

	looper()
	const randomizer2 = () => toxic[Math.floor(Math.random() * toxic.length)]

	const looper2 = () => {
		loop(1, () => {
			add([
				sprite(randomizer2()),
				pos(rand(vec2(width())).x, 10),
				`tag1`,
				area(),
				solid(),
				scale(.2),
				move(DOWN, 240),
				"enemy"
			])
		});
	}

	looper2()


	add([
		text("Press arrow keys", { width: width() / 2 }),
		pos(12, 12),
	])


//Collision
	player.onCollide("friendly", (food) => {
		destroy(food),
			score += 10
		wait(10, () => {
			destroy(food)
		})
	})
	player.onCollide("enemy", (enemy) => {
		destroy(enemy),
			score -= 10
		wait(3, () => {
			destroy(enemy)
		})
	})
})


//Music
loadSound("music", "music.m4a")

// play() to play audio
// (This might not play until user input due to browser policy)
const music = play("music", {
	loop: true,
})

// Adjust global volume
volume(0.5)
