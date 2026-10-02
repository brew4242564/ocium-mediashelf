export function renderLibraryView() {
    return `<div class="library">
    
    <div class="groupButtons">
            <button class="categoryButton active" data-category='all' type="button">
                All
            </button>
            <button type="button" data-category='series' class="categoryButton">
                Series
            </button>
            <button type="button" data-category='movie' class="categoryButton">
                Movies
            </button>
            <button class="categoryButton" data-category='videogame' type="button">
                Videogames
            </button>
            <button class="categoryButton" data-category='book' type="button">
                Books
            </button>
            <button class="categoryButton" data-category='album' type="button">
                Music
            </button>
            <button class="categoryButton" data-category='podcast' type="button">
                Podcasts
            </button>
    </div>
           <div class="subContainer">           
           <p>Next Up:</p> 
           <div class="checkContainer">
           <label for="finished">Show finished media</label>
           <input type="checkbox" class="check" name="finished">
           </div>
           </div>

    <section class="itemsContainer">
        
    </section>

    </div>
`
}