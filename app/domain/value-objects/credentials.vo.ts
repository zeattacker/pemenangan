export class Credentials {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {
    this.validate();
  }

  private validate() {
    if (!this.username || this.username.length < 4) {
      throw new Error("Invalid username");
    }
    if (!this.password || this.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
  }
}
