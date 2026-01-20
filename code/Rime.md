# Rime

## 錯誤排查

- 使用非管理員安裝
- 無法輸入中文：啟動演算法服務

## RIME 配置

- 軟體安裝完畢，輸入法右鍵選擇`輸入法設定`，對其進行配置，得到檔案`weasel.custom.yaml`

```yaml
# weasel.custom.yaml
customization:
  distribution_code_name: Weasel
  distribution_version: 0.14.3
  generator: "Weasel::UIStyleSettings"
  modified_time: "Wed Apr  8 14:26:31 2020"
  rime_version: 1.5.3
patch:
  style/color_scheme: satya # 主題
  style/horizontal: true # 是否橫向
  style/font_face: Microsoft YaHei # 字型
  style/font_point: 14  # 字號

# 建立 default.custom.yaml
patch:
    "menu/page_size": 9

# 整理安裝資料夾下 Rime/weasel-0.14.3/data
# preview中刪除不需要的主題預覽圖，對應[weasel.yaml]檔案中的主題刪除
# weasel.yaml 更改，新增自定義主題

# RGB轉BGR [67C8EB][0xEBC867],即R[67]與B[EB]交換位置，字首加0x，即[0xBBGGRR]

preset_color_schemes:
  satya:
    name: Satya
    author: Satya
    text_color: 0xEBC867 # 內選區域 文字
    back_color: 0x000000 # 背景顏色
    border_color: 0xFFFF00 # 背景邊框顏色
    hilited_text_color: 0xfecb96 # 內選區域 編碼
    hilited_back_color: 0x000000 # 內選區域 背景
    hilited_candidate_text_color: 0xFFFF00 # 啟用候選項 文字
    hilited_candidate_back_color: 0x000000 # 啟用候選項 背景
    candidate_text_color: 0xCCCC00 # 其它候選項 文字
    comment_text_color: 0xEBC867 # 其它候選項 提示

```
