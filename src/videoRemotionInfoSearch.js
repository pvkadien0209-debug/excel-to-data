import { useState, useRef, useEffect, useCallback, useMemo } from "react";
/* ═══════════════════════════════════════════════════════════════
   DATA — paste your dataActionandCss.json content here
   ═══════════════════════════════════════════════════════════════ */
const RAW_DATA = [
  [
    [
      "Mẫu obj-chung",
      '{\n actions: [],\n code: "CSKA_000",\n timeFixed: 5,\n stt: 0,\n };',
    ],
    [
      "typingTextActionToID",
      '{\n cmd: CMD_Fetch.typingTextActionToID,\n toID: "DIV001",\n text: "⚠ Nhưng nếu khớp này gặp vấn đề…",\n styleCss: {\n fontSize: "100px",\n color: "yellow",\n fontWeight: "800",\n },\n group: groupD,\n },',
    ],
    [
      "divAction- BG",
      '{\n cmd: "divAction",\n id: "BG001",\n ToEndFrame: true,\n styleCss: {\n position: "absolute",\n top: 0,\n bottom: 0,\n left: 0,\n right: 0,\n backgroundColor: "red",\n },\n },',
    ],
    [
      "divAction-text -trên -giữa",
      '{\n cmd: "divAction",\n id: "DIV001",\n group: groupD,\n styleCss: {\n position: "absolute",\n gap: "20px",\n top: "200px",\n zIndex: "10",\n width: "100%",\n textAlign: "center",\n },\n },',
    ],
    [
      "divAction - img- căn giữa ngang",
      '{\n cmd: "divAction",\n id: "DIV002",\n group: groupD,\n styleCss: {\n position: "absolute",\n top: "500px",\n left: "50%", // Căn giữa theo chiều ngang\n transform: "translateX(-50%)", // Chỉ dịch theo chiều ngang\n textAlign: "center",\n overFlow: "hidden",\n },\n },',
    ],
    [
      "imageViewActionToID",
      '{\n cmd: CMD_Fetch.imageViewActionToID ,\n toID: "DIV002",\n group: groupD,\n img: "Default_daidien.png",\n styleCss: {\n width: "500px",\n },\n },',
    ],
    [
      "actionCssId - transform img",
      '{\n cmd: CMD_Fetch.actionCssId,\n toID: "DIV-A",\n cssMode: "add",\n css: {\n // Yêu cầu mở rộng maxHeight 100->500 trong 5s\n maxHeight: "600px",\n transition: "max-height 1s ease-in-out",\n },\n },',
    ],
    [
      "actionCssId - transform text hide",
      '{\n cmd: CMD_Fetch.actionCssId,\n toID: "typingTexx001",\n cssMode: "add",\n css: {\n // Yêu cầu mở rộng maxHeight 100->500 trong 5s\n fontSize: "0px",\n },\n group: groupD,\n },',
    ],
    [
      "videoView - luôn absolute và tự điều chỉnh; không bỏ div khác",
      '{\n cmd: CMD_Fetch.videoView,\n video: "kd_tranganninhbinh.mp4",\n ToEndFrame: true,\n videoStartFrom: 0,\n videoDuration: 10 * 60,\n styleCss: {\n position: "absolute",\n height: "1920px",\n },\n },',
    ],
    [
      "Tạo function_group - obj đơn",
      'let obj_004 = {\n actions: [],\n code: "CSKA_000",\n timeFixed: 5,\n stt: 0,\n};\nfinalSet.push(obj_004);',
    ],
    [
      "Tạo function_group - obj sets",
      'arrInput.slice(1, 4).forEach((e, i) => {\n let obj_002 = {\n actions: [],\n code: "CSKA_000",\n timeFixed: null,\n stt: 1,\n };\n finalSet.push(obj_002);\n});',
    ],
    [
      "Tạo functionGourp Outline",
      'function group001_group002(arrInput = [{}], groupD = "groupDefault002") {\n let finalSet = [];\n\n return finalSet;\n}',
    ],
  ],
  [
    [
      "Mẫu CMD file excel",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "cmd",
      "divAction",
      "group",
      "G002",
      "id",
      "A001",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "cmd",
      "typingText-toID",
      "group",
      "G003",
      "toID",
      "A001",
      "id",
      "T001",
      "text",
      "ADD_Text01",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "cmd",
      "videoView",
      "group",
      "G004",
      "video",
      "ADD_Video001",
      "videoStartFrom",
      "ADD_video02start",
      "id",
      "video2",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "cmd",
      "typingText-toID",
      "group",
      "G005",
      "toID",
      "A001",
      "id",
      "T002",
      "text",
      "ADD_Text02",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "cmd",
      "videoView",
      "group",
      "G006",
      "video",
      "ADD_Video001",
      "videoStartFrom",
      "ADD_video03start",
      "id",
      "video3",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "cmd",
      "actionCssId",
      "group",
      "G007",
      "css",
      'JSON_{\n opacity: "1",\n transition: "opacity 1s ease-out"\n}',
      "toID",
      "video2",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "cmd",
      "actionCssId",
      "group",
      "G008",
      "css",
      'JSON_{\n maxWidth: "100px",\n transition: "max-width 2s ease-in-out"\n}',
      "toID",
      "T001",
      "delay",
      60,
      "cssMode",
      "add",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "Mẫu sheet 0",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "code",
      "mode",
      "modeOBJ",
      "content-01",
      "content-02",
      "content-03",
      "content-04",
      "content-05",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "ADD_code001",
      "ADD_Mode001",
      "ADD_MODEOBJ001",
      "img-toID-BG001",
      "DIV-chua-khungtieude",
      "BG-soundPlayer",
      "Div-chua-text",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "ADD_code002",
      "ADD_Mode002",
      "ADD_MODEOBJ002",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "Mẫu sheet 1",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "styleCssName",
      "css-001",
      "css-002",
      "css-003",
      "css-004",
      "css-005",
      "css-006",
      "css-007",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "img-toID-BG001-css",
      '{position:"absolute"}',
      '{width: "1080px"}',
      '{height: "1200px"}',
      null,
      null,
      '{backgroundColor: "red"}',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "Mẫu sheet 2",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      "mode",
      "sttMode",
      "contentName",
      "key-01",
      "content-01",
      "key-02",
      "content-02",
      "key-03",
      "content-03",
      "key-04",
      "content-04",
      "key-05",
      "content-05",
      "key-06",
      "content-06",
      "key-07",
      "content-07",
      "key-08",
      "content-08",
    ],
    [
      "hình số 1",
      null,
      null,
      "img-toID-BG001",
      "cmd",
      "imageViewActionToID",
      null,
      null,
      "transition",
      "none",
      "img",
      "ADD_img-toID-BG001",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "bg sound",
      null,
      null,
      "BG-soundPlayer",
      "cmd",
      "soundPlayerAction",
      "soundSource",
      "backgroundSound_Windy-hillMp3",
      "volume",
      0.3,
      "loop",
      true,
      "ToEndFrame",
      true,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "div chứa khung tiêu đề - bg -khung tìm ở ngoài url",
      null,
      null,
      "DIV-chua-khungtieude",
      "cmd",
      "divAction",
      "transition",
      "none",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "div chữa text (text trong -div)",
      null,
      null,
      "Div-chua-text",
      "cmd",
      "divAction",
      "transition",
      "none",
      "text",
      "ADD_TEXT001",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      "mode01",
      1,
      "DIV-chuahinh",
      "cmd",
      "divAction",
      null,
      null,
      null,
      null,
      "id",
      "MODEOBJ.id",
      "ChangeStartFrame",
      -15,
      "ChangeEndFrame",
      15,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      "mode01",
      2,
      "insert-hinh",
      "cmd",
      "imageViewActionToID",
      "img",
      "MODEOBJ.img",
      "toID",
      "MODEOBJ.id",
      "transition",
      "kenBurns",
      "transitionLoop",
      true,
      "transitionFrame",
      180,
      "ChangeStartFrame",
      -15,
      "ChangeEndFrame",
      15,
    ],
    [
      null,
      null,
      null,
      "SFX_001",
      "cmd",
      "soundPlayerAction",
      "soundSource",
      "SFX_s1",
      "volume",
      1,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      "mode2",
      1,
      "DIV-chuahinh-2",
      "cmd",
      "divAction",
      null,
      null,
      null,
      null,
      "id",
      "MODEOBJ.id",
      "ChangeStartFrame",
      -30,
      "ChangeEndFrame",
      30,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      "mode2",
      2,
      "insert-hinh-2",
      "cmd",
      "imageViewActionToID",
      "img",
      "MODEOBJ.img",
      "toID",
      "MODEOBJ.id",
      "transition",
      "kenBurns",
      "transitionLoop",
      true,
      "transitionFrame",
      120,
      "ChangeStartFrame",
      -30,
      "ChangeEndFrame",
      30,
    ],
    [
      "Mẫu sheet 3",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "ADD_code001",
      "ADD_Mode001",
      "ADD_TEXT001",
      "ADD_img-toID-BG001",
      "ADD_IMGURL",
      "ADD_MODEOBJ001",
      "ADD_code002",
      "…",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "review2_001",
      null,
      "Một cuốc xe đêm định mệnh, một lựa chọn sai lầm, và cái kết không còn đường quay lại",
      "review02_1p1.jpg",
      "review02/review02_vien2.jpg",
      '{"code":"review2_001","mode":null,"text":"Một cuốc xe đêm định mệnh, một lựa chọn sai lầm, và cái kết không còn đường quay lại","textView":"Một cuốc xe đêm định mệnh, một lựa chọn sai lầm, và cái kết không còn đường quay lại","img":"review02_1p1.jpg","url":"review02/review02_vien2.jpg"}',
      "review2_002",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  ],
  [
    ["Action-Key", null, null, null, null, null, null, null, null, null],
    [
      "📋 BẢNG LIỆT KÊ TẤT CẢ ACTIONS VÀ KEYS",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "🎬 BẢNG 1: CÁC CMD (ACTIONS) VÀ KEYS",
      null,
      "ChangeStartFrame",
      "ChangeEndFrame",
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null, null, null],
    [
      "CMD",
      "Mô tả",
      "Keys có thể nhập",
      null,
      "Kiểu dữ liệu",
      "Mặc định",
      "Ghi chú",
      null,
      null,
      null,
    ],
    [
      "videoView",
      "Hiển thị video với seek/duration",
      "video",
      "01-video",
      "string",
      "-",
      'Tên file video (VD: "bg.mp4")',
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "videoStartFrom",
      "01-videoStartFrom",
      "number",
      0,
      "Bắt đầu từ giây thứ",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "videoDuration",
      "01-videoDuration",
      "number",
      "null",
      "Độ dài video (giây)",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "volume",
      "01-volume",
      "number (0-1)",
      0,
      "Âm lượng (0=tắt tiếng)",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "loop",
      "01-loop",
      "boolean",
      false,
      "Lặp lại video",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "playbackRate",
      "01-playbackRate",
      "number",
      1,
      "Tốc độ phát (1=bình thường)",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "objectFit",
      "01-objectFit",
      "string",
      '"contain"',
      '"cover", "contain", "fill"',
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "toID",
      "01-toID",
      "string",
      "-",
      "ID element để render vào",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "delay",
      "01-delay",
      "number",
      0,
      "Trễ bao nhiêu frames",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "actionDuration",
      "01-actionDuration",
      "number",
      "-",
      "Thời lượng action (frames)",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "ToEndFrame",
      "01-ToEndFrame",
      "boolean",
      false,
      "Chạy đến hết video",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "styleCss",
      "01-styleCss",
      "object",
      "{}",
      "CSS tùy chỉnh",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "id",
      "01-id",
      "string",
      "-",
      "ID của element",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "className",
      "01-className",
      "string",
      "-",
      "Class CSS",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "group",
      "01-group",
      "string",
      "-",
      "Nhóm action",
      null,
      null,
      null,
    ],
    [
      "typingText",
      "Text với typing effect",
      "text",
      "01-text",
      "string/array",
      "[]",
      "Text hoặc [{text, type}]",
      null,
      null,
      null,
    ],
    [
      "type",
      "typingText",
      "toID",
      "01-toID",
      "string",
      "-",
      "ID element để render vào",
      null,
      null,
      null,
    ],
    [
      null,
      "slideText",
      "sound",
      "01-sound",
      "boolean",
      true,
      "Âm thanh typing",
      "textEffect",
      "Hiệu ứng",
      "staggerDelay",
    ],
    [
      "slideDirection",
      "left",
      "noTyping",
      "01-noTyping",
      "boolean",
      false,
      "Tắt hiệu ứng typing",
      "char-jump",
      "Mỗi chữ nhảy lên xuống",
      "0.1s",
    ],
    [
      null,
      "right",
      "delay",
      "01-delay",
      "number",
      0,
      "Trễ bao nhiêu frames",
      "char-bounce",
      "Bounce elastic lên",
      "0.08s",
    ],
    [
      "textEffect",
      null,
      "actionDuration",
      "01-actionDuration",
      "number",
      "-",
      "Thời lượng action (frames)",
      "char-fadeIn",
      "Fade in + trượt từ dưới",
      "0.05s",
    ],
    [
      null,
      null,
      "styleCss",
      "01-styleCss",
      "object",
      "{}",
      "CSS tùy chỉnh",
      "char-flip",
      "Flip 3D theo trục X",
      "0.1s",
    ],
    [
      null,
      null,
      "id",
      "01-id",
      "string",
      "-",
      "ID của element",
      "char-scale",
      "Scale từ 0 → 1.2 → 1",
      "0.07s",
    ],
    [
      null,
      null,
      "className",
      "01-className",
      "string",
      "-",
      "Class CSS",
      "null",
      "Không effect (default)",
      "—",
    ],
    [
      null,
      null,
      "animations",
      "01-animations",
      "array",
      "[]",
      "Mảng animation objects",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "group",
      "01-group",
      "string",
      "-",
      "Nhóm action",
      null,
      null,
      null,
    ],
    [
      "typingTextActionToID",
      "Text không effect",
      "text",
      "01-text",
      "string",
      '""',
      "Text thuần (không typing)",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "toID",
      "01-toID",
      "string",
      "-",
      "ID element để render vào",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "styleCss",
      "01-styleCss",
      "object",
      "{}",
      "CSS tùy chỉnh",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "delay",
      "01-delay",
      "number",
      0,
      "Trễ bao nhiêu frames",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "actionDuration",
      "01-actionDuration",
      "number",
      "-",
      "Thời lượng action",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "id",
      "01-id",
      "string",
      "-",
      "ID của element",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "className",
      "01-className",
      "string",
      "-",
      "Class CSS",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "group",
      "01-group",
      "string",
      "-",
      "Nhóm action",
      null,
      null,
      null,
    ],
    [
      "soundPlayerAction",
      "Phát âm thanh",
      "soundSource",
      "01-soundSource",
      "string/object",
      "-",
      "File âm thanh hoặc {code}",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "sound",
      "01-sound",
      "boolean",
      true,
      "Bật/tắt âm thanh",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "volume",
      "01-volume",
      "number (0-1)",
      1,
      "Âm lượng",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "playbackRate",
      "01-playbackRate",
      "number",
      1,
      "Tốc độ phát",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "loop",
      "01-loop",
      "boolean",
      false,
      "Lặp lại âm thanh",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "delay",
      "01-delay",
      "number",
      0,
      "Trễ bao nhiêu frames",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "actionDuration",
      "01-actionDuration",
      "number",
      "-",
      "Thời lượng action",
      null,
      null,
      null,
    ],
    [
      "imageViewActionToID",
      "Hiển thị hình ảnh",
      "img",
      "01-img",
      "string",
      "-",
      "Tên file ảnh",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "imgSize",
      "01-imgSize",
      "string",
      '"800px"',
      "Kích thước ảnh",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "toID",
      "01-toID",
      "string",
      "-",
      "ID element để render vào",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "delay",
      "01-delay",
      "number",
      0,
      "Trễ bao nhiêu frames",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "actionDuration",
      "01-actionDuration",
      "number",
      "-",
      "Thời lượng action",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "styleCss",
      "01-styleCss",
      "object",
      "{}",
      "CSS tùy chỉnh",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "id",
      "01-id",
      "string",
      "-",
      "ID của element",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "className",
      "01-className",
      "string",
      "-",
      "Class CSS",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "animations",
      "01-animations",
      "array",
      "[]",
      "Mảng animation objects",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "group",
      "01-group",
      "string",
      "-",
      "Nhóm action",
      null,
      null,
      null,
    ],
    [
      "divAction",
      "Tạo div container",
      "toID",
      "01-toID",
      "string",
      "-",
      "ID element để render vào",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "delay",
      "01-delay",
      "number",
      0,
      "Trễ bao nhiêu frames",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "actionDuration",
      "01-actionDuration",
      "number",
      "-",
      "Thời lượng action",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "ToEndFrame",
      "01-ToEndFrame",
      "boolean",
      false,
      "Hiển thị đến hết frame",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "styleCss",
      "01-styleCss",
      "object",
      "{}",
      "CSS tùy chỉnh",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "id",
      "01-id",
      "string",
      "-",
      "ID của element",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "className",
      "01-className",
      "string",
      "-",
      "Class CSS",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "animations",
      "01-animations",
      "array",
      "[]",
      "Mảng animation objects",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "group",
      "01-group",
      "string",
      "-",
      "Nhóm action",
      null,
      null,
      null,
    ],
    [
      "countdown",
      "Đếm ngược",
      "CountDownFrom",
      "01-CountDownFrom",
      "number",
      3,
      "Đếm từ số nào",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "colorTheme",
      "01-colorTheme",
      "string",
      '"green"',
      '"red", "blue", "green", "purple", "orange"',
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "styleCss",
      "01-styleCss",
      "object",
      "{}",
      "CSS tùy chỉnh",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "zIndex",
      "01-zIndex",
      "number",
      100,
      "Độ ưu tiên hiển thị",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "id",
      "01-id",
      "string",
      "-",
      "ID của element",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "className",
      "01-className",
      "string",
      "-",
      "Class CSS",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "delay",
      "01-delay",
      "number",
      0,
      "Trễ bao nhiêu frames",
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "actionDuration",
      "01-actionDuration",
      "number",
      "-",
      "Thời lượng action",
      null,
      null,
      null,
    ],
    [
      "CMD",
      "Mô tả",
      "Keys có thể nhập",
      "Kiểu dữ liệu",
      "Mặc định",
      "Ghi chú",
      null,
      null,
      null,
      null,
    ],
    [
      "actionCssId",
      "Thay đổi CSS của element theo ID",
      "toID",
      "string",
      "-",
      "ID element cần thay đổi (bắt buộc)",
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "cssMode",
      "string",
      '"add"',
      '"add", "replace", "remove"',
      null,
      "cssMode",
      null,
      null,
    ],
    [
      null,
      null,
      "css",
      "object",
      "{}",
      "Object CSS cần áp dụng",
      null,
      "Mode",
      "Mô tả",
      "Hành vi",
    ],
    [
      null,
      null,
      "delay",
      "number",
      0,
      "Trễ bao nhiêu frames",
      null,
      '"add"',
      "Thêm CSS vào style hiện tại",
      "Merge với CSS cũ (giữ lại properties không trùng)",
    ],
    [
      null,
      null,
      "actionDuration",
      "number",
      1,
      "Thời lượng action (frames)",
      null,
      '"replace"',
      "Thay thế toàn bộ style",
      "Xóa tất cả CSS cũ, chỉ giữ CSS mới",
    ],
    [
      null,
      null,
      "group",
      "string",
      "-",
      "Nhóm action",
      null,
      '"remove"',
      "Xóa CSS properties cụ thể",
      "Xóa các keys được liệt kê trong css object",
    ],
    [
      "actionCssClass",
      "Thay đổi CSS của element theo Class",
      "toClass",
      "string",
      "-",
      "Class name cần target (bắt buộc)",
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "cssMode",
      "string",
      '"add"',
      '"add", "replace", "remove"',
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "css",
      "object",
      "{}",
      "Object CSS cần áp dụng",
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "delay",
      "number",
      0,
      "Trễ bao nhiêu frames",
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      "actionDuration",
      "number",
      1,
      "Thời lượng action (frames)",
      null,
      null,
      null,
      null,
    ],
    [null, null, "group", "string", "-", "Nhóm action", null, null, null, null],
  ],
  [
    ["styleCss", null, null, null, null, null],
    ["🎨 BẢNG 2: STYLECSS - TẤT CẢ CÁC KEY CSS", null, null, null, null, null],
    [null, null, null, null, null, null],
    ["CSS Key", "Mô tả", "Ví dụ Object", "Giá trị mẫu", "Ghi chú", null],
    [
      "position",
      "Định vị element",
      '{position: "absolute"}',
      '"absolute", "relative", "fixed", "sticky"',
      "Cần cho layout phức tạp",
      null,
    ],
    [
      "top",
      "Khoảng cách từ trên",
      '{top: "100px"}',
      '"100px", "10%", "0"',
      "Kết hợp với position",
      null,
    ],
    [
      "bottom",
      "Khoảng cách từ dưới",
      '{bottom: "50px"}',
      '"50px", "0", "10%"',
      "-",
      null,
    ],
    [null, null, "{}", null, null, null],
    [
      "left",
      "Khoảng cách từ trái",
      '{left: "120px"}',
      '"120px", "50%", "0"',
      "-",
      null,
    ],
    [
      "right",
      "Khoảng cách từ phải",
      '{right: "120px"}',
      '"120px", "0", "50%"',
      "-",
      null,
    ],
    [
      "width",
      "Chiều rộng",
      '{width: "300px"}',
      '"300px", "100%", "50vw"',
      "-",
      null,
    ],
    [
      "height",
      "Chiều cao",
      '{height: "200px"}',
      '"200px", "100%", "50vh"',
      "-",
      null,
    ],
    [
      "maxWidth",
      "Chiều rộng tối đa",
      '{maxWidth: "1200px"}',
      '"1200px", "90%"',
      "-",
      null,
    ],
    [
      "maxHeight",
      "Chiều cao tối đa",
      '{maxHeight: "800px"}',
      '"800px", "80vh"',
      "-",
      null,
    ],
    [
      "minWidth",
      "Chiều rộng tối thiểu",
      '{minWidth: "200px"}',
      '"200px", "10%"',
      "-",
      null,
    ],
    [
      "minHeight",
      "Chiều cao tối thiểu",
      '{minHeight: "100px"}',
      '"100px", "50px"',
      "-",
      null,
    ],
    [
      "backgroundColor",
      "Màu nền",
      '{backgroundColor: "red"}',
      '"#FF0000", "rgb(255,0,0)", "red"',
      "-",
      null,
    ],
    [
      "color",
      "Màu chữ",
      '{color: "yellow"}',
      '"#FFFF00", "yellow", "rgb(255,255,0)"',
      "-",
      null,
    ],
    [
      "fontSize",
      "Kích thước chữ",
      '{fontSize: "100px"}',
      '"100px", "2rem", "24px"',
      "-",
      null,
    ],
    [
      "fontWeight",
      "Độ đậm chữ",
      '{fontWeight: "800"}',
      '"400", "600", "800", "bold"',
      "-",
      null,
    ],
    [
      "fontFamily",
      "Font chữ",
      '{fontFamily: "Arial"}',
      '"Arial", "Roboto", "monospace"',
      "-",
      null,
    ],
    [
      "textAlign",
      "Căn chỉnh text",
      '{textAlign: "center"}',
      '"left", "center", "right", "justify"',
      "-",
      null,
    ],
    [
      "lineHeight",
      "Khoảng cách dòng",
      '{lineHeight: "1.5"}',
      '"1.5", "2", "30px"',
      "-",
      null,
    ],
    [
      "letterSpacing",
      "Khoảng cách chữ",
      '{letterSpacing: "2px"}',
      '"2px", "0.1em"',
      "-",
      null,
    ],
    [
      "border",
      "Viền",
      '{border: "10px solid green"}',
      '"1px solid #000", "5px dashed red"',
      "-",
      null,
    ],
    [
      "borderRadius",
      "Bo góc",
      '{borderRadius: "20px"}',
      '"20px", "50%", "10px 20px"',
      "-",
      null,
    ],
    [
      "borderTop",
      "Viền trên",
      '{borderTop: "2px solid blue"}',
      '"2px solid blue"',
      "-",
      null,
    ],
    [
      "borderBottom",
      "Viền dưới",
      '{borderBottom: "3px dashed red"}',
      '"3px dashed red"',
      "-",
      null,
    ],
    [
      "borderLeft",
      "Viền trái",
      '{borderLeft: "1px solid black"}',
      '"1px solid black"',
      "-",
      null,
    ],
    [
      "borderRight",
      "Viền phải",
      '{borderRight: "1px solid black"}',
      '"1px solid black"',
      "-",
      null,
    ],
    [
      "boxShadow",
      "Đổ bóng",
      '{boxShadow: "0 10px 40px rgba(0,0,0,0.3)"}',
      '"0 4px 6px rgba(0,0,0,0.1)"',
      "-",
      null,
    ],
    [
      "transform",
      "Biến đổi 2D/3D",
      '{transform: "translateX(-50%)"}',
      '"rotate(45deg)", "scale(1.2)", "translate(10px, 20px)"',
      "-",
      null,
    ],
    [
      "transition",
      "Hiệu ứng chuyển",
      '{transition: "height 1s ease-in-out"}',
      '"all 0.3s ease", "width 0.5s"',
      "-",
      null,
    ],
    [
      "opacity",
      "Độ trong suốt",
      '{opacity: "0.8"}',
      '"0" (ẩn), "0.5", "1" (hiện)',
      "-",
      null,
    ],
    [
      "zIndex",
      "Thứ tự chồng lớp",
      '{zIndex: "10"}',
      '"0", "10", "100", "999"',
      "Số càng lớn càng trên",
      null,
    ],
    [
      "display",
      "Kiểu hiển thị",
      '{display: "flex"}',
      '"block", "flex", "grid", "none"',
      "-",
      null,
    ],
    [
      "flexDirection",
      "Hướng flex",
      '{flexDirection: "column"}',
      '"row", "column", "row-reverse"',
      "Dùng với display: flex",
      null,
    ],
    [
      "justifyContent",
      "Căn nội dung ngang",
      '{justifyContent: "center"}',
      '"flex-start", "center", "space-between"',
      "-",
      null,
    ],
    [
      "alignItems",
      "Căn nội dung dọc",
      '{alignItems: "center"}',
      '"flex-start", "center", "flex-end"',
      "-",
      null,
    ],
    [
      "gap",
      "Khoảng cách giữa items",
      '{gap: "20px"}',
      '"10px", "1rem", "20px 10px"',
      "-",
      null,
    ],
    [
      "padding",
      "Khoảng đệm trong",
      '{padding: "20px"}',
      '"20px", "10px 20px", "5px 10px 15px 20px"',
      "-",
      null,
    ],
    [
      "paddingTop",
      "Padding trên",
      '{paddingTop: "10px"}',
      '"10px", "1rem"',
      "-",
      null,
    ],
    [
      "paddingBottom",
      "Padding dưới",
      '{paddingBottom: "10px"}',
      '"10px", "1rem"',
      "-",
      null,
    ],
    [
      "paddingLeft",
      "Padding trái",
      '{paddingLeft: "15px"}',
      '"15px", "1rem"',
      "-",
      null,
    ],
    [
      "paddingRight",
      "Padding phải",
      '{paddingRight: "15px"}',
      '"15px", "1rem"',
      "-",
      null,
    ],
    [
      "margin",
      "Khoảng cách ngoài",
      '{margin: "20px auto"}',
      '"20px", "10px 20px", "auto"',
      "-",
      null,
    ],
    [
      "marginTop",
      "Margin trên",
      '{marginTop: "10px"}',
      '"10px", "1rem"',
      "-",
      null,
    ],
    [
      "marginBottom",
      "Margin dưới",
      '{marginBottom: "10px"}',
      '"10px", "1rem"',
      "-",
      null,
    ],
    [
      "marginLeft",
      "Margin trái",
      '{marginLeft: "15px"}',
      '"15px", "auto"',
      "-",
      null,
    ],
    [
      "marginRight",
      "Margin phải",
      '{marginRight: "15px"}',
      '"15px", "auto"',
      "-",
      null,
    ],
    [
      "overflow",
      "Xử lý nội dung tràn",
      '{overflow: "hidden"}',
      '"hidden", "auto", "scroll", "visible"',
      "-",
      null,
    ],
    [
      "overflowX",
      "Overflow ngang",
      '{overflowX: "hidden"}',
      '"hidden", "auto", "scroll"',
      "-",
      null,
    ],
    [
      "overflowY",
      "Overflow dọc",
      '{overflowY: "auto"}',
      '"hidden", "auto", "scroll"',
      "-",
      null,
    ],
    [
      "objectFit",
      "Fit ảnh/video",
      '{objectFit: "cover"}',
      '"contain", "cover", "fill", "none"',
      "Cho img/video",
      null,
    ],
    [
      "cursor",
      "Kiểu con trỏ chuột",
      '{cursor: "pointer"}',
      '"pointer", "default", "text", "move"',
      "-",
      null,
    ],
    [
      "pointerEvents",
      "Tương tác chuột",
      '{pointerEvents: "none"}',
      '"auto", "none"',
      "-",
      null,
    ],
    [
      "userSelect",
      "Chọn text",
      '{userSelect: "none"}',
      '"auto", "none", "text"',
      "-",
      null,
    ],
    [
      "backdropFilter",
      "Filter nền",
      '{backdropFilter: "blur(10px)"}',
      '"blur(5px)", "brightness(1.2)"',
      "-",
      null,
    ],
    [
      "filter",
      "Bộ lọc",
      '{filter: "brightness(1.2)"}',
      '"blur(5px)", "grayscale(100%)"',
      "-",
      null,
    ],
    [
      "clipPath",
      "Cắt hình dạng",
      '{clipPath: "circle(50%)"}',
      '"circle(50%)", "polygon(...)"',
      "-",
      null,
    ],
    [
      "mixBlendMode",
      "Blend mode",
      '{mixBlendMode: "multiply"}',
      '"multiply", "screen", "overlay"',
      "-",
      null,
    ],
    [
      "background",
      "Background tổng hợp",
      '{background: "linear-gradient(...)"}',
      '"linear-gradient(90deg, red, blue)"',
      "-",
      null,
    ],
    [
      "backgroundImage",
      "Ảnh nền",
      '{backgroundImage: "url(...)"}',
      "\"url('image.png')\"",
      "{backgroundImage: \"url('/assets/DivBG/BG-text-001.jpg')\"}",
      null,
    ],
    [
      "backgroundSize",
      "Kích thước nền",
      '{backgroundSize: "cover"}',
      '"cover", "contain", "100% 100%"',
      "-",
      null,
    ],
    [
      "backgroundPosition",
      "Vị trí nền",
      '{backgroundPosition: "center"}',
      '"center", "top left", "50% 50%"',
      "-",
      '{backgroundImage: "url(\'/assets/abc.png\')",\n backgroundSize: "cover",\n backgroundPosition: "center",\n backgroundRepeat: "no-repeat"}',
    ],
    [
      "backgroundRepeat",
      null,
      '{backgroundRepeat: "no-repeat"}',
      null,
      null,
      null,
    ],
    [
      "animation",
      "CSS Animation",
      '{animation: "spin 2s linear infinite"}',
      "Xem BẢNG 3",
      "Remotion dùng cách khác",
      null,
    ],
    [null, null, null, null, null, null],
    ["Pattern", "Mô tả", "CSS Object", "Kết quả", null, null],
    [
      "Căn giữa ngang",
      "Center horizontal only",
      '{position: "absolute", left: "50%", transform: "translateX(-50%)"}',
      "Element căn giữa theo trục X",
      '{\n transform: "translate(-50%, -50%)"\n}',
      null,
    ],
    [
      "Căn giữa dọc",
      "Center vertical only",
      '{position: "absolute", top: "50%", transform: "translateY(-50%)"}',
      "Element căn giữa theo trục Y",
      null,
      null,
    ],
    [
      "Căn giữa màn hình",
      "Center both axes",
      '{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}',
      "Element căn giữa hoàn toàn",
      null,
      null,
    ],
    [null, null, null, "Element căn giữa hoàn toàn", null, null],
    [
      "Góc trên-trái",
      "Top-left corner",
      '{position: "absolute", top: "0", left: "0"}',
      "Element ở góc trên bên trái",
      null,
      null,
    ],
    [
      "Góc trên-phải",
      "Top-right corner",
      '{position: "absolute", top: "0", right: "0"}',
      "Element ở góc trên bên phải",
      null,
      null,
    ],
    [
      "Góc dưới-trái",
      "Bottom-left corner",
      '{position: "absolute", bottom: "0", left: "0"}',
      "Element ở góc dưới bên trái",
      null,
      null,
    ],
    [
      "Góc dưới-phải",
      "Bottom-right corner",
      '{position: "absolute", bottom: "0", right: "0"}',
      "Element ở góc dưới bên phải",
      null,
      null,
    ],
    [
      "Góc trên-trái (padding)",
      "Top-left with spacing",
      '{position: "absolute", top: "20px", left: "20px"}',
      "Cách góc 20px",
      null,
      null,
    ],
    [
      "Góc trên-phải (padding)",
      "Top-right with spacing",
      '{position: "absolute", top: "20px", right: "20px"}',
      "Cách góc 20px",
      null,
      null,
    ],
    [
      "Góc dưới-trái (padding)",
      "Bottom-left with spacing",
      '{position: "absolute", bottom: "20px", left: "20px"}',
      "Cách góc 20px",
      null,
      null,
    ],
    [
      "Góc dưới-phải (padding)",
      "Bottom-right with spacing",
      '{position: "absolute", bottom: "20px", right: "20px"}',
      "Cách góc 20px",
      null,
      null,
    ],
    [
      "Top center",
      "Căn giữa trên cùng",
      '{position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)"}',
      "Giữa trên",
      null,
      null,
    ],
    [
      "Bottom center",
      "Căn giữa dưới cùng",
      '{position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)"}',
      "Giữa dưới",
      null,
      null,
    ],
    [
      "Left center",
      "Căn giữa trái",
      '{position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)"}',
      "Giữa trái",
      null,
      null,
    ],
    [
      "Right center",
      "Căn giữa phải",
      '{position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)"}',
      "Giữa phải",
      null,
      null,
    ],
    [
      "Full screen",
      "Toàn màn hình",
      '{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}',
      "Phủ toàn bộ",
      null,
      null,
    ],
    [
      "Full width, center vertical",
      "Rộng 100%, giữa dọc",
      '{position: "absolute", width: "100%", top: "50%", transform: "translateY(-50%)"}',
      "Rộng hết, giữa dọc",
      null,
      null,
    ],
    [
      "Full height, center horizontal",
      "Cao 100%, giữa ngang",
      '{position: "absolute", height: "100%", left: "50%", transform: "translateX(-50%)"}',
      "Cao hết, giữa ngang",
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [
      "OK — mình liệt kê đầy đủ các CSS liên quan đến border theo đúng format bảng bạn đang dùng (CSS Key → Mô tả → Ví dụ Object → Giá trị mẫu → Ghi chú), tập trung cho JS object / React / Emotion:",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    ["✅ BẢNG CSS BORDER (FULL)", null, null, null, null, null],
    [null, null, null, null, null, null],
    ["CSS Key", "Mô tả", "Ví dụ Object", "Giá trị mẫu", "Ghi chú", null],
    [
      "border",
      "Viền tổng",
      '{border:"1px solid #000"}',
      '"1px solid red"',
      "Viết nhanh cho mọi cạnh",
      null,
    ],
    [
      "borderWidth",
      "Độ dày viền",
      '{borderWidth:"2px"}',
      '"1px", "2px"',
      "Dùng khi style động",
      null,
    ],
    [
      "borderStyle",
      "Kiểu viền",
      '{borderStyle:"dashed"}',
      '"solid", "dashed"',
      "Bắt buộc nếu tách",
      null,
    ],
    [
      "borderColor",
      "Màu viền",
      '{borderColor:"red"}',
      '"#333", "rgba(...)"',
      "Có thể dùng alpha",
      null,
    ],
    [
      "borderTop",
      "Viền trên",
      '{borderTop:"2px solid red"}',
      '"1px solid"',
      "Riêng từng cạnh",
      null,
    ],
    [
      "borderRight",
      "Viền phải",
      '{borderRight:"2px solid red"}',
      null,
      null,
      null,
    ],
    [
      "borderBottom",
      "Viền dưới",
      '{borderBottom:"2px solid red"}',
      null,
      null,
      null,
    ],
    [
      "borderLeft",
      "Viền trái",
      '{borderLeft:"2px solid red"}',
      null,
      null,
      null,
    ],
    [
      "borderTopWidth",
      "Độ dày viền trên",
      '{borderTopWidth:"3px"}',
      '"3px"',
      null,
      null,
    ],
    [
      "borderRightWidth",
      "Độ dày viền phải",
      '{borderRightWidth:"3px"}',
      null,
      null,
      null,
    ],
    [
      "borderBottomWidth",
      "Độ dày viền dưới",
      '{borderBottomWidth:"3px"}',
      null,
      null,
      null,
    ],
    [
      "borderLeftWidth",
      "Độ dày viền trái",
      '{borderLeftWidth:"3px"}',
      null,
      null,
      null,
    ],
    [
      "borderTopColor",
      "Màu viền trên",
      '{borderTopColor:"blue"}',
      null,
      null,
      null,
    ],
    [
      "borderRadius",
      "Bo góc",
      '{borderRadius:"12px"}',
      '"50%", "8px"',
      "Dùng nhiều cho card",
      null,
    ],
    [
      "borderTopLeftRadius",
      "Bo góc trên trái",
      '{borderTopLeftRadius:"8px"}',
      null,
      null,
      null,
    ],
    [
      "borderTopRightRadius",
      "Bo góc trên phải",
      '{borderTopRightRadius:"8px"}',
      null,
      null,
      null,
    ],
    [
      "borderBottomLeftRadius",
      "Bo góc dưới trái",
      '{borderBottomLeftRadius:"8px"}',
      null,
      null,
      null,
    ],
    [
      "borderBottomRightRadius",
      "Bo góc dưới phải",
      '{borderBottomRightRadius:"8px"}',
      null,
      null,
      null,
    ],
    [
      "outline",
      "Viền ngoài (không chiếm layout)",
      '{outline:"2px solid red"}',
      null,
      "Khác border",
      null,
    ],
    [
      "outlineOffset",
      "Khoảng cách outline",
      '{outlineOffset:"4px"}',
      null,
      null,
      null,
    ],
    [
      "boxShadow",
      "Viền giả / glow",
      '{boxShadow:"0 0 10px red"}',
      null,
      "Hay dùng thay border",
      null,
    ],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    ["🎯 Ví dụ thực tế (box debug):", null, null, null, null, null],
    [null, null, null, null, null, null],
    ["{", null, null, null, null, null],
    ['border: "2px dashed red",', null, null, null, null, null],
    ['borderRadius: "8px",', null, null, null, null, null],
    ['boxShadow: "0 0 5px rgba(255,0,0,.5)"', null, null, null, null, null],
    ["}", null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    ["⚡ Mẹo PRO khi làm UI / Remotion:", null, null, null, null, null],
    [null, null, null, null, null, null],
    ["Highlight element:", null, null, null, null, null],
    [null, null, null, null, null, null],
    ['border: "2px solid lime"', null, null, null, null, null],
    [null, null, null, null, null, null],
    ["Debug layout:", null, null, null, null, null],
    [null, null, null, null, null, null],
    ['outline: "1px solid red"', null, null, null, null, null],
    [null, null, null, null, null, null],
    ["Glow animation:", null, null, null, null, null],
    [null, null, null, null, null, null],
    ['boxShadow: "0 0 15px cyan"', null, null, null, null, null],
    [
      "✨ BẢNG 10 HIỆU ỨNG GLOW (CSS STRING → JSON.parse)",
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "STT",
      "Tên Glow",
      "Mô tả",
      "Css dạng string (JSON.parse được)",
      null,
      null,
    ],
    [
      1,
      "Neon tím đậm",
      "Glow mạnh – dùng cho headline",
      '{ "filter": "drop-shadow(0 0 10px #ff00ff) drop-shadow(0 0 25px #ff00ff) drop-shadow(0 0 50px #ff00ff)" }',
      null,
      null,
    ],
    [
      2,
      "Neon xanh dương",
      "Phong cách công nghệ",
      '{ "filter": "drop-shadow(0 0 8px #00ccff) drop-shadow(0 0 20px #00ccff) drop-shadow(0 0 40px #00ccff)" }',
      null,
      null,
    ],
    [
      3,
      "Glow vàng nhẹ",
      "Sang trọng, highlight chữ",
      '{ "filter": "drop-shadow(0 0 6px #ffd700) drop-shadow(0 0 15px #ffd700)" }',
      null,
      null,
    ],
    [
      4,
      "Glow đỏ cảnh báo",
      "Urgent / sale",
      '{ "filter": "drop-shadow(0 0 8px #ff3333) drop-shadow(0 0 20px #ff3333)" }',
      null,
      null,
    ],
    [
      5,
      "Glow xanh lá",
      "Success / positive",
      '{ "filter": "drop-shadow(0 0 8px #00ff99) drop-shadow(0 0 18px #00ff99)" }',
      null,
      null,
    ],
    [
      6,
      "Soft glow trắng",
      "Dịu – dùng cho subtitle",
      '{ "filter": "drop-shadow(0 0 6px white) drop-shadow(0 0 12px white)" }',
      null,
      null,
    ],
    [
      7,
      "Pink pastel",
      "TikTok / lifestyle",
      '{ "filter": "drop-shadow(0 0 6px #ff9ad5) drop-shadow(0 0 16px #ff9ad5)" }',
      null,
      null,
    ],
    [
      8,
      "Cyber cyan",
      "Cyberpunk – glow mạnh",
      '{ "filter": "drop-shadow(0 0 10px #00ffff) drop-shadow(0 0 30px #00ffff) drop-shadow(0 0 60px #00ffff)" }',
      null,
      null,
    ],
    [
      9,
      "Orange fire",
      "Lửa / năng lượng",
      '{ "filter": "drop-shadow(0 0 8px #ff6600) drop-shadow(0 0 22px #ff6600)" }',
      null,
      null,
    ],
    [
      10,
      "Multi color",
      "Nhiều màu – cực nổi",
      '{ "filter": "drop-shadow(0 0 10px #ff00ff) drop-shadow(0 0 20px #00ffff) drop-shadow(0 0 30px #ffff00)" }',
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [
      "🎬 BẢNG 20 TEXT STYLE PRESET (CSS STRING → JSON.parse)",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    ["STT", "Mô tả", "CSS string", "Dùng cho trường hợp nào", null, null],
    [
      1,
      "Chữ trắng viền đen",
      '{ "color":"white","WebkitTextStroke":"3px black","fontWeight":"900" }',
      "Caption TikTok",
      null,
      null,
    ],
    [
      2,
      "Neon cyan",
      '{ "color":"#00ffff","textShadow":"0 0 15px #00ffff","fontWeight":"800" }',
      "Tech video",
      null,
      null,
    ],
    [
      3,
      "Vàng nổi nền tối",
      '{ "color":"#ffd700","textShadow":"2px 2px 0 black","fontWeight":"900" }',
      "Highlight",
      null,
      null,
    ],
    [
      4,
      "Đỏ cảnh báo",
      '{ "color":"#ff3333","textShadow":"3px 3px 0 black","fontWeight":"900" }',
      "Sale",
      null,
      null,
    ],
    [
      5,
      "Gradient tím xanh",
      '{ "background":"linear-gradient(90deg,#ff00ff,#00ffff)","WebkitBackgroundClip":"text","color":"transparent","fontWeight":"900" }',
      "Headline",
      null,
      null,
    ],
    [
      6,
      "Comic bold",
      '{ "color":"#ffcc00","textShadow":"4px 4px 0 #000","fontWeight":"900" }',
      "Video vui",
      null,
      null,
    ],
    [
      7,
      "Hồng pastel",
      '{ "color":"#ff9ad5","fontWeight":"800","textShadow":"2px 2px 6px black" }',
      "Lifestyle",
      null,
      null,
    ],
    [
      8,
      "Xanh lá neon",
      '{ "color":"#00ff99","textShadow":"0 0 10px #00ff99","fontWeight":"800" }',
      "Success",
      null,
      null,
    ],
    [
      9,
      "Cyber glitch",
      '{ "color":"white","textShadow":"2px 0 red,-2px 0 cyan","fontWeight":"900" }',
      "Glitch",
      null,
      null,
    ],
    [
      10,
      "Chữ đen nền vàng",
      '{ "background":"yellow","color":"black","padding":"6px 12px","fontWeight":"900" }',
      "Quote",
      null,
      null,
    ],
    [
      11,
      "White bold clean",
      '{ "color":"white","fontWeight":"900","letterSpacing":"2px" }',
      "Sub",
      null,
      null,
    ],
    [
      12,
      "Orange fire",
      '{ "color":"#ff6600","textShadow":"0 0 12px #ff6600","fontWeight":"900" }',
      "Energy",
      null,
      null,
    ],
    [
      13,
      "Retro xanh tím",
      '{ "color":"#9b5cff","textShadow":"3px 3px 0 #00ffff","fontWeight":"900" }',
      "Retro",
      null,
      null,
    ],
    [
      14,
      "Viền trắng chữ đen",
      '{ "color":"black","WebkitTextStroke":"2px white","fontWeight":"900" }',
      "Nền sáng",
      null,
      null,
    ],
    [
      15,
      "Box đỏ",
      '{ "background":"red","color":"white","padding":"6px 10px","fontWeight":"900" }',
      "Breaking",
      null,
      null,
    ],
    [
      16,
      "Minimal trắng",
      '{ "color":"white","fontWeight":"600","opacity":"0.85" }',
      "Subtitle",
      null,
      null,
    ],
    [
      17,
      "Rainbow",
      '{ "background":"linear-gradient(90deg,red,yellow,cyan)","WebkitBackgroundClip":"text","color":"transparent","fontWeight":"900" }',
      "Viral",
      null,
      null,
    ],
    [
      18,
      "3D fake",
      '{ "color":"#fff","textShadow":"3px 3px 0 #000,6px 6px 0 #555","fontWeight":"900" }',
      "Title",
      null,
      null,
    ],
    [
      19,
      "Big spacing",
      '{ "color":"white","fontWeight":"900","letterSpacing":"6px" }',
      "Opening",
      null,
      null,
    ],
    [
      20,
      "TikTok bold",
      '{ "color":"white","textShadow":"2px 2px 0 #ff0050,-2px -2px 0 #00f2ea","fontWeight":"900" }',
      "TikTok",
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [
      "🔥 BẢNG TEXT STYLE THEO CẢM XÚC (CSS STRING → JSON.parse)",
      null,
      null,
      null,
      null,
      null,
    ],
    ["Cảm xúc", "Mô tả", "CSS string", "Dùng cho trường hợp nào", null, null],
    [
      "😱 Shock",
      "Trắng viền đen, đập mạnh",
      '{ "color":"white","WebkitTextStroke":"3px black","fontWeight":"900","letterSpacing":"2px" }',
      "Tin sốc, mở đầu",
      null,
      null,
    ],
    [
      "😡 Tức giận",
      "Đỏ gắt + shadow",
      '{ "color":"#ff2222","textShadow":"3px 3px 0 black","fontWeight":"900" }',
      "Drama, bóc phốt",
      null,
      null,
    ],
    [
      "😂 Vui vẻ",
      "Vàng comic",
      '{ "color":"#ffcc00","textShadow":"4px 4px 0 #000","fontWeight":"900" }',
      "Video hài",
      null,
      '{ "color":"#ff2222","textShadow":"3px 3px 0 black","fontWeight":"900" }',
    ],
    [
      "😍 Yêu thích",
      "Hồng pastel",
      '{ "color":"#ff9ad5","textShadow":"2px 2px 6px black","fontWeight":"800" }',
      "Lifestyle",
      null,
      '{ "color":"white","opacity":"0.6","fontWeight":"600" }',
    ],
    [
      "🤯 Bất ngờ",
      "Gradient tím xanh",
      '{ "background":"linear-gradient(90deg,#ff00ff,#00ffff)","WebkitBackgroundClip":"text","color":"transparent","fontWeight":"900" }',
      "Reveal",
      null,
      null,
    ],
    [
      "😢 Buồn",
      "Trắng mờ",
      '{ "color":"white","opacity":"0.6","fontWeight":"600" }',
      "Story buồn",
      null,
      null,
    ],
    [
      "💪 Quyết tâm",
      "Trắng bold spacing",
      '{ "color":"white","fontWeight":"900","letterSpacing":"5px" }',
      "Motivation",
      null,
      null,
    ],
    [
      "🚨 Cảnh báo",
      "Đỏ box",
      '{ "background":"red","color":"white","padding":"6px 10px","fontWeight":"900" }',
      "Alert",
      null,
      null,
    ],
    [
      "🤑 Kiếm tiền",
      "Xanh lá neon",
      '{ "color":"#00ff99","textShadow":"0 0 10px #00ff99","fontWeight":"900" }',
      "Kết quả",
      null,
      null,
    ],
    [
      "🤖 Công nghệ",
      "Cyan neon",
      '{ "color":"#00ffff","textShadow":"0 0 12px #00ffff","fontWeight":"800" }',
      "AI / Tech",
      null,
      null,
    ],
    [
      "🧠 Suy nghĩ",
      "Trắng nhẹ",
      '{ "color":"white","opacity":"0.8","fontWeight":"600","letterSpacing":"1px" }',
      "Voice over",
      null,
      null,
    ],
    [
      "🔥 Cao trào",
      "Orange fire",
      '{ "color":"#ff6600","textShadow":"0 0 14px #ff6600","fontWeight":"900" }',
      "Peak",
      null,
      null,
    ],
    [
      "😎 Ngầu",
      "Đen viền trắng",
      '{ "color":"black","WebkitTextStroke":"2px white","fontWeight":"900" }',
      "Intro",
      null,
      null,
    ],
    [
      "🎯 Trọng tâm",
      "Đen nền vàng",
      '{ "background":"yellow","color":"black","padding":"6px 12px","fontWeight":"900" }',
      "Key point",
      null,
      null,
    ],
    [
      "👻 Glitch",
      "Lệch màu",
      '{ "color":"white","textShadow":"2px 0 red,-2px 0 cyan","fontWeight":"900" }',
      "Hiệu ứng",
      null,
      null,
    ],
    [
      "🌈 Viral",
      "Rainbow",
      '{ "background":"linear-gradient(90deg,red,yellow,cyan)","WebkitBackgroundClip":"text","color":"transparent","fontWeight":"900" }',
      "Hook",
      null,
      null,
    ],
    [
      "🧨 Bùng nổ",
      "3D fake",
      '{ "color":"#fff","textShadow":"3px 3px 0 #000,6px 6px 0 #555","fontWeight":"900" }',
      "Big title",
      null,
      null,
    ],
    [
      "🤫 Bí mật",
      "Trắng mờ nhỏ",
      '{ "color":"white","opacity":"0.5","fontWeight":"500" }',
      "Secret",
      null,
      null,
    ],
    [
      "📣 Kêu gọi",
      "TikTok style",
      '{ "color":"white","textShadow":"2px 2px 0 #ff0050,-2px -2px 0 #00f2ea","fontWeight":"900" }',
      "CTA",
      null,
      null,
    ],
    [
      "🏁 Kết luận",
      "Minimal clean",
      '{ "color":"white","fontWeight":"700","letterSpacing":"2px" }',
      "Outro",
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [
      "OK — mình edit lại CẢ 2 BẢNG theo đúng yêu cầu mới của bạn:",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    ["👉 Áp dụng cho DIV (không phải span/text)", null, null, null, null, null],
    [
      "👉 Chữ viền TO – nhìn rõ khi chữ lớn trong video",
      null,
      null,
      null,
      null,
      null,
    ],
    ["👉 Có font biến đổi", null, null, null, null, null],
    ["👉 Chia rõ:", null, null, null, null, null],
    [null, null, null, null, null, null],
    [
      "✅ Loại 1: div background: transparent – chữ + viền nổi",
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "✅ Loại 2: div có background + chữ tương phản mạnh",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    ["Tất cả đều:", null, null, null, null, null],
    [null, null, null, null, null, null],
    ["✔ CSS dạng string", null, null, null, null, null],
    ["✔ JSON.parse trực tiếp", null, null, null, null, null],
    ["✔ Dùng tốt cho Remotion / React inline", null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [
      "🅰️ BẢNG 1 — DIV TRANSPARENT (CHỮ + VIỀN TO)",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [
      "Dùng khi: overlay chữ lên video, không muốn block nền",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    ["STT", "Mô tả", "CSS string", "Dùng cho", null, null],
    [
      1,
      "Trắng viền đen (Impact)",
      '{ "background":"transparent","color":"white","WebkitTextStroke":"4px black","fontFamily":"Impact","fontWeight":"900" }',
      "Hook TikTok",
      null,
      null,
    ],
    [
      2,
      "Vàng viền đen",
      '{ "background":"transparent","color":"#ffd700","WebkitTextStroke":"4px black","fontFamily":"Anton","fontWeight":"900" }',
      "Highlight",
      null,
      null,
    ],
    [
      3,
      "Đỏ cảnh báo",
      '{ "background":"transparent","color":"#ff2222","WebkitTextStroke":"3px white","fontFamily":"Bebas Neue","fontWeight":"900" }',
      "Drama",
      null,
      null,
    ],
    [
      4,
      "Cyan tech",
      '{ "background":"transparent","color":"#00ffff","WebkitTextStroke":"3px black","fontFamily":"Orbitron","fontWeight":"800" }',
      "AI / Tech",
      null,
      null,
    ],
    [
      5,
      "Hồng pastel",
      '{ "background":"transparent","color":"#ff9ad5","WebkitTextStroke":"3px black","fontFamily":"Poppins","fontWeight":"800" }',
      "Lifestyle",
      null,
      null,
    ],
    [
      6,
      "Xanh lá tiền bạc",
      '{ "background":"transparent","color":"#00ff99","WebkitTextStroke":"3px black","fontFamily":"Montserrat","fontWeight":"900" }',
      "Money",
      null,
      null,
    ],
    [
      7,
      "Retro tím",
      '{ "background":"transparent","color":"#9b5cff","WebkitTextStroke":"3px #00ffff","fontFamily":"Luckiest Guy","fontWeight":"900" }',
      "Retro",
      null,
      null,
    ],
    [
      8,
      "Cam lửa",
      '{ "background":"transparent","color":"#ff6600","WebkitTextStroke":"3px black","fontFamily":"Anton","fontWeight":"900" }',
      "Cao trào",
      null,
      null,
    ],
    [
      9,
      "Đen viền trắng",
      '{ "background":"transparent","color":"black","WebkitTextStroke":"4px white","fontFamily":"Impact","fontWeight":"900" }',
      "Ngầu",
      null,
      null,
    ],
    [
      10,
      "Trắng spacing",
      '{ "background":"transparent","color":"white","WebkitTextStroke":"3px black","letterSpacing":"6px","fontFamily":"Bebas Neue","fontWeight":"900" }',
      "Opening",
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [
      "🅱️ BẢNG 2 — DIV CÓ BACKGROUND (BOX CHỮ NỔI)",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [
      "Dùng khi: cần focus mạnh, quote, CTA, keypoint",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    ["STT", "Mô tả", "CSS string", "Dùng cho", null, null],
    [
      1,
      "Nền vàng chữ đen",
      '{ "background":"yellow","color":"black","padding":"12px 20px","borderRadius":"12px","fontFamily":"Impact","fontWeight":"900" }',
      "Key point",
      null,
      null,
    ],
    [
      2,
      "Nền đỏ chữ trắng",
      '{ "background":"red","color":"white","padding":"10px 18px","borderRadius":"10px","fontFamily":"Anton","fontWeight":"900" }',
      "Alert",
      null,
      null,
    ],
    [
      3,
      "Nền đen chữ vàng",
      '{ "background":"black","color":"#ffd700","padding":"12px 22px","borderRadius":"14px","fontFamily":"Bebas Neue","fontWeight":"900" }',
      "Luxury",
      null,
      null,
    ],
    [
      4,
      "Gradient tím xanh",
      '{ "background":"linear-gradient(90deg,#ff00ff,#00ffff)","color":"white","padding":"12px 24px","borderRadius":"14px","fontFamily":"Orbitron","fontWeight":"900" }',
      "Viral",
      null,
      null,
    ],
    [
      5,
      "Xanh lá tiền",
      '{ "background":"#00ff99","color":"black","padding":"10px 20px","borderRadius":"12px","fontFamily":"Montserrat","fontWeight":"900" }',
      "Kết quả",
      null,
      null,
    ],
    [
      6,
      "Hồng TikTok",
      '{ "background":"#ff0050","color":"white","padding":"10px 20px","borderRadius":"14px","fontFamily":"Poppins","fontWeight":"900" }',
      "CTA",
      null,
      null,
    ],
    [
      7,
      "Cyan cyber",
      '{ "background":"#00ffff","color":"black","padding":"12px 22px","borderRadius":"12px","fontFamily":"Orbitron","fontWeight":"800" }',
      "Tech",
      null,
      null,
    ],
    [
      8,
      "Cam năng lượng",
      '{ "background":"#ff6600","color":"white","padding":"10px 20px","borderRadius":"12px","fontFamily":"Anton","fontWeight":"900" }',
      "Peak",
      null,
      null,
    ],
    [
      9,
      "Đen viền trắng",
      '{ "background":"black","color":"white","border":"4px solid white","padding":"10px 18px","borderRadius":"12px","fontFamily":"Impact","fontWeight":"900" }',
      "Title",
      null,
      null,
    ],
    [
      10,
      "Minimal trắng",
      '{ "background":"rgba(255,255,255,0.85)","color":"black","padding":"10px 18px","borderRadius":"10px","fontFamily":"Montserrat","fontWeight":"700" }',
      "Subtitle",
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [
      "🎬 BẢNG FONT PHỔ BIẾN + CSS STRING (JSON.parse)",
      null,
      null,
      null,
      null,
      null,
    ],
    [
      "⚠️ Lưu ý: các font Google Fonts cần bạn load trước (Impact / Arial Black là system font)",
      null,
      null,
      null,
      null,
      null,
    ],
    ["STT", "Font", "Mô tả", "CSS string", "Dùng cho", null],
    [
      1,
      "Impact",
      "Cực đậm – TikTok kinh điển",
      '{ "fontFamily":"Impact","fontWeight":"900","letterSpacing":"1px" }',
      "Hook",
      null,
    ],
    [
      2,
      "Anton",
      "Bold gọn",
      '{ "fontFamily":"Anton","fontWeight":"900" }',
      "Headline",
      null,
    ],
    [
      3,
      "Bebas Neue",
      "Cao – hiện đại",
      '{ "fontFamily":"Bebas Neue","fontWeight":"800","letterSpacing":"2px" }',
      "Opening",
      null,
    ],
    [
      4,
      "Montserrat",
      "Clean",
      '{ "fontFamily":"Montserrat","fontWeight":"700" }',
      "Subtitle",
      null,
    ],
    [
      5,
      "Poppins",
      "Tròn – thân thiện",
      '{ "fontFamily":"Poppins","fontWeight":"800" }',
      "Lifestyle",
      null,
    ],
    [
      6,
      "Orbitron",
      "Tech – futurism",
      '{ "fontFamily":"Orbitron","fontWeight":"800","letterSpacing":"2px" }',
      "AI",
      null,
    ],
    [
      7,
      "Luckiest Guy",
      "Comic",
      '{ "fontFamily":"Luckiest Guy","fontWeight":"900","letterSpacing":"1px" }',
      "Video vui",
      null,
    ],
    [
      8,
      "Oswald",
      "Gọn ngang",
      '{ "fontFamily":"Oswald","fontWeight":"800" }',
      "Caption",
      null,
    ],
    [
      9,
      "Arial Black",
      "System bold",
      '{ "fontFamily":"Arial Black","fontWeight":"900" }',
      "Fallback",
      null,
    ],
    [
      10,
      "Roboto",
      "UI chuẩn",
      '{ "fontFamily":"Roboto","fontWeight":"700" }',
      "Voice",
      null,
    ],
    [
      11,
      "Bungee",
      "Viral block",
      '{ "fontFamily":"Bungee","fontWeight":"900" }',
      "Viral",
      null,
    ],
    [
      12,
      "Archivo Black",
      "Vuông mạnh",
      '{ "fontFamily":"Archivo Black","fontWeight":"900" }',
      "Title",
      null,
    ],
    [
      13,
      "Rubik Mono One",
      "Mono cyber",
      '{ "fontFamily":"Rubik Mono One","fontWeight":"400","letterSpacing":"2px" }',
      "Cyber",
      null,
    ],
    [
      14,
      "Permanent Marker",
      "Viết tay",
      '{ "fontFamily":"Permanent Marker","fontWeight":"400" }',
      "Story",
      null,
    ],
    [
      15,
      "Fredoka One",
      "Bubble",
      '{ "fontFamily":"Fredoka One","fontWeight":"800" }',
      "TikTok",
      null,
    ],
    [
      16,
      "Teko",
      "Cao mảnh",
      '{ "fontFamily":"Teko","fontWeight":"700","letterSpacing":"1px" }',
      "Mobile",
      null,
    ],
    [
      17,
      "Exo 2",
      "Startup tech",
      '{ "fontFamily":"Exo 2","fontWeight":"700" }',
      "Công nghệ",
      null,
    ],
    [
      18,
      "Playfair Display",
      "Serif sang",
      '{ "fontFamily":"Playfair Display","fontWeight":"700" }',
      "Quote",
      null,
    ],
    [
      19,
      "DM Sans",
      "Minimal",
      '{ "fontFamily":"DM Sans","fontWeight":"600" }',
      "Sub",
      null,
    ],
    [
      20,
      "Cinzel",
      "Luxury cổ",
      '{ "fontFamily":"Cinzel","fontWeight":"700","letterSpacing":"2px" }',
      "Premium",
      null,
    ],
  ],
  [
    ["FONT-", null, null, null, null, null, null, null, null, null, null],
    ["stt", "css", null, "className", null, null, null, null, null, null, null],
    [
      1,
      '{fontFamily: "Montserrat",\n fontWeight: 900,\n textTransform: "uppercase",\n letterSpacing: "12px",\n color: "white",\n WebkitTextStroke: "15px black",\n paintOrder: "stroke fill"}',
      null,
      "font-text-001",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      2,
      '{fontFamily: "Nunito",\n fontWeight: 700,\n textTransform: "uppercase",\n letterSpacing: "12px",\n color: "white",\n WebkitTextStroke: "10px #000000ff",\n paintOrder: "stroke fill"}',
      null,
      "font-text-002",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      3,
      '{fontFamily: "Be Vietnam Pro",\n fontWeight: 700,\n fontStyle: "italic",\n textTransform: "uppercase",\n letterSpacing: "12px",\n color: "white",\n WebkitTextStroke: "11px #00eeffff",\n paintOrder: "stroke fill"}',
      null,
      "font-text-003",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      4,
      '{fontFamily: "Dancing Script",\n fontWeight: 700,\n textTransform: "uppercase",\n letterSpacing: "12px",\n color: "white",\n WebkitTextStroke: "11px #ff0101ff",\n paintOrder: "stroke fill"}',
      null,
      "font-text-004",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      5,
      '{fontFamily: "Fuzzy Bubbles",\n fontWeight: 700,\n textTransform: "uppercase",\n letterSpacing: "12px",\n color: "white",\n WebkitTextStroke: "15px #000000ff",\n paintOrder: "stroke fill"}',
      null,
      "font-text-005",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      6,
      '{fontFamily: "Fuzzy Bubbles",\n fontWeight: 700,\n textTransform: "uppercase",\n letterSpacing: "12px",\n color: "#ff8800ff",\n WebkitTextStroke: "15px #500202ff",\n textShadow: "10px 10px 10px #000000ff",\n paintOrder: "stroke fill"}',
      null,
      "font-text-006",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      7,
      '{fontFamily: "Dancing Script",\n fontWeight: 700,\n textTransform: "uppercase",\n letterSpacing: "12px",\n color: "#24d31eff ",\n WebkitTextStroke: "10px #2e6b22ff",\n textShadow: `0 0 10px red,0 0 20px red`,\n paintOrder: "stroke fill"}',
      null,
      "font-text-007",
      "Ko xài được",
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      8,
      '{fontFamily: "Bangers",\n fontWeight: 400,\n textTransform: "uppercase",\n letterSpacing: "12px",\n color: "black"}',
      null,
      "font-text-008",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      9,
      '{fontFamily: "Nunito",\n textTransform: "uppercase",\n letterSpacing: "4px",\n fontWeight: 900,\n color: "#8d4343c5"}',
      null,
      "font-text-009",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      10,
      '{fontFamily: "Fuzzy Bubbles",\n letterSpacing: "10px",\n fontWeight: 800,\n color: "black",\n WebkitTextStroke: "3px #000000ff"}',
      null,
      "font-text-010",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      11,
      '{fontFamily: "Montserrat",\n textTransform: "uppercase",\n letterSpacing: "10px",\n fontWeight: 900,\n color: "black"}',
      null,
      "font-text-011",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      12,
      '{fontFamily: "Montserrat",\n letterSpacing: "7px",\n fontWeight: 700,\n color: "black"}',
      null,
      "font-text-012",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      13,
      '{fontFamily: "Nunito",\n letterSpacing: "7px",\n fontWeight: 700,\n color: "black"}',
      null,
      "font-text-013",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      14,
      '{fontFamily: "Fuzzy Bubbles",\n letterSpacing: "7px",\n fontWeight: 700,\n color: "black"}',
      null,
      "font-text-014",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      'const bgOptions = [\n { label: "Medical", bg: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" },\n { label: "Nature", bg: "linear-gradient(135deg, #134e4a 0%, #064e3b 50%, #1a2e05 100%)" },\n { label: "Warm", bg: "linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #451a03 100%)" },\n { label: "Purple", bg: "linear-gradient(135deg, #3b0764 0%, #581c87 50%, #1e1b4b 100%)" },\n { label: "Light", bg: "linear-gradient(135deg, #e2e8f0, #f1f5f9, #e2e8f0)" },\n];',
      '{\n padding: "32px 24px", display: "flex", alignItems: "center", justifyContent: "center",\n background: bgOptions[bgIdx].bg, minHeight: "120px", position: "relative"\n }',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null, null, null, null],
    [
      null,
      "id",
      "name",
      "desc",
      "useCase",
      "box",
      "text",
      "subText",
      "sample",
      "subSample",
      "hasStep",
    ],
    [
      1,
      "GLASS_CARD",
      "Glass Card",
      "Glassmorphism trong suốt",
      "Info overlay, subtitle box",
      '{"padding":"24px 32px","background":"rgba(255,255,255,0.12)","borderRadius":"20px","backdropFilter":"blur(24px)","WebkitBackdropFilter":"blur(24px)","border":"1px solid rgba(255,255,255,0.2)","boxShadow":"0 8px 32px rgba(0,0,0,0.25)","display":"flex","alignItems":"center","justifyContent":"center","gap":"12px"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":700,"fontSize":"28px","letterSpacing":"2px","color":"#FFFFFF","lineHeight":1.3,"textShadow":"0 2px 8px rgba(0,0,0,0.4)"}',
      null,
      "Glass Card Style",
      null,
      null,
    ],
    [
      2,
      "NEON_GLOW",
      "Neon Glow",
      "Neon phát sáng cyan",
      "Tiêu đề chính, highlight",
      '{"padding":"20px 40px","background":"rgba(0,0,0,0.85)","borderRadius":"16px","border":"1px solid rgba(0,234,255,0.5)","boxShadow":"0 0 20px rgba(0,234,255,0.3), 0 0 60px rgba(0,234,255,0.1), inset 0 0 20px rgba(0,234,255,0.05)","display":"flex","alignItems":"center","justifyContent":"center","gap":"12px"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":900,"fontSize":"28px","letterSpacing":"4px","textTransform":"uppercase","color":"#00EAFF","lineHeight":1.2,"textShadow":"0 0 10px rgba(0,234,255,0.8), 0 0 30px rgba(0,234,255,0.5), 0 0 60px rgba(0,234,255,0.3)"}',
      null,
      "NEON GLOW",
      null,
      null,
    ],
    [
      3,
      "DARK_TECH",
      "Dark Tech",
      "Tech tối, chuyên nghiệp",
      "Data card, tech content",
      '{"padding":"28px 36px","background":"linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9))","borderRadius":"12px","border":"1px solid rgba(56,189,248,0.2)","boxShadow":"0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)","display":"flex","alignItems":"center","justifyContent":"center","gap":"16px"}',
      '{"fontFamily":"\'Be Vietnam Pro\', sans-serif","fontWeight":600,"fontSize":"26px","letterSpacing":"1px","color":"#E2E8F0","lineHeight":1.4}',
      null,
      "Dark Tech Interface",
      null,
      null,
    ],
    [
      4,
      "GRADIENT_CARD",
      "Gradient Card",
      "Gradient tím-hồng",
      "CTA, feature highlight",
      '{"padding":"28px 36px","background":"linear-gradient(135deg, #6366F1, #EC4899)","borderRadius":"20px","border":"none","boxShadow":"0 12px 40px rgba(99,102,241,0.4), 0 4px 12px rgba(236,72,153,0.2)","display":"flex","alignItems":"center","justifyContent":"center","gap":"12px"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":800,"fontSize":"28px","letterSpacing":"2px","textTransform":"uppercase","color":"#FFFFFF","lineHeight":1.2,"textShadow":"0 2px 12px rgba(0,0,0,0.3)"}',
      null,
      "GRADIENT CARD",
      null,
      null,
    ],
    [
      5,
      "SOFT_SHADOW",
      "Soft Shadow",
      "Bóng mềm, dịu mắt",
      "Caption, info card",
      '{"padding":"24px 32px","background":"rgba(255,255,255,0.95)","borderRadius":"16px","border":"none","boxShadow":"0 4px 20px rgba(0,0,0,0.08), 0 12px 48px rgba(0,0,0,0.06)","display":"flex","alignItems":"center","justifyContent":"flex-start","gap":"12px"}',
      '{"fontFamily":"Nunito, sans-serif","fontWeight":700,"fontSize":"26px","letterSpacing":"0.5px","color":"#1E293B","lineHeight":1.5}',
      null,
      "Soft Shadow Clean",
      null,
      null,
    ],
    [
      6,
      "PREMIUM_TITLE",
      "Premium Title",
      "Vàng gold sang trọng",
      "Intro, expert name",
      '{"padding":"32px 48px","background":"linear-gradient(180deg, rgba(0,0,0,0.9), rgba(20,20,20,0.85))","borderRadius":"4px","border":"2px solid rgba(212,175,55,0.5)","boxShadow":"0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(212,175,55,0.15)","display":"flex","alignItems":"center","justifyContent":"center","gap":"16px"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":900,"fontSize":"32px","letterSpacing":"8px","textTransform":"uppercase","color":"#D4AF37","lineHeight":1.1,"textShadow":"0 0 20px rgba(212,175,55,0.4), 0 2px 4px rgba(0,0,0,0.8)"}',
      null,
      "PREMIUM",
      null,
      null,
    ],
    [
      7,
      "HIGHLIGHT_TAG",
      "Highlight Tag",
      "Tag xanh lá compact",
      "Category, hashtag",
      '{"padding":"10px 24px","background":"linear-gradient(135deg, #10B981, #059669)","borderRadius":"100px","border":"none","boxShadow":"0 4px 16px rgba(16,185,129,0.35)","display":"flex","alignItems":"center","justifyContent":"center","gap":"8px"}',
      '{"fontFamily":"Nunito, sans-serif","fontWeight":800,"fontSize":"22px","letterSpacing":"2px","textTransform":"uppercase","color":"#FFFFFF","lineHeight":1.2}',
      null,
      "#HIGHLIGHT",
      null,
      null,
    ],
    [
      8,
      "WARNING_BOX",
      "Warning Box",
      "Cảnh báo đỏ cam",
      "Warning, alert, lưu ý",
      '{"padding":"24px 36px","background":"linear-gradient(135deg, rgba(220,38,38,0.95), rgba(234,88,12,0.9))","borderRadius":"14px","border":"2px solid rgba(255,255,255,0.2)","boxShadow":"0 8px 32px rgba(220,38,38,0.4), 0 0 0 4px rgba(220,38,38,0.15)","display":"flex","alignItems":"center","justifyContent":"center","gap":"14px"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":800,"fontSize":"28px","letterSpacing":"3px","textTransform":"uppercase","color":"#FFFFFF","lineHeight":1.2,"textShadow":"0 2px 8px rgba(0,0,0,0.4)"}',
      null,
      "⚠️ CẢNH BÁO",
      null,
      null,
    ],
    [
      9,
      "CTA_BADGE",
      "CTA Badge",
      "Gradient cam-đỏ nổi bật",
      "Subscribe, follow, CTA",
      '{"padding":"18px 44px","background":"linear-gradient(135deg, #F59E0B, #EF4444)","borderRadius":"100px","border":"3px solid rgba(255,255,255,0.3)","boxShadow":"0 8px 24px rgba(245,158,11,0.45), 0 2px 8px rgba(239,68,68,0.3)","display":"flex","alignItems":"center","justifyContent":"center","gap":"10px"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":900,"fontSize":"26px","letterSpacing":"4px","textTransform":"uppercase","color":"#FFFFFF","lineHeight":1.1,"textShadow":"0 2px 6px rgba(0,0,0,0.3)"}',
      null,
      "SUBSCRIBE",
      null,
      null,
    ],
    [
      10,
      "STATISTIC_CARD",
      "Statistic Card",
      "Số liệu nổi bật",
      "Phần trăm, data point",
      '{"padding":"32px 40px","background":"linear-gradient(145deg, rgba(15,23,42,0.97), rgba(30,58,95,0.95))","borderRadius":"18px","border":"1px solid rgba(59,130,246,0.25)","boxShadow":"0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)","display":"flex","alignItems":"center","justifyContent":"center","gap":"12px","flexDirection":"column"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":900,"fontSize":"52px","letterSpacing":"2px","color":"#3B82F6","lineHeight":1.0,"textShadow":"0 0 30px rgba(59,130,246,0.5)"}',
      '{"fontFamily":"Nunito, sans-serif","fontWeight":600,"fontSize":"18px","letterSpacing":"3px","textTransform":"uppercase","color":"rgba(148,163,184,0.9)","lineHeight":1.3}',
      "89%",
      "HIỆU QUẢ ĐIỀU TRỊ",
      null,
    ],
    [
      11,
      "EXPERT_NAME_TAG",
      "Expert Name Tag",
      "Lower third chuyên gia",
      "Tên, chức danh",
      '{"padding":"20px 32px","background":"linear-gradient(90deg, rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)","borderRadius":"0 12px 12px 0","border":"none","borderLeft":"4px solid #3B82F6","boxShadow":"0 4px 24px rgba(0,0,0,0.4)","display":"flex","alignItems":"flex-start","justifyContent":"center","gap":"4px","flexDirection":"column","minWidth":"300px"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":700,"fontSize":"26px","letterSpacing":"2px","textTransform":"uppercase","color":"#FFFFFF","lineHeight":1.2}',
      '{"fontFamily":"\'Be Vietnam Pro\', sans-serif","fontWeight":400,"fontSize":"18px","letterSpacing":"1px","color":"rgba(148,163,184,0.9)","lineHeight":1.3}',
      "BS. NGUYỄN VĂN A",
      "Chuyên khoa Nội tổng quát",
      null,
    ],
    [
      12,
      "QUOTE_HIGHLIGHT",
      "Quote Highlight",
      "Trích dẫn sang trọng",
      "Quote, insight",
      '{"padding":"36px 44px","background":"rgba(0,0,0,0.75)","borderRadius":"24px","backdropFilter":"blur(20px)","WebkitBackdropFilter":"blur(20px)","border":"1px solid rgba(255,255,255,0.1)","borderLeft":"4px solid #F59E0B","boxShadow":"0 8px 32px rgba(0,0,0,0.4)","display":"flex","alignItems":"flex-start","justifyContent":"center","gap":"8px","flexDirection":"column"}',
      '{"fontFamily":"Nunito, sans-serif","fontWeight":700,"fontSize":"26px","letterSpacing":"0.5px","color":"#FFFFFF","lineHeight":1.5,"fontStyle":"italic"}',
      null,
      '"Sức khỏe là tài sản quý giá nhất của mỗi người"',
      null,
      null,
    ],
    [
      13,
      "STEP_COUNTER",
      "Step Counter",
      "Bước tiến trình",
      "Tutorial, process",
      '{"padding":"20px 36px","background":"linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))","borderRadius":"16px","backdropFilter":"blur(16px)","WebkitBackdropFilter":"blur(16px)","border":"1px solid rgba(99,102,241,0.3)","boxShadow":"0 4px 20px rgba(99,102,241,0.15)","display":"flex","alignItems":"center","justifyContent":"flex-start","gap":"20px"}',
      '{"fontFamily":"\'Be Vietnam Pro\', sans-serif","fontWeight":600,"fontSize":"24px","letterSpacing":"0.5px","color":"#FFFFFF","lineHeight":1.4}',
      null,
      "Uống đủ 2 lít nước mỗi ngày",
      null,
      true,
    ],
    [
      14,
      "MEDICAL_INFO",
      "Medical Info",
      "Y tế xanh lá chuyên nghiệp",
      "Health tips, triệu chứng",
      '{"padding":"28px 36px","background":"linear-gradient(135deg, rgba(6,78,59,0.95), rgba(4,120,87,0.9))","borderRadius":"16px","border":"1px solid rgba(52,211,153,0.3)","boxShadow":"0 8px 32px rgba(6,78,59,0.4), inset 0 1px 0 rgba(255,255,255,0.05)","display":"flex","alignItems":"flex-start","justifyContent":"center","gap":"8px","flexDirection":"column"}',
      '{"fontFamily":"\'Be Vietnam Pro\', sans-serif","fontWeight":700,"fontSize":"26px","letterSpacing":"1px","color":"#ECFDF5","lineHeight":1.4}',
      '{"fontFamily":"Nunito, sans-serif","fontWeight":600,"fontSize":"18px","letterSpacing":"0.5px","color":"rgba(167,243,208,0.85)","lineHeight":1.4}',
      "Triệu chứng đau khớp",
      "Sưng, nóng, đỏ vùng khớp bị tổn thương",
      null,
    ],
    [
      15,
      "BOLD_IMPACT",
      "Bold Impact",
      "Chữ to đậm impact",
      "Hook đầu video, keyword",
      '{"padding":"16px 24px","background":"transparent","borderRadius":"0","border":"none","boxShadow":"none","display":"flex","alignItems":"center","justifyContent":"center"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":900,"fontSize":"48px","letterSpacing":"4px","textTransform":"uppercase","color":"#FFFFFF","lineHeight":1.1,"WebkitTextStroke":"2px rgba(0,0,0,0.8)","paintOrder":"stroke fill","textShadow":"0 4px 16px rgba(0,0,0,0.6), 0 8px 32px rgba(0,0,0,0.3)"}',
      null,
      "BẠN CÓ BIẾT?",
      null,
      null,
    ],
    [
      16,
      "MINIMAL_LABEL",
      "Minimal Label",
      "Nhãn tối giản",
      "Timestamp, category",
      '{"padding":"8px 20px","background":"rgba(0,0,0,0.5)","borderRadius":"8px","backdropFilter":"blur(8px)","WebkitBackdropFilter":"blur(8px)","border":"none","boxShadow":"none","display":"flex","alignItems":"center","justifyContent":"center","gap":"8px"}',
      '{"fontFamily":"\'Be Vietnam Pro\', sans-serif","fontWeight":500,"fontSize":"18px","letterSpacing":"1px","textTransform":"uppercase","color":"rgba(255,255,255,0.85)","lineHeight":1.3}',
      null,
      "SỨC KHỎE • 2 PHÚT",
      null,
      null,
    ],
    [
      17,
      "FIRE_BANNER",
      "Fire Banner",
      "Gradient đỏ-cam trending",
      "HOT, trending, viral",
      '{"padding":"14px 32px","background":"linear-gradient(90deg, #DC2626, #F97316, #EAB308)","borderRadius":"8px","border":"none","boxShadow":"0 4px 20px rgba(220,38,38,0.5), 0 0 40px rgba(249,115,22,0.2)","display":"flex","alignItems":"center","justifyContent":"center","gap":"8px"}',
      '{"fontFamily":"\'Bangers\', cursive","fontWeight":400,"fontSize":"32px","letterSpacing":"6px","textTransform":"uppercase","color":"#FFFFFF","lineHeight":1.1,"textShadow":"0 2px 4px rgba(0,0,0,0.4)"}',
      null,
      "🔥 HOT TREND",
      null,
      null,
    ],
    [
      18,
      "ICY_GLASS",
      "Icy Glass",
      "Glass xanh dương lạnh",
      "Fact, tips, kiến thức",
      '{"padding":"24px 32px","background":"linear-gradient(135deg, rgba(59,130,246,0.15), rgba(147,197,253,0.1))","borderRadius":"18px","backdropFilter":"blur(20px)","WebkitBackdropFilter":"blur(20px)","border":"1px solid rgba(59,130,246,0.25)","boxShadow":"0 8px 32px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.1)","display":"flex","alignItems":"flex-start","justifyContent":"center","gap":"12px","flexDirection":"column"}',
      '{"fontFamily":"Nunito, sans-serif","fontWeight":700,"fontSize":"26px","letterSpacing":"0.5px","color":"#FFFFFF","lineHeight":1.4}',
      null,
      "💡 Bạn biết không? Vitamin D giúp xương chắc khỏe",
      null,
      null,
    ],
    [
      19,
      "HANDWRITTEN_ACCENT",
      "Handwritten Accent",
      "Viết tay thân thiện",
      "Chú thích, personal note",
      '{"padding":"16px 28px","background":"rgba(255,251,235,0.9)","borderRadius":"12px","border":"2px dashed rgba(217,119,6,0.4)","boxShadow":"0 4px 12px rgba(0,0,0,0.08)","display":"flex","alignItems":"center","justifyContent":"center","gap":"8px"}',
      '{"fontFamily":"\'Dancing Script\', cursive","fontWeight":700,"fontSize":"30px","letterSpacing":"1px","color":"#92400E","lineHeight":1.4}',
      null,
      "Lưu ý: Hãy tham khảo bác sĩ nhé!",
      null,
      null,
    ],
    [
      20,
      "GRADIENT_TEXT_ONLY",
      "Gradient Text Only",
      "Chỉ text gradient, cinematic",
      "Cinematic title",
      '{"padding":"0","background":"transparent","borderRadius":"0","border":"none","boxShadow":"none","display":"flex","alignItems":"center","justifyContent":"center"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":900,"fontSize":"40px","letterSpacing":"6px","textTransform":"uppercase","background":"linear-gradient(135deg, #FFFFFF, #60A5FA, #A78BFA)","WebkitBackgroundClip":"text","WebkitTextFillColor":"transparent","backgroundClip":"text","lineHeight":1.1,"filter":"drop-shadow(0 4px 12px rgba(96,165,250,0.4))"}',
      null,
      "CINEMATIC",
      null,
      null,
    ],
    [
      21,
      "PHARMA_CARD",
      "Pharma Card",
      "Dược phẩm clean",
      "Tên thuốc, liều dùng",
      '{"padding":"24px 32px","background":"linear-gradient(180deg, #FFFFFF, #F0FDFA)","borderRadius":"16px","border":"1px solid rgba(20,184,166,0.3)","borderTop":"4px solid #14B8A6","boxShadow":"0 4px 20px rgba(20,184,166,0.12), 0 1px 4px rgba(0,0,0,0.05)","display":"flex","alignItems":"flex-start","justifyContent":"center","gap":"8px","flexDirection":"column"}',
      '{"fontFamily":"\'Be Vietnam Pro\', sans-serif","fontWeight":700,"fontSize":"24px","letterSpacing":"1px","color":"#0F766E","lineHeight":1.4}',
      '{"fontFamily":"\'Be Vietnam Pro\', sans-serif","fontWeight":400,"fontSize":"18px","letterSpacing":"0.5px","color":"#5B7A78","lineHeight":1.5}',
      "Glucosamine 1500mg",
      "Uống 1 viên/ngày sau bữa ăn",
      null,
    ],
    [
      22,
      "BUBBLE_POP",
      "Bubble Pop",
      "Vui tươi, playful",
      "Fun fact, quiz",
      '{"padding":"24px 36px","background":"linear-gradient(135deg, #FDE68A, #FBBF24)","borderRadius":"32px","border":"3px solid #F59E0B","boxShadow":"0 8px 24px rgba(251,191,36,0.35), 4px 4px 0 #E09100","display":"flex","alignItems":"center","justifyContent":"center","gap":"10px"}',
      '{"fontFamily":"\'Fuzzy Bubbles\', cursive","fontWeight":700,"fontSize":"26px","letterSpacing":"2px","color":"#7C2D12","lineHeight":1.3}',
      null,
      "Bạn có biết? 🤔",
      null,
      null,
    ],
    [
      23,
      "CINEMA_SUBTITLE",
      "Cinema Subtitle",
      "Phụ đề điện ảnh",
      "Subtitle, narration",
      '{"padding":"14px 32px","background":"rgba(0,0,0,0.65)","borderRadius":"8px","border":"none","boxShadow":"0 4px 16px rgba(0,0,0,0.3)","display":"flex","alignItems":"center","justifyContent":"center"}',
      '{"fontFamily":"\'Be Vietnam Pro\', sans-serif","fontWeight":600,"fontSize":"24px","letterSpacing":"0.5px","color":"#FFFFFF","lineHeight":1.5,"textShadow":"0 1px 4px rgba(0,0,0,0.5)"}',
      null,
      "Hôm nay chúng ta sẽ tìm hiểu về sức khỏe xương khớp",
      null,
      null,
    ],
    [
      24,
      "ELECTRIC_PURPLE",
      "Electric Purple",
      "Tím điện, hiện đại",
      "Section title, topic",
      '{"padding":"20px 40px","background":"linear-gradient(135deg, rgba(88,28,135,0.9), rgba(124,58,237,0.85))","borderRadius":"14px","border":"1px solid rgba(167,139,250,0.3)","boxShadow":"0 8px 32px rgba(124,58,237,0.35), 0 0 60px rgba(139,92,246,0.1)","display":"flex","alignItems":"center","justifyContent":"center","gap":"12px"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":800,"fontSize":"28px","letterSpacing":"3px","textTransform":"uppercase","color":"#F5F3FF","lineHeight":1.2,"textShadow":"0 0 20px rgba(167,139,250,0.6)"}',
      null,
      "PHẦN 2: NGUYÊN NHÂN",
      null,
      null,
    ],
    [
      25,
      "AUTHORITY_BANNER",
      "Authority Banner",
      "Navy uy tín, gold accent",
      "Chuyên gia, authority",
      '{"padding":"20px 36px","background":"linear-gradient(90deg, rgba(15,23,42,0.97), rgba(30,41,59,0.9))","borderRadius":"12px","border":"1px solid rgba(212,175,55,0.3)","borderBottom":"3px solid #D4AF37","boxShadow":"0 8px 24px rgba(0,0,0,0.5)","display":"flex","alignItems":"flex-start","justifyContent":"center","gap":"4px","flexDirection":"column"}',
      '{"fontFamily":"Montserrat, sans-serif","fontWeight":700,"fontSize":"24px","letterSpacing":"2px","color":"#D4AF37","lineHeight":1.3}',
      '{"fontFamily":"\'Be Vietnam Pro\', sans-serif","fontWeight":400,"fontSize":"18px","letterSpacing":"0.5px","color":"#94A3B8","lineHeight":1.4}',
      "Theo nghiên cứu WHO 2024",
      "Tổ chức Y tế Thế giới",
      null,
    ],
  ],
  [
    ["animation", null, null, null, null, null],
    [
      "🎭 BẢNG 3: 20 HIỆU ỨNG ANIMATION CHO REMOTION",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [
      "⚠️ LƯU Ý: Remotion không dùng CSS @keyframes, mà dùng animations array với frame-based interpolation.",
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    ["#", "Tên Animation", "Mô tả", "Code mẫu", null, null],
    [
      1,
      "Fade In",
      "Mờ dần xuất hiện",
      '{animations: [{selector: "#id", property: "opacity", keyframes: [{frame: 0, value: 0}, {frame: 30, value: 1}]}]}',
      null,
      null,
    ],
    [
      2,
      "Fade Out",
      "Mờ dần biến mất",
      '{animations: [{selector: "#id", property: "opacity", keyframes: [{frame: 0, value: 1}, {frame: 30, value: 0}]}]}',
      null,
      null,
    ],
    [
      3,
      "Slide In Left",
      "Trượt vào từ trái",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "translateX(-100%)"}, {frame: 30, value: "translateX(0)"}]}]}',
      null,
      null,
    ],
    [
      4,
      "Slide In Right",
      "Trượt vào từ phải",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "translateX(100%)"}, {frame: 30, value: "translateX(0)"}]}]}',
      null,
      null,
    ],
    [
      5,
      "Slide In Top",
      "Trượt vào từ trên",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "translateY(-100%)"}, {frame: 30, value: "translateY(0)"}]}]}',
      null,
      null,
    ],
    [
      6,
      "Slide In Bottom",
      "Trượt vào từ dưới",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "translateY(100%)"}, {frame: 30, value: "translateY(0)"}]}]}',
      null,
      null,
    ],
    [
      7,
      "Scale Up",
      "Phóng to dần",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "scale(0)"}, {frame: 30, value: "scale(1)"}]}]}',
      null,
      null,
    ],
    [
      8,
      "Scale Down",
      "Thu nhỏ dần",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "scale(1.5)"}, {frame: 30, value: "scale(1)"}]}]}',
      null,
      null,
    ],
    [
      9,
      "Rotate In",
      "Xoay vào",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "rotate(-360deg)"}, {frame: 30, value: "rotate(0deg)"}]}]}',
      null,
      null,
    ],
    [
      10,
      "Rotate Out",
      "Xoay ra",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "rotate(0deg)"}, {frame: 30, value: "rotate(360deg)"}]}]}',
      null,
      null,
    ],
    [
      11,
      "Bounce In",
      "Nảy vào",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "scale(0)"}, {frame: 15, value: "scale(1.2)"}, {frame: 30, value: "scale(1)"}], easing: "easeOut"}]}',
      null,
      null,
    ],
    [
      12,
      "Shake",
      "Rung lắc",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "translateX(0)"}, {frame: 5, value: "translateX(-10px)"}, {frame: 10, value: "translateX(10px)"}, {frame: 15, value: "translateX(-10px)"}, {frame: 20, value: "translateX(0)"}]}]}',
      null,
      null,
    ],
    [
      13,
      "Pulse",
      "Nhấp nháy",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "scale(1)"}, {frame: 15, value: "scale(1.1)"}, {frame: 30, value: "scale(1)"}], easing: "easeInOut"}]}',
      null,
      null,
    ],
    [
      14,
      "Flip Horizontal",
      "Lật ngang",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "rotateY(0deg)"}, {frame: 30, value: "rotateY(180deg)"}]}]}',
      null,
      null,
    ],
    [
      15,
      "Flip Vertical",
      "Lật dọc",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "rotateX(0deg)"}, {frame: 30, value: "rotateX(180deg)"}]}]}',
      null,
      null,
    ],
    [
      16,
      "Zoom In Rotate",
      "Phóng to + xoay",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "scale(0) rotate(0deg)"}, {frame: 30, value: "scale(1) rotate(360deg)"}]}]}',
      null,
      null,
    ],
    [
      17,
      "Blur In",
      "Mờ dần rõ",
      '{animations: [{selector: "#id", property: "filter", keyframes: [{frame: 0, value: "blur(20px)"}, {frame: 30, value: "blur(0px)"}]}]}',
      null,
      null,
    ],
    [
      18,
      "Color Shift",
      "Đổi màu",
      '{animations: [{selector: "#id", property: "backgroundColor", keyframes: [{frame: 0, value: "#ff0000"}, {frame: 30, value: "#00ff00"}, {frame: 60, value: "#0000ff"}]}]}',
      null,
      null,
    ],
    [
      19,
      "Slide Fade Combo",
      "Trượt + mờ dần",
      '{animations: [{selector: "#id", property: "opacity", keyframes: [{frame: 0, value: 0}, {frame: 30, value: 1}]}, {selector: "#id", property: "transform", keyframes: [{frame: 0, value: "translateY(50px)"}, {frame: 30, value: "translateY(0)"}]}]}',
      null,
      null,
    ],
    [
      20,
      "Elastic Bounce",
      "Nảy co giãn",
      '{animations: [{selector: "#id", property: "transform", keyframes: [{frame: 0, value: "scale(0)"}, {frame: 10, value: "scale(1.3)"}, {frame: 20, value: "scale(0.9)"}, {frame: 30, value: "scale(1.05)"}, {frame: 40, value: "scale(1)"}], easing: "easeOut"}]}',
      null,
      null,
    ],
    [null, null, null, null, null, null],
    [
      null,
      null,
      null,
      null,
      'animations: [\n {\n selector: "#elementID", // Hoặc ".className"\n property: "opacity", // CSS property\n keyframes: [\n { frame: 0, value: 0 },\n { frame: 30, value: 1 }\n ],\n easing: "easeInOut" // "linear", "easeIn", "easeOut", "easeInOut"\n }\n]',
      '{\n cmd: "divAction",\n id: "myDiv",\n styleCss: {\n position: "absolute",\n top: "100px",\n width: "300px",\n height: "200px",\n backgroundColor: "blue"\n },\n animations: [\n // Animation 1: Fade in\n {\n selector: "#myDiv",\n property: "opacity",\n keyframes: [\n { frame: 0, value: 0 },\n { frame: 30, value: 1 }\n ],\n easing: "easeInOut"\n },\n // Animation 2: Slide from left\n {\n selector: "#myDiv",\n property: "transform",\n keyframes: [\n { frame: 0, value: "translateX(-100%)" },\n { frame: 30, value: "translateX(0)" }\n ],\n easing: "easeOut"\n }\n ]\n}',
    ],
  ],
  [
    ["Default", null],
    ["File âm thanh rỗng", "SOUNDCHUNG_SpaceSound"],
  ],
  [
    ["TransitionPolyte", null, null, null, null],
    [null, "Key cần dùng trong Action", null, null, null],
    [
      null,
      '"transition": "slideInFromBottom", // ⭐ Loại transition',
      null,
      null,
      null,
    ],
    [
      null,
      '"transitionFrame": 20, // ⭐ Độ dài transition (frames)',
      null,
      null,
      null,
    ],
    [
      null,
      '"transitionLoop": false, // ⭐ Có lặp lại không (true = infinite)',
      null,
      null,
      null,
    ],
    [null, null, null, null, null],
    [null, "transition", "slideInFromBottom", null, null],
    [null, "transitionFrame", 15, null, null],
    [null, "transitionLoop", false, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, "🎨 Danh sách Transitions", null, null, null],
    [null, null, null, null, null],
    [null, "Tên Transition", "Mô tả", "Hiệu ứng", null],
    [
      null,
      "none",
      "Không có transition",
      "Hiển thị trực tiếp, không có animation",
      null,
    ],
    [null, "fadeIn", "Mờ dần → rõ", "Opacity từ 0 → 1", null],
    [null, "scaleIn", "Thu nhỏ → phóng to", "Scale từ 0.5 → 1", null],
    [
      null,
      "zoomIn",
      "Phóng to + mờ dần",
      "Scale từ 0.8 → 1, Opacity từ 0 → 1",
      null,
    ],
    [
      null,
      "slideInFromBottom",
      "Trượt từ dưới lên",
      "TranslateY từ 100% → 0%, Opacity từ 0 → 1",
      null,
    ],
    [
      null,
      "slideInFromTop",
      "Trượt từ trên xuống",
      "TranslateY từ -100% → 0%, Opacity từ 0 → 1",
      "slideInFromLeft",
    ],
    [
      null,
      "slideInFromLeft",
      "Trượt từ trái qua phải",
      "TranslateX từ -100% → 0%, Opacity từ 0 → 1",
      "slideInFromRight",
    ],
    [
      null,
      "slideInFromRight",
      "Trượt từ phải qua trái",
      "TranslateX từ 100% → 0%, Opacity từ 0 → 1",
      "slideInFromBottom",
    ],
    [
      null,
      "slideInFromBottomFade",
      "Trượt nhẹ từ dưới + fade",
      "TranslateY từ 50px → 0px, Opacity từ 0 → 1",
      null,
    ],
    [
      null,
      "scaleRotate",
      "Thu nhỏ + xoay → bình thường",
      "Scale từ 0.5 → 1, Rotate từ -10° → 0°, Opacity từ 0 → 1",
      null,
    ],
    [
      null,
      "bounceIn",
      "Hiệu ứng nảy đàn hồi",
      "Scale 0 → 1.1 → 0.95 → 1 (elastic bounce), Opacity từ 0 → 1",
      null,
    ],
    [
      null,
      "flipIn",
      "Lật 3D từ nghiêng → thẳng",
      "RotateY từ 90° → 0° (3D flip effect), Opacity từ 0 → 1",
      null,
    ],
    [
      null,
      "rotateIn",
      "Xoay từ nghiêng → thẳng",
      "Rotate từ -180° → 0°, Opacity từ 0 → 1",
      null,
    ],
    [
      null,
      "expandIn",
      "Mở rộng từ tâm",
      "ScaleX và ScaleY từ 0 → 1, Opacity từ 0 → 1",
      null,
    ],
    [
      null,
      "blurIn",
      "Từ mờ → rõ nét",
      "Blur từ 10px → 0px, Opacity từ 0 → 1",
      null,
    ],
    [null, null, null, null, null],
    [null, "📝 Ghi chú sử dụng", null, null, null],
    [null, null, null, null, null],
    [
      null,
      "1. Transition đơn giản (phù hợp cho hầu hết trường hợp)",
      null,
      null,
      null,
    ],
    [null, null, null, null, null],
    [null, "fadeIn - Mượt mà, tinh tế", null, null, null],
    [null, "slideInFromBottom - Năng động, chuyên nghiệp", null, null, null],
    [null, "zoomIn - Thu hút sự chú ý", null, null, null],
    [null, null, null, null, null],
    [
      null,
      "2. Transition năng động (phù hợp cho nội dung quan trọng)",
      null,
      null,
      null,
    ],
    [null, null, null, null, null],
    [null, "scaleIn - Nổi bật", null, null, null],
    [null, "bounceIn - Vui tươi, playful", null, null, null],
    [null, "flipIn - Độc đáo, ấn tượng", null, null, null],
    [null, null, null, null, null],
    [
      null,
      "3. Transition có hướng (phù hợp cho content flow)",
      null,
      null,
      null,
    ],
    [null, null, null, null, null],
    [null, "slideInFromLeft/Right - Điều hướng tự nhiên", null, null, null],
    [null, "slideInFromTop - Dropdown style", null, null, null],
    [null, "slideInFromBottom - Bottom sheet style", null, null, null],
    [null, null, null, null, null],
    [
      null,
      "4. Transition phức tạp (phù hợp cho hero elements)",
      null,
      null,
      null,
    ],
    [null, null, null, null, null],
    [null, "scaleRotate - Sáng tạo", null, null, null],
    [null, "rotateIn - Nghệ thuật", null, null, null],
    [null, "blurIn - Tinh tế, sang trọng", null, null, null],
    [null, null, null, null, null],
    [null, "💡 Ví dụ sử dụng trong JSON", null, null, null],
    [null, null, null, null, null],
    [null, "// Ví dụ 1: Fade in đơn giản", null, null, null],
    [null, "{", null, null, null],
    [null, '"transition": "fadeIn",', null, null, null],
    [null, '"transitionFrame": 15,', null, null, null],
    [null, '"transitionLoop": false', null, null, null],
    [null, "}", null, null, null],
    [null, null, null, null, null],
    [null, "// Ví dụ 2: Bounce effect với loop", null, null, null],
    [null, "{", null, null, null],
    [null, '"transition": "bounceIn",', null, null, null],
    [null, '"transitionFrame": 30,', null, null, null],
    [null, '"transitionLoop": true // Lặp lại liên tục', null, null, null],
    [null, "}", null, null, null],
    [null, null, null, null, null],
    [null, "// Ví dụ 3: Slide từ dưới lên (chậm)", null, null, null],
    [null, "{", null, null, null],
    [null, '"transition": "slideInFromBottom",', null, null, null],
    [null, '"transitionFrame": 45, // 1.5 giây @ 30fps', null, null, null],
    [null, '"transitionLoop": false', null, null, null],
    [null, "}", null, null, null],
    [null, null, null, null, null],
    [null, "// Ví dụ 4: Scale + Rotate (nhanh)", null, null, null],
    [null, "{", null, null, null],
    [null, '"transition": "scaleRotate",', null, null, null],
    [null, '"transitionFrame": 10, // ~0.33 giây @ 30fps', null, null, null],
    [null, '"transitionLoop": false', null, null, null],
    [null, "}", null, null, null],
    [null, null, null, null, null],
    [null, "🎯 Khuyến nghị thời lượng (transitionFrame)", null, null, null],
    [null, null, null, null, null],
    [null, "Tốc độ", "Frames @ 30fps", "Giây", "Phù hợp với"],
    [
      null,
      "Rất nhanh",
      "2026-05-10T00:00:00.000Z",
      "0.17-0.33s",
      "Text, icons, subtle effects",
    ],
    [
      null,
      "Nhanh",
      "2026-10-15T00:00:00.000Z",
      "0.33-0.5s",
      "Default cho hầu hết content",
    ],
    [null, "Vừa", "15-30", "0.5-1s", "Images, videos, important content"],
    [null, "Chậm", "30-60", "1-2s", "Hero sections, dramatic reveals"],
    [null, "Rất chậm", "60+", "2s+", "Special effects, cinematic style"],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [
      null,
      "Bạn có muốn tôi thêm transition nào khác không? Ví dụ:",
      null,
      null,
      null,
    ],
    [null, null, null, null, null],
    [null, "rotateX/rotateZ - 3D rotation khác", null, null, null],
    [null, "skewIn - Hiệu ứng nghiêng", null, null, null],
    [null, "waveIn - Hiệu ứng sóng", null, null, null],
    [null, "glitchIn - Hiệu ứng glitch", null, null, null],
    [null, "typewriter - Hiệu ứng máy đánh chữ", null, null, null],
    [null, null, null, null, null],
    [
      null,
      "🎬 10 Infinite Loop Transitions Mới:",
      "* - kenBurns: Zoom smooth 1.0 → 1.15 → 1.0 + pan",
      "kenBurns",
      null,
    ],
    [
      null,
      null,
      "* - pulse: Scale breathing 1.0 → 1.05 → 1.0 → 0.95 → 1.0",
      "pulse",
      null,
    ],
    [
      null,
      "1. kenBurns - Hiệu ứng phim tài liệu",
      "* - sway: Rotate smooth 0° → -3° → 0° → +3° → 0°",
      "sway",
      null,
    ],
    [null, null, "* - float: Smooth up/down wave", "float", null],
    [
      null,
      "Zoom in từ 1.0 → 1.15",
      "* - rotate360: Continuous 360° rotation (smooth)",
      "rotate360",
      null,
    ],
    [
      null,
      "Pan ngang từ trái sang phải",
      "* - wave: Complex wave với scale",
      "wave",
      null,
    ],
    [
      null,
      "Rất phổ biến trong video storytelling",
      "* - breathe: Scale + opacity breathing (smooth cycle)",
      "breathe",
      null,
    ],
    [null, null, "* - shimmer: Smooth shimmer với brightness", "shimmer", null],
    [
      null,
      "2. pulse - Breathing effect",
      "* - drift: Figure-8 pattern (naturally smooth)",
      "drift",
      null,
    ],
    [
      null,
      null,
      "* - orbit: Circular motion (naturally smooth)",
      "orbit",
      null,
    ],
    [null, "Scale nhỏ lớn nhỏ lớn (1.0 ↔ 1.05)", null, null, null],
    [null, "Tạo cảm giác sống động, nhịp thở", null, null, null],
    [null, null, null, null, null],
    [null, "3. sway - Lắc nhẹ như gió", null, null, null],
    [null, null, null, null, null],
    [null, "Rotate -3° ↔ +3°", null, null, null],
    [null, "Giống như hình ảnh bị gió thổi nhẹ", null, null, null],
    [null, null, null, null, null],
    [null, "4. float - Trôi lên xuống", null, null, null],
    [null, null, null, null, null],
    [null, "Translate Y: -10px ↔ +10px", null, null, null],
    [null, "Mượt mà như ảnh đang trôi", null, null, null],
    [null, null, null, null, null],
    [null, "5. rotate360 - Xoay liên tục", null, null, null],
    [null, null, null, null, null],
    [null, "Rotate 0° → 360°", null, null, null],
    [null, "Phù hợp cho logo, icon", null, null, null],
    [null, null, null, null, null],
    [null, "6. wave - Sóng sin", null, null, null],
    [null, null, null, null, null],
    [null, "Kết hợp translateY + scale nhẹ", null, null, null],
    [null, "Tạo chuyển động sóng mượt", null, null, null],
    [null, null, null, null, null],
    [null, "7. breathe - Scale + Opacity breathing", null, null, null],
    [null, null, null, null, null],
    [null, "Scale 1.0 ↔ 1.08", null, null, null],
    [null, "Opacity 0.85 ↔ 1.0", null, null, null],
    [null, "Rất đẹp cho ảnh nền", null, null, null],
    [null, null, null, null, null],
    [null, "8. shimmer - Lấp lánh", null, null, null],
    [null, null, null, null, null],
    [null, "Opacity 0.7 ↔ 1.0", null, null, null],
    [null, "Brightness 0.9 ↔ 1.1", null, null, null],
    [null, "Hiệu ứng lung linh", null, null, null],
    [null, null, null, null, null],
    [null, "9. drift - Trôi theo pattern số 8", null, null, null],
    [null, null, null, null, null],
    [null, "Lemniscate curve (∞)", null, null, null],
    [null, "Chuyển động phức tạp, mượt mà", null, null, null],
    [null, null, null, null, null],
    [null, "10. orbit - Quay tròn nhẹ", null, null, null],
    [null, null, null, null, null],
    [null, "Circular motion với radius 8px", null, null, null],
    [null, "Scale nhẹ 0.98 ↔ 1.02", null, null, null],
    [null, "Tạo độ sâu 3D", null, null, null],
    [null, null, null, null, null],
    [null, "📝 Cách sử dụng:", null, null, null],
    [null, null, null, null, null],
    [null, "javascript", null, null, null],
    [null, null, null, null, null],
    [null, "// Trong Excel/JSON data:", null, null, null],
    [null, "{", null, null, null],
    [null, '"transition": "kenBurns",', null, null, null],
    [null, '"transitionFrame": 120, // 4 giây @ 30fps', null, null, null],
    [
      null,
      '"transitionLoop": true // ⭐ Bắt buộc = true cho infinite',
      null,
      null,
      null,
    ],
    [null, "}", null, null, null],
    [null, null, null, null, null],
    [null, "// Hoặc:", null, null, null],
    [null, "{", null, null, null],
    [null, '"transition": "breathe",', null, null, null],
    [null, '"transitionFrame": 90, // 3 giây @ 30fps', null, null, null],
    [null, '"transitionLoop": true', null, null, null],
    [null, "}", null, null, null],
    [null, null, null, null, null],
    [null, "💡 Tips:", null, null, null],
    [null, null, null, null, null],
    [
      null,
      "transitionFrame nên là 60-180 frames (2-6 giây) cho mượt mà",
      null,
      null,
      null,
    ],
    [
      null,
      "Transitions này đều loop perfectly (không bị giật)",
      null,
      null,
      null,
    ],
    [
      null,
      "Phù hợp nhất cho background images trong TikTok videos",
      null,
      null,
      null,
    ],
    [
      null,
      "Có thể combine nhiều transition bằng cách chain actions",
      null,
      null,
      null,
    ],
  ],
  [
    ["TransitionCssId", null, null, null, null],
    ["🎨 BẢNG 20 ANIMATIONS CHO ACTIONCSSID", null, null, null, null],
    [null, null, null, null, null],
    ["📋 BẢNG ANIMATION VỚI CSS TRANSITION", null, null, null, null],
    [null, null, null, null, null],
    ["#", "Tên Animation", "Mô tả", "CSS Object", "Use Case"],
    [
      1,
      "Fade In",
      "Hiện dần từ trong suốt",
      '{opacity: "1", transition: "opacity 1s ease-in"}',
      "Hiện text, image",
    ],
    [
      2,
      "Fade Out",
      "Biến mất dần",
      '{opacity: "0", transition: "opacity 1s ease-out"}',
      "Ẩn element",
    ],
    [
      3,
      "Slide In Left",
      "Trượt vào từ trái",
      '{transform: "translateX(0)", opacity: "1", transition: "all 1s ease-out"}',
      "Entry animation",
    ],
    [
      4,
      "Slide In Right",
      "Trượt vào từ phải",
      '{transform: "translateX(0)", opacity: "1", transition: "all 1s ease-out"}',
      "Entry animation",
    ],
    [
      5,
      "Slide In Top",
      "Trượt vào từ trên",
      '{transform: "translateY(0)", opacity: "1", transition: "all 1s ease-out"}',
      "Title xuất hiện",
    ],
    [
      6,
      "Slide In Bottom",
      "Trượt vào từ dưới",
      '{transform: "translateY(0)", opacity: "1", transition: "all 1s ease-out"}',
      "Subtitle xuất hiện",
    ],
    [
      7,
      "Scale Up",
      "Phóng to",
      '{transform: "scale(1)", opacity: "1", transition: "all 0.8s ease-out"}',
      "Zoom in effect",
    ],
    [
      8,
      "Scale Down",
      "Thu nhỏ",
      '{transform: "scale(0)", opacity: "0", transition: "all 0.8s ease-in"}',
      "Zoom out effect",
    ],
    [
      9,
      "Expand Width",
      "Mở rộng chiều ngang",
      '{width: "100%", transition: "width 1.5s ease-in-out"}',
      "Progress bar, divider",
    ],
    [
      10,
      "Expand Height",
      "Mở rộng chiều dọc",
      '{height: "500px", maxHeight: "500px", transition: "height 1.5s ease-in-out"}',
      "Accordion, reveal",
    ],
    [
      11,
      "Rotate In",
      "Xoay vào",
      '{transform: "rotate(0deg)", opacity: "1", transition: "all 1s ease-out"}',
      "Logo animation",
    ],
    [
      12,
      "Rotate Out",
      "Xoay ra",
      '{transform: "rotate(360deg)", opacity: "0", transition: "all 1s ease-in"}',
      "Exit với xoay",
    ],
    [
      13,
      "Blur In",
      "Từ mờ về rõ",
      '{filter: "blur(0px)", transition: "filter 1s ease-out"}',
      "Focus effect",
    ],
    [
      14,
      "Blur Out",
      "Từ rõ về mờ",
      '{filter: "blur(20px)", transition: "filter 1s ease-in"}',
      "Unfocus effect",
    ],
    [
      15,
      "Color Shift",
      "Đổi màu",
      '{backgroundColor: "#00ff00", transition: "background-color 1s ease"}',
      "Highlight, state change",
    ],
    [
      16,
      "Glow Effect",
      "Phát sáng",
      '{boxShadow: "0 0 50px rgba(255,255,0,0.8)", transition: "box-shadow 0.5s ease"}',
      "Hover, highlight",
    ],
    [
      17,
      "Brightness Up",
      "Tăng độ sáng",
      '{filter: "brightness(1.5)", transition: "filter 0.8s ease"}',
      "Emphasis",
    ],
    [
      18,
      "Grayscale",
      "Chuyển xám",
      '{filter: "grayscale(100%)", transition: "filter 1s ease"}',
      "Disabled state",
    ],
    [
      19,
      "Skew In",
      "Nghiêng vào",
      '{transform: "skewX(0deg)", opacity: "1", transition: "all 0.8s ease-out"}',
      "Dynamic entry",
    ],
    [
      20,
      "Combined Multi",
      "Kết hợp nhiều hiệu ứng",
      '{transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: "1", filter: "blur(0px)", transition: "all 1.2s ease-out"}',
      "Complex animation",
    ],
    [null, "Chữ về 0px", "Bỏ chữ đi", '{fontSize: "0px"}', null],
  ],
  [
    ["CssTrasition", null, null],
    ["Bảng CSS Actions cho actionCssId", null, null],
    [null, null, null],
    ["1. TRANSITIONS", null, null],
    [null, null, null],
    ["Width & Height Transitions", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "width-expand",
      '{ "width": "300px", "transition": "width 1s ease-in-out" }',
      "Mở rộng width",
    ],
    [
      "width-collapse",
      '{ "width": "50px", "transition": "width 0.8s ease-out" }',
      "Thu nhỏ width",
    ],
    [
      "height-expand",
      '{ "height": "200px", "transition": "height 1.2s ease-in-out" }',
      "Mở rộng height",
    ],
    [
      "height-collapse",
      '{ "height": "30px", "transition": "height 0.5s ease" }',
      "Thu nhỏ height",
    ],
    [null, null, null],
    ["MaxWidth & MaxHeight Transitions", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "maxwidth-expand",
      '{ "maxWidth": "500px", "transition": "max-width 2s ease-in-out" }',
      "Mở rộng maxWidth",
    ],
    [
      "maxwidth-limit",
      '{ "maxWidth": "100px", "transition": "max-width 1.5s ease-out" }',
      "Giới hạn maxWidth",
    ],
    [
      "maxheight-expand",
      '{ "maxHeight": "400px", "transition": "max-height 1.8s ease-in-out" }',
      "Mở rộng maxHeight",
    ],
    [
      "maxheight-limit",
      '{ "maxHeight": "80px", "transition": "max-height 1s ease" }',
      "Giới hạn maxHeight",
    ],
    [null, null, null],
    ["Combined Transitions", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "size-expand",
      '{ "width": "300px", "height": "300px", "transition": "width 1s, height 1s" }',
      "Mở rộng cả W&H",
    ],
    [
      "size-shrink",
      '{ "width": "50px", "height": "50px", "transition": "width 0.8s, height 0.8s" }',
      "Thu nhỏ cả W&H",
    ],
  ],
  [
    ["CssAnimation", null, null],
    ["2. ANIMATIONS - XOAY TRÒN (Rotate)", null, null],
    [null, null, null],
    ["Xoay 1 lần", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "rotate-360-once",
      '{ "animation": "rotate360 1s ease-in-out" }',
      "Xoay 360° một lần",
    ],
    [
      "rotate-180-once",
      '{ "animation": "rotate180 0.8s ease-out" }',
      "Xoay 180° một lần",
    ],
    [
      "rotate-slow-once",
      '{ "animation": "rotate360 2s linear" }',
      "Xoay chậm 1 lần",
    ],
    [null, null, null],
    ["Xoay lặp lại", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "rotate-infinite",
      '{ "animation": "rotate360 2s linear infinite" }',
      "Xoay mãi mãi",
    ],
    [
      "rotate-fast-infinite",
      '{ "animation": "rotate360 1s linear infinite" }',
      "Xoay nhanh liên tục",
    ],
    [
      "rotate-reverse-infinite",
      '{ "animation": "rotateReverse 2s linear infinite" }',
      "Xoay ngược liên tục",
    ],
    [null, null, null],
    ["Keyframes cần thêm:", null, null],
    [null, null, null],
    ["@keyframes rotate360 {", null, null],
    ["from { transform: rotate(0deg); }", null, null],
    ["to { transform: rotate(360deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes rotate180 {", null, null],
    ["from { transform: rotate(0deg); }", null, null],
    ["to { transform: rotate(180deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes rotateReverse {", null, null],
    ["from { transform: rotate(360deg); }", null, null],
    ["to { transform: rotate(0deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    ["3. ANIMATIONS - TO NHỎ (Scale)", null, null],
    [null, null, null],
    ["Scale 1 lần", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "scale-up-once",
      '{ "animation": "scaleUp 0.6s ease-out" }',
      "Phóng to 1 lần",
    ],
    [
      "scale-down-once",
      '{ "animation": "scaleDown 0.6s ease-out" }',
      "Thu nhỏ 1 lần",
    ],
    [
      "pulse-once",
      '{ "animation": "pulse 0.8s ease-in-out" }',
      "Nhấp nháy 1 lần",
    ],
    [
      "bounce-scale-once",
      '{ "animation": "bounceScale 1s ease" }',
      "Nảy to nhỏ 1 lần",
    ],
    [null, null, null],
    ["Scale lặp lại", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "scale-pulse-infinite",
      '{ "animation": "pulse 1.5s ease-in-out infinite" }',
      "Nhấp nháy liên tục",
    ],
    [
      "heartbeat-infinite",
      '{ "animation": "heartbeat 1.2s ease-in-out infinite" }',
      "Đập như tim",
    ],
    [
      "breathing-infinite",
      '{ "animation": "breathing 2s ease-in-out infinite" }',
      "Thở (to nhỏ nhẹ)",
    ],
    [null, null, null],
    ["Keyframes cần thêm:", null, null],
    [null, null, null],
    ["@keyframes scaleUp {", null, null],
    ["from { transform: scale(1); }", null, null],
    ["to { transform: scale(1.5); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes scaleDown {", null, null],
    ["from { transform: scale(1); }", null, null],
    ["to { transform: scale(0.5); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes pulse {", null, null],
    ["0%, 100% { transform: scale(1); }", null, null],
    ["50% { transform: scale(1.2); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes bounceScale {", null, null],
    ["0%, 100% { transform: scale(1); }", null, null],
    ["25% { transform: scale(1.3); }", null, null],
    ["50% { transform: scale(0.9); }", null, null],
    ["75% { transform: scale(1.1); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes heartbeat {", null, null],
    ["0%, 100% { transform: scale(1); }", null, null],
    ["10%, 30% { transform: scale(1.1); }", null, null],
    ["20%, 40% { transform: scale(1); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes breathing {", null, null],
    ["0%, 100% { transform: scale(1); }", null, null],
    ["50% { transform: scale(1.05); }", null, null],
    ["}", null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    ["4. ANIMATIONS - LẮC (Shake/Swing)", null, null],
    [null, null, null],
    ["Lắc ngang 1 lần", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "shake-once",
      '{ "animation": "shake 0.5s ease-in-out" }',
      "Lắc ngang 1 lần",
    ],
    [
      "shake-hard-once",
      '{ "animation": "shakeHard 0.6s ease-in-out" }',
      "Lắc mạnh 1 lần",
    ],
    ["wiggle-once", '{ "animation": "wiggle 0.8s ease" }', "Lắc lư 1 lần"],
    [null, null, null],
    ["Lắc ngang lặp lại", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "shake-infinite",
      '{ "animation": "shake 1s ease-in-out infinite" }',
      "Lắc mãi mãi",
    ],
    [
      "swing-infinite",
      '{ "animation": "swing 2s ease-in-out infinite" }',
      "Đung đưa liên tục",
    ],
    [
      "jello-infinite",
      '{ "animation": "jello 1.5s ease infinite" }',
      "Rung như thạch",
    ],
    [null, null, null],
    ["Keyframes cần thêm:", null, null],
    [null, null, null],
    ["@keyframes shake {", null, null],
    ["0%, 100% { transform: translateX(0); }", null, null],
    ["10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }", null, null],
    ["20%, 40%, 60%, 80% { transform: translateX(10px); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes shakeHard {", null, null],
    ["0%, 100% { transform: translateX(0); }", null, null],
    ["10%, 30%, 50%, 70%, 90% { transform: translateX(-20px); }", null, null],
    ["20%, 40%, 60%, 80% { transform: translateX(20px); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes wiggle {", null, null],
    ["0%, 100% { transform: rotate(0deg); }", null, null],
    ["25% { transform: rotate(-5deg); }", null, null],
    ["75% { transform: rotate(5deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes swing {", null, null],
    ["0%, 100% { transform: rotate(0deg); }", null, null],
    ["20% { transform: rotate(15deg); }", null, null],
    ["40% { transform: rotate(-10deg); }", null, null],
    ["60% { transform: rotate(5deg); }", null, null],
    ["80% { transform: rotate(-5deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes jello {", null, null],
    ["0%, 100% { transform: skewX(0deg) skewY(0deg); }", null, null],
    ["30% { transform: skewX(25deg) skewY(25deg); }", null, null],
    ["40% { transform: skewX(-15deg) skewY(-15deg); }", null, null],
    ["50% { transform: skewX(15deg) skewY(15deg); }", null, null],
    ["65% { transform: skewX(-5deg) skewY(-5deg); }", null, null],
    ["75% { transform: skewX(5deg) skewY(5deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    ["5. ANIMATIONS KẾT HỢP (Combined)", null, null],
    [null, null, null],
    ["Kết hợp 1 lần", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "rotate-scale-once",
      '{ "animation": "rotateScale 1s ease-in-out" }',
      "Vừa xoay vừa to",
    ],
    [
      "shake-grow-once",
      '{ "animation": "shakeGrow 0.8s ease" }',
      "Lắc + phóng to",
    ],
    [
      "spin-bounce-once",
      '{ "animation": "spinBounce 1.2s ease-out" }',
      "Xoay + nảy",
    ],
    [null, null, null],
    ["Kết hợp lặp lại", null, null],
    [null, null, null],
    ["Tên CSS", "JSON Config", "Mô tả"],
    [
      "rotate-pulse-infinite",
      '{ "animation": "rotatePulse 2s linear infinite" }',
      "Xoay + nhấp nháy",
    ],
    [
      "swing-scale-infinite",
      '{ "animation": "swingScale 2s ease-in-out infinite" }',
      "Lắc + to nhỏ",
    ],
    [null, null, null],
    ["Keyframes cần thêm:", null, null],
    [null, null, null],
    ["@keyframes rotateScale {", null, null],
    ["0% { transform: rotate(0deg) scale(1); }", null, null],
    ["50% { transform: rotate(180deg) scale(1.3); }", null, null],
    ["100% { transform: rotate(360deg) scale(1); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes shakeGrow {", null, null],
    ["0%, 100% { transform: translateX(0) scale(1); }", null, null],
    ["25%, 75% { transform: translateX(-10px) scale(1.1); }", null, null],
    ["50% { transform: translateX(10px) scale(1.2); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes spinBounce {", null, null],
    ["0%, 100% { transform: rotate(0deg) translateY(0); }", null, null],
    ["25% { transform: rotate(90deg) translateY(-20px); }", null, null],
    ["50% { transform: rotate(180deg) translateY(0); }", null, null],
    ["75% { transform: rotate(270deg) translateY(-10px); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes rotatePulse {", null, null],
    ["0% { transform: rotate(0deg) scale(1); }", null, null],
    ["25% { transform: rotate(90deg) scale(1.1); }", null, null],
    ["50% { transform: rotate(180deg) scale(1); }", null, null],
    ["75% { transform: rotate(270deg) scale(1.1); }", null, null],
    ["100% { transform: rotate(360deg) scale(1); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes swingScale {", null, null],
    ["0%, 100% { transform: rotate(0deg) scale(1); }", null, null],
    ["25% { transform: rotate(10deg) scale(1.1); }", null, null],
    ["50% { transform: rotate(0deg) scale(1); }", null, null],
    ["75% { transform: rotate(-10deg) scale(1.1); }", null, null],
    ["}", null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    ["6. FILE CSS HOÀN CHỈNH", null, null],
    [null, null, null],
    ["/* ===== ANIMATIONS KEYFRAMES ===== */", null, null],
    [null, null, null],
    ["/* Rotate Animations */", null, null],
    ["@keyframes rotate360 {", null, null],
    ["from { transform: rotate(0deg); }", null, null],
    ["to { transform: rotate(360deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes rotate180 {", null, null],
    ["from { transform: rotate(0deg); }", null, null],
    ["to { transform: rotate(180deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes rotateReverse {", null, null],
    ["from { transform: rotate(360deg); }", null, null],
    ["to { transform: rotate(0deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["/* Scale Animations */", null, null],
    ["@keyframes scaleUp {", null, null],
    ["from { transform: scale(1); }", null, null],
    ["to { transform: scale(1.5); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes scaleDown {", null, null],
    ["from { transform: scale(1); }", null, null],
    ["to { transform: scale(0.5); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes pulse {", null, null],
    ["0%, 100% { transform: scale(1); }", null, null],
    ["50% { transform: scale(1.2); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes bounceScale {", null, null],
    ["0%, 100% { transform: scale(1); }", null, null],
    ["25% { transform: scale(1.3); }", null, null],
    ["50% { transform: scale(0.9); }", null, null],
    ["75% { transform: scale(1.1); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes heartbeat {", null, null],
    ["0%, 100% { transform: scale(1); }", null, null],
    ["10%, 30% { transform: scale(1.1); }", null, null],
    ["20%, 40% { transform: scale(1); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes breathing {", null, null],
    ["0%, 100% { transform: scale(1); }", null, null],
    ["50% { transform: scale(1.05); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["/* Shake Animations */", null, null],
    ["@keyframes shake {", null, null],
    ["0%, 100% { transform: translateX(0); }", null, null],
    ["10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }", null, null],
    ["20%, 40%, 60%, 80% { transform: translateX(10px); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes shakeHard {", null, null],
    ["0%, 100% { transform: translateX(0); }", null, null],
    ["10%, 30%, 50%, 70%, 90% { transform: translateX(-20px); }", null, null],
    ["20%, 40%, 60%, 80% { transform: translateX(20px); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes wiggle {", null, null],
    ["0%, 100% { transform: rotate(0deg); }", null, null],
    ["25% { transform: rotate(-5deg); }", null, null],
    ["75% { transform: rotate(5deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes swing {", null, null],
    ["0%, 100% { transform: rotate(0deg); }", null, null],
    ["20% { transform: rotate(15deg); }", null, null],
    ["40% { transform: rotate(-10deg); }", null, null],
    ["60% { transform: rotate(5deg); }", null, null],
    ["80% { transform: rotate(-5deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes jello {", null, null],
    ["0%, 100% { transform: skewX(0deg) skewY(0deg); }", null, null],
    ["30% { transform: skewX(25deg) skewY(25deg); }", null, null],
    ["40% { transform: skewX(-15deg) skewY(-15deg); }", null, null],
    ["50% { transform: skewX(15deg) skewY(15deg); }", null, null],
    ["65% { transform: skewX(-5deg) skewY(-5deg); }", null, null],
    ["75% { transform: skewX(5deg) skewY(5deg); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["/* Combined Animations */", null, null],
    ["@keyframes rotateScale {", null, null],
    ["0% { transform: rotate(0deg) scale(1); }", null, null],
    ["50% { transform: rotate(180deg) scale(1.3); }", null, null],
    ["100% { transform: rotate(360deg) scale(1); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes shakeGrow {", null, null],
    ["0%, 100% { transform: translateX(0) scale(1); }", null, null],
    ["25%, 75% { transform: translateX(-10px) scale(1.1); }", null, null],
    ["50% { transform: translateX(10px) scale(1.2); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes spinBounce {", null, null],
    ["0%, 100% { transform: rotate(0deg) translateY(0); }", null, null],
    ["25% { transform: rotate(90deg) translateY(-20px); }", null, null],
    ["50% { transform: rotate(180deg) translateY(0); }", null, null],
    ["75% { transform: rotate(270deg) translateY(-10px); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes rotatePulse {", null, null],
    ["0% { transform: rotate(0deg) scale(1); }", null, null],
    ["25% { transform: rotate(90deg) scale(1.1); }", null, null],
    ["50% { transform: rotate(180deg) scale(1); }", null, null],
    ["75% { transform: rotate(270deg) scale(1.1); }", null, null],
    ["100% { transform: rotate(360deg) scale(1); }", null, null],
    ["}", null, null],
    [null, null, null],
    ["@keyframes swingScale {", null, null],
    ["0%, 100% { transform: rotate(0deg) scale(1); }", null, null],
    ["25% { transform: rotate(10deg) scale(1.1); }", null, null],
    ["50% { transform: rotate(0deg) scale(1); }", null, null],
    ["75% { transform: rotate(-10deg) scale(1.1); }", null, null],
    ["}", null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    ["7. VÍ DỤ SỬ DỤNG TRONG CODE", null, null],
    [null, null, null],
    ["// Ví dụ actionCssId trong ActionOrchestrator", null, null],
    ["const actions = [", null, null],
    ["{", null, null],
    ['type: "renderText",', null, null],
    ["start: 0,", null, null],
    ["duration: 2,", null, null],
    ["actionCssId: {", null, null],
    ['maxWidth: "100px",', null, null],
    ['transition: "max-width 2s ease-in-out"', null, null],
    ["}", null, null],
    ["},", null, null],
    ["{", null, null],
    ['type: "renderImage",', null, null],
    ["start: 1,", null, null],
    ["duration: 3,", null, null],
    ["actionCssId: {", null, null],
    ['animation: "rotate360 2s linear infinite"', null, null],
    ["}", null, null],
    ["},", null, null],
    ["{", null, null],
    ['type: "renderText",', null, null],
    ["start: 2,", null, null],
    ["duration: 2,", null, null],
    ["actionCssId: {", null, null],
    ['animation: "pulse 1.5s ease-in-out infinite",', null, null],
    ['width: "200px",', null, null],
    ['transition: "width 1s ease"', null, null],
    ["}", null, null],
    ["}", null, null],
    ["];", null, null],
    [null, null, null],
    [
      "Bảng này cung cấp đầy đủ các CSS animations và transitions để bạn có thể sử dụng trong hệ thống ActionOrchestrator của mình! 🎨✨",
      null,
      null,
    ],
  ],
  [
    ["Hình dạng đặc biệt", null, null, null],
    ["Bảng ClipPath Shapes cho Edit Video", null, null, null],
    [null, null, null, null],
    ["1. HÌNH DẠNG CƠ BẢN (Basic Shapes)", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", "Preview"],
    ["circle-small", '{ "clipPath": "circle(30%)" }', "Hình tròn nhỏ", "●"],
    ["circle-medium", '{ "clipPath": "circle(50%)" }', "Hình tròn vừa", "●"],
    ["circle-large", '{ "clipPath": "circle(70%)" }', "Hình tròn lớn", "●"],
    [
      "ellipse-horizontal",
      '{ "clipPath": "ellipse(70% 40%)" }',
      "Hình ô van ngang",
      "⬭",
    ],
    [
      "ellipse-vertical",
      '{ "clipPath": "ellipse(40% 70%)" }',
      "Hình ô van dọc",
      "⬮",
    ],
    [
      "square",
      '{ "clipPath": "inset(0% 0% 0% 0% round 0%)" }',
      "Hình vuông",
      "▢",
    ],
    [
      "rounded-square",
      '{ "clipPath": "inset(5% 5% 5% 5% round 15%)" }',
      "Vuông bo góc",
      "▢",
    ],
    [
      "rectangle-horizontal",
      '{ "clipPath": "inset(20% 5% 20% 5%)" }',
      "Chữ nhật ngang",
      "▭",
    ],
    [
      "rectangle-vertical",
      '{ "clipPath": "inset(5% 20% 5% 20%)" }',
      "Chữ nhật dọc",
      "▯",
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["2. TAM GIÁC & ĐA GIÁC (Triangles & Polygons)", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", null],
    [
      "triangle-up",
      '{ "clipPath": "polygon(50% 0%, 0% 100%, 100% 100%)" }',
      "Tam giác hướng lên",
      null,
    ],
    [
      "triangle-down",
      '{ "clipPath": "polygon(50% 100%, 0% 0%, 100% 0%)" }',
      "Tam giác hướng xuống",
      null,
    ],
    [
      "triangle-left",
      '{ "clipPath": "polygon(100% 0%, 0% 50%, 100% 100%)" }',
      "Tam giác hướng trái",
      null,
    ],
    [
      "triangle-right",
      '{ "clipPath": "polygon(0% 0%, 100% 50%, 0% 100%)" }',
      "Tam giác hướng phải",
      null,
    ],
    [
      "diamond",
      '{ "clipPath": "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }',
      "Hình th菱 (kim cương)",
      null,
    ],
    [
      "pentagon",
      '{ "clipPath": "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }',
      "Ngũ giác",
      null,
    ],
    [
      "hexagon",
      '{ "clipPath": "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }',
      "Lục giác",
      null,
    ],
    [
      "octagon",
      '{ "clipPath": "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }',
      "Bát giác",
      null,
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["3. NGÔI SAO (Stars)", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", null],
    [
      "star-5-point",
      '{ "clipPath": "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }',
      "Ngôi sao 5 cánh",
      null,
    ],
    [
      "star-6-point",
      '{ "clipPath": "polygon(50% 0%, 65% 35%, 100% 40%, 70% 60%, 75% 100%, 50% 75%, 25% 100%, 30% 60%, 0% 40%, 35% 35%)" }',
      "Ngôi sao 6 cánh",
      null,
    ],
    [
      "star-4-point",
      '{ "clipPath": "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)" }',
      "Ngôi sao 4 cánh",
      null,
    ],
    [
      "star-burst",
      '{ "clipPath": "polygon(50% 0%, 55% 25%, 75% 15%, 65% 35%, 90% 40%, 70% 50%, 85% 70%, 60% 60%, 60% 90%, 50% 65%, 40% 90%, 40% 60%, 15% 70%, 30% 50%, 10% 40%, 35% 35%, 25% 15%, 45% 25%)" }',
      "Ngôi sao tia sáng",
      null,
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["4. TIM & TÌNH YÊU (Hearts & Love)", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", null],
    [
      "heart",
      '{ "clipPath": "path(\'M50,90 C20,70 0,50 0,35 C0,20 10,10 25,10 C35,10 45,15 50,25 C55,15 65,10 75,10 C90,10 100,20 100,35 C100,50 80,70 50,90 Z\')" }',
      "Hình trái tim",
      null,
    ],
    [
      "heart-simple",
      '{ "clipPath": "polygon(50% 20%, 20% 0%, 0% 20%, 0% 40%, 50% 90%, 100% 40%, 100% 20%, 80% 0%)" }',
      "Tim đơn giản (polygon)",
      null,
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["5. MẶT TRĂNG & THIÊN NHIÊN (Moon & Nature)", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", null],
    [
      "crescent-moon",
      '{ "clipPath": "path(\'M50,0 A50,50 0 1,0 50,100 A40,40 0 1,1 50,0 Z\')" }',
      "Lưỡi liềm",
      null,
    ],
    [
      "half-moon-left",
      '{ "clipPath": "circle(50% at 25% 50%)" }',
      "Nửa trăng trái",
      null,
    ],
    [
      "half-moon-right",
      '{ "clipPath": "circle(50% at 75% 50%)" }',
      "Nửa trăng phải",
      null,
    ],
    [
      "leaf-simple",
      '{ "clipPath": "ellipse(40% 50% at 50% 50%) polygon(50% 0%, 80% 100%, 50% 80%, 20% 100%)" }',
      "Cái lá đơn giản",
      null,
    ],
    [
      "leaf-pointed",
      '{ "clipPath": "polygon(50% 0%, 100% 50%, 80% 100%, 50% 90%, 20% 100%, 0% 50%)" }',
      "Lá nhọn",
      null,
    ],
    [
      "cloud",
      '{ "clipPath": "path(\'M25,60 Q10,60 10,45 Q10,35 20,30 Q20,20 35,20 Q45,10 55,15 Q70,10 75,25 Q85,25 90,35 Q95,45 90,55 Q90,65 80,65 Z\')" }',
      "Đám mây",
      null,
    ],
    [
      "drop-water",
      '{ "clipPath": "path(\'M50,10 Q60,30 65,50 Q70,70 50,90 Q30,70 35,50 Q40,30 50,10 Z\')" }',
      "Giọt nước",
      null,
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["6. SPEECH BUBBLES (Hộp thoại)", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", null],
    [
      "bubble-round",
      '{ "clipPath": "path(\'M10,50 Q10,10 50,10 Q90,10 90,50 Q90,80 60,85 L50,100 L45,85 Q10,80 10,50 Z\')" }',
      "Bong bóng tròn",
      null,
    ],
    [
      "bubble-square",
      '{ "clipPath": "polygon(0% 0%, 100% 0%, 100% 75%, 55% 75%, 50% 100%, 45% 75%, 0% 75%)" }',
      "Hộp vuông",
      null,
    ],
    [
      "bubble-thought",
      '{ "clipPath": "circle(40% at 50% 40%), circle(8% at 30% 75%), circle(5% at 20% 85%)" }',
      "Bong bóng suy nghĩ",
      null,
    ],
    [
      "bubble-left",
      '{ "clipPath": "polygon(5% 50%, 15% 40%, 15% 10%, 95% 10%, 95% 90%, 15% 90%, 15% 60%)" }',
      "Nói từ trái",
      null,
    ],
    [
      "bubble-right",
      '{ "clipPath": "polygon(95% 50%, 85% 40%, 85% 10%, 5% 10%, 5% 90%, 85% 90%, 85% 60%)" }',
      "Nói từ phải",
      null,
    ],
    [
      "bubble-comic",
      '{ "clipPath": "polygon(0% 20%, 10% 0%, 30% 5%, 50% 0%, 70% 5%, 90% 0%, 100% 20%, 95% 40%, 100% 60%, 90% 80%, 70% 100%, 50% 95%, 45% 100%, 40% 95%, 30% 100%, 10% 80%, 0% 60%, 5% 40%)" }',
      "Bong bóng comic",
      null,
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["7. MŨI TÊN & CHỈ DẪN (Arrows & Pointers)", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", null],
    [
      "arrow-right",
      '{ "clipPath": "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)" }',
      "Mũi tên phải",
      null,
    ],
    [
      "arrow-left",
      '{ "clipPath": "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)" }',
      "Mũi tên trái",
      null,
    ],
    [
      "arrow-up",
      '{ "clipPath": "polygon(20% 40%, 20% 100%, 80% 100%, 80% 40%, 100% 40%, 50% 0%, 0% 40%)" }',
      "Mũi tên lên",
      null,
    ],
    [
      "arrow-down",
      '{ "clipPath": "polygon(20% 0%, 20% 60%, 0% 60%, 50% 100%, 100% 60%, 80% 60%, 80% 0%)" }',
      "Mũi tên xuống",
      null,
    ],
    [
      "chevron-right",
      '{ "clipPath": "polygon(30% 0%, 70% 50%, 30% 100%, 20% 90%, 50% 50%, 20% 10%)" }',
      "Chevron phải",
      null,
    ],
    [
      "pointer-hand",
      '{ "clipPath": "polygon(20% 0%, 35% 0%, 35% 50%, 50% 50%, 50% 30%, 60% 30%, 60% 50%, 70% 50%, 70% 35%, 80% 35%, 80% 65%, 70% 70%, 60% 70%, 50% 70%, 35% 70%, 35% 100%, 20% 100%)" }',
      "Ngón tay chỉ",
      null,
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["8. HÌNH DẠNG ĐẶC BIỆT (Special Shapes)", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", null],
    [
      "badge-ribbon",
      '{ "clipPath": "polygon(0% 0%, 100% 0%, 100% 80%, 70% 80%, 50% 100%, 30% 80%, 0% 80%)" }',
      "Huy hiệu ruy băng",
      null,
    ],
    [
      "bookmark",
      '{ "clipPath": "polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)" }',
      "Bookmark (dấu sách)",
      null,
    ],
    [
      "tag",
      '{ "clipPath": "polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%, 10% 50%)" }',
      "Nhãn tag",
      null,
    ],
    [
      "shield",
      '{ "clipPath": "polygon(50% 0%, 100% 20%, 100% 60%, 50% 100%, 0% 60%, 0% 20%)" }',
      "Lá chắn",
      null,
    ],
    [
      "cross-plus",
      '{ "clipPath": "polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)" }',
      "Dấu cộng",
      null,
    ],
    [
      "message-square",
      '{ "clipPath": "polygon(0% 0%, 100% 0%, 100% 70%, 10% 70%, 10% 85%, 0% 70%)" }',
      "Tin nhắn vuông",
      null,
    ],
    [
      "photo-frame",
      '{ "clipPath": "inset(10% 10% 10% 10% round 8%)" }',
      "Khung ảnh",
      null,
    ],
    [
      "stamp-post",
      '{ "clipPath": "polygon(0% 5%, 5% 0%, 10% 5%, 15% 0%, 20% 5%, 25% 0%, 30% 5%, 35% 0%, 40% 5%, 45% 0%, 50% 5%, 55% 0%, 60% 5%, 65% 0%, 70% 5%, 75% 0%, 80% 5%, 85% 0%, 90% 5%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 90% 95%, 85% 100%, 80% 95%, 75% 100%, 70% 95%, 65% 100%, 60% 95%, 55% 100%, 50% 95%, 45% 100%, 40% 95%, 35% 100%, 30% 95%, 25% 100%, 20% 95%, 15% 100%, 10% 95%, 5% 100%, 0% 95%)" }',
      "Tem bưu điện",
      null,
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["9. HÌNH DẠNG SOCIAL MEDIA", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", null],
    [
      "tiktok-vertical",
      '{ "clipPath": "inset(0% 12% 0% 12% round 8%)" }',
      "Tỷ lệ TikTok 9:16",
      null,
    ],
    [
      "instagram-square",
      '{ "clipPath": "inset(0% 0% 0% 0% round 12%)" }',
      "Instagram post",
      null,
    ],
    [
      "youtube-wide",
      '{ "clipPath": "inset(15% 0% 15% 0%)" }',
      "YouTube 16:9",
      null,
    ],
    [
      "story-vertical",
      '{ "clipPath": "inset(0% 18% 0% 18% round 15%)" }',
      "Story format",
      null,
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["10. HÌNH ĐỘNG VẬT & BIỂU TƯỢNG", null, null, null],
    [null, null, null, null],
    ["Tên Shape", "JSON Config", "Mô tả", null],
    [
      "fish",
      '{ "clipPath": "polygon(0% 50%, 20% 30%, 50% 20%, 70% 30%, 80% 50%, 70% 70%, 50% 80%, 20% 70%, 0% 50%, 90% 40%, 100% 50%, 90% 60%)" }',
      "Con cá",
      null,
    ],
    [
      "butterfly",
      '{ "clipPath": "polygon(50% 50%, 30% 20%, 10% 10%, 0% 30%, 10% 50%, 0% 70%, 10% 90%, 30% 80%, 50% 50%, 70% 80%, 90% 90%, 100% 70%, 90% 50%, 100% 30%, 90% 10%, 70% 20%)" }',
      "Bướm",
      null,
    ],
    [
      "house",
      '{ "clipPath": "polygon(50% 0%, 100% 40%, 100% 100%, 60% 100%, 60% 60%, 40% 60%, 40% 100%, 0% 100%, 0% 40%)" }',
      "Ngôi nhà",
      null,
    ],
    [
      "bell",
      '{ "clipPath": "polygon(50% 0%, 40% 10%, 30% 30%, 25% 60%, 25% 80%, 30% 90%, 45% 90%, 45% 95%, 55% 95%, 55% 90%, 70% 90%, 75% 80%, 75% 60%, 70% 30%, 60% 10%)" }',
      "Chuông",
      null,
    ],
    [null, null, null, null],
    [null, null, null, null],
    ["11. VÍ DỤ SỬ DỤNG TRONG CODE", null, null, null],
    [null, null, null, null],
    ["// Ví dụ 1: Text với clipPath hình tim", null, null, null],
    ["{", null, null, null],
    ['type: "renderText",', null, null, null],
    ["start: 0,", null, null, null],
    ["duration: 3,", null, null, null],
    ["actionCssId: {", null, null, null],
    [
      'clipPath: "polygon(50% 20%, 20% 0%, 0% 20%, 0% 40%, 50% 90%, 100% 40%, 100% 20%, 80% 0%)",',
      null,
      null,
      null,
    ],
    ['width: "300px",', null, null, null],
    ['height: "300px",', null, null, null],
    [
      'background: "linear-gradient(45deg, #ff6b6b, #ff8e8e)"',
      null,
      null,
      null,
    ],
    ["}", null, null, null],
    ["}", null, null, null],
    [null, null, null, null],
    ["// Ví dụ 2: Image với clipPath speech bubble", null, null, null],
    ["{", null, null, null],
    ['type: "renderImage",', null, null, null],
    ["start: 1,", null, null, null],
    ["duration: 2,", null, null, null],
    ["actionCssId: {", null, null, null],
    [
      'clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 55% 75%, 50% 100%, 45% 75%, 0% 75%)"',
      null,
      null,
      null,
    ],
    ["}", null, null, null],
    ["}", null, null, null],
    [null, null, null, null],
    ["// Ví dụ 3: Text với clipPath ngôi sao + animation", null, null, null],
    ["{", null, null, null],
    ['type: "renderText",', null, null, null],
    ["start: 2,", null, null, null],
    ["duration: 3,", null, null, null],
    ["actionCssId: {", null, null, null],
    [
      'clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",',
      null,
      null,
      null,
    ],
    ['animation: "rotate360 3s linear infinite"', null, null, null],
    ["}", null, null, null],
    ["}", null, null, null],
    [null, null, null, null],
    ["// Ví dụ 4: Kết hợp clipPath + transition", null, null, null],
    ["{", null, null, null],
    ['type: "renderText",', null, null, null],
    ["start: 0,", null, null, null],
    ["duration: 4,", null, null, null],
    ["actionCssId: {", null, null, null],
    ['clipPath: "circle(30%)",', null, null, null],
    ['transition: "clip-path 2s ease-in-out"', null, null, null],
    ["},", null, null, null],
    ["// Sau 2 giây chuyển thành:", null, null, null],
    ["actionCssIdUpdate: {", null, null, null],
    ['clipPath: "circle(70%)"', null, null, null],
    ["}", null, null, null],
    ["}", null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    ["12. KEYFRAME ANIMATIONS CHO CLIP-PATH", null, null, null],
    [null, null, null, null],
    ["/* Morphing từ circle sang square */", null, null, null],
    ["@keyframes morphCircleToSquare {", null, null, null],
    ["0% { clip-path: circle(50%); }", null, null, null],
    ["100% { clip-path: inset(0% 0% 0% 0%); }", null, null, null],
    ["}", null, null, null],
    [null, null, null, null],
    ["/* Morphing từ heart sang star */", null, null, null],
    ["@keyframes morphHeartToStar {", null, null, null],
    [
      "0% { clip-path: polygon(50% 20%, 20% 0%, 0% 20%, 0% 40%, 50% 90%, 100% 40%, 100% 20%, 80% 0%); }",
      null,
      null,
      null,
    ],
    [
      "100% { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }",
      null,
      null,
      null,
    ],
    ["}", null, null, null],
    [null, null, null, null],
    ["/* Pulse với clip-path */", null, null, null],
    ["@keyframes clipPathPulse {", null, null, null],
    ["0%, 100% { clip-path: circle(40%); }", null, null, null],
    ["50% { clip-path: circle(60%); }", null, null, null],
    ["}", null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    ["13. TIPS & TRICKS", null, null, null],
    [null, null, null, null],
    ["Tối ưu hiệu năng:", null, null, null],
    [null, null, null, null],
    ["Sử dụng polygon thay vì path khi có thể (nhanh hơn)", null, null, null],
    ["Giới hạn số điểm polygon (< 20 điểm) để render mượt", null, null, null],
    ["Cache clip-path cho các hình dùng nhiều lần", null, null, null],
    [null, null, null, null],
    ["Responsive clipPath:", null, null, null],
    [null, null, null, null],
    ["// Sử dụng % thay vì px để responsive", null, null, null],
    ["{", null, null, null],
    ['clipPath: "circle(40% at 50% 50%)" // ✅ Good', null, null, null],
    [
      '// clipPath: "circle(200px at 500px 300px)" // ❌ Không responsive',
      null,
      null,
      null,
    ],
    ["}", null, null, null],
    [null, null, null, null],
    ["Kết hợp với filters:", null, null, null],
    [null, null, null, null],
    ["{", null, null, null],
    [
      'clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",',
      null,
      null,
      null,
    ],
    [
      'filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))",',
      null,
      null,
      null,
    ],
    ['animation: "rotate360 5s linear infinite"', null, null, null],
    ["}", null, null, null],
    [null, null, null, null],
    [
      "Bảng này cung cấp hơn 70+ shapes khác nhau để bạn sử dụng trong video editing! 🎬✨",
      null,
      null,
      null,
    ],
  ],
  [
    ["SFX", null, null],
    ["Name", "Description", null],
    ["SFX_game", "tiếng qua màn", null],
    ["SFX_drum", "tiếng trống", null],
    ["SFX_springy", "tiếng lò xo nảy", null],
    ["SFX_breakingglass", "gương vỡ", null],
    ["SFX_huh", "(hở) thắc mắc kiểu cái gì??? Meme", null],
    ["SFX_music", "1 đoạn đàn guitar điện", null],
    ["SFX_pow1", "Tiếng nổ", null],
    ["SFX_punch", "âm thanh đấm", null],
    ["SFX_suprise", "tiếng con người khi bất ngờ", null],
    ["SFX_suprise2", "âm thanh đấm", null],
    ["SFX_thud", "rầm (như chấn động) tạo hiệu ứng bất ngờ", null],
    ["SFX_ui", 'Tiếng "ui" ngắn, cao', null],
    ["SFX_hm2", 'tiếng "hừm" cao dần của 1 người 40 tuổi', null],
    ["SFX_hm3", "tiếng hừm thấp dần (loại 2 của hm2)", null],
    ["SFX_hmm", "tiếng thở dài (40 tuổi)", null],
    ["SFX_m1", "tiếng chụp hình của máy ảnh cũ", null],
    ["SFX_mmhm", "tiếng ừm hứm đồng tình", null],
    ["SFX_mo1", "giống tiếng khi mở máy tính win", null],
    ["SFX_pong", "tiếng đập chảo ngắn", null],
    ["SFX_sword1", "tiếng lướt kiếm qua 1 cục đá mài", null],
    ["SFX_flippage", "tiếng lật sách", null],
    ["SFX_giothoi", "gió thổi từ trái sang (dứt khoát)", null],
    ["SFX_giothoi2", "gió lướt nhanh", "X"],
    ["SFX_s1", "giống tiếng 1 nhân vật trong game khi lướt qua", null],
    ["SFX_s2", "tiếng gió lướt, trầm", null],
    ["SFX_s3", "1 cành cây vụt qua (trầm dài âm)", null],
    ["SFX_swoosh", "1 cành cây vụt qua (cao nhanh âm)", null],
    ["SFX_swoosh1", "1 cành cây vụt qua (âm thanh trung bình)", null],
    ["SFX_zip", "tiếng kéo khóa", null],
    ["SFX_bublepop", "tiếng mở nắp chai", null],
    ["SFX_click", "tiếng click chuột", null],
    ["SFX_false", "tiếng khi tải xuống thất bại", null],
    ["SFX_coin", "tiếng ăn đồng xu", null],
    ["SFX_jump", "tiếng tút cao", null],
    ["SFX_money", "tiếng tủ đựng tiền mở", null],
    ["SFX_pan", "tiếng gõ chuông (vang)", null],
    ["SFX_error", "tiếng ứng dụng chạy sai", null],
    ["SFX_pop", "tiếng mở nắp chai (cao)", null],
    ["SFX_screenshot", "chụp hình bằng máy ảnh", null],
    ["SFX_success", "tiếng ting", null],
  ],
  [
    ["create a new repository on the command line"],
    ['echo "# excel-to-data" >> README.md'],
    ["git init"],
    ["git add README.md"],
    ['git commit -m "first commit"'],
    ["git branch -M main"],
    [
      "git remote add origin https://github.com/pvkadien0209-debug/excel-to-data.git",
    ],
    ["git push -u origin main"],
    ["push an existing repository from the command line"],
    [
      "git remote add origin https://github.com/pvkadien0209-debug/excel-to-data.git",
    ],
    ["git branch -M main"],
    ["git push -u origin main"],
    ["GIT"],
    ["Bạn chỉ cần xóa remote git cũ và add remote git mới rồi push lại."],
    ["Giả sử project hiện tại đã có git:"],
    ["Bước 1 — Kiểm tra remote hiện tại"],
    ["git remote -v"],
    ["Bước 2 — Xóa remote cũ (thường tên origin)"],
    ["git remote remove origin"],
    ["Bước 3 — Add remote mới"],
    [
      "git remote add origin https://github.com/pvkadien0209-debug/excel-to-data.git",
    ],
    ["Bước 4 — Push lên repo mới"],
    ["(nếu branch là main)"],
    ["git push -u origin main"],
    ["Nếu branch là master:"],
    ["git push -u origin master"],
    ["git push -f origin main"],
    ["git push --force origin main"],
    ["Lệnh nhanh (copy chạy 1 lần)"],
    ["git remote remove origin"],
    [
      "git remote add origin https://github.com/pvkadien0209-debug/excel-to-data.git",
    ],
    ["git push -u origin main"],
    ["Nếu báo lỗi src refspec main does not match"],
    ["thì chạy:"],
    ["git branch"],
    ["xem branch đang là gì rồi push theo tên đó."],
  ],
  [
    ["Lỗi VERCEL", null],
    [
      'Error: Command "npm run build" exited with 1',
      'build: "CI=false next build"',
    ],
  ],
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS — derive sheet names from first cell of each sheet
   ═══════════════════════════════════════════════════════════════ */
const getSheetName = (sheetData, idx) => {
  if (sheetData && sheetData[0] && sheetData[0][0] != null) {
    const name = String(sheetData[0][0]);
    return name.length > 28 ? name.slice(0, 28) + "…" : name;
  }
  return `Sheet ${idx + 1}`;
};

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & HELPERS
   ═══════════════════════════════════════════════════════════════ */
const TRUNCATE_LEN = 60;
const isImageUrl = (text) =>
  typeof text === "string" && text.includes("postimg");
const cellToStr = (v) => (v == null ? "" : String(v));
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  }
};
/* ═══════════════════════════════════════════════════════════════
   TOAST
   ═══════════════════════════════════════════════════════════════ */
function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="dv-toast">{msg}</div>;
}
/* ═══════════════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════════════ */
function Modal({ content, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return (
    <div className="dv-modal-overlay" onClick={onClose}>
      <div className="dv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dv-modal-header">
          <span className="dv-modal-title">Chi tiết nội dung</span>
          <button className="dv-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="dv-modal-body">
          {isImageUrl(content) ? (
            <img
              src={content}
              alt=""
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          ) : (
            <pre className="dv-modal-pre">{content}</pre>
          )}
        </div>
        <div className="dv-modal-footer">
          <button
            className="dv-btn dv-btn-accent"
            onClick={() => copyToClipboard(cellToStr(content))}
          >
            📋 Copy nội dung
          </button>
        </div>
      </div>
    </div>
  );
}
/* ═══════════════════════════════════════════════════════════════
   CELL
   ═══════════════════════════════════════════════════════════════ */
function Cell({
  value,
  onShowModal,
  onCopied,
  rowIdx,
  colIdx,
  highlightId,
  sheetIdx,
}) {
  const text = cellToStr(value);
  const isImg = isImageUrl(text);
  const needTruncate = !isImg && text.length > TRUNCATE_LEN;
  const id = `${sheetIdx}-${rowIdx}-${colIdx}`;
  const isHighlighted = highlightId === id;
  return (
    <td
      className={`dv-cell ${isHighlighted ? "dv-cell-hl" : ""}`}
      id={`cell-${id}`}
    >
      <div className="dv-cell-inner">
        {isImg ? (
          <img
            src={text}
            alt=""
            className="dv-cell-img"
            onClick={() => onShowModal(text)}
          />
        ) : needTruncate ? (
          <span className="dv-cell-text">
            {text.slice(0, TRUNCATE_LEN)}…
            <button className="dv-link-btn" onClick={() => onShowModal(text)}>
              xem thêm
            </button>
          </span>
        ) : (
          <span className="dv-cell-text">
            {text || <span className="dv-null">—</span>}
          </span>
        )}
        {text && (
          <button
            className="dv-copy-micro"
            title="Copy ô"
            onClick={async () => {
              await copyToClipboard(text);
              onCopied("Đã copy ô!");
            }}
          >
            ⧉
          </button>
        )}
      </div>
    </td>
  );
}
/* ═══════════════════════════════════════════════════════════════
   SHEET TABLE
   ═══════════════════════════════════════════════════════════════ */
function SheetTable({ data, sheetIdx, onCopied, highlightId }) {
  const [modalContent, setModalContent] = useState(null);
  if (!data || data.length === 0)
    return <p className="dv-empty">Sheet trống</p>;
  const maxCols = Math.max(...data.map((r) => r.length));
  const copyRow = async (rowIdx) => {
    const text = data[rowIdx].map(cellToStr).join("\t");
    await copyToClipboard(text);
    onCopied(`Đã copy dòng ${rowIdx + 1}!`);
  };
  const copyCol = async (colIdx) => {
    const text = data.map((r) => cellToStr(r[colIdx] ?? "")).join("\n");
    await copyToClipboard(text);
    onCopied(`Đã copy cột ${colIdx + 1}!`);
  };
  return (
    <>
      {modalContent !== null && (
        <Modal content={modalContent} onClose={() => setModalContent(null)} />
      )}
      <div className="dv-table-wrap">
        <table className="dv-table">
          <thead>
            <tr>
              <th className="dv-th dv-th-idx">#</th>
              {Array.from({ length: maxCols }, (_, ci) => (
                <th key={ci} className="dv-th">
                  <span className="dv-th-label">Col {ci + 1}</span>
                  <button
                    className="dv-copy-col"
                    title="Copy cột"
                    onClick={() => copyCol(ci)}
                  >
                    ⇅
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, ri) => (
              <tr key={ri} className="dv-row">
                <td className="dv-cell dv-cell-idx">
                  <span>{ri + 1}</span>
                  <button
                    className="dv-copy-row"
                    title="Copy dòng"
                    onClick={() => copyRow(ri)}
                  >
                    ⇉
                  </button>
                </td>
                {Array.from({ length: maxCols }, (_, ci) => (
                  <Cell
                    key={ci}
                    value={row[ci] ?? null}
                    rowIdx={ri}
                    colIdx={ci}
                    sheetIdx={sheetIdx}
                    highlightId={highlightId}
                    onShowModal={setModalContent}
                    onCopied={onCopied}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
/* ═══════════════════════════════════════════════════════════════
   SEARCH — expanded, prominent, full-width
   ═══════════════════════════════════════════════════════════════ */
function SearchBar({ data, onNavigate }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const hits = [];
    data.forEach((sheet, si) => {
      sheet.forEach((row, ri) => {
        row.forEach((cell, ci) => {
          const text = cellToStr(cell);
          if (text.toLowerCase().includes(q)) {
            hits.push({
              sheetIdx: si,
              rowIdx: ri,
              colIdx: ci,
              text,
              sheetName: getSheetName(data[si], si),
            });
          }
        });
      });
    });
    return hits.slice(0, 40);
  }, [query, data]);
  const showDropdown = focused && query.trim() && results.length > 0;
  const noResults = focused && query.trim() && results.length === 0;
  return (
    <div className="dv-search-wrap" ref={wrapRef}>
      <div className={`dv-search-box ${focused ? "dv-search-box-focus" : ""}`}>
        <svg
          className="dv-search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          className="dv-search-input"
          type="text"
          placeholder="Tìm kiếm nội dung trong tất cả sheets…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
        />
        <kbd className="dv-search-kbd">⌘K</kbd>
        {query && (
          <button
            className="dv-search-clear"
            onClick={() => {
              setQuery("");
              inputRef.current.focus();
            }}
          >
            ✕
          </button>
        )}
      </div>
      {showDropdown && (
        <div className="dv-dropdown">
          <div className="dv-dropdown-header">
            <span>{results.length} kết quả</span>
            <span className="dv-dropdown-hint">Click để nhảy tới ô</span>
          </div>
          {results.map((r, i) => {
            const q = query.toLowerCase();
            const idx = r.text.toLowerCase().indexOf(q);
            const before = r.text.slice(Math.max(0, idx - 25), idx);
            const match = r.text.slice(idx, idx + query.length);
            const after = r.text.slice(
              idx + query.length,
              idx + query.length + 50,
            );
            return (
              <button
                key={i}
                className="dv-dropdown-item"
                onClick={() => {
                  onNavigate(
                    r.sheetIdx,
                    `${r.sheetIdx}-${r.rowIdx}-${r.colIdx}`,
                  );
                  setFocused(false);
                }}
              >
                <span className="dv-dropdown-badge">
                  {r.sheetName} · R{r.rowIdx + 1}:C{r.colIdx + 1}
                </span>
                <span className="dv-dropdown-preview">
                  {before.length > 0 && "…"}
                  {before}
                  <mark>{match}</mark>
                  {after}
                  {after.length >= 50 && "…"}
                </span>
              </button>
            );
          })}
        </div>
      )}
      {noResults && (
        <div className="dv-dropdown">
          <div className="dv-dropdown-empty">
            Không tìm thấy kết quả cho "<strong>{query}</strong>"
          </div>
        </div>
      )}
    </div>
  );
}
/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function DataViewer() {
  const [activeSheet, setActiveSheet] = useState(0);
  const [toast, setToast] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const showToast = useCallback((msg) => setToast(msg), []);
  const handleNavigate = useCallback((sheetIdx, cellId) => {
    setActiveSheet(sheetIdx);
    setHighlightId(cellId);
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById(`cell-${cellId}`);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
          setTimeout(() => setHighlightId(null), 2200);
        }
      }, 80);
    });
  }, []);
  return (
    <>
      <style>{CSS_TEXT}</style>
      <div className="dv-root">
        {/* HEADER */}
        <header className="dv-header">
          <div className="dv-header-top">
            <div className="dv-header-left">
              <h1 className="dv-title">
                <span className="dv-title-icon">◈</span> Data Action &amp; CSS
              </h1>
              <span className="dv-subtitle">Reference Table Viewer</span>
            </div>
          </div>
          {/* SEARCH — full width, expanded */}
          <SearchBar data={RAW_DATA} onNavigate={handleNavigate} />
        </header>
        {/* SHEET TABS */}
        <nav className="dv-tabs">
          {RAW_DATA.map((sheet, i) => (
            <button
              key={i}
              className={`dv-tab ${activeSheet === i ? "dv-tab-active" : ""}`}
              onClick={() => setActiveSheet(i)}
            >
              <span className="dv-tab-dot" />
              {getSheetName(sheet, i)}
              <span className="dv-tab-count">{RAW_DATA[i].length} rows</span>
            </button>
          ))}
        </nav>
        {/* TABLE */}
        <SheetTable
          data={RAW_DATA[activeSheet]}
          sheetIdx={activeSheet}
          onCopied={showToast}
          highlightId={highlightId}
        />
        {/* TOAST */}
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      </div>
    </>
  );
}
/* ═══════════════════════════════════════════════════════════════
   CSS — LIGHT BRIGHT THEME
   ═══════════════════════════════════════════════════════════════ */
const CSS_TEXT = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.dv-root {
  --bg:        #f7f8fb;
  --surface:   #ffffff;
  --surface2:  #f0f2f7;
  --border:    #e2e5ee;
  --border-h:  #d0d4e0;
  --text:      #1e2330;
  --text2:     #5a6178;
  --text3:     #939bb4;
  --accent:    #4f6ef7;
  --accent2:   #3b5ae0;
  --accent-bg: rgba(79,110,247,0.06);
  --accent-soft: rgba(79,110,247,0.1);
  --warn:      #e8a317;
  --red:       #e5484d;
  --green:     #30a46c;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);
  --radius:    12px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  padding: 1.5rem 2rem 4rem;
}

/* ── header ── */
.dv-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
.dv-header-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.dv-header-left { display: flex; flex-direction: column; gap: 0.1rem; }
.dv-title {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.dv-title-icon { color: var(--accent); font-size: 1.1rem; }
.dv-subtitle {
  font-size: 0.7rem;
  color: var(--text3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
}

/* ── search — expanded, full width, prominent ── */
.dv-search-wrap {
  position: relative;
  width: 100%;
}
.dv-search-box {
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 0 1rem;
  transition: all .2s ease;
  box-shadow: var(--shadow-sm);
}
.dv-search-box-focus,
.dv-search-box:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft), var(--shadow-md);
}
.dv-search-icon { color: var(--text3); margin-right: 0.6rem; flex-shrink: 0; }
.dv-search-box-focus .dv-search-icon,
.dv-search-box:focus-within .dv-search-icon { color: var(--accent); }
.dv-search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
  padding: 0.85rem 0;
  font-weight: 500;
}
.dv-search-input::placeholder { color: var(--text3); font-weight: 400; }
.dv-search-kbd {
  display: inline-flex;
  align-items: center;
  font-family: inherit;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text3);
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.2rem 0.45rem;
  margin-right: 0.4rem;
  flex-shrink: 0;
}
.dv-search-clear {
  background: none;
  border: none;
  color: var(--text3);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.3rem;
  border-radius: 6px;
  transition: all .15s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dv-search-clear:hover { color: var(--red); background: rgba(229,72,77,0.08); }

/* dropdown */
.dv-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  max-height: 440px;
  overflow-y: auto;
  z-index: 200;
  box-shadow: var(--shadow-lg);
  animation: dv-slideDown .18s ease;
}
@keyframes dv-slideDown {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.dv-dropdown-header {
  position: sticky;
  top: 0;
  background: var(--surface);
  padding: 0.6rem 1rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dv-dropdown-hint {
  text-transform: none;
  font-weight: 400;
  font-size: 0.68rem;
  letter-spacing: 0;
}
.dv-dropdown-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid var(--border);
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: background .12s;
  font-family: inherit;
  color: var(--text);
}
.dv-dropdown-item:last-child { border-bottom: none; }
.dv-dropdown-item:hover { background: var(--accent-bg); }
.dv-dropdown-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--accent2);
  letter-spacing: 0.02em;
}
.dv-dropdown-preview {
  font-size: 0.8rem;
  color: var(--text2);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dv-dropdown-preview mark {
  background: rgba(79,110,247,0.15);
  color: var(--accent2);
  border-radius: 3px;
  padding: 0 3px;
  font-weight: 600;
}
.dv-dropdown-empty {
  padding: 1.5rem 1rem;
  text-align: center;
  color: var(--text3);
  font-size: 0.85rem;
}
.dv-dropdown-empty strong { color: var(--text2); }

/* ── tabs ── */
.dv-tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 2px;
}
.dv-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text2);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all .18s;
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
}
.dv-tab:hover {
  border-color: var(--border-h);
  color: var(--text);
  box-shadow: var(--shadow-md);
}
.dv-tab-active {
  background: var(--accent-bg);
  border-color: rgba(79,110,247,0.3);
  color: var(--accent2);
  box-shadow: 0 0 0 1px rgba(79,110,247,0.1), var(--shadow-sm);
}
.dv-tab-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text3);
  transition: all .18s;
  flex-shrink: 0;
}
.dv-tab-active .dv-tab-dot {
  background: var(--accent);
  box-shadow: 0 0 8px rgba(79,110,247,0.4);
}
.dv-tab-count {
  font-size: 0.62rem;
  color: var(--text3);
  background: var(--surface2);
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  font-weight: 500;
}

/* ── table ── */
.dv-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.dv-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}
.dv-th {
  position: sticky;
  top: 0;
  background: var(--surface2);
  padding: 0.65rem 0.85rem;
  text-align: left;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text3);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
.dv-th-idx { width: 52px; text-align: center; }
.dv-th-label { margin-right: 0.35rem; }
.dv-copy-col {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid transparent;
  color: var(--text3);
  font-size: 0.78rem;
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  transition: all .15s;
  vertical-align: middle;
}
.dv-copy-col:hover {
  background: var(--accent-bg);
  border-color: rgba(79,110,247,0.2);
  color: var(--accent);
}

/* ── rows & cells ── */
.dv-row { transition: background .12s; }
.dv-row:hover { background: rgba(79,110,247,0.02); }
.dv-row:not(:last-child) .dv-cell { border-bottom: 1px solid var(--border); }
.dv-cell {
  padding: 0.6rem 0.85rem;
  vertical-align: top;
  max-width: 420px;
  position: relative;
}
.dv-cell-idx {
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--text3);
  font-weight: 600;
  width: 52px;
  white-space: nowrap;
}
.dv-cell-inner {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
}
.dv-cell-text {
  flex: 1;
  line-height: 1.6;
  word-break: break-word;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.76rem;
  color: var(--text);
}
.dv-null { color: var(--text3); }
.dv-cell-img {
  width: 300px;
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;
}
.dv-cell-img:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-md);
}

/* link btn */
.dv-link-btn {
  display: inline;
  background: none;
  border: none;
  color: var(--accent);
  font-family: inherit;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0 0.15rem;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
  transition: color .12s;
}
.dv-link-btn:hover { color: var(--accent2); }

/* micro copy btn per cell */
.dv-copy-micro {
  flex-shrink: 0;
  background: none;
  border: 1px solid transparent;
  color: var(--text3);
  width: 26px;
  height: 26px;
  font-size: 0.82rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all .15s;
}
.dv-cell:hover .dv-copy-micro { opacity: 1; }
.dv-copy-micro:hover {
  background: var(--accent-bg);
  border-color: rgba(79,110,247,0.2);
  color: var(--accent);
}

/* row copy btn */
.dv-copy-row {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid transparent;
  color: var(--text3);
  font-size: 0.72rem;
  cursor: pointer;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  opacity: 0;
  transition: all .15s;
  margin-left: 0.2rem;
}
.dv-row:hover .dv-copy-row { opacity: 1; }
.dv-copy-row:hover {
  background: var(--accent-bg);
  border-color: rgba(79,110,247,0.2);
  color: var(--accent);
}

/* highlight */
.dv-cell-hl {
  animation: dv-hlPulse 2s ease;
}
@keyframes dv-hlPulse {
  0%, 100% { background: transparent; }
  15%, 60% { background: rgba(79,110,247,0.1); }
}

/* ── modal ── */
.dv-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: dv-fadeIn .15s ease;
  padding: 1.5rem;
}
@keyframes dv-fadeIn { from { opacity: 0; } to { opacity: 1; } }
.dv-modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  width: 100%;
  max-width: 660px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  animation: dv-scaleIn .2s ease;
}
@keyframes dv-scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
.dv-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
}
.dv-modal-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
}
.dv-modal-close {
  background: none;
  border: 1px solid var(--border);
  color: var(--text2);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .12s;
}
.dv-modal-close:hover {
  background: rgba(229,72,77,0.06);
  border-color: rgba(229,72,77,0.2);
  color: var(--red);
}
.dv-modal-body {
  padding: 1.25rem;
  overflow-y: auto;
  flex: 1;
}
.dv-modal-pre {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.7;
  color: var(--text);
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--surface2);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid var(--border);
}
.dv-modal-footer {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
}

/* ── buttons ── */
.dv-btn {
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.55rem 1.1rem;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all .15s;
}
.dv-btn-accent {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 2px 8px rgba(79,110,247,0.3);
}
.dv-btn-accent:hover {
  background: var(--accent2);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(79,110,247,0.35);
}

/* ── toast ── */
.dv-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: #fff;
  font-weight: 700;
  font-size: 0.82rem;
  padding: 0.65rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(79,110,247,0.35);
  z-index: 2000;
  animation: dv-toastIn .25s ease, dv-toastOut .3s ease 1.3s forwards;
}
@keyframes dv-toastIn {
  from { opacity: 0; transform: translateX(-50%) translateY(12px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes dv-toastOut {
  to { opacity: 0; transform: translateX(-50%) translateY(8px); }
}

.dv-empty {
  padding: 3rem;
  text-align: center;
  color: var(--text3);
  font-size: 0.88rem;
}

/* scrollbar — light style */
.dv-table-wrap::-webkit-scrollbar,
.dv-dropdown::-webkit-scrollbar,
.dv-modal-body::-webkit-scrollbar { width: 7px; height: 7px; }
.dv-table-wrap::-webkit-scrollbar-track,
.dv-dropdown::-webkit-scrollbar-track,
.dv-modal-body::-webkit-scrollbar-track { background: transparent; }
.dv-table-wrap::-webkit-scrollbar-thumb,
.dv-dropdown::-webkit-scrollbar-thumb,
.dv-modal-body::-webkit-scrollbar-thumb {
  background: var(--border-h);
  border-radius: 4px;
}
.dv-table-wrap::-webkit-scrollbar-thumb:hover,
.dv-dropdown::-webkit-scrollbar-thumb:hover,
.dv-modal-body::-webkit-scrollbar-thumb:hover {
  background: var(--text3);
}

/* responsive */
@media (max-width: 640px) {
  .dv-root { padding: 1rem; }
  .dv-search-input { font-size: 0.88rem; }
  .dv-search-kbd { display: none; }
}
`;
