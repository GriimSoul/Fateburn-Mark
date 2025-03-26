const API_CALL_LIMIT = 50; // Set API call limit
const TIME_WINDOW = 60000; // 1 minute in milliseconds

let callCount = 0;
let firstCallTime = null;

const apiMiddleware = store => next => action => {
  if (action.type.endsWith('/pending')) {
    // Check if we need to delay the API call
    if (callCount >= API_CALL_LIMIT) {
      const now = Date.now();
      if (firstCallTime && now - firstCallTime < TIME_WINDOW) {
        // Delay the action
        return new Promise(resolve => {
          setTimeout(() => {
            callCount = 0; // Reset the count after the time window
            firstCallTime = null; // Reset the first call time
            resolve(next(action)); // Proceed with the action
          }, TIME_WINDOW - (now - firstCallTime));
        });
      } else {
        // Reset the count and time if the time window has passed
        callCount = 0;
        firstCallTime = now;
      }
    }
    // Increment the call count
    callCount++;
  }

  return next(action);
};

export default apiMiddleware;