export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export async function loadJSON(url) {
    const r = await fetch(url);
    return await r.json();
}