// Suppress known Recharts duplicate key warnings
// These are internal to Recharts and don't affect functionality
const originalError = console.error;

console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Encountered two children with the same key')
  ) {
    // Suppress Recharts duplicate key warnings
    return;
  }
  originalError.apply(console, args);
};

export {};
