// Composable for managing portfolio data
import portfolioData from '~/data/portfolioData.json';

/**
 * usePortfolioData — global composable
 * Uses hardcoded static data instead of fetching from the backend.
 * Pages consume this instead of re-fetching individually.
 */
export const usePortfolioData = () => {
  // ── Reactive state (shared across all components via Nuxt useState) ──
  // useState ensures that even if this composable is called in different pages, 
  // they all share the same reactive values without re-fetching, providing a lightweight state management solution.
  const projects      = useState<any[]>('portfolio_projects',      () => []);
  const experiences   = useState<any[]>('portfolio_experiences',   () => []);
  const aboutCards    = useState<any[]>('portfolio_aboutCards',    () => []);
  const certificates  = useState<any[]>('portfolio_certificates',  () => []);
  const cvUrl         = useState<string>('portfolio_cvUrl',        () => '');
  const isPdfEnabled  = useState<boolean>('portfolio_isPdfEnabled', () => false);
  const visitorCount  = useState<number>('portfolio_visitorCount',  () => 0);
  
  // Flag to track when all static data is loaded and mapped
  const isDataReady   = useState<boolean>('portfolio_dataReady',   () => false);

  /**
   * Load ALL portfolio data (Experiences, About, Projects, Certificates, Settings).
   * This is called once during the initial application loading phase.
   */
  const fetchAll = async () => {
    try {
      // Map basic arrays directly from the imported JSON file
      experiences.value = portfolioData.experiences;
      aboutCards.value = portfolioData.aboutCards;
      
      // Map projects and transform some fields (like techStack string to array)
      projects.value = portfolioData.projects.map((p: any) => ({
        ...p,
        image: p.imageUrl ? p.imageUrl : '',
        // Split the comma-separated tech stack into an array for easier rendering
        tags: p.techStack
          ? p.techStack.split(',').map((t: string) => t.trim()).filter(Boolean)
          : [],
        github: p.githubUrl,
        demo: p.demoUrl,
      }));

      // Map certificates and normalize URL fields
      certificates.value = portfolioData.certificates.map((c: any) => ({
        ...c,
        image:  c.fileUrl ? c.fileUrl : '',
        pdfUrl: c.pdfUrl  ? c.pdfUrl  : '',
      }));

      // Map global settings
      const settings = portfolioData.settings;
      if (settings.cvUrl) cvUrl.value = settings.cvUrl;
      if (settings.enablePdfView !== undefined) isPdfEnabled.value = settings.enablePdfView;
      if (settings.visitorCount) visitorCount.value = settings.visitorCount;

    } catch (e) {
      console.error('[usePortfolioData] Error loading static data:', e);
    } finally {
      // Signal to the rest of the app that data is now available
      isDataReady.value = true;
    }
  };

  /**
   * Fetches dummy visitor statistics for the admin dashboard.
   * Returns an empty array as the backend is currently offline.
   */
  const fetchVisitorStats = async (range: string = '1m') => {
    // Return empty array since backend is offline
    return [];
  };

  return {
    projects,
    experiences,
    aboutCards,
    certificates,
    cvUrl,
    isPdfEnabled,
    visitorCount,
    isDataReady,
    fetchAll,
    fetchVisitorStats,
  };
};
