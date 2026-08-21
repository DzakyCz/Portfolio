export const useLoading = () => {
  const isLoading = useState('isLoading', () => true);
  
  // Call this to transition from splash screen to main content
  const finishLoading = () => {
    isLoading.value = false;
  };
  
  return {
    isLoading,
    finishLoading
  };
};
