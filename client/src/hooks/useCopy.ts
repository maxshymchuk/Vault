import { useCallback } from 'react';
import { notify, useAppDispatch } from '../redux';

export default function useCopy(text?: string): () => void {
    const dispatch = useAppDispatch();

    return useCallback(() => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(
            () => dispatch(notify({ type: 'info', message: 'Copied!' })),
            () => dispatch(notify({ type: 'error', title: 'Error', message: 'Can\'t copy :(' }))
        );
    }, [dispatch, text]);
}