export function renderLibraryView() {
    return `<div class="library">
    
    <div class="groupButtons">
            <button type="button" data-category='show' class="categoryButton">
                Shows
            </button>
            <button class="categoryButton" data-category='videogame' type="button">
                Videogames
            </button>
            <button class="categoryButton" data-category='album' type="button">
                Music
            </button>
            <button class="categoryButton" data-category='book' type="button">
                Books
            </button>
             <button class="categoryButton active" data-category='all' type="button">
                All
            </button>
    </div>
           <p>Next Up:</p> 
    <section class="itemsContainer">
        
    </section>

    </div>
`
}