import ReactNative, {Platform} from 'react-native';
import PoweredByUiOptions from './PoweredByUiOptions';

/**
 * NativeModule bridge to access the iOS or Android SDK methods.
 */
interface DoshModule {
  /**
   * This should be done before any other calls to the PoweredByDosh SDK.
   * TODO: pass in applicationId from JS?
   */
  initializeDosh: () => Promise<any>;

  /**
   * User authorization between the app and Dosh is coordinated by providing the SDK with an authorization token.
   * This token should be requested from the BitPay server.
   */
  setDoshToken: (token: string) => Promise<any>;

  /**
   * Present a full screen view that is managed by the SDK. Options argument is required on Android.
   * @param uiOptions Required on Android. Options to customize the SDK's header title and brand page UI.
   */
  present: (uiOptions?: PoweredByUiOptions) => Promise<any>;

  /**
   * Any time the app's current user changes, such as when the user logs out, the user's information should be cleared.
   * As of now only written for the Android bridge.
   */
  clearUser: () => Promise<any>;

  /**
   * @deprecated For development purposes only. Do not call this in production.
   * As of now only written for the Android bridge.
   */
  presentIntegrationChecklist: () => Promise<any>;
}

/**
 * React JS wrapper for calling the Dosh SDK to handle differences in the iOS/Android call signatures/implementations.
 */
interface Dosh extends Omit<DoshModule, 'present'> {
  /**
   * Present a full screen view that is managed by the SDK.
   */
  present: (uiOptions?: PoweredByUiOptions) => Promise<any>;
}

const DoshModule = ReactNative.NativeModules.Dosh as DoshModule;

const Dosh: Dosh = {
  initializeDosh() {
    return DoshModule.initializeDosh();
  },

  setDoshToken(token: string) {
    return DoshModule.setDoshToken(token);
  },

  present(uiOptions?: PoweredByUiOptions) {
    if (Platform.OS === 'android') {
      const _uiOptions: PoweredByUiOptions = {
        feedTitle: 'Dosh Rewards',
        logoStyle: 'CIRCLE',
        brandDetailsHeaderStyle: 'RECTANGLE',

        ...(uiOptions || {}),
      };

      return DoshModule.present(_uiOptions);
    }

    // Not sure if iOS method has any customization available, even the Android options aren't mentioned in the docs.
    return DoshModule.present();
  },

  clearUser() {
    // TODO: iOS bridge method, let it throw for now
    return DoshModule.clearUser();
  },

  presentIntegrationChecklist() {
    if (Platform.OS === 'android') {
      return DoshModule.presentIntegrationChecklist();
    }

    // TODO: iOS bridge method, if exists. Since this is dev only, just resolve without error.
    return Promise.resolve();
  },
};

export default Dosh;
