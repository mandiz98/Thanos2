package com.example.thanos2app.ui.visualize;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class VisualizeViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public VisualizeViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is Visualization fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}