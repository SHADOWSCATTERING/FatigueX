import re

with open("script.js", "r", encoding="utf-8") as f:
    script_content = f.read()

with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Find all document.getElementById('something')
ids = re.findall(r"getElementById\(['\"]([^'\"]+)['\"]\)", script_content)
missing = set()

for id_str in ids:
    if f'id="{id_str}"' not in html_content and f"id='{id_str}'" not in html_content:
        missing.add(id_str)

print("Missing IDs:")
for m in missing:
    print("-", m)
