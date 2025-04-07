import { useState, Dispatch, SetStateAction } from 'react';
import { Template, Placeholder } from '@/types/index';

/**
 * Type for template hooks
 */
type TemplateHooks = {
  templates: Template[];
  saveTemplate: (template: { name: string; prompt: string; placeholders: Placeholder[] }) => Template;
  loadTemplate: (id: string) => Template | undefined;
};

/**
 * Type for template input data
 */
type TemplateInput = {
  name: string;
  prompt: string;
  placeholders: Placeholder[];
};

/**
 * Creates a new template with current timestamp
 * @param {TemplateInput} template Template data to create from
 * @returns {Template} Created template with ID and timestamp
 */
function createTemplate(template: TemplateInput): Template {
  return {
    ...template,
    id: Date.now().toString(),
    createdAt: Date.now()
  };
}

/**
 * Saves a template to the templates list
 * @param {TemplateInput} template Template data to save
 * @param {Dispatch<SetStateAction<Template[]>>} setTemplates Function to update templates
 * @returns {Template} Saved template
 */
function saveNewTemplate(template: TemplateInput, setTemplates: Dispatch<SetStateAction<Template[]>>): Template {
  const newTemplate = createTemplate(template);
  setTemplates(prev => [...prev, newTemplate]);
  return newTemplate;
}

/**
 * Initializes template management hooks
 * @returns {TemplateHooks} Template management hooks for storing and loading templates
 */
export function useTemplates(): TemplateHooks {
  const [templates, setTemplates] = useState<Template[]>([]);
  return {
    templates,
    /**
     * Saves a new template to the collection
     * Creates and adds a new template to the templates list
     * @param {TemplateInput} template Template data to save with name, prompt and placeholders
     * @returns {Template} The newly created template with ID and timestamp
     */
    saveTemplate: template => saveNewTemplate(template, setTemplates),
    /**
     * Loads a template by its ID
     * Finds and returns a template from the collection by ID
     * @param {string} id ID of the template to load
     * @returns {Template | undefined} The found template or undefined if not found
     */
    loadTemplate: id => templates.find(template => template.id === id)
  };
}
