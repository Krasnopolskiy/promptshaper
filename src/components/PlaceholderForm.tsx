import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {PLACEHOLDER_COLORS} from '@/hooks/usePlaceholders';
import {InputElement} from './form/InputElement';
import {TextareaElement} from './form/TextareaElement';

/**
 * Props for the placeholder form component
 */
interface PlaceholderFormProps {
  /**
   * Handler for form submission
   * @param {string} name - The placeholder name
   * @param {string} content - The placeholder content
   * @param {string} color - The placeholder color
   */
  onSubmit: (name: string, content: string, color: string) => void;
}

/**
 * Component for creating new placeholders
 * @param {PlaceholderFormProps} props - The component props
 * @returns {JSX.Element} The placeholder form
 */
export function PlaceholderForm({onSubmit}: PlaceholderFormProps): JSX.Element {
  const formState = useFormState();
  useRandomColorEffect(formState.setColor);
  return <PlaceholderFormContent state={formState} onSubmit={onSubmit} />;
}

/**
 * Form state for the placeholder form
 */
interface FormState {
  name: string;
  setName: (name: string) => void;
  content: string;
  setContent: (content: string) => void;
  color: string;
  setColor: (color: string) => void;
}

/**
 * Custom hook for form state management
 * @returns {FormState} The form state
 */
function useFormState(): FormState {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
  return {name, setName, content, setContent, color, setColor};
}

/**
 * Sets a random color when the component mounts
 * @param {Function} setColor - Color state setter
 */
function useRandomColorEffect(setColor: (color: string) => void): void {
  useEffect(() => {
    setColor(getRandomColor());
  }, [setColor]);
}

/**
 * Gets a random color from the available colors
 * @returns {string} A random color
 */
function getRandomColor(): string {
  return PLACEHOLDER_COLORS[Math.floor(Math.random() * PLACEHOLDER_COLORS.length)];
}

/**
 * Props for the form content component
 */
interface FormContentProps {
  state: FormState;
  onSubmit: PlaceholderFormProps['onSubmit'];
}

/**
 * Renders the form content
 * @param {FormContentProps} props - The component props
 * @returns {JSX.Element} The form content
 */
function PlaceholderFormContent({state, onSubmit}: FormContentProps): JSX.Element {
  const {name, content, color, setName, setContent, setColor} = state;
  const submitData = {name, content, color, onSubmit, setName, setContent, setColor};
  return <FormLayout submitData={submitData} />;
}

/**
 * Props for the form layout component
 */
interface FormLayoutProps {
  submitData: SubmitData;
}

/**
 * Renders the form layout with fields and button
 * @param {FormLayoutProps} props - The component props
 * @returns {JSX.Element} The form layout
 */
function FormLayout({submitData}: FormLayoutProps): JSX.Element {
  const {name, setName, content, setContent} = submitData;
  const submitHandler = createSubmitHandler(submitData);
  return <FormContainer submitHandler={submitHandler} name={name} setName={setName} content={content} setContent={setContent} />;
}

/**
 * Props for the form container component
 */
interface FormContainerProps {
  submitHandler: (e: React.FormEvent) => void;
  name: string;
  setName: (name: string) => void;
  content: string;
  setContent: (content: string) => void;
}

/**
 * Renders the form container with all form elements
 * @param {FormContainerProps} props - The component props
 * @returns {JSX.Element} The form container
 */
function FormContainer({submitHandler, name, setName, content, setContent}: FormContainerProps): JSX.Element {
  return (
    <form onSubmit={submitHandler} className="animate-fade-in space-y-4">
      <NameField name={name} setName={setName} />
      <ContentField content={content} setContent={setContent} />
      <SubmitButton />
    </form>
  );
}

/**
 * Form submission data
 */
interface SubmitData {
  name: string;
  content: string;
  color: string;
  onSubmit: PlaceholderFormProps['onSubmit'];
  setName: (name: string) => void;
  setContent: (content: string) => void;
  setColor: (color: string) => void;
}

/**
 * Creates the form submission handler
 * @param {SubmitData} data - The form data and handlers
 * @returns {Function} The submit handler function
 */
function createSubmitHandler(data: SubmitData): (e: React.FormEvent) => void {
  return (e: React.FormEvent): void => {
    handleSubmit(e, data);
  };
}

/**
 * Handles the form submission
 * @param {React.FormEvent} e - The form event
 * @param {SubmitData} data - The form data and handlers
 */
function handleSubmit(e: React.FormEvent, data: SubmitData): void {
  e.preventDefault();

  const {name, content, color, onSubmit, setName, setContent, setColor} = data;
  if (!name.trim() || !content.trim()) return;

  onSubmit(name.trim(), content.trim(), color);
  resetForm(setName, setContent, setColor);
}

/**
 * Resets the form after submission
 * @param {Function} setName - Name state setter
 * @param {Function} setContent - Content state setter
 * @param {Function} setColor - Color state setter
 */
function resetForm(
  setName: (name: string) => void,
  setContent: (content: string) => void,
  setColor: (color: string) => void
): void {
  setName('');
  setContent('');
  setColor(getRandomColor());
}

/**
 * Props for the name field component
 */
interface NameFieldProps {
  name: string;
  setName: (name: string) => void;
}

/**
 * Renders the name input field
 * @param {NameFieldProps} props - The component props
 * @returns {JSX.Element} The name field
 */
function NameField({name, setName}: NameFieldProps): JSX.Element {
  return (
    <div className="space-y-2">
      <Label htmlFor="placeholder-name">Placeholder Name</Label>
      <NameInput name={name} setName={setName} />
    </div>
  );
}

/**
 * Props for the name input component
 */
interface NameInputProps {
  name: string;
  setName: (name: string) => void;
}

/**
 * Renders the name input
 * @param {NameInputProps} props - The component props
 * @returns {JSX.Element} The name input
 */
function NameInput({name, setName}: NameInputProps): JSX.Element {
  return <InputElement
    id="placeholder-name"
    value={name}
    onChange={setName}
    placeholder="e.g., style, tone, format"
    autoComplete="off"
  />;
}

/**
 * Props for the content field component
 */
interface ContentFieldProps {
  content: string;
  setContent: (content: string) => void;
}

/**
 * Renders the content textarea field
 * @param {ContentFieldProps} props - The component props
 * @returns {JSX.Element} The content field
 */
function ContentField({content, setContent}: ContentFieldProps): JSX.Element {
  return (
    <div className="space-y-2">
      <Label htmlFor="placeholder-content">Content</Label>
      <ContentTextarea content={content} setContent={setContent} />
    </div>
  );
}

/**
 * Props for the content textarea component
 */
interface ContentTextareaProps {
  content: string;
  setContent: (content: string) => void;
}

/**
 * Renders the content textarea
 * @param {ContentTextareaProps} props - The component props
 * @returns {JSX.Element} The content textarea
 */
function ContentTextarea({content, setContent}: ContentTextareaProps): JSX.Element {
  return <TextareaElement
    id="placeholder-content"
    value={content}
    onChange={setContent}
    placeholder="Enter the content for this placeholder"
    rows={4}
  />;
}

/**
 * Renders the submit button
 * @returns {JSX.Element} The submit button
 */
function SubmitButton(): JSX.Element {
  return (
    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
      Add Placeholder
    </Button>
  );
}
