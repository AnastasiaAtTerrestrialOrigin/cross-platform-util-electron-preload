/**
 * An interface for a storage mechanism.
 * Implementations of this interface must provide
 * methods to get and set a value by key.
 */
export interface IStorage {
  /**
   * Retrieves a stored value for a given key.
   * @param key The key to retrieve the value for.
   * @returns The parsed value or null if not found or on error.
   */
  storageGet<T>(key: string): T | null;

  /**
   * Stores a value under a given key.
   * @param key The key to store the value under.
   * @param value The value to store (will be stringified).
   */
  storageSet<T>(key: string, value: T): void;

  /**
   * Deletes a value stored under a given key.
   * @param key The key of the value to delete.
   */
  storageDelete(key: string): void;
} 