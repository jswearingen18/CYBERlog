const newBlogForm = async (event) => {
  event.preventDefault();

  const blogs = document.querySelector('#blogs').value;

  if (blogs) {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ blogs }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Error blogging about it');
    }
  }
};

document.querySelector('submitBlog');
document.addEventListener('submit', newBlogForm);
