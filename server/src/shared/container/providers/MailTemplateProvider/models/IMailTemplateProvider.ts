import IParseMailTemplateDto from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDto): Promise<string>;
}
