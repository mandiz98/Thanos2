package com.example.thanos2app.ui.connect;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.nfc.Tag;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.example.thanos2app.R;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;

public class ConnectFragment extends Fragment {

    private ConnectViewModel connectViewModel;
    private BluetoothDevice m_device;
    private BluetoothSocket m_socket;
    private UUID m_uuid;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        connectViewModel =
                ViewModelProviders.of(this).get(ConnectViewModel.class);
        View root = inflater.inflate(R.layout.fragment_connect, container, false);
        final Button connectBtn = root.findViewById(R.id.btn_connect);

        connectBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.i("Pressed", "Button is CLicked!");
                connectBT();
            }
        });


        return root;
    }

    public void connectBT(){
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if(!bluetoothAdapter.isEnabled()){
            Intent enableAdapter = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableAdapter,0);
        }
        Set<BluetoothDevice> bondedDevices = bluetoothAdapter.getBondedDevices();


        if(!bondedDevices.isEmpty()){
            for (BluetoothDevice device : bondedDevices){
                Log.i("Pressed", device.getName());
                Log.i("Pressed", device.getUuids()[0].getUuid().toString());

                if(device.getName().equals("Makeblock_LE001b1065facc")){
                    m_device = device;

                }
            }
        }

        m_uuid = m_device.getUuids()[0].getUuid();

        try {
            m_socket = m_device.createRfcommSocketToServiceRecord(m_uuid);
        }catch (IOException e){
            Log.e("hej", String.valueOf(e));
        }

        Log.i("worked", "helloooo");
    }
}
