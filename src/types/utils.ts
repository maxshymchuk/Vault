type EventsType = 'error' | 'info';

type Notification = {
    type: EventsType;
    message: string;
}

export type { EventsType, Notification };