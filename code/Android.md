```bash
# 安裝 OpenJDK (推薦使用最新的 LTS 版本，例如 Java 17)
sudo apt install openjdk-17-jre
# 驗證 Java 是否安裝成功：
java -version
#
cd ~/development/apktool
# 下在最新的apktool.jar https://ibotpeaches.github.io/Apktool/
# 建立沒有後綴的apktool文件
nano apktool
# apktool文件的內容
#!/bin/sh
java -jar ~/development/apktool/apktool.jar "$@"
# 賦予腳本執行權限：
chmod +x apktool
# 將腳本添加到您的 PATH 中 (使其能在任何地方運行)：
sudo mv apktool /usr/local/bin/
# 推薦安裝 OpenJDK 17 的完整 JDK 版本
sudo apt install openjdk-17-jdk
# 檢查 jarsigner 是否已正確安裝
which jarsigner
# 生成密鑰 (如果沒有)：
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# 解包/反編譯 (Decompiling)
apktool d [app.apk] -o [輸出文件夾名稱] # apktool d myApp.apk -o myApp_decompiled

# 修改後打包 使用 b (build) 參數
apktool b [解包的apk文件夾] -o new_app.apk
# 優化 (Zipalign) - 必須在簽名前執行！
/home/monk/Android/Sdk/build-tools/36.0.0/zipalign -v 4 new_app.apk new_app_aligned.apk
# 簽名 (Apksigner) - 官方推薦 V2/V3 方案
/home/monk/Android/Sdk/build-tools/36.0.0/apksigner sign \
--ks my-release-key.keystore \
--ks-key-alias my-key-alias \
--out new_app_final_signed.apk \
new_app_aligned.apk
# Keystore password for signer #1: 輸入簽名密碼
# 驗證簽名 (Verify)
/home/monk/Android/Sdk/build-tools/36.0.0/apksigner verify new_app_final_signed.apk
```
