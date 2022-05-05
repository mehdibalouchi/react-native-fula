package com.rngofula;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.io.File;
import java.util.Map;
import java.util.HashMap;

import fula.Fula;
import fula.Fula_;


public class FulaModule extends ReactContextBaseJavaModule {
    Fula_ fula;
    String appDirs;
    FulaModule(ReactApplicationContext context) {
        super(context);
        appDirs = context.getFilesDir().toString();
        fula = Fula.newFula(appDirs);
    }

    @Override
    public String getName() {
        return "FulaModule";
    }

    @ReactMethod
    public void send(String path, Promise promise) {
        try{
            String cid = fula.send(path);
            promise.resolve(cid);
        }
        catch(Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void connect(String boxId, Promise promise) {
        Log.d("fulaModule", appDirs);
        try{
            fula.connect(boxId);
            promise.resolve(true);
        }
        catch(Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void receive(String fileId, Promise promise) {
        try{
            String filePath = fula.receive(fileId);
            String uriPath = Uri.fromFile(new File(filePath)).toString();
            promise.resolve(uriPath);
        }catch (Exception e){
            promise.reject(e);
        }
    }
}