import { BaseError } from '../../common/errors/base.error';
import { ErrorAcronymIdentifier } from '../../common/errors/error-acronym-identifier.enum';
import { AppErrorAlias, AppErrorMessage } from './app.dictionary';

export class AppVersionNotFoundError extends BaseError {
  constructor(error: any = {}) {
    super(ErrorAcronymIdentifier.Application, error);
    this.setNumeration(AppErrorAlias.AppVersionNotFound);
    this.setMessage(AppErrorMessage[AppErrorAlias.AppVersionNotFound]);
    Object.setPrototypeOf(this, AppVersionNotFoundError.prototype);
  }
}