class LocalCache {
  getCache(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  setCache(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  deleteCache(key: string): void {
    window.localStorage.removeItem(key);
  }
  clearCache(): void {
    window.localStorage.clear();
  }
}
export default new LocalCache();
