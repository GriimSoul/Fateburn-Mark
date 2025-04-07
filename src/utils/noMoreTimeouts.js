const API_CALL_LIMIT = 50; // 50 requests per minute
const TIME_WINDOW = 60000; // 1 minute in milliseconds

let callCount = 0;
let firstCallTime = null;
let isWaiting = false; const apiMiddleware = store => next => action => {
  if (action.type.endsWith('/pending')) {
    const now = Date.now();

    // Initialize firstCallTime on the first API call
    if (firstCallTime === null) {
      firstCallTime = now;
    }

    // Check if the time window has expired
    if (now - firstCallTime >= TIME_WINDOW) {
      callCount = 0; // Reset the count
      firstCallTime = now; // Start a new time window
    }

    // Check if we need to delay the API call
    if (callCount >= API_CALL_LIMIT) {
      if (!isWaiting) {
        isWaiting = true; // Set waiting flag
        return new Promise(resolve => {
          setTimeout(() => {
            callCount = 0; // Reset the count after waiting
            firstCallTime = null; // Reset the first call time
            isWaiting = false; // Clear waiting flag
            resolve(next(action)); // Proceed with the action
          }, TIME_WINDOW - (now - firstCallTime));
        });
      } else {
        // If already waiting, just return a promise that resolves when waiting is done
        return new Promise(resolve => {
          const interval = setInterval(() => {
            if (!isWaiting) {
              clearInterval(interval);
              resolve(next(action));
            }
          }, 100); // Check every 100ms
        });
      }
    }

    // Increment the call count
    callCount++;
  }

  return next(action);
};

export default apiMiddleware;