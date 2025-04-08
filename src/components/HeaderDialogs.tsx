/**
 * Header Dialogs Component
 *
 * Contains the dialogs used in the header
 *
 * @module components/HeaderDialogs
 */
import { Template } from '@/types';
import { SaveTemplateDialog } from '@/components/dialog/SaveTemplateDialog';
import { LoadTemplateDialog } from '@/components/dialog/LoadTemplateDialog';
import { ResetConfirmationDialog } from '@/components/dialog/ResetConfirmationDialog';

interface HeaderDialogsProps {
  isSaveDialogOpen: boolean;
  isLoadDialogOpen: boolean;
  isResetDialogOpen: boolean;
  templateName: string;
  selectedTemplateId: string;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
  setIsLoadDialogOpen: (isOpen: boolean) => void;
  setIsResetDialogOpen: (isOpen: boolean) => void;
  setTemplateName: (name: string) => void;
  setSelectedTemplateId: (id: string) => void;
  handleSaveTemplate: () => void;
  handleLoadTemplate: () => void;
  handleReset: () => void;
  templates: Template[];
}

interface SaveDialogProps extends Pick<HeaderDialogsProps, 'isSaveDialogOpen' | 'setIsSaveDialogOpen' | 'handleSaveTemplate' | 'templateName' | 'setTemplateName'> {}
interface LoadDialogProps extends Pick<HeaderDialogsProps, 'isLoadDialogOpen' | 'setIsLoadDialogOpen' | 'handleLoadTemplate' | 'selectedTemplateId' | 'setSelectedTemplateId' | 'templates'> {}
interface ResetDialogProps extends Pick<HeaderDialogsProps, 'isResetDialogOpen' | 'setIsResetDialogOpen' | 'handleReset'> {}

/**
 * Save template dialog component
 * @param {SaveDialogProps} props - Dialog props
 * @returns {JSX.Element} Save template dialog
 */
function SaveDialog(props: SaveDialogProps): JSX.Element {
  return (
    <SaveTemplateDialog
      isOpen={props.isSaveDialogOpen}
      onClose={() => props.setIsSaveDialogOpen(false)}
      onSave={props.handleSaveTemplate}
      templateName={props.templateName}
      setTemplateName={props.setTemplateName}
    />
  );
}

/**
 * Load template dialog component
 * @param {LoadDialogProps} props - Dialog props
 * @returns {JSX.Element} Load template dialog
 */
function LoadDialog(props: LoadDialogProps): JSX.Element {
  return (
    <LoadTemplateDialog
      isOpen={props.isLoadDialogOpen}
      onClose={() => props.setIsLoadDialogOpen(false)}
      onLoad={props.handleLoadTemplate}
      templates={props.templates}
      selectedTemplateId={props.selectedTemplateId}
      setSelectedTemplateId={props.setSelectedTemplateId}
    />
  );
}

/**
 * Reset confirmation dialog component
 * @param {ResetDialogProps} props - Dialog props
 * @returns {JSX.Element} Reset confirmation dialog
 */
function ResetDialog(props: ResetDialogProps): JSX.Element {
  return (
    <ResetConfirmationDialog
      isOpen={props.isResetDialogOpen}
      onClose={() => props.setIsResetDialogOpen(false)}
      onConfirm={props.handleReset}
    />
  );
}

/**
 * Header dialogs component
 * @param {HeaderDialogsProps} props - Component props
 * @returns {JSX.Element} Header dialogs component
 */
export function HeaderDialogs(props: HeaderDialogsProps): JSX.Element {
  return (
    <>
      <SaveDialog {...props} />
      <LoadDialog {...props} />
      <ResetDialog {...props} />
    </>
  );
}
