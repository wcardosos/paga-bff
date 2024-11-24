export interface HashProvider {
  compare(rawPassword: string, passwordHash: string): Promise<boolean>;
}
