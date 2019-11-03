/**
 * The shape of the user interface
 *
 * @export
 * @interface User
 */
export interface User {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    gender?: string;
    email?: string;
    phone?: number;
    address?: string;
    dateOfBirth?: Date;
}