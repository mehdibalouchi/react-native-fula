package com.rngofula;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;

import fula.Fula;
import fula.Fula_;


public class FulaModule extends ReactContextBaseJavaModule {
    Fula_ fula;
    FulaModule(ReactApplicationContext context) {
        super(context);
        fula = Fula.newFula();
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
        try{
            fula.connect(boxId);
            promise.resolve(true);
        }
        catch(Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void receiveMeta(String fileId, Promise promise) {
        try{
            String meta = fula.receiveMeta(fileId);
            promise.resolve(meta);
        }catch (Exception e){
            promise.reject(e);
        }
    }

    public void onHostDestroy() {
        Log.d("FulaModule", "I think we fucked");
    }
}