export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Logger utility for logging various message types
export const Logger = {
    log: (message) => console.log(`%c${message}`, "color: black;"),
    info: (message) => console.log(`%c${message}`, "color: blue; font-weight: bold;"),
    warn: (message) => console.log(`%c${message}`, "color: orange; font-weight: bold;"),
    error: (message) => console.log(`%c${message}`, "color: red; font-weight: bold;"),
    success: (message) => console.log(`%c${message}`, "color: green; font-weight: bold;")
};