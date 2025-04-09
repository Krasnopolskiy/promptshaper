/**
 * Section Visibility Hook
 *
 * Hook for managing section visibility animations
 *
 * @module hooks/useSectionVisibility
 */
import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Interface for section refs map
 */
interface SectionRefs {
  [key: string]: React.RefObject<HTMLDivElement>;
}

/**
 * Interface for visibility state
 */
interface VisibilityState {
  [key: string]: boolean;
}

/**
 * Interface for main section refs
 */
interface MainSectionRefs {
  heroRef: React.RefObject<HTMLDivElement>;
  featuresRef: React.RefObject<HTMLDivElement>;
  workflowRef: React.RefObject<HTMLDivElement>;
}

/**
 * Interface for additional section refs
 */
interface AdditionalSectionRefs {
  testimonialsRef: React.RefObject<HTMLDivElement>;
  ctaRef: React.RefObject<HTMLDivElement>;
}

/**
 * Type for hook return type
 */
type SectionVisibilityHookReturn = {
  isVisible: VisibilityState;
  heroRef: React.RefObject<HTMLDivElement>;
  featuresRef: React.RefObject<HTMLDivElement>;
};

/**
 * Handle intersection for a section
 * @param {IntersectionObserverEntry} entry - Intersection entry
 * @param {string} sectionKey - Section identifier
 * @param {React.Dispatch<React.SetStateAction<VisibilityState>>} setVisibility - State setter
 * @returns {void}
 */
function handleIntersection(
  entry: IntersectionObserverEntry,
  sectionKey: string,
  setVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>
): void {
  if (entry.isIntersecting) {
    setVisibility(prev => ({...prev, [sectionKey]: true}));
  }
}

/**
 * Process all intersection entries
 * @param {IntersectionObserverEntry[]} entries - Entries to process
 * @param {string} sectionKey - Section identifier
 * @param {React.Dispatch<React.SetStateAction<VisibilityState>>} setVisibility - State setter
 * @returns {void}
 */
function processEntries(
  entries: IntersectionObserverEntry[],
  sectionKey: string,
  setVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>
): void {
  entries.forEach(entry => {
    handleIntersection(entry, sectionKey, setVisibility);
  });
}

/**
 * Create intersection observer callback
 * @param {string} sectionKey - Section identifier
 * @param {React.Dispatch<React.SetStateAction<VisibilityState>>} setVisibility - State setter
 * @returns {IntersectionObserverCallback} Observer callback function
 */
function createObserverCallback(
  sectionKey: string,
  setVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>
): IntersectionObserverCallback {
  return (entries: IntersectionObserverEntry[]): void => {
    processEntries(entries, sectionKey, setVisibility);
  };
}

/**
 * Creates an observer for a section
 * @param {string} sectionKey - Section identifier
 * @param {React.Dispatch<React.SetStateAction<VisibilityState>>} setVisibility - State setter function
 * @returns {IntersectionObserver} IntersectionObserver instance
 */
function createObserver(
  sectionKey: string,
  setVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>
): IntersectionObserver {
  const callback = createObserverCallback(sectionKey, setVisibility);
  return new IntersectionObserver(callback, {threshold: 0.1});
}

/**
 * Create initial visibility state
 * @returns {VisibilityState} Initial visibility state
 */
function createInitialVisibilityState(): VisibilityState {
  return {
    hero: false,
    features: false,
    workflow: false,
    testimonials: false,
    cta: false,
  };
}

/**
 * Check if ref is valid for observing
 * @param {React.RefObject<HTMLDivElement> | null} ref - Element ref
 * @returns {boolean} True if ref is valid
 */
function isValidRef(ref: React.RefObject<HTMLDivElement> | null): boolean {
  return !!ref && !!ref.current;
}

/**
 * Observe an element with the given observer
 * @param {React.RefObject<HTMLDivElement>} ref - Element reference
 * @param {IntersectionObserver} observer - Observer to use
 * @returns {void}
 */
function observeElement(
  ref: React.RefObject<HTMLDivElement>,
  observer: IntersectionObserver
): void {
  if (ref.current) {
    observer.observe(ref.current);
  }
}

/**
 * Create observer and observe element
 * @param {string} key - Section key
 * @param {React.RefObject<HTMLDivElement>} ref - Section ref
 * @param {React.Dispatch<React.SetStateAction<VisibilityState>>} setIsVisible - State setter
 * @returns {IntersectionObserver | null} Observer or null if ref is not available
 */
function createAndObserve(
  key: string,
  ref: React.RefObject<HTMLDivElement>,
  setIsVisible: React.Dispatch<React.SetStateAction<VisibilityState>>
): IntersectionObserver | null {
  if (!isValidRef(ref)) return null;
  const observer = createObserver(key, setIsVisible);
  observeElement(ref, observer);
  return observer;
}

