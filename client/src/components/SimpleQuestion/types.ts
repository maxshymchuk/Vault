import type { Props as SimpleDialogProps } from '../SimpleDialog/types';
import type { Props as ControlsProps } from './components/Controls';

type Props = Omit<SimpleDialogProps, 'actions'> & ControlsProps;

export type { Props };
