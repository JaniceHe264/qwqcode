let localStorage = window.localStorage;
let sessionStorage = window.sessionStorage;

export default {
  Local: {
    get(key) {
      return JSON.parse(localStorage.getItem(key) || null);
    },
    set(key, val) {
      localStorage.setItem(key, JSON.stringify(val));
    },
    remove(key) {
      localStorage.removeItem(key);
    },
    clear() {
      localStorage.clear();
    }
  },
  Session:{
    get(key) {
      return JSON.parse(sessionStorage.getItem(key) || null);
    },
    set(key, val) {
      sessionStorage.setItem(key, JSON.stringify(val));
    },
    remove(key) {
      sessionStorage.removeItem(key);
    },
    clear() {
      sessionStorage.clear();
    }
  }
}
