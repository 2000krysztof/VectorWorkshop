#!/bin/bash
cp -r src/* dist/
find dist/client -type f -name "*.ts" -exec rm {} \;
find dist/client -type d -empty -delete
bun build src/client/index.ts --outfile=dist/client/index.min.js --minify --target=browser
