const PORT = 8080;
let IP_SERVER;
let ws;

const kiemtra_DinhDang = (ip) => {
  const regex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return regex.test(ip);
};
const kiemtra_IP = () => {
  const text = document.getElementById("txt_diachiip").value;
  if (!kiemtra_DinhDang(text)) {
    hienThiThongBao("Địa chỉ IP không hợp lệ");
    return false;
  }
  IP_SERVER = text;
  return true;
};
const KetNoi = () => {
  if (kiemtra_IP()) {
    return new WebSocket("ws://" + IP_SERVER + ":" + PORT);
  }
  hienThiThongBao("Thiết bị không có chung kết nối");
  return null;
};

function xuLyXuKien_KetNoi() {
  document.getElementById("lbe_thongbaoloi").style.display = "none";
  ws = KetNoi();
  if (ws != null) {
    ganSuKienWebSocket();
  }
}

function ganSuKienWebSocket() {
  ws.onopen = () => {
    alert("✅ Kết nối thành công");
  };
  ws.onerror = (err) => {
    console.error("❌ Lỗi WebSocket:", err);
    alert("❌ Lỗi:", err);
  };
  ws.onclose = () => {
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
