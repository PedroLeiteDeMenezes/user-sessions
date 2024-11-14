export interface ISession {
  id?: number
  userId?: number
  sessionToken: string
  expiresAt: Date
}