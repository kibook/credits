local resources = {}

local function getResourceList()
	local list = {}

	for _, resource in pairs(resources) do
		table.insert(list, resource)
	end

	table.sort(list, function(a, b)
		local name1 = string.lower(a.name or a.resourceName)
		local name2 = string.lower(b.name or b.resourceName)

		return name1 < name2
	end)

	return list
end

AddEventHandler("onResourceStart", function(resourceName)
	local resourceInfo = {}

	resourceInfo.resourceName = resourceName

	for _, metadataName in ipairs(Config.metadataNames) do
		resourceInfo[metadataName] = GetResourceMetadata(resourceName, metadataName, 0)
	end

	resources[resourceName] = resourceInfo
end)

AddEventHandler("onResourceStop", function(resourceName)
	resources[resourceName] = nil
end)

RegisterCommand("credits", function(source)
	TriggerClientEvent("credits", source, getResourceList())
end, true)
