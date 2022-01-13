const movie = document.getElementById('movie');
const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count =  document.getElementById('count')
const total =  document.getElementById('total')

populateUI();

let ticketPrice = +movie.value;
// console.log(ticketPrice);
//* console.log( typeof(ticketPrice));




// * Set movie price and index
function setMoviePrice(movieIndex, moviePrice) {
    // console.log(movieIndex);
    localStorage.setItem('movieIndex', movieIndex)
    localStorage.setItem('moviePrice', moviePrice)

}



// * UpdatePrice
function updatePrice(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //* console.log(selectedSeats); it is a Nodelist
    // console.log(selectedSeats.length);
    const selctedIndex = [...selectedSeats].map(seat =>{
        return [...seats].indexOf(seat);
    })
    
    // * setting selctedSeats
    localStorage.setItem('selectedSeats',JSON.stringify(selctedIndex) )  //* for keeping as array
    // console.log(selctedIndex);
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;

}




function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    // console.log(selectedSeats);
        if (selectedSeats !== null && selectedSeats.length > 0) {
             seats.forEach((seat, index) =>{
            if (selectedSeats.indexOf(index) >-1) {
                seat.classList.add('selected')
            }
            // console.log(1);
        })
       
    }

    
     const movieIndex =  localStorage.getItem('movieIndex')
    if (movieIndex !== null) {
        movie.selectedIndex = movieIndex;
    }

}


// * Events
container.addEventListener('click', (e) =>{
    // console.log(e.target);
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') ) {
        // console.log(e.target);
        e.target.classList.toggle('selected')
    }

    updatePrice();
} )

movie.addEventListener('change', (e)=>{
    // console.log(+e.target.value);
     ticketPrice = +e.target.value;
    // * console.log(e.target.selectedIndex, e.target.value );
    
     
    setMoviePrice(e.target.selectedIndex, e.target.value)
    updatePrice();
})



updatePrice();