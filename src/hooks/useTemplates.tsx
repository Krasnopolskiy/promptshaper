import {useCallback, useEffect, useState} from 'react';
import {Placeholder, Template} from '@/types';

/**
 * Return type for the useTemplates hook
 */
interface UseTemplatesReturn {
  templates: Template[];
  saveTemplate: (params: SaveTemplateParams) => Template;
  loadTemplate: (id: string) => Template | undefined;
  deleteTemplate: (id: string) => void;
  exportTemplates: () => void;
  importTemplates: (jsonData: string) => boolean;
}

/**
 * Parameters for saving a template
 */
interface SaveTemplateParams {
  name: string;
  prompt: string;
  placeholders: Placeholder[];
}

/**
 * Helper function to load templates from localStorage
 * @returns {Template[]} Loaded templates
 */
function loadSavedTemplates(): Template[] {
  const saved = localStorage.getItem('promptGenerator_templates');
  return saved ? JSON.parse(saved) : [];
}

/**
 * Creates template ID and timestamp
 * @returns {Pick<Template, 'id' | 'createdAt'>} Template metadata
 */
const createTemplateMetadata = (): Pick<Template, 'id' | 'createdAt'> => ({
  id: crypto.randomUUID(),
  createdAt: Date.now()
});

/**
 * Helper function to create a new template object
 * @param {Object} params Template parameters
 * @returns {Template} The created template
 */
function createTemplate(
  params: Pick<Template, 'name' | 'prompt' | 'placeholders'>
): Template {
  return {
    ...params,
    ...createTemplateMetadata()
  };
}

/**
 * Hook for saving templates to localStorage
 * @param {Template[]} templates Templates to save
 */
function useSaveTemplatesEffect(templates: Template[]): void {
  useEffect(() => {
    localStorage.setItem('promptGenerator_templates', JSON.stringify(templates));
  }, [templates]);
}

/**
 * Creates updated templates array replacing template with same name
 * @param {Template[]} templates Current templates
 * @param {Template} newTemplate Template to add or update
 * @returns {Template[]} Updated templates array
 */
function replaceExistingTemplate(templates: Template[], newTemplate: Template): Template[] {
  const existingIndex = templates.findIndex(t => t.name === newTemplate.name);
  if (existingIndex < 0) return [...templates, newTemplate];

  const updated = [...templates];
  updated[existingIndex] = newTemplate;
  return updated;
}

/**
 * Updates template state with new template, replacing if name exists
 * @param {Template} template New template to add
 * @param {React.Dispatch<React.SetStateAction<Template[]>>} setTemplates State setter
 */
function updateOrAddTemplate(
  template: Template,
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): void {
  setTemplates(prev => replaceExistingTemplate(prev, template));
}

/**
 * Hook for saving templates
 * @param {Function} setTemplates Setter function
 * @returns {Function} Save template function
 */
function useSaveTemplate(
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): (params: SaveTemplateParams) => Template {
  return useCallback((params: SaveTemplateParams) => {
    const { name, prompt, placeholders } = params;
    const template = createTemplate({ name, prompt, placeholders });
    updateOrAddTemplate(template, setTemplates);
    return template;
  }, [setTemplates]);
}

/**
 * Hook for template loading functionality
 * @param {Template[]} templates Available templates
 * @returns {Function} Load template function
 */
function useLoadTemplate(templates: Template[]): (id: string) => Template | undefined {
  return useCallback(
    (id: string) => {
      return templates.find(template => template.id === id);
    },
    [templates]
  );
}

/**
 * Hook for template deletion functionality
 * @param {Function} setTemplates Templates setter function
 * @returns {Function} Delete template function
 */
function useDeleteTemplate(
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): (id: string) => void {
  return useCallback((id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  }, [setTemplates]);
}

/**
 * Helper function to create export data URI
 * @param {Template[]} templates Templates to export
 * @returns {{dataUri: string, filename: string}} Export data
 */
function createExportData(templates: Template[]): {dataUri: string, filename: string} {
  const dataStr = JSON.stringify(templates);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  const filename = `prompt-templates-${new Date().toISOString().slice(0, 10)}.json`;

  return { dataUri, filename };
}

