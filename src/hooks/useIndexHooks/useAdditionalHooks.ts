import { useTemplates } from '@/hooks/useTemplates';
import { Placeholder, Template } from '@/types/index';

/**
 * Return type for template hooks
 */
interface TemplateHooks {
  templates: Template[];
  saveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => Template;
  loadTemplate: (id: string) => Template | undefined;
}

/**
 * Adapter to convert saveTemplate interface
 *
 * @param {Function} saveTemplateOriginal - Original save template function to adapt
 * @returns {Function} Adapter function with the expected interface
 */
function adaptSaveTemplate(
  saveTemplateOriginal: (params: { name: string; prompt: string; placeholders: Placeholder[] }) => Template
): (name: string, prompt: string, placeholders: Placeholder[]) => Template {
  return (name: string, prompt: string, placeholders: Placeholder[]) => {
    return saveTemplateOriginal({ name, prompt, placeholders });
  };
}

/**
 * Initializes additional hooks for templates
 *
 * @returns {TemplateHooks} Template management hooks
 */
export function useAdditionalHooks(): TemplateHooks {
  const templatesHook = useTemplates();

  return {
    templates: templatesHook.templates,
    saveTemplate: adaptSaveTemplate(templatesHook.saveTemplate),
    loadTemplate: templatesHook.loadTemplate
  };
}
