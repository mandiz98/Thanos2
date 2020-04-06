package com.example.thanos2app.ui.visualize;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.example.thanos2app.R;

public class VisualizeFragment extends Fragment {

    private VisualizeViewModel visualizeViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        visualizeViewModel =
                ViewModelProviders.of(this).get(VisualizeViewModel.class);
        View root = inflater.inflate(R.layout.fragment_visualize, container, false);
        final TextView textView = root.findViewById(R.id.text_notifications);
        visualizeViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {
                textView.setText(s);
            }
        });
        return root;
    }
}
