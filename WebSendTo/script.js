const PORT = 8080;
let IP_SERVER;
let ws;

const kiemtra_DinhDang = (ip) => {
  const regex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return regex.test(ip);
};
const kiemtra_Rong = (ip) => {
  return ip !== "";
};
const kiemtra_IP = () => {
  const ip = document.getElementById("txt_diachiip").value;
  if (!kiemtra_Rong(ip)) {
    hienThiThongBao("Vui lòng nhập địa chỉ IP.");
    return false;
  }
  if (!kiemtra_DinhDang(ip)) {
    hienThiThongBao("Địa chỉ IP không hợp lệ.");
    return false;
  }

  IP_SERVER = ip;
  return true;
};
const KetNoi = () => {
  return null;
};

function xuLyXuKien_KetNoi() {
  document.getElementById("lbe_thongbaoloi").style.display = "none";
  if (kiemtra_IP()) {
    document.getElementById("pss_tientrinh").style.display = "block";
    ws = new WebSocket("wss://" + IP_SERVER + ":" + PORT);
    if (ws != null) {
      ganSuKienWebSocket();
    } else {
      document.getElementById("pss_tientrinh").style.display = "none";
      hienThiThongBao("Thiết bị không có chung kết nối");
    }
  }
}

function ganSuKienWebSocket() {
  ws.onopen = () => {
    document.getElementById("pss_tientrinh").style.display = "none";

    alert("✅ Kết nối thành công");
  };
  ws.onerror = (err) => {
    document.getElementById("pss_tientrinh").style.display = "none";

    console.error("❌ Lỗi WebSocket:", err);
    alert("❌ Lỗi:", err);
  };
  ws.onclose = () => {
    document.getElementById("pss_tientrinh").style.display = "none";

    alert("⚠️ Kết nối đã đóng");
  };
  ws.onmessage = (event) => {
    console.log("📨 Nhận:", event.data);
  };
}

function hienThiThongBao(err) {
  document.getElementById("lbe_thongbaoloi").textContent = err;
  document.getElementById("lbe_thongbaoloi").style.display = "block";
}
