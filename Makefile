
run:
	node --max-old-space-size=512 --expose-gc --nouse-idle-notification src/main.js
# 250 ~ -c 624288000, -w 2
# 500 мб ~ -c 1324288000, -w 2
# 4,8 ГБ ~ -c 13242880000, -w 2
#1424288000

gen-new:
	cat /dev/urandom | tr -dc 'a-zA-Z' | fold -w 1425240 | head -n 10  > src/input.txt

gen:
	head -c 100000000 /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 2 > src/input.txt

remove:
	rm src/tmp/tmp_file_sort*
