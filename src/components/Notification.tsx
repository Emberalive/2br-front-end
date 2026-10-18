import type {Notification} from "../types.ts";

type ComponentProps = {
    notifications: Notification[];
};

export default function Notification ({notifications}:ComponentProps) {
    const notification = notifications.slice(0, 4)
    return (
        <div className={'notification-container'}>
            {notification.map(notification => (
                <div
                    key={notification.id}
                    className={`notification ${notification.active ? "notification__active" : ""}`}
                    style={notification.type === "error" ? {borderRight: "3px solid red" } : {}}>
                    <p className="title">{notification.type === "error" ? "Error" : "Notification"}</p>
                    <p>{notification.message}</p>
                </div>
            ))}
        </div>
    )
}