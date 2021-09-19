/**
 * storage 封装
 */
import namespce from '@/config';
class Storage {
  static setItem(key, value) {
    let localStorage = this._getLocalStorage();
    localStorage[key] = value;
    this._setLocalStorage(localStorage);
  }
  static getItem(key) {
    return this._getLocalStorage()[key];
  }
  static clearItem(key) {
    let localStorage = this._getLocalStorage();
    delete localStorage[key];
    this._setLocalStorage(localStorage);
  }
  static clearAllItem() {
    window.localStorage.removeItem(namespce);
  }

  static _getLocalStorage() {
    return JSON.parse(window.localStorage.getItem(namespce) || '{}');
  }

  static _setLocalStorage(localStorage) {
    window.localStorage.setItem(namespce, JSON.stringify(localStorage));
  }
}

export default Storage;
