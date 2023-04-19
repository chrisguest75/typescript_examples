#!/usr/bin/env bash

npm run start:cmd:list

#export TEXT=$'Greetings,\n'$(hostname)$'\nfrom zsh.\n'$(ipconfig getifaddr en0)
export TEXT=${1-DEFAULT}

npm run start:cmd:jp2acustom --banner=${TEXT} --font="cuddly"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="carebear"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="knight4"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="tcb"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="megadeth"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="16X16-F6"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="16X16-F7"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="bennyfnt"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="fantfont"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="candyfntr"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="08X08-F5"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="32X32-F5"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="aura3fntr"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="axxis"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="cebit2_f"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="dr_satan"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="font199r"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="font205"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="font254r"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="mdethfnt"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="arrakis"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="bubsy"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="medway_fr"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="megamin"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="mistyfntr"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="mpocketf"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="outlfont"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="replic_1"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="soundemor"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="tcc1"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="st_adm"
npm run start:cmd:jp2acustom --banner=${TEXT} --font="wayne_3d"

