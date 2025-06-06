const PORT = 8080;
let IP_SERVER;
let ws;
let timer;
let connect_state = false; // Điều khiển trạng thái web có đang kết nối
const file_Manager = {};
const chars = "abcdefghijklmnopqrstuvwxyz";
let random_id = "";

// Khai báo arrow function
const get_By_Id = (id) => {
  return document.getElementById(id);
};
const get_Value = (id) => {
  return get_By_Id(id).value;
};
const style_Display = (id, value) => {
  get_By_Id(id).style.display = value;
};
const style_Color = (id, value) => {
  get_By_Id(id).style.color = value;
};
const text_Content = (id, value) => {
  get_By_Id(id).textContent = value;
};

const random_id_file = () => {
  random_id = "";
  for (let i = 0; i < 11; i++) {
    if (i % 3 == 0 && i > 0) {
      random_id += "-";
    }
    random_id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return random_id;
};
const getAddressIP = async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
};

function hienThiThongBao(err) {
  text_Content("lbe_thongbaoloi", err);
  style_Display("lbe_thongbaoloi", "block");
}

const kiemtra_DinhDang = (ip) => {
  const regex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return regex.test(ip);
};
const kiemtra_Rong = (ip) => {
  return ip !== "";
};

const kiemtra_IP = () => {
  const ip = get_Value("txt_diachiip");
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

const xuLyXuKien_KetNoi = () => {
  connect_state = !connect_state;
  if (connect_state) {
    style_Display("lbe_thongbaoloi", "none");
    if (kiemtra_IP()) {
      text_Content("btn_ketnoi", "Đóng kết nối");
      style_Display("pss_tientrinh", "block");
      ws = new WebSocket("ws://" + IP_SERVER + ":" + PORT);
      if (ws != null) {
        ganSuKienWebSocket();
      }
    }
  }
};

const xuLyXuKien_dongKetNoi = () => {
  if (ws != null) {
    ws.close();
  }
};

function ganSuKienWebSocket() {
  ws.onopen = () => {
    style_Display("pss_tientrinh", "none");
    style_Color("header_lbe_ketnoi", "green");
    text_Content("header_lbe_ketnoi", "Đã kết nối");
    style_Display("left_content_section", "flex");
    style_Display("right_content_section", "flex");
    style_Display("center_content_section", "none");
    let seconds = 1;
    timer = setInterval(() => {
      text_Content("time", "Thời gian kết nối: " + seconds + "s");
      seconds++;
    }, 1000);
    text_Content("ip", "Thông tin IP: " + IP_SERVER);
  };
  ws.onerror = (err) => {
    style_Display("pss_tientrinh", "none");
    hienThiThongBao("Không tìm thấy kết nối!");
  };
  ws.onclose = () => {
    if (ws != null) {
      style_Display("pss_tientrinh", "none");
      style_Color("header_lbe_ketnoi", "red");
      text_Content("header_lbe_ketnoi", "Không có kết nối");
      text_Content("btn_ketnoi", "Kết nối");
      style_Display("pss_tientrinh", "none");
      text_Content("time", "Thời gian kết nối:");
      style_Display("left_content_section", "none");
      style_Display("right_content_section", "none");
      style_Display("center_content_section", "flex");
      clearInterval(timer);
      ws = null;
    }
  };
  ws.onmessage = (event) => {
    console.log("📨 Nhận:", event.data);
  };
}
const chon_File = () => {
  const fileInput = get_By_Id("fileInput");
  fileInput.click();
  fileInput.addEventListener("change", async () => {
    const files = fileInput.files;
    const ip = await getAddressIP();
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const tr = document.createElement("tr");

        // Số thứ tự
        const tdSTT = document.createElement("td");
        tdSTT.textContent = i + 1;
        tr.appendChild(tdSTT);

        // ID tệp
        const tdID = document.createElement("td");
        tdID.textContent = random_id_file();
        tr.appendChild(tdID);

        // Tên file
        const tdTenFile = document.createElement("td");
        tdTenFile.textContent = file.name;
        tr.appendChild(tdTenFile);

        // Kích thước tệp tin
        const tdKichThuoc = document.createElement("td");
        tdKichThuoc.textContent = (file.size / 1024).toFixed(0) + " KB";
        tr.appendChild(tdKichThuoc);

        // Người gửi
        const tdNguoiGUi = document.createElement("td");
        tdNguoiGUi.textContent = ip;
        tr.appendChild(tdNguoiGUi);

        get_By_Id("data_table").appendChild(tr);
      }
    }
  });
};
const them_File = () => {};
