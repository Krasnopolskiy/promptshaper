/**
 * Prop creation utilities for PromptEditor
 * @module components/PromptEditor/props
 */
import { useRef } from 'react';
import { Placeholder } from '@/types';
import { useTheme } from '@/hooks';
import { useEditor } from './hooks/useEditor';
import { extractHandlers, extractState, createInsertHandler, type ExtractedHandlers } from './handlers';
import type { EditorContentProps, WrapperProps } from './types';

/**
 * Type for editor basics
 */
type EditorBasics = {
  value: string;
  onChange: (value: string) => void;
  placeholders: Placeholder[];
  editorRef: React.RefObject<HTMLTextAreaElement>;
  theme: string;
  editorProps: ReturnType<typeof useEditor>;
};

/**
 * Type for editor props
 */
interface Props {
  /** Current prompt text value */
  value: string;
  /** Callback for when the prompt text changes */
  onChange: (value: string) => void;
  /** List of available placeholders */
  placeholders: Placeholder[];
  /** Callback for when a placeholder is inserted */
  onInsertPlaceholder?: (name: string, position: number) => number;
}

/**
 * Type for editor props result
 */
type EditorPropsResult = {
  contentParams: EditorContentProps;
  wrapperProps: WrapperProps;
};

/**
 * Creates content parameters from basics
 * @param {EditorBasics} basics - Editor basics
 * @param {ExtractedHandlers} handlers - Handler functions
 * @returns {EditorContentProps} Content parameters
 */
function createContentParamsWithHandlers(basics: EditorBasics, handlers: ExtractedHandlers): EditorContentProps {
  const { value, onChange, editorRef, theme } = basics;
  const { undo, redo } = handlers;
  return { value, onChange, editorRef, handleUndo: undo, handleRedo: redo, theme };
}

/**
 * Creates wrapper props parameters
 * @param {EditorBasics} basics - Editor basics
 * @param {ExtractedHandlers} handlers - Handler functions
 * @param {Object} state - Editor state
 * @returns {Object} Parameters for wrapper props
 */
function createWrapperPropsParams(
  basics: EditorBasics,
  handlers: ExtractedHandlers,
  state: ReturnType<typeof extractState>
): { placeholders: Placeholder[]; handlers: ExtractedHandlers; state: ReturnType<typeof extractState>; editorRef: React.RefObject<HTMLTextAreaElement> } {
  const { placeholders, editorRef } = basics;
  return { placeholders, handlers, state, editorRef };
}

/**
 * Creates wrapper props from basics and handlers
 * @param {Object} params - Parameters
 * @param {Placeholder[]} params.placeholders - Available placeholders
 * @param {ExtractedHandlers} params.handlers - Handler functions
 * @param {Object} params.state - Editor state
 * @param {React.RefObject<HTMLTextAreaElement>} params.editorRef - Editor reference
 * @returns {WrapperProps} Wrapper props
 */
function createWrapperProps(params: {
  placeholders: Placeholder[];
  handlers: ExtractedHandlers;
  state: ReturnType<typeof extractState>;
  editorRef: React.RefObject<HTMLTextAreaElement>;
}): WrapperProps {
  const { placeholders, handlers: { undo, redo, insertion }, editorRef } = params;
  return { placeholders, onInsertPlaceholder: createInsertHandler(insertion, editorRef.current), onUndo: undo, onRedo: redo, undoDisabled: false, redoDisabled: false };
}

/**
 * Prepares basic editor state and refs
 * @param {Props} props - Editor component props
 * @returns {EditorBasics} Editor basics including refs and state
 */
export function useEditorBasics(props: Props): EditorBasics {
  const { value, onChange, placeholders } = props;
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();
  const editorProps = useEditor({ value, onChange, placeholders });

  return { value, onChange, placeholders, editorRef, theme, editorProps };
}

/**
 * Creates content props from params
 * @param {EditorBasics} basics - Editor basics
 * @param {ExtractedHandlers} handlers - Handler functions
 * @returns {EditorContentProps} Content props
 */
function createContentProps(
  basics: EditorBasics,
  handlers: ExtractedHandlers
): EditorContentProps {
  return createContentParamsWithHandlers(basics, handlers);
}

/**
 * Creates wrapper props from params
 * @param {EditorBasics} basics - Editor basics
 * @param {ExtractedHandlers} handlers - Handler functions
 * @param {ReturnType<typeof extractState>} state - Editor state
 * @returns {WrapperProps} Wrapper props
 */
function createWrappingProps(
  basics: EditorBasics,
  handlers: ExtractedHandlers,
  state: ReturnType<typeof extractState>
): WrapperProps {
  const paramsObj = createWrapperPropsParams(basics, handlers, state);
  return createWrapperProps(paramsObj);
}

/**
 * Creates props for editor components
 * @param {Object} params - Parameters
 * @param {EditorBasics} params.basics - Editor basics
 * @param {ExtractedHandlers} params.handlers - Handler functions
 * @param {Object} params.state - Editor state
 * @returns {EditorPropsResult} Props object containing content and wrapper props
 */
function createProps(params: {
  basics: EditorBasics;
  handlers: ExtractedHandlers;
  state: ReturnType<typeof extractState>;
}): EditorPropsResult {
  const contentParams = createContentProps(params.basics, params.handlers);
  const wrapperProps = createWrappingProps(params.basics, params.handlers, params.state);
  return { contentParams, wrapperProps };
}

/**
 * Creates editor props from basics
 * @param {EditorBasics} basics - Editor basics
 * @returns {Object} Props object containing content and wrapper props
 */
export function createEditorProps(basics: EditorBasics): {
  contentParams: EditorContentProps;
  wrapperProps: WrapperProps;
} {
  return createProps({
    basics,
    handlers: extractHandlers(basics.editorProps),
    state: extractState(basics.editorProps)
  });
}

export type { Props };
