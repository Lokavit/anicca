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