/**
 * Create cleanup function for observers
 * @param {IntersectionObserver[]} observers - List of observers
 * @returns {() => void} Cleanup function
 */
function createCleanupFunction(observers: IntersectionObserver[]): () => void {
  return (): void => {
    observers.forEach(observer => {
      if (observer) observer.disconnect();
    });
  };
}

/**
 * Create observer for a single section entry
 * @param {[string, React.RefObject<HTMLDivElement>]} entry - Section entry
 * @param {React.Dispatch<React.SetStateAction<VisibilityState>>} setIsVisible - State setter
 * @returns {IntersectionObserver | null} Observer or null
 */
function observeSection(
  [key, ref]: [string, React.RefObject<HTMLDivElement>],
  setIsVisible: React.Dispatch<React.SetStateAction<VisibilityState>>
): IntersectionObserver | null {
  return createAndObserve(key, ref, setIsVisible);
}

/**
 * Observe all sections
 * @param {SectionRefs} sectionRefs - Section refs map
 * @param {React.Dispatch<React.SetStateAction<VisibilityState>>} setIsVisible - State setter
 * @returns {IntersectionObserver[]} List of valid observers
 */
function observeAllSections(
  sectionRefs: SectionRefs,
  setIsVisible: React.Dispatch<React.SetStateAction<VisibilityState>>
): IntersectionObserver[] {
  return Object.entries(sectionRefs)
    .map(entry => observeSection(entry, setIsVisible))
    .filter(Boolean);
}

/**
 * Create section refs map from sections - part 1
 * @param {MainSectionRefs} mainRefs - Main section refs
 * @returns {Partial<SectionRefs>} Partial section refs map
 */
function createMainSectionMap(
  mainRefs: MainSectionRefs
): Partial<SectionRefs> {
  const { heroRef, featuresRef, workflowRef } = mainRefs;
  return { hero: heroRef, features: featuresRef, workflow: workflowRef };
}

/**
 * Create section refs map from sections - part 2
 * @param {Partial<SectionRefs>} partialMap - Partial section refs map
 * @param {AdditionalSectionRefs} additionalRefs - Additional section refs
 * @returns {SectionRefs} Complete section refs map
 */
function createCompleteSectionMap(
  partialMap: Partial<SectionRefs>,
  additionalRefs: AdditionalSectionRefs
): SectionRefs {
  const { testimonialsRef, ctaRef } = additionalRefs;
  return { ...partialMap, testimonials: testimonialsRef, cta: ctaRef } as SectionRefs;
}

/**
 * Create section refs map from sections
 * @param {MainSectionRefs & AdditionalSectionRefs} refs - All section refs
 * @returns {SectionRefs} Complete section refs map
 */
function createSectionMapFromRefs(
  refs: MainSectionRefs & AdditionalSectionRefs
): SectionRefs {
  const mainRefs = { heroRef: refs.heroRef, featuresRef: refs.featuresRef, workflowRef: refs.workflowRef };
  const additionalRefs = { testimonialsRef: refs.testimonialsRef, ctaRef: refs.ctaRef };
  const partialMap = createMainSectionMap(mainRefs);
  return createCompleteSectionMap(partialMap, additionalRefs);
}

/**
 * Create refs hook for visibility sections
 * @returns {MainSectionRefs & AdditionalSectionRefs} All section refs
 */
function useAllSectionRefs(): MainSectionRefs & AdditionalSectionRefs {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  return { heroRef, featuresRef, workflowRef, testimonialsRef, ctaRef };
}

/**
 * Use effect to set up observers for sections
 * @param {SectionRefs} sectionRefs - Refs map
 * @param {React.Dispatch<React.SetStateAction<VisibilityState>>} setIsVisible - Set visibility
 */
function useObserverEffect(
  sectionRefs: SectionRefs,
  setIsVisible: React.Dispatch<React.SetStateAction<VisibilityState>>
): void {
  useEffect(() => {
    const observers = observeAllSections(sectionRefs, setIsVisible);
    return createCleanupFunction(observers);
  }, [sectionRefs, setIsVisible]);
}

/**
 * Hook for managing section visibility animations
 * @returns {SectionVisibilityHookReturn} Object with visibility state and refs
 */
export function useSectionVisibility(): SectionVisibilityHookReturn {
  // Create state and refs
  const [isVisible, setIsVisible] = useState<VisibilityState>(createInitialVisibilityState);
  const allRefs = useAllSectionRefs();
  const { heroRef, featuresRef } = allRefs;

  // Create map and observe
  const sectionRefs = useMemo(() => createSectionMapFromRefs(allRefs), [allRefs]);
  useObserverEffect(sectionRefs, setIsVisible);

  return { isVisible, heroRef, featuresRef };
}
