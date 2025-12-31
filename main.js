const fileInput = document.getElementById("fileInput");
const convertBtn = document.getElementById("convertBtn");
const download = document.getElementById("download");

convertBtn.onclick = () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("画像を選択してください");
    return;
  }

  // 選択されているモードを取得
  const mode = document.querySelector('input[name="mode"]:checked').value;

  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();

    img.onload = () => {
      // ★ 同じ画像を2フレーム使う（自動・見た目は静止）
      let options = {
        images: [reader.result, reader.result],

        // 縦横比を完全維持
        gifWidth: img.width,
        gifHeight: img.height,

        // 1秒ごとにループ
        interval: 1,
        loop: true
      };

      if (mode === "quality") {
        // 画質優先
        options.dither = true;
        options.sampleInterval = 1;
        options.quality = 10;
      } else {
        // 軽量優先
        options.dither = false;
        options.sampleInterval = 10;
        options.quality = 30;
      }

      gifshot.createGIF(options, function (obj) {
        if (obj.error) {
          alert("GIFの生成に失敗しました");
          return;
        }

        download.href = obj.image;
        download.download = "converted.gif";
        download.style.display = "inline";
        download.textContent = "GIFをダウンロード";
      });
    };

    img.src = reader.result;
  };

  reader.readAsDataURL(file);
};

