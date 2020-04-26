const senders = {
  userProvider: "USER_PROVIDER",
  login: "LOGIN",
};

const defaultDebugConfiguration = {
  hideList: [],
};

export const log = (sender: string, message: string) => {
  if (window["debugConfiguration"].hideList.includes(sender)) return;
  console.info(`[${Date.now()}][${window["senders"][sender]}]> ${message}`);
};

// bodge to get this attached to the window object on the client without turning off SSR for everything
setTimeout(() => {
  if (typeof window !== "undefined") {
    window["senders"] = senders;
    window["debugConfiguration"] = defaultDebugConfiguration;
  }
}, 1);
