package com.example.chuyentaptin;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;
import java.util.ArrayList;

public class WebSocketHelper {
    // Xử lý kết nối
    private static WebSocketHelper instance;
    private MyWebSocketServer wSocket;
    private final int PORT = 8080;

    // Xử lý giao diện
    private ArrayList<String> list_DanhSachKetNoi = new ArrayList<>();
    private ListView lsv_HienThiKetNoi;
    private ArrayAdapter<String> mydapter;
    private TextView lbe_HienThiThongBao;
    Activity context;

    public static WebSocketHelper getInstance() {
        if (instance == null) {
            instance = new WebSocketHelper();
        }
        return instance;
    }

    private WebSocketHelper() {
    }

    public void XuLyBienGiaoDien(Activity context, ListView lsv_DanhSachKetNoi, TextView lbe_HienThiThongBao) {
        this.lsv_HienThiKetNoi = lsv_DanhSachKetNoi;
        this.context = context;
        this.lbe_HienThiThongBao = lbe_HienThiThongBao;
    }

    public boolean khoiTao_KetNoi() {
        wSocket = new MyWebSocketServer(PORT);
        if (wSocket != null) {
            wSocket.start();
            return true;
        }
        return false;
    }

    public void dong_KetNoi(){
        try {
            wSocket.stop();
            wSocket = null;
            list_DanhSachKetNoi.clear();
            context.runOnUiThread(() -> {
                mydapter.notifyDataSetChanged();
            });
        } catch (Exception e) {
            Log.d("ThongBao", "Đóng kết nối - " + e.toString());
        }
    }
    public void hienThi_KetNoi(String client){
        context.runOnUiThread(() -> {
            list_DanhSachKetNoi.add(client);
            if (mydapter == null){
                mydapter = new adapter_HienThiKetNoi(context, R.layout.layout_hienthiketnoi, list_DanhSachKetNoi);
                lsv_HienThiKetNoi.setAdapter(mydapter);
            }
            mydapter.notifyDataSetChanged();
        });
    }
    public void capnhat_ThongBao(String msg){
        context.runOnUiThread(() -> {
            lbe_HienThiThongBao.setText(msg);
        });
    }
    public ArrayList<String> getDanhSachKetNoi(){
        return list_DanhSachKetNoi;
    }
}
