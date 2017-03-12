package com.retryapp;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import com.audioStreaming.ReactNativeAudioStreamingPackage;
import com.rnfs.RNFSPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager =
            CallbackManager.Factory.create();

    public static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }


    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {

            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new ReactNativeAudioStreamingPackage(),
                    new RNFSPackage(),
                    new FBSDKPackage(mCallbackManager)
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
