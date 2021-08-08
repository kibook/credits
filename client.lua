RegisterNetEvent("credits")

local function printToConsole(resources)
	print("Resources:")
	for _, resource in ipairs(resources) do
		local name = resource.name or resource.resourceName

		local info = "- " .. name

		if resource.version then
			info = info .. " v." .. resource.version
		end

		if resource.author then
			info = info .. " by " .. resource.author
		end

		print(info)
	end
end

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
