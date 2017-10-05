import bcrypt from 'bcrypt';


/**
 *
 *
 * @export
 * @class PasswordHelper
 */
export default class PasswordHelper {
  /**
   *
   *
   * @param {any} password
   * @returns hash
   * @memberof PasswordHelper
   */
  hashPassword(password) {
    this.salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, this.salt);
    return hash;
  }
  /**
   * 
   * 
   * @param {any} password 
   * @param {any} hash 
   * @memberof PasswordHelper
   */

  /**
	 * 
	 * 
	 * @param {any} password 
	 * @param {any} hash 
	 * @returns 
	 * @memberof PasswordHelper
	 */
  decrypt(password, hash) {
    this.status = bcrypt.compareSync(password, hash);
    return this.status;
  }
}

