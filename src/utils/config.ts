/**
 * Helper function to define configuration with proper type inference
 */
export function defineConfig<T extends Record<string, any>>(config: T): T {
  return config;
}