export class User {
    firstname!: string;
    lastname!: string;
    email!: {
        email: string,
        confirm: string
    }
    password!: {
        password: string,
        confirmPassword: string,
    };
}