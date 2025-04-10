document.addEventListener('DOMContentLoaded', function() {
    
    const container = document.getElementById('content-container');
    const links = document.querySelectorAll('.nav-link');
    let url = './partials/home.html'; 
    
   
    const loadContent = function(urlFeed) {
         fetch(urlFeed)
            .then(function(response) {
              
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(function(html) {
                container.innerHTML = html;
                updateMastheadImage(urlFeed);
                updateActiveLink(urlFeed);
            })
            .catch(function(error) {
                console.error('Error loading content:', error);
                container.innerHTML = `
                    <div class="error-message">
                        <h2>Error Loading Content</h2>
                        <p>Sorry, we couldn't load the requested content. Please try again later.</p>
                        <p>Error details: ${error.message}</p>
                    </div>
                `;
            });
    };

    function updateMastheadImage(urlFeed) {
        const masthead = document.querySelector('.masthead');
        
        if (urlFeed.includes('home.html')) {
            masthead.style.backgroundImage = "url('https://source.unsplash.com/random/800x400/?money')";
        } else if (urlFeed.includes('portfolio.html')) {
            masthead.style.backgroundImage = "url('https://source.unsplash.com/random/800x400/?portfolio')";
        }
    }
    

    function updateActiveLink(urlFeed) {
        links.forEach(link => {
            if (link.getAttribute('href') === urlFeed) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    loadContent(url);
    const selectContent = function(event) {
     
        event.preventDefault();
        
 
        const href = this.getAttribute('href');
        
        loadContent(href);
    };
    links.forEach(link => {
        link.addEventListener('click', selectContent);
    });
});