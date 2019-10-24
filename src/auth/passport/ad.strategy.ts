import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ldap } from './mock/ldap';
/**
 * Declare passport-activedirectory
 */
var Strategy = require('passport-activedirectory');

/**
 * Class active directory strategy
 *
 * @export
 * @class ActiveDirectoryStrategy
 * @extends {PassportStrategy(Strategy,'ad')}
 */
@Injectable()
export class ActiveDirectoryStrategy extends PassportStrategy(Strategy, 'ad') {

  // constructor(
  //   private readonly authService: AuthService) {
  //   super(
  //     {
  //       integrated: false,
  //       usernameField: 'email',
  //       passReqToCallback: false,
  //       ldap: ldap
  //     }
  //   );
  // }

  // async validate(profile, ad, done: Function) {
  //   await this.authService.adLogin(profile)
  //     .then(user => done(null, user))
  //     .catch(err => done(err, false))
  // }
}
