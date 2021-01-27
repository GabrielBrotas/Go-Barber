import { ValidationError } from 'yup'; // os atributos que um erro de validação do yup possui

interface Errors {
  // para dizer que a interface Errors pode receber diversos nomes ex: name, email, password, etc... e todos eles serão em formato de string
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  // os erros do Yup vem dentro de 'inner'
  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
}
