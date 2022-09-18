import { game } from "./engine";

game.events.on("KeyPressed", ({ key: { codeStr } }, preventDefault) => {
	if (codeStr === "Escape") {
		console.log(codeStr);

		// preventDefault();
	}
});
