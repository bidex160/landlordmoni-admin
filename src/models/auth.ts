/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/**
 * An Auth class which stores authentication
 * related information about the currently
 * logged in user
 */
export class Auth {


  constructor(


    // [email, firstName, lastName => Admin], [phone, fullName => Driver] [photoUrl => Admin, Driver]
    public identifier: any,
    public user_identifier: any,
    public first_name: any,
    public last_name: any,
    public full_name: any,
    public email: any,
    public mobile_number: any,
    public access_credentials?: any,
    public meta?: any,
    public created_at?: any,
    public date_of_birth?: any,
    public gender?: any,
    public user_role?: any,
    public marital_status_label?: any,
    public employment_info?: any,
    public profile_picture_url?: any
  ) {}
}
