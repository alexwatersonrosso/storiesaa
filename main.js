document.getElementById('story-form').addEventListener('submit', submitStory);

async function submitStory(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const story = {
    title,
    content
  };

  const response = await fetch('http://localhost:3000/stories', {
    method: 'POST',
    body: JSON.stringify(story),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  console.log(data);
}
window.addEventListener('load', loadStories);

async function loadStories() {
  const response = await fetch('http://localhost:3000/stories');
  const stories = await response.json();

  const storiesDiv = document.getElementById('stories');

  stories.forEach(story => {
    const storyDiv = document.createElement('div');
        storyDiv.classList.add('story');
        storyDiv.innerHTML = `
        <h2>${story.title}</h2>
        <p>${story.content.substring(0, 100)}...</p>
        <a href="story.html?id=${story._id}">Read more</a>
    `;

    storiesDiv.appendChild(storyDiv);
  });
}
