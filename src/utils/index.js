import { useEffect } from "react";

export const titleCase = (str) => {
	return str
		.toLowerCase()
		.split(" ")
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

//Then add to your onClick
// onClick={() => openInNewTab('https://stackoverflow.com')}

export const formatSizeUnits = (bytes) => {
	if (bytes >= 1073741824) {
		bytes = (bytes / 1073741824).toFixed(2) + " GB";
	} else if (bytes >= 1048576) {
		bytes = (bytes / 1048576).toFixed(2) + " MB";
	} else if (bytes >= 1024) {
		bytes = (bytes / 1024).toFixed(2) + " KB";
	} else if (bytes > 1) {
		bytes = bytes + " bytes";
	} else if (bytes === 1) {
		bytes = bytes + " byte";
	} else {
		bytes = "0 bytes";
	}
	return bytes;
};

export const useScript = (url) => {
	useEffect(() => {
		const script = document.createElement("script");

		script.src = url;
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, [url]);
};
