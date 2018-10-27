export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';


export function authenticate() {
    return {
        type: AUTHENTICATED
    };
}

export function unauthenticate() {
    return {
        type: UNAUTHENTICATED
    };
}