/**
 * Helper function to trigger download
 * @param {string} dataUri Data URI
 * @param {string} filename Filename
 */
function triggerDownload(dataUri: string, filename: string): void {
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', filename);
  linkElement.click();
}

/**
 * Hook for template export functionality
 * @param {Template[]} templates Templates to export
 * @returns {Function} Export templates function
 */
function useExportTemplates(templates: Template[]): () => void {
  return useCallback(() => {
    const { dataUri, filename } = createExportData(templates);
    triggerDownload(dataUri, filename);
  }, [templates]);
}

/**
 * Helper function to parse JSON data as Template array
 * @param {string} jsonData JSON string to parse
 * @returns {Template[] | null} Parsed templates or null if error
 */
function parseTemplateData(jsonData: string): Template[] | null {
  try {
    return JSON.parse(jsonData) as Template[];
  } catch {
    return null;
  }
}

/**
 * Updates templates state with parsed data
 * @param {Template[]} parsed Parsed template data
 * @param {React.Dispatch<React.SetStateAction<Template[]>>} setTemplates State setter
 * @returns {void}
 */
const updateTemplates = (
  parsed: Template[],
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): void => setTemplates(prev => [...prev, ...parsed]);

/**
 * Helper for importing templates
 * @param {string} jsonData JSON to parse
 * @param {Function} setTemplates State setter
 * @returns {boolean} Success status
 */
const processImport = (
  jsonData: string,
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): boolean => {
  const parsed = parseTemplateData(jsonData);
  if (!parsed) return false;
  updateTemplates(parsed, setTemplates);
  return true;
};

/**
 * Hook for template import functionality
 * @param {Function} setTemplates Templates setter function
 * @returns {Function} Import templates function
 */
function useImportTemplates(
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): (jsonData: string) => boolean {
  return useCallback(
    (jsonData: string) => processImport(jsonData, setTemplates),
    [setTemplates]
  );
}

/**
 * Get basic template handlers
 * @param {Template[]} templates Current templates array
 * @param {React.Dispatch<React.SetStateAction<Template[]>>} setTemplates Template state setter
 * @returns {Pick<UseTemplatesReturn, 'saveTemplate' | 'loadTemplate' | 'deleteTemplate'>} Basic template handlers
 */
function useBasicHandlers(
  templates: Template[],
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): Pick<UseTemplatesReturn, 'saveTemplate' | 'loadTemplate' | 'deleteTemplate'> {
  return {
    saveTemplate: useSaveTemplate(setTemplates),
    loadTemplate: useLoadTemplate(templates),
    deleteTemplate: useDeleteTemplate(setTemplates)
  };
}

/**
 * Get import/export handlers
 * @param {Template[]} templates Current templates array
 * @param {React.Dispatch<React.SetStateAction<Template[]>>} setTemplates Template state setter
 * @returns {Pick<UseTemplatesReturn, 'exportTemplates' | 'importTemplates'>} Import/export handlers
 */
function useImportExportHandlers(
  templates: Template[],
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): Pick<UseTemplatesReturn, 'exportTemplates' | 'importTemplates'> {
  return {
    exportTemplates: useExportTemplates(templates),
    importTemplates: useImportTemplates(setTemplates)
  };
}

/**
 * Initialize template handlers
 * @param {Template[]} templates Current templates array
 * @param {React.Dispatch<React.SetStateAction<Template[]>>} setTemplates Template state setter
 * @returns {Omit<UseTemplatesReturn, 'templates'>} Combined template handlers
 */
function useTemplateHandlers(
  templates: Template[],
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>
): Omit<UseTemplatesReturn, 'templates'> {
  const basicHandlers = useBasicHandlers(templates, setTemplates);
  const importExportHandlers = useImportExportHandlers(templates, setTemplates);
  return { ...basicHandlers, ...importExportHandlers };
}

/**
 * Custom hook for managing prompt templates
 * @returns {UseTemplatesReturn} Template-related state and functions
 */
export function useTemplates(): UseTemplatesReturn {
  const [templates, setTemplates] = useState<Template[]>(loadSavedTemplates);
  useSaveTemplatesEffect(templates);
  const handlers = useTemplateHandlers(templates, setTemplates);
  return { templates, ...handlers };
}
