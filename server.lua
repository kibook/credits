local function getResourceInfo()
	local info = {}

	for i = 0, GetNumResources() - 1 do
		local resourceName = GetResourceByFindIndex(i)

		if resourceName ~= GetCurrentResourceName() and GetResourceState(resourceName) == "started" then
			local resourceInfo = {}

			resourceInfo.resourceName = resourceName

			for _, metadataName in ipairs(Config.metadataNames) do
				local values = {}

				for i = 0, GetNumResourceMetadata(resourceName, metadataName) - 1 do
					table.insert(values, GetResourceMetadata(resourceName, metadataName, i))
				end

				if #values < 2 then
					resourceInfo[metadataName] = values[1]
				else
					resourceInfo[metadataName] = values
				end
			end

			table.insert(info, resourceInfo)
		end
	end

	table.sort(info, function(a, b)
		local name1 = string.lower(a.name or a.resourceName)
		local name2 = string.lower(b.name or b.resourceName)

		return name1 < name2
	end)

	return info
end

exports("getResourceInfo", getResourceInfo)

RegisterCommand("credits", function(source)
	TriggerClientEvent("credits", source, getResourceInfo())
end, true)
