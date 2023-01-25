export const createAuthStore = () => {
  return {
    loggedIn: false,
    setLoggedIn(loggedIn: boolean) {
      this.loggedIn = loggedIn
    }
  }
}
