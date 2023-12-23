export const logger = (store) => (next) => (action) => {
    const currentState = store.getState()
    console.log('Current State =>', currentState);
    console.log('Action dispatched =>', action);
    next(action)
}