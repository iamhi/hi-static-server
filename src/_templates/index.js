const fetchFiles = async () => fetch('/api/files?location=' + window.location.pathname).then(response => response.json());

const createLinkElement = (label, url) => {
	const liElem = document.createElement('li');
	const aElem = document.createElement('a');
	const labelElem = document.createTextNode(label);

	aElem.appendChild(labelElem);
	aElem.title = labelElem;
	aElem.href = url;

	liElem.appendChild(aElem);

	return liElem;
};

const createCrumbSeparatorElement = () => {
	return document.createTextNode(' / ');
};

const createCrumbElement = (label, url) => {
	const aElem = document.createElement('a');
	const labelElem = document.createTextNode(label);

	aElem.appendChild(labelElem);
	aElem.title = labelElem;
	aElem.href = url;

	return aElem;
};

const createBreadCrumb = (crumbs) => {
	if (crumbs.length === 1) {
		return [createCrumbElement('home', '/'), createCrumbSeparatorElement()];
	}

	const elements = createBreadCrumb(crumbs.slice(0,-1));

	const label = crumbs[crumbs.length - 1];
	const url = crumbs.join('/');

	return [...elements, createCrumbElement(label, url), createCrumbSeparatorElement()];
}

const addBreadCrumbs = (parentElement) => {
	const crumbs = window.location.pathname.split('/');

	// pop a freeOne
	if (crumbs[crumbs.length - 1] === '') {
		crumbs.pop();
	}

	const elements = createBreadCrumb(crumbs);

	console.warn({ elements });

	elements.forEach(element => {
		parentElement.appendChild(element);
	});
};

const createLinkElements = (parentElement) => {
	fetchFiles().then(data => {
		data.forEach(({ label, url }) => {
			const linkElement = createLinkElement(label, url);

			parentElement.appendChild(linkElement);
		});
	});
};

const locationHeaderElement = document.getElementById('location');
const linksContainerElement = document.getElementById('links');

locationHeaderElement.innerHTML = 'Location: ';

createLinkElements(linksContainerElement);
addBreadCrumbs(locationHeaderElement);
