export const normalizeString = (str: string): string => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  };
  
  export const createSearchFilter = (searchTerm: string) => {
    const normalized = normalizeString(searchTerm);
    
    return (text: string): boolean => {
      return normalizeString(text).includes(normalized);
    };
  };
  
  export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): T => {
    let timeoutId: NodeJS.Timeout;
    
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    }) as T;
  };