package com.example.chuyentaptin;

import android.util.Log;
import android.view.View;
import android.widget.TextView;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;

public class MyWebSocketServer extends WebSocketServer {
    TextView lbe_ThongBao;
    public MyWebSocketServer (int port){
        super(new InetSocketAddress(port));
    }
    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        if(WebSocketHelper.getInstance().getDanhSachKetNoi().contains(conn.getRemoteSocketAddress().toString())){
            conn.send("Error: Unauthorized connection");
            conn.close(1008, "Unauthorized");
            return;
        }
        WebSocketHelper.getInstance().hienThi_KetNoi(conn.getRemoteSocketAddress().toString());
        conn.send("Welcome to Android WebSocket Server!");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        WebSocketHelper.getInstance().capnhat_ThongBao("Thiết bị chưa được khởi tạo kết nối");
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        System.out.println("Message from client: " + message);
        // Bạn có thể gửi lại message, ví dụ echo:
        conn.send("Echo: " + message);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        Log.d("ThongBao", "Kết nối WebSocket - " + ex.toString());
    }

    @Override
    public void onStart() {
        WebSocketHelper.getInstance().capnhat_ThongBao("Tạo kết nối hoàn tất, bạn đã có thể gửi các tập tin");
    }
}
