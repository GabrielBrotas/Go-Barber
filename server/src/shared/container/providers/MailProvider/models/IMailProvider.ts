export default interface IMailProvider {
  sendMail(to: string, from: string): Promise<void>;
}
