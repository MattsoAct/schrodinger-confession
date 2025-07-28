export const StorageUtils = {
  set(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  },

  get(key) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to retrieve from storage:', error);
      return null;
    }
  },

  remove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from storage:', error);
    }
  },

  clear() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
};