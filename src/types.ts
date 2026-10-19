export type NotificationType = "info" | "error";

export type Notification = {
    id: string;
    type: NotificationType;
    message: string;
    active: boolean;
};

export type Review = {
    created_at: string;
    id: string;
    content: string;
    username: string;
}