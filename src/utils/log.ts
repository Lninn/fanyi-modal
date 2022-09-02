export const log = {
  info(...args: any[]) {
    console.log('[info] ', ...args)
  },

  err(...args: any[]) {
    console.log('[err] ', ...args)
  },
}
