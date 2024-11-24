export interface JwtProvider {
  sign(payload: { username: string }): Promise<string>;
}
