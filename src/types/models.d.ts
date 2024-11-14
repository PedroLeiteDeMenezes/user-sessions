 export interface Models{
  User: typeof import('../models/user').default
  userSession: typeof import('../models/userSession').default
 }