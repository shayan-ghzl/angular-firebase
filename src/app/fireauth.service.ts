import { inject, Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, User } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { trimStringValues } from './helper.functions';

export interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  fireauth = inject(Auth);

  // it will not throw any errors, null means not logged-in
  currentUser$ = user(this.fireauth) as Observable<User | null>;

  login(user: Omit<IUser, 'id'>) {
    user = trimStringValues(user);
    const promise = signInWithEmailAndPassword(this.fireauth, user.email, user.password)
      .catch((error: FirebaseError) => error);
    return from(promise);
  }

  register(user: Omit<IUser, 'id'>) {
    user = trimStringValues(user);
    const promise = createUserWithEmailAndPassword(this.fireauth, user.email, user.password)
      .then(response => updateProfile(response.user, { displayName: user.username }).catch((error: FirebaseError) => { throw error; }))
      .catch((error: FirebaseError) => error);
    return from(promise);
  }

  logout() {
    const promise = signOut(this.fireauth).catch((error: FirebaseError) => error);
    return from(promise);
  }

}

export const enum AuthErrorCode {
  ADMIN_ONLY_OPERATION = 'admin-restricted-operation',
  ARGUMENT_ERROR = 'argument-error',
  APP_NOT_AUTHORIZED = 'app-not-authorized',
  APP_NOT_INSTALLED = 'app-not-installed',
  CAPTCHA_CHECK_FAILED = 'captcha-check-failed',
  CODE_EXPIRED = 'code-expired',
  CORDOVA_NOT_READY = 'cordova-not-ready',
  CORS_UNSUPPORTED = 'cors-unsupported',
  CREDENTIAL_ALREADY_IN_USE = 'credential-already-in-use',
  CREDENTIAL_MISMATCH = 'custom-token-mismatch',
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN = 'requires-recent-login',
  DEPENDENT_SDK_INIT_BEFORE_AUTH = 'dependent-sdk-initialized-before-auth',
  DYNAMIC_LINK_NOT_ACTIVATED = 'dynamic-link-not-activated',
  EMAIL_CHANGE_NEEDS_VERIFICATION = 'email-change-needs-verification',
  EMAIL_EXISTS = 'email-already-in-use',
  EMULATOR_CONFIG_FAILED = 'emulator-config-failed',
  EXPIRED_OOB_CODE = 'expired-action-code',
  EXPIRED_POPUP_REQUEST = 'cancelled-popup-request',
  INTERNAL_ERROR = 'internal-error',
  INVALID_API_KEY = 'invalid-api-key',
  INVALID_APP_CREDENTIAL = 'invalid-app-credential',
  INVALID_APP_ID = 'invalid-app-id',
  INVALID_AUTH = 'invalid-user-token',
  INVALID_AUTH_EVENT = 'invalid-auth-event',
  INVALID_CERT_HASH = 'invalid-cert-hash',
  INVALID_CODE = 'invalid-verification-code',
  INVALID_CONTINUE_URI = 'invalid-continue-uri',
  INVALID_CORDOVA_CONFIGURATION = 'invalid-cordova-configuration',
  INVALID_CUSTOM_TOKEN = 'invalid-custom-token',
  INVALID_DYNAMIC_LINK_DOMAIN = 'invalid-dynamic-link-domain',
  INVALID_EMAIL = 'invalid-email',
  INVALID_EMULATOR_SCHEME = 'invalid-emulator-scheme',
  INVALID_CREDENTIAL = 'invalid-credential',
  INVALID_MESSAGE_PAYLOAD = 'invalid-message-payload',
  INVALID_MFA_SESSION = 'invalid-multi-factor-session',
  INVALID_OAUTH_CLIENT_ID = 'invalid-oauth-client-id',
  INVALID_OAUTH_PROVIDER = 'invalid-oauth-provider',
  INVALID_OOB_CODE = 'invalid-action-code',
  INVALID_ORIGIN = 'unauthorized-domain',
  INVALID_PASSWORD = 'wrong-password',
  INVALID_PERSISTENCE = 'invalid-persistence-type',
  INVALID_PHONE_NUMBER = 'invalid-phone-number',
  INVALID_PROVIDER_ID = 'invalid-provider-id',
  INVALID_RECIPIENT_EMAIL = 'invalid-recipient-email',
  INVALID_SENDER = 'invalid-sender',
  INVALID_SESSION_INFO = 'invalid-verification-id',
  INVALID_TENANT_ID = 'invalid-tenant-id',
  LOGIN_BLOCKED = 'login-blocked',
  MFA_INFO_NOT_FOUND = 'multi-factor-info-not-found',
  MFA_REQUIRED = 'multi-factor-auth-required',
  MISSING_ANDROID_PACKAGE_NAME = 'missing-android-pkg-name',
  MISSING_APP_CREDENTIAL = 'missing-app-credential',
  MISSING_AUTH_DOMAIN = 'auth-domain-config-required',
  MISSING_CODE = 'missing-verification-code',
  MISSING_CONTINUE_URI = 'missing-continue-uri',
  MISSING_IFRAME_START = 'missing-iframe-start',
  MISSING_IOS_BUNDLE_ID = 'missing-ios-bundle-id',
  MISSING_OR_INVALID_NONCE = 'missing-or-invalid-nonce',
  MISSING_MFA_INFO = 'missing-multi-factor-info',
  MISSING_MFA_SESSION = 'missing-multi-factor-session',
  MISSING_PHONE_NUMBER = 'missing-phone-number',
  MISSING_PASSWORD = 'missing-password',
  MISSING_SESSION_INFO = 'missing-verification-id',
  MODULE_DESTROYED = 'app-deleted',
  NEED_CONFIRMATION = 'account-exists-with-different-credential',
  NETWORK_REQUEST_FAILED = 'network-request-failed',
  NULL_USER = 'null-user',
  NO_AUTH_EVENT = 'no-auth-event',
  NO_SUCH_PROVIDER = 'no-such-provider',
  OPERATION_NOT_ALLOWED = 'operation-not-allowed',
  OPERATION_NOT_SUPPORTED = 'operation-not-supported-in-this-environment',
  POPUP_BLOCKED = 'popup-blocked',
  POPUP_CLOSED_BY_USER = 'popup-closed-by-user',
  PROVIDER_ALREADY_LINKED = 'provider-already-linked',
  QUOTA_EXCEEDED = 'quota-exceeded',
  REDIRECT_CANCELLED_BY_USER = 'redirect-cancelled-by-user',
  REDIRECT_OPERATION_PENDING = 'redirect-operation-pending',
  REJECTED_CREDENTIAL = 'rejected-credential',
  SECOND_FACTOR_ALREADY_ENROLLED = 'second-factor-already-in-use',
  SECOND_FACTOR_LIMIT_EXCEEDED = 'maximum-second-factor-count-exceeded',
  TENANT_ID_MISMATCH = 'tenant-id-mismatch',
  TIMEOUT = 'timeout',
  TOKEN_EXPIRED = 'user-token-expired',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'too-many-requests',
  UNAUTHORIZED_DOMAIN = 'unauthorized-continue-uri',
  UNSUPPORTED_FIRST_FACTOR = 'unsupported-first-factor',
  UNSUPPORTED_PERSISTENCE = 'unsupported-persistence-type',
  UNSUPPORTED_TENANT_OPERATION = 'unsupported-tenant-operation',
  UNVERIFIED_EMAIL = 'unverified-email',
  USER_CANCELLED = 'user-cancelled',
  USER_DELETED = 'user-not-found',
  USER_DISABLED = 'user-disabled',
  USER_MISMATCH = 'user-mismatch',
  USER_SIGNED_OUT = 'user-signed-out',
  WEAK_PASSWORD = 'weak-password',
  WEB_STORAGE_UNSUPPORTED = 'web-storage-unsupported',
  ALREADY_INITIALIZED = 'already-initialized',
  RECAPTCHA_NOT_ENABLED = 'recaptcha-not-enabled',
  MISSING_RECAPTCHA_TOKEN = 'missing-recaptcha-token',
  INVALID_RECAPTCHA_TOKEN = 'invalid-recaptcha-token',
  INVALID_RECAPTCHA_ACTION = 'invalid-recaptcha-action',
  MISSING_CLIENT_TYPE = 'missing-client-type',
  MISSING_RECAPTCHA_VERSION = 'missing-recaptcha-version',
  INVALID_RECAPTCHA_VERSION = 'invalid-recaptcha-version',
  INVALID_REQ_TYPE = 'invalid-req-type',
  UNSUPPORTED_PASSWORD_POLICY_SCHEMA_VERSION = 'unsupported-password-policy-schema-version',
  PASSWORD_DOES_NOT_MEET_REQUIREMENTS = 'password-does-not-meet-requirements'
};

export const AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY = {
  ADMIN_ONLY_OPERATION: 'auth/admin-restricted-operation',
  ARGUMENT_ERROR: 'auth/argument-error',
  APP_NOT_AUTHORIZED: 'auth/app-not-authorized',
  APP_NOT_INSTALLED: 'auth/app-not-installed',
  CAPTCHA_CHECK_FAILED: 'auth/captcha-check-failed',
  CODE_EXPIRED: 'auth/code-expired',
  CORDOVA_NOT_READY: 'auth/cordova-not-ready',
  CORS_UNSUPPORTED: 'auth/cors-unsupported',
  CREDENTIAL_ALREADY_IN_USE: 'auth/credential-already-in-use',
  CREDENTIAL_MISMATCH: 'auth/custom-token-mismatch',
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'auth/requires-recent-login',
  DEPENDENT_SDK_INIT_BEFORE_AUTH: 'auth/dependent-sdk-initialized-before-auth',
  DYNAMIC_LINK_NOT_ACTIVATED: 'auth/dynamic-link-not-activated',
  EMAIL_CHANGE_NEEDS_VERIFICATION: 'auth/email-change-needs-verification',
  EMAIL_EXISTS: 'auth/email-already-in-use',
  EMULATOR_CONFIG_FAILED: 'auth/emulator-config-failed',
  EXPIRED_OOB_CODE: 'auth/expired-action-code',
  EXPIRED_POPUP_REQUEST: 'auth/cancelled-popup-request',
  INTERNAL_ERROR: 'auth/internal-error',
  INVALID_API_KEY: 'auth/invalid-api-key',
  INVALID_APP_CREDENTIAL: 'auth/invalid-app-credential',
  INVALID_APP_ID: 'auth/invalid-app-id',
  INVALID_AUTH: 'auth/invalid-user-token',
  INVALID_AUTH_EVENT: 'auth/invalid-auth-event',
  INVALID_CERT_HASH: 'auth/invalid-cert-hash',
  INVALID_CODE: 'auth/invalid-verification-code',
  INVALID_CONTINUE_URI: 'auth/invalid-continue-uri',
  INVALID_CORDOVA_CONFIGURATION: 'auth/invalid-cordova-configuration',
  INVALID_CUSTOM_TOKEN: 'auth/invalid-custom-token',
  INVALID_DYNAMIC_LINK_DOMAIN: 'auth/invalid-dynamic-link-domain',
  INVALID_EMAIL: 'auth/invalid-email',
  INVALID_EMULATOR_SCHEME: 'auth/invalid-emulator-scheme',
  INVALID_IDP_RESPONSE: 'auth/invalid-credential',
  INVALID_LOGIN_CREDENTIALS: 'auth/invalid-credential',
  INVALID_MESSAGE_PAYLOAD: 'auth/invalid-message-payload',
  INVALID_MFA_SESSION: 'auth/invalid-multi-factor-session',
  INVALID_OAUTH_CLIENT_ID: 'auth/invalid-oauth-client-id',
  INVALID_OAUTH_PROVIDER: 'auth/invalid-oauth-provider',
  INVALID_OOB_CODE: 'auth/invalid-action-code',
  INVALID_ORIGIN: 'auth/unauthorized-domain',
  INVALID_PASSWORD: 'auth/wrong-password',
  INVALID_PERSISTENCE: 'auth/invalid-persistence-type',
  INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',
  INVALID_PROVIDER_ID: 'auth/invalid-provider-id',
  INVALID_RECIPIENT_EMAIL: 'auth/invalid-recipient-email',
  INVALID_SENDER: 'auth/invalid-sender',
  INVALID_SESSION_INFO: 'auth/invalid-verification-id',
  INVALID_TENANT_ID: 'auth/invalid-tenant-id',
  MFA_INFO_NOT_FOUND: 'auth/multi-factor-info-not-found',
  MFA_REQUIRED: 'auth/multi-factor-auth-required',
  MISSING_ANDROID_PACKAGE_NAME: 'auth/missing-android-pkg-name',
  MISSING_APP_CREDENTIAL: 'auth/missing-app-credential',
  MISSING_AUTH_DOMAIN: 'auth/auth-domain-config-required',
  MISSING_CODE: 'auth/missing-verification-code',
  MISSING_CONTINUE_URI: 'auth/missing-continue-uri',
  MISSING_IFRAME_START: 'auth/missing-iframe-start',
  MISSING_IOS_BUNDLE_ID: 'auth/missing-ios-bundle-id',
  MISSING_OR_INVALID_NONCE: 'auth/missing-or-invalid-nonce',
  MISSING_MFA_INFO: 'auth/missing-multi-factor-info',
  MISSING_MFA_SESSION: 'auth/missing-multi-factor-session',
  MISSING_PHONE_NUMBER: 'auth/missing-phone-number',
  MISSING_SESSION_INFO: 'auth/missing-verification-id',
  MODULE_DESTROYED: 'auth/app-deleted',
  NEED_CONFIRMATION: 'auth/account-exists-with-different-credential',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  NULL_USER: 'auth/null-user',
  NO_AUTH_EVENT: 'auth/no-auth-event',
  NO_SUCH_PROVIDER: 'auth/no-such-provider',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  OPERATION_NOT_SUPPORTED: 'auth/operation-not-supported-in-this-environment',
  POPUP_BLOCKED: 'auth/popup-blocked',
  POPUP_CLOSED_BY_USER: 'auth/popup-closed-by-user',
  PROVIDER_ALREADY_LINKED: 'auth/provider-already-linked',
  QUOTA_EXCEEDED: 'auth/quota-exceeded',
  REDIRECT_CANCELLED_BY_USER: 'auth/redirect-cancelled-by-user',
  REDIRECT_OPERATION_PENDING: 'auth/redirect-operation-pending',
  REJECTED_CREDENTIAL: 'auth/rejected-credential',
  SECOND_FACTOR_ALREADY_ENROLLED: 'auth/second-factor-already-in-use',
  SECOND_FACTOR_LIMIT_EXCEEDED: 'auth/maximum-second-factor-count-exceeded',
  TENANT_ID_MISMATCH: 'auth/tenant-id-mismatch',
  TIMEOUT: 'auth/timeout',
  TOKEN_EXPIRED: 'auth/user-token-expired',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'auth/too-many-requests',
  UNAUTHORIZED_DOMAIN: 'auth/unauthorized-continue-uri',
  UNSUPPORTED_FIRST_FACTOR: 'auth/unsupported-first-factor',
  UNSUPPORTED_PERSISTENCE: 'auth/unsupported-persistence-type',
  UNSUPPORTED_TENANT_OPERATION: 'auth/unsupported-tenant-operation',
  UNVERIFIED_EMAIL: 'auth/unverified-email',
  USER_CANCELLED: 'auth/user-cancelled',
  USER_DELETED: 'auth/user-not-found',
  USER_DISABLED: 'auth/user-disabled',
  USER_MISMATCH: 'auth/user-mismatch',
  USER_SIGNED_OUT: 'auth/user-signed-out',
  WEAK_PASSWORD: 'auth/weak-password',
  WEB_STORAGE_UNSUPPORTED: 'auth/web-storage-unsupported',
  ALREADY_INITIALIZED: 'auth/already-initialized',
  RECAPTCHA_NOT_ENABLED: 'auth/recaptcha-not-enabled',
  MISSING_RECAPTCHA_TOKEN: 'auth/missing-recaptcha-token',
  INVALID_RECAPTCHA_TOKEN: 'auth/invalid-recaptcha-token',
  INVALID_RECAPTCHA_ACTION: 'auth/invalid-recaptcha-action',
  MISSING_CLIENT_TYPE: 'auth/missing-client-type',
  MISSING_RECAPTCHA_VERSION: 'auth/missing-recaptcha-version',
  INVALID_RECAPTCHA_VERSION: 'auth/invalid-recaptcha-version',
  INVALID_REQ_TYPE: 'auth/invalid-req-type'
} as const;
