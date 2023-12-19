import { Events } from '../constants/config';
import { EventsType } from '../types';
import { SyntheticEvent } from 'react';

export function dispatchEvent<T>(event: string, detail: T): void {
    document.dispatchEvent(new CustomEvent(event, { detail }));
}

export function dispatchNotification(type: EventsType, message: string) {
    return dispatchEvent(Events.Notification, { type, message });
}

export function stopPropagation(event: SyntheticEvent) {
    event.stopPropagation();
}