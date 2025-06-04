package com.example.chuyentaptin;

import android.app.Activity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;

public class adapter_HienThiKetNoi extends ArrayAdapter<String>{
    Activity context;
    ArrayList<String> myList;
    int id_Layout;

    public adapter_HienThiKetNoi(Activity context, int id_Layout, ArrayList<String> myList) {
        super(context,id_Layout, myList);
        this.context = context;
        this.myList = myList;
        this.id_Layout = id_Layout;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater inflater = context.getLayoutInflater();
        convertView = inflater.inflate(id_Layout, null);
        String ip = myList.get(position);

        TextView thongtin_ip = convertView.findViewById(R.id.layout_ketnoi_lbe_HienThiKetNoi);
        thongtin_ip.setText(ip);

        return convertView;
    }
}
