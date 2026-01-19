# aniccaa

Anicca notes

```bash
opencc -i ~/development/aniccaa/novel/budaixi/002.md -o ~/development/aniccaa/novel/budaixi_tw/002.md -c s2twp.json

for file in ~/development/aniccaa/novel/zheyao/*.md; do
    filename=$(basename "$file") # 獲取檔案名 (例如 001.md, 002.md, 010.md)
    opencc -i "$file" -o ~/development/aniccaa/novel/zheyao_tw/"$filename" -c s2twp.json;
done

for file in ~/development/aniccaa/tech/*.md; do
    filename=$(basename "$file") # 獲取檔案名 (例如 001.md, 002.md, 010.md)
    opencc -i "$file" -o ~/development/aniccaa/tech_tw/"$filename" -c s2twp.json;
done
```

<!--
一級導航大概會有：
- 小說：/novel 歷來所有小說。
- 編程：/code 編程的筆記、技術文章等。
- 自傳：/bio 關於人生、童年、成長等。
- 作品庫：/projects 只提供一個展示頁面，具體完整的web項目會連接到項目的公開庫index.html
- 遊戲庫：/games 未來可能會制作一些在web運行的免費遊戲，同樣是在這裏展示，提供遊戲的index.html
- 關於：/about 一個展示自己的頁面，可能會包含佈施(二維收款碼)，因爲大陸無法使用Github的Sponsors。

二級側邊欄：
小說、編程、隨筆等，會有二級分類，比如小說會按照每本、每章節這種嵌套列表展示。

-->
