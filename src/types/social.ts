/** Resposta de login do Google (Google Identity Services). */
export interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
}

/** Resposta de login do Facebook (SDK JS). */
export interface FacebookLoginResponse {
  userID: string;
  name: string;
  email: string;
  accessToken?: string;
}
