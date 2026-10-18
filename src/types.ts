export type NotificationType = "info" | "error";

export type Notification = {
    id: string;
    type: NotificationType;
    message: string;
    active: boolean;
};