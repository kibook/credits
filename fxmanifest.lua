fx_version "cerulean"
game "common"

name "credits"
author "kibukj"
description "Displays information about resources on a FiveM or RedM server"
repository "https://github.com/kibook/credits"

files {
	"ui/index.html",
	"ui/style.css",
	"ui/script.js"
}

ui_page "ui/index.html"

server_scripts {
	"config.lua",
	"server.lua"
}

client_script "client.lua"
