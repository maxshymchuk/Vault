type MenuButton = {
    title: string;
    action: (record: VaultRecord) => void;
}

type Props = {
    record: VaultRecord;
    buttons?: Array<MenuButton>;
    isSelected?: boolean;
    onClick?: (record: VaultRecord) => void;
    onSelect?: (record: VaultRecord) => void;
}

export type { MenuButton, Props };