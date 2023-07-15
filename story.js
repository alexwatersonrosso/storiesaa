window.addEventListener('load', loadStory);

async function loadStory() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const response = await fetch('http://localhost:3000/stories/' + id);
    const story = await response.json();

    const storyDiv = document.getElementById('story');
    storyDiv.innerHTML = `
        <h2>${story.title}</h2>
        <p>${story.content}</p>
    `;
}
