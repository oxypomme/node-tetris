import type EventEmitter from "events";
import type {
	OtherEvent,
	SizeEvent,
	KeyEvent,
	TextEvent,
	MouseMoveEvent,
	MouseButtonEvent,
	MouseWheelEvent,
	MouseWheelScrollEvent,
	JoystickButtonEvent,
	JoystickConnectEvent,
	JoystickMoveEvent,
	TouchEvent,
	SensorEvent,
} from "sfml.js";

export type EventMap = {
	Closed: OtherEvent;
	LostFocus: OtherEvent;
	GainedFocus: OtherEvent;
	MouseLeft: OtherEvent;
	MouseEntered: OtherEvent;
	Resized: SizeEvent;
	KeyPressed: KeyEvent;
	KeyReleased: KeyEvent;
	TextEntered: TextEvent;
	MouseMoved: MouseMoveEvent;
	MouseButtonPressed: MouseButtonEvent;
	MouseButtonReleased: MouseButtonEvent;
	MouseWheelMoved: MouseWheelEvent;
	MouseWheelScrolled: MouseWheelScrollEvent;
	JoystickButtonPressed: JoystickButtonEvent;
	JoystickButtonReleased: JoystickButtonEvent;
	JoystickConnected: JoystickConnectEvent;
	JoystickDisconnected: JoystickConnectEvent;
	JoystickMoved: JoystickMoveEvent;
	TouchBegan: TouchEvent;
	TouchMoved: TouchEvent;
	TouchEnded: TouchEvent;
	SensorChanged: SensorEvent;
};

export type EventListener<T extends keyof EventMap> = (
	data: Omit<EventMap[T], "type">,
	preventDefault: () => void
) => void;

export type EventHandler = Omit<
	EventEmitter,
	"on" | "off" | "once" | "emit"
> & {
	on: <T extends keyof EventMap>(
		type: T,
		listener: EventListener<T>
	) => EventHandler;
	off: <T extends keyof EventMap>(
		type: T,
		listener: EventListener<T>
	) => EventHandler;
	once: <T extends keyof EventMap>(
		type: T,
		listener: EventListener<T>
	) => EventHandler;
	emit: <T extends keyof EventMap>(
		type: T,
		data?: Omit<EventMap[T], "type">,
		preventDefault?: () => void
	) => boolean;
};
