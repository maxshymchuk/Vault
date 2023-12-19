type MenuButton = {
    title: string;
    action: () => void;
}

type Props = {
    buttons: Array<MenuButton>;
    anchor: HTMLElement | null;
    onClose?: () => void;
}

export type { Props };