package com.example.chuyentaptin;


import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class act_TrangChu extends AppCompatActivity{
    // Khởi tạo các biến giao diện
    Button btn_KetNoi;
    TextView lbe_HienThiThongBao, lbe_DiaChiIP;
    ListView lsv_HienThiKetNoi;
    // Khai báo các biến toàn cục
    boolean trangThaiKetNoi = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.act_trangchu);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            getWindow().setStatusBarColor(Color.parseColor("#30FFD700"));

            return insets;
        });

        // Ánh xạ IDs các biến giao diện
        anhXaIDs();

        // Thiết lập mặc định
        thietLapMacDinh();

        // Xử lý sự kiện kết nối
        xuLySuKien_KetNoi();
    }

    private void thietLapMacDinh() {
        WebSocketHelper.getInstance().XuLyBienGiaoDien(this, lsv_HienThiKetNoi, lbe_HienThiThongBao);
        lbe_DiaChiIP.setText("Địa chỉ IP hiện tại: " + mt_PhuongThucXuLy.getMobileIPAddress());
    }

    private void anhXaIDs() {
        lbe_HienThiThongBao = findViewById(R.id.lbe_HienThiThongBao);
        lsv_HienThiKetNoi = findViewById(R.id.lsv_HienThiKetNoi);
        lbe_DiaChiIP = findViewById(R.id.lbe_DiaChiIP);
        btn_KetNoi = findViewById(R.id.btn_KiemTraKetNoi);
    }

    private void xuLySuKien_KetNoi() {
        btn_KetNoi.setOnClickListener(v -> {
            if(!trangThaiKetNoi){
                if(WebSocketHelper.getInstance().khoiTao_KetNoi())
                {
                    btn_KetNoi.setText("Ngắt kết nôi");
                    trangThaiKetNoi = true;
                }
            }else{
                WebSocketHelper.getInstance().dong_KetNoi();
                btn_KetNoi.setText("Tạo kết nối");
                trangThaiKetNoi = false;
            }
        });
    }


}