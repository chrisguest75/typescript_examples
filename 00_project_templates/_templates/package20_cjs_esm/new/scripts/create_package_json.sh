---
to: <%= name %>/scripts/create_package_json.sh
sh: chmod +x <%= name %>/scripts/create_package_json.sh
---
cat >dist/cjs/package.json <<EOF
{
    "type": "commonjs"
}
EOF

cat >dist/esm/package.json <<EOF
{
    "type": "module"
}
EOF
