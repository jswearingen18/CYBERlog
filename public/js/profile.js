const newBlogForm = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blogTitle').value.trim();
  const blogs = document.querySelector('#blogPost').value.trim();

  if (title && blogs) {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ title, blogs }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Error blogging about it');
    }
  }
};

document.querySelector('.blogBtn');
document.addEventListener('submit', newBlogForm);
