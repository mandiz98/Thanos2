package com.example.thanos2app.ui.connect;

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

public class ConnectFragment extends Fragment {

    private ConnectViewModel connectViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        connectViewModel =
                ViewModelProviders.of(this).get(ConnectViewModel.class);
        View root = inflater.inflate(R.layout.fragment_connect, container, false);
        return root;
    }
}
