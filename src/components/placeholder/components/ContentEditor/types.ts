/**
 * Editor content props interface
 * @interface EditorContentProps
 */
export interface EditorContentProps {
  /** Whether in editing mode */
  isEditing: boolean;
  /** Current content */
  content: string;
  /** Function to handle edit click */
  handleEditClick: (editing: boolean) => void;
  /** Function to set content */
  setContent: (content: string) => void;
  /** Name of the placeholder */
  name: string;
  /** Maximum height for textarea */
  maxHeight?: number;
}

/**
 * Edit handlers interface
 * @interface EditHandlers
 */
export interface EditHandlers {
  /** Function to handle cancel */
  handleCancel: () => void;
  /** Function to handle accept */
  handleAccept: () => void;
}

/**
 * Textarea controls props interface
 * @interface TextareaControlsProps
 */
export interface TextareaControlsProps {
  /** Whether in editing mode */
  isEditing: boolean;
  /** Function to handle cancel action */
  handleCancelClick: () => void;
  /** Function to handle accept action */
  handleAcceptClick: () => void;
}

/**
 * Textarea component props interface
 * @interface TextareaProps
 */
export interface TextareaProps {
  /** Current value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Change event handler */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Keydown event handler */
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

/**
 * Parameters for creating textarea props
 * @interface TextareaPropsParams
 */
export interface TextareaPropsParams {
  /** Current value */
  value: string;
  /** Default value */
  defaultValue?: string;
  /** Function to set value */
  setValue: React.Dispatch<React.SetStateAction<string>>;
  /** Whether in editing mode */
  isEditing?: boolean;
  /** Function to handle accept action */
  handleAcceptClick: () => void;
  /** Maximum height for textarea */
  maxHeight?: number;
}
