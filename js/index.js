addImages(3, 5, -1);

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

function filterItems(){
    const searchText = document.getElementById("find_img-inp").value;

    const items = document.querySelectorAll('.album_conteiner');

    var is_found = false;
    items.forEach(item =>{
        if(new RegExp(searchText).test(item.id)){
            is_found = true
        }
        else{
            item.style.display = 'none';
        }
    })

    if (is_found){
        console.log("Album found");
    }
    else{
        console.log("console not found");
    }
}

function addImages(albums_count, objects_count, album_id) {
    let shuffledIds, filteredObjects;
    getObjectFromIP("https://jsonplaceholder.typicode.com/photos")
        .then((objects) => {
            const ids = Array.from(getAlbumIds(objects));
            shuffledIds = shuffleArray(ids).slice(0, albums_count);
            return filterObjectsByIds(objects, shuffledIds);
        })
        .then((result) => {
            filteredObjects = result;
            const container = document.getElementById("image");
            return Promise.all(
                shuffledIds.map(async (id) => {
                    if (album_id !== -1 && album_id !== id) {
                        return;
                    }

                    const albumConteiner = document.createElement("div");
                    const album = document.createElement("div");
                    const gradLine = document.createElement("hr");
                    const titleText = document.createElement("span");

                    albumConteiner.id = "album" + id;
                    albumConteiner.className = "album_conteiner";

                    album.className = "main__album";
                    gradLine.className = "grad_line";
                    titleText.className = "main__album-name";
                    titleText.textContent = "Альбом: " + id;

                    container.appendChild(albumConteiner);
                    albumConteiner.appendChild(album);
                    album.appendChild(gradLine);
                    album.appendChild(titleText);
                    album.appendChild(gradLine.cloneNode(true));

                    const examples = document.createElement("div");
                    examples.className = "main__examples";
                    albumConteiner.appendChild(examples);

                    let objects_count_current = 0;
                    for (const object of result) {
                        if (object.albumId !== id) {
                            continue;
                        }
                        if (objects_count_current === objects_count) {
                            break;
                        }

                        objects_count_current++;

                        const example = document.createElement("div");
                        const img = document.createElement("img");

                        example.className = "main__examples-example";
                        img.className = "main__examples-example-img";

                        img.alt = "example";
                        img.src = object.url;

                        examples.appendChild(example);
                        example.appendChild(img);
                    }

                    // await filterObjectsByIds(objects, shuffledIds);
                })
            );
        })
        .then(() => {
            console.log(shuffledIds);
            console.log(filteredObjects);
        })
        .catch((error) => {
            console.error(error);
        });
}

function getAlbumIds(objects) {
    var ids = new Set();
    for (var object of objects) {
        ids.add(object['albumId']);
    }
    return ids;
}

function clearImages() {
    const container = document.getElementById('image');
    container.innerHTML = '';
}