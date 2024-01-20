import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { notify } from '../../redux';

export default function useCopy(text?: string): () => void {
    const dispatch = useDispatch();

    return useCallback(() => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(
            () => dispatch(notify({ type: 'info', message: 'Copied!' })),
            () => dispatch(notify({ type: 'error', title: 'Error', message: 'Can\'t copy :(' }))
        );
    }, [dispatch, text]);
}