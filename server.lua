local resources = {}

local function getResourceInfo()
	local info = {}

	for _, resource in pairs(resources) do
		table.insert(info, resource)
	end

	table.sort(info, function(a, b)
		local name1 = string.lower(a.name or a.resourceName)
		local name2 = string.lower(b.name or b.resourceName)

		return name1 < name2
	end)

	return info
end

exports("getResourceInfo", getResourceInfo)

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
	TriggerClientEvent("credits", source, getResourceInfo())
end, true)
