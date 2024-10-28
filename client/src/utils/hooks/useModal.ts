import { useCallback, useMemo, useState } from 'react';

type Props<T> = {
    show?: boolean;
    content?: T;
    [key: string]: unknown;
}

type ReturnType<T> = {
    isOpen: boolean;
    show: (content?: T) => void;
    hide: () => void;
    content: T | undefined;
}

export default function useModal<T = unknown>(options?: Props<T>): ReturnType<T> {
    const _options = { show: false, ...options };

    const [state, setState] = useState({
        show: _options.show,
        content: _options.content
    });

    const show = useCallback((content: T) => {
        if (content === undefined) {
            setState(state => ({ ...state, show: true }));
        } else {
            setState({ show: true, content });
        }
    }, []);

    const hide = useCallback(() => {
        setState(state => ({ ...state, show: false }));
    }, []);

    const isOpen = useMemo(() => state.show, [state.show]);
    const content = useMemo(() => state.content, [state.content]);

    return { isOpen, show, hide, content };
}