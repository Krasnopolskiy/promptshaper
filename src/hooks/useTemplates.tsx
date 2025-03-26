import {useCallback, useEffect, useState} from 'react';
import {Placeholder, Template} from '@/types';

export function useTemplates() {
    const [templates, setTemplates] = useState<Template[]>(() => {
        const saved = localStorage.getItem('promptGenerator_templates');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('promptGenerator_templates', JSON.stringify(templates));
    }, [templates]);

    const saveTemplate = useCallback((name: string, prompt: string, placeholders: Placeholder[]) => {
        const newTemplate: Template = {
            id: crypto.randomUUID(),
            name,
            prompt,
            placeholders,
            createdAt: Date.now()
        };

        setTemplates(prev => [...prev, newTemplate]);
        return newTemplate;
    }, []);

    const loadTemplate = useCallback((id: string) => {
        return templates.find(template => template.id === id);
    }, [templates]);

    const deleteTemplate = useCallback((id: string) => {
        setTemplates(prev => prev.filter(template => template.id !== id));
    }, []);

    const exportTemplates = useCallback(() => {
        const dataStr = JSON.stringify(templates);
        const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

        const exportFileDefaultName = `prompt-templates-${new Date().toISOString().slice(0, 10)}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }, [templates]);

    const importTemplates = useCallback((jsonData: string) => {
        try {
            const importedTemplates = JSON.parse(jsonData) as Template[];
            setTemplates(prev => [...prev, ...importedTemplates]);
            return true;
        } catch (error) {
            console.error('Error importing templates:', error);
            return false;
        }
    }, []);

    return {
        templates,
        saveTemplate,
        loadTemplate,
        deleteTemplate,
        exportTemplates,
        importTemplates
    };
}
