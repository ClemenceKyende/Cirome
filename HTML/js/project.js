fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const currentIndex = projects.findIndex(p => p.id === projectId);
    const project = projects[currentIndex];

    if (project) {
      document.getElementById('project-title').textContent = project.title;
      document.getElementById('project-description').innerHTML = project.description;
      document.getElementById('project-image').src = project.image;
      const benefitsList = document.getElementById('project-benefits');
benefitsList.innerHTML = ''; // Clear any existing content

if (Array.isArray(project.benefits)) {
  project.benefits.forEach(benefit => {
    const li = document.createElement('li');
    li.textContent = benefit;
    benefitsList.appendChild(li);
  });
} else {
  // Fallback if benefits is just a string
  benefitsList.innerHTML = `<li>${project.benefits}</li>`;
}

      document.getElementById('project-summary').innerHTML = project.summary;

      // Show the elements
      document.getElementById('project-title').style.display = 'block';
      document.getElementById('project-description').style.display = 'block';
      document.getElementById('project-benefits').style.display = 'block';

      // Navigation links (circular)
      const nextIndex = (currentIndex + 1) % projects.length;
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

      document.getElementById('next-project').href = `myproject.html?id=${projects[nextIndex].id}`;
      document.getElementById('prev-project').href = `myproject.html?id=${projects[prevIndex].id}`;
    } else {
      document.getElementById('project-container').innerHTML = "<p>Project not found.</p>";
    }
  })
  .catch(error => {
    console.error("Error loading project data:", error);
  });
