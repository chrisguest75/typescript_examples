#!/usr/bin/env bash

npm run start:cmd:list

#export TEXT=$'Greetings,\n'$(hostname)$'\nfrom zsh.\n'$(ipconfig getifaddr en0)
export TEXT=${1-DEFAULT}

while IFS=, read -r FONT
do
    echo "$FONT"
    npm run start:cmd:jp2acustom --banner="${TEXT}" --font="${FONT}"
done << EOF
cuddly
carebear
knight4
tcb
megadeth
16X16-F6
16X16-F7
bennyfnt
fantfont
candyfntr
08X08-F5
32X32-F5
aura3fntr
axxis
cebit2_f
dr_satan
font199r
font205
font254r
mdethfnt
arrakis
bubsy
medway_fr
megamin
mistyfntr
mpocketf
outlfont
replic_1
soundemor
tcc1
st_adm
wayne_3d
EOF

