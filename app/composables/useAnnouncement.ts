export interface SiteSetting {
  announcementText: string;
  announcementActive: boolean;
  bannerColor: string;
  textColor: string;
  animationSpeed: number;
}

/**
 * Composable for managing announcement banner settings.
 * Handles fetching settings from local data and determining banner visibility.
 */
export const useAnnouncement = () => {
  const settings = useState<SiteSetting | null>('announcement-settings', () => null);
  const isLoading = useState<boolean>('announcement-loading', () => false);

  /**
   * Fetches site settings from the local portfolio data.
   * Prevents multiple concurrent fetches and caches the result.
   */
  const fetchSettings = async () => {
    if (settings.value || isLoading.value) return;
    
    isLoading.value = true;
    try {
      // Import statically, it will be bundled
      const portfolioData = await import('~/data/portfolioData.json');
      settings.value = portfolioData.default.settings as any;
    } catch (err) {
      console.error('Failed to load site settings for banner:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // Banner is visible only if active and has text content
  const isBannerVisible = computed(() => {
    return !!(settings.value?.announcementActive && settings.value?.announcementText);
  });

  return {
    settings,
    isLoading,
    fetchSettings,
    isBannerVisible
  };
};
