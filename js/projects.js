document.addEventListener('DOMContentLoaded', function() {
    
    // Check if we are on the projects page
    const readmeLinks = document.querySelectorAll('.readme-button');
    
    if (readmeLinks.length > 0) {
        // Add event listeners to redirect to readme.html with the correct local README file
        readmeLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const project = this.getAttribute('data-project');
                console.log('Redirecting to README for:', project);  // Debugging log

                // Encode the project name for passing as a URL parameter
                const encodedProject = encodeURIComponent(project);

                // Redirect to the readme.html page with the project name as a parameter
                window.location.href = `readme.html?project=${encodedProject}`;
            });
        });
    }

    // Check if we are on the readme.html page
    const params = new URLSearchParams(window.location.search);
    const project = params.get('project');  // Get the project name from query parameter

    if (project) {
        // Assuming your README files are in the projects folder, like: projects/project-name/project-name.md
        const readmePath = `projects/${project}/${project}.md`;  // Build path to the local markdown file

        fetch(readmePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('404: README Not Found');
                }
                return response.text();
            })
            .then(markdown => {
                const html = marked.parse(markdown);  // Convert markdown to HTML using marked.js
                document.getElementById('readme-content').innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching README:', error);
                document.getElementById('readme-content').textContent = error.message;
            });
    }

    // Scroll Animation Logic (optional, for projects.html)
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stops observing once it's visible
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach(el => observer.observe(el));
});
