RegisterNetEvent("credits")

AddEventHandler("credits", function(resources)
	SendNUIMessage({
		type = "show",
		resourceInfo = resources
	})
	SetNuiFocus(true, true)
end)

RegisterNUICallback("close", function(data, cb)
	SetNuiFocus(false, false)
	cb{}
end)
