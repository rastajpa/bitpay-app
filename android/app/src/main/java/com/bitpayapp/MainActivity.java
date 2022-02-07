package com.bitpayapp;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "BitPayApp";
  }

  @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);
    }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
  }
}
