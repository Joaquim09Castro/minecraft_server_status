const baseUrl = "https://api.mcsrvstat.us/2/";
const baseServerUrl = "biorgiaunirio.aternos.me:34034";

const fetchResponse = () => {
	const infoContainers = document.body.querySelectorAll(".info-containers");
	infoContainers.forEach( div => div.innerHTML = "" );

	fetch( baseUrl + baseServerUrl )
		.then( apiResponse => apiResponse.json() )
		.then( responseJson => treatResponse( responseJson ) )
		.then( output => {
			if ( output.online ) {
				document.body.querySelector("#status-window").textContent = output.version;
				document.body.querySelector("#player-list").textContent = `${output.players.online} / ${output.players.max}`;
				document.body.querySelector("#icon-image").appendChild(output.icon);
			} else {
				document.body.querySelector("#status-window").textContent = output
			}
		} );
}

function treatResponse( fetchResponse ) {
	let serverIcon = new Image();
	serverIcon.src = fetchResponse.icon;
	
	if ( fetchResponse.online ) {
		return	{	version: fetchResponse.version,
					online: fetchResponse.online,
					motd: fetchResponse.motd.clean,
					hostname: fetchResponse.hostname,
					players: fetchResponse.players,
					dns: fetchResponse.debug.dns,
					icon: serverIcon,
				}
	} else {
		return "Server is ofline";
	}
}