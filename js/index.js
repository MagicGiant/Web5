addImages(3, 5);

async function getObjectFromIP(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

async function filterObjectsByIds(objects, targetIds) {
    try {
        const filteredObjects = objects.filter(object => targetIds.includes(object.albumId));
        return filteredObjects;
    } catch (error) {
        console.error('Filtering error:', error);
    }
}

async function addImages(albums_count, objects_count) {
    try {
        const objects = await getObjectFromIP("https://jsonplaceholder.typicode.com/photos");
        const ids = Array.from(getAlbumIds(objects));

        const shuffledIds = shuffleArray(ids).slice(0, albums_count);
        const filteredObjects = await filterObjectsByIds(objects, shuffledIds);

        conteiner = document.getElementById("image");
        for (const id of shuffledIds) {
            var album = document.createElement("div");
            var gradLine = document.createElement("hr");
            var titleText = document.createElement("span");

            album.className = "main__album";
            gradLine.className = "grad_line";
            titleText.className = "main__album-name";
            titleText.textContent = "Альбом: " + id

            conteiner.appendChild(album);
            album.appendChild(gradLine);
            album.appendChild(titleText);
            album.appendChild(gradLine.cloneNode(true));

            var examples = document.createElement("div");
            examples.className = "main__examples";
            conteiner.appendChild(examples);

            let objects_count_current = 0
            for (const object of filteredObjects) {
                if (object.albumId != id){
                    continue;
                }
                if (objects_count_current === objects_count){
                    break;
                }
                
                objects_count_current++;

                var example = document.createElement("div")
                var img = document.createElement("img")

                example.className = "main__examples-example"
                img.className = "main__examples-example-img"

                img.alt = "example"
                img.src = object.url

                examples.appendChild(example)
                example.appendChild(img)
            }

            await filterObjectsByIds(objects, shuffledIds);
        }

        console.log(shuffledIds);
        console.log(filteredObjects)
    } catch (error) {
        console.error(error);
    }
}

function getAlbumIds(objects) {
    var ids = new Set();
    for (var object of objects) {
        ids.add(object['albumId']);
    }
    return ids;
}

