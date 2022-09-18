import {
	Clock,
	Event,
	Font,
	RectangleShape,
	RenderWindow,
	Text,
	VideoMode,
} from "sfml.js";
import { COLORS } from "./colors";
import { join } from "path";
import { EventEmitter } from "node:events";
import { EventHandler } from "../types/events";

// TODO: Settings
const window = new RenderWindow(new VideoMode(640, 480, 32), "Tetris");

// TODO: Settings ?
window.setFramerateLimit(144);
window.setVerticalSyncEnabled(true);

const font = new Font();
// TODO: async
font.loadFromFileSync(join(__dirname, "../fonts/Nexa-Bold.ttf"));

// TODO: Settings ?
const text = new Text("FPS: -", font, 15);
text.setPosition(20, 20);
text.setFillColor(COLORS.ACCENT1);

const clock = new Clock();

const eventHandler = new EventEmitter({ captureRejections: true });
eventHandler.on("error", () => {
	// TODO: Handle unexpected errors
});
eventHandler.on("close", () => {
	window.close();
});

export const game = {
	get fps(): string {
		return (1 / clock.getElapsedTime().asSeconds()).toFixed(0);
	},
	// TODO: Wrapper of EventEmitter instead of Retyping
	events: eventHandler as EventHandler,
};

//* Mini game
// [x, y]
let pos: [number, number] = [0, 0];
// x: width | y: height
const player = new RectangleShape({ x: 10, y: 20 });
player.setFillColor(COLORS.ACCENT2);
const speed = 10;

const loop = () => {
	if (!window.isOpen()) return;

	// Getting FPS
	// TODO: Settings ?
	text.setString(`FPS: ${game.fps}`);
	clock.restart();

	window.clear(COLORS.BACKGROUND);
	window.draw(text);

	let e: Event;
	while ((e = window.pollEvent())) {
		const { type, ...data } = e;
		let prevented = false;
		//! Shouldn't be the same function for emiting from the "engine" & from the "game"
		game.events.emit(type, data, () => (prevented = true));

		//* Mini game
		if (e.type === "KeyPressed") {
			console.log("Pressed:", e.key.codeStr);

			switch (e.key.codeStr) {
				case "Z":
					pos[1] -= speed;
					break;
				case "Q":
					pos[0] -= speed;
					break;
				case "S":
					pos[1] += speed;
					break;
				case "D":
					pos[0] += speed;
					break;

				default:
					break;
			}
		}

		// TODO: Clean up that mess
		// TODO: Register some events by default (for closing, etc.)
		if (!prevented) {
			if (
				e.type === "Closed" ||
				(e.type === "KeyPressed" && e.key.codeStr === "Escape")
			) {
				window.close();
				return;
			}
		}
	}

	//* Mini game
	player.setPosition({ x: pos[0], y: pos[1] });
	window.draw(player);

	// TODO: Call event for drawing or smthng like that

	window.display();
	setImmediate(loop);
};

clock.restart();
loop();
