let moviesList = {
    //Here first index represent of the movie price and second index represents the total number of seats accupied in a movie slot
    "Avenders End Game": [10, 1],
    "Joker" : [12, 1],
    "Toy Story 4" : [8, 1],
    "The Lion King" : [9, 1]
}

let totalSelectedSeats = 0;
let arrayOfSeats = ['row-1-seat-2', 'row-1-seat-3', 'row-1-seat-4', 'row-1-seat-5', 'row-1-seat-6', 'row-1-seat-7', 'row-1-seat-8', 
'row-2-seat-1', 'row-2-seat-2', 'row-2-seat-3', 'row-2-seat-4', 'row-2-seat-5', 'row-2-seat-6', 'row-2-seat-7', 'row-2-seat-8', 
'row-3-seat-1', 'row-3-seat-2', 'row-3-seat-3', 'row-3-seat-4', 'row-3-seat-5', 'row-3-seat-6', 'row-3-seat-7', 'row-3-seat-8', 
'row-4-seat-1', 'row-4-seat-2', 'row-4-seat-3', 'row-4-seat-4', 'row-4-seat-5', 'row-4-seat-6', 'row-4-seat-7', 'row-4-seat-8', 
'row-5-seat-1', 'row-5-seat-2', 'row-5-seat-3', 'row-5-seat-4', 'row-5-seat-5', 'row-5-seat-6', 'row-5-seat-7', 'row-5-seat-8', 
'row-6-seat-1', 'row-6-seat-2', 'row-6-seat-3', 'row-6-seat-4', 'row-6-seat-5', 'row-6-seat-6', 'row-6-seat-7', 'row-6-seat-8'];
let selecetdPrice = 0; // have to remove it later
let selecetdMovieName;
let arrayOfSelectedMovie = [0, 0];
let totalBookedSeats = 1;
let parentContainer = document.getElementById('main-container');
let newTag = document.createElement('p');
/*let idArray = [];
console.log(idArray);*/
function reserveSeatFun(currentElement){
    if(selecetdPrice == 0){
        alert("Please First Select Movie Name, Thank You!");
    }
    else{
        if(arrayOfSelectedMovie[1] == 48){
            alert("All Searts Are Occupies, no more space, please try again in the next slot");
        }
        else{
            if(currentElement.classList.contains('background-color')){
            currentElement.classList.remove('background-color');
            currentElement.classList.add('seat-selected');
            totalSelectedSeats++;
            arrayOfSelectedMovie[1]++;
            //Here im extracting the currentElement's Id in the array
            arrayOfSelectedMovie.push(currentElement.id);

            }
            else if(currentElement.classList.contains('seat-selected')){
                currentElement.classList.remove('seat-selected');
                currentElement.classList.add('background-color');
                totalSelectedSeats--;
                arrayOfSelectedMovie[1]--;
                arrayOfSelectedMovie = arrayOfSelectedMovie.filter((id)=>{ return id != currentElement.id});   //Here removing that id from the array
                console.log(arrayOfSelectedMovie);
            }
            else if(currentElement.classList.contains('occupied-seat-background-color')){
                alert("Seat is Already Booked, Please Select Another Seat!");
            }
            display();
        }
    }
}//Ends here
function selectMovieFun(currentElement){
    console.log("Existing Arr: "+arrayOfSelectedMovie);
    if(arrayOfSelectedMovie[1] > 1){
        arrayOfSelectedMovie.forEach((value, index) => {
            //console.log("Old Run");
            if(index > 1){
                let tempID1 = document.getElementById(value);
                if(tempID1.classList.contains('seat-selected')){
                    tempID1.classList.remove('seat-selected');
                    arrayOfSelectedMovie = arrayOfSelectedMovie.filter((id)=>{ return id != value});
                    tempID1.classList.add('background-color');
                    totalSelectedSeats--;
                    arrayOfSelectedMovie[1]--;
                }
                else if(tempID1.classList.contains('occupied-seat-background-color')){
                    tempID1.classList.remove('occupied-seat-background-color');
                    tempID1.classList.add('background-color');
                }
            }
        });
        moviesList[selecetdMovieName] = arrayOfSelectedMovie;
    };
    let selectedOption = currentElement.options[currentElement.selectedIndex];
    selecetdMovieName = selectedOption.getAttribute('movie-name');
    if(selecetdMovieName in moviesList){
        arrayOfSelectedMovie = moviesList[selecetdMovieName];
        //console.log("New Arr: "+arrayOfSelectedMovie);
        if(arrayOfSelectedMovie[1] > 1){
            arrayOfSeats.forEach((value, index) => {
                let tempSeat = document.getElementById(value);
                if(tempSeat.classList.contains('seat-selected')){
                    tempSeat.classList.remove('seat-selected');
                    tempSeat.classList.add('background-color');
                }
                else if(tempSeat.classList.contains('occupied-seat-background-color')){
                    tempSeat.classList.remove('occupied-seat-background-color');
                    tempSeat.classList.add('background-color');
                }
            });
            arrayOfSelectedMovie.forEach((value, index) => {
                if(index > 1){
                    let tempID = document.getElementById(value);
                    if(tempID.classList.contains('background-color')){
                        tempID.classList.remove('background-color');
                        tempID.classList.add('occupied-seat-background-color');
                    }
                    else if(tempID.classList.contains('seat-selected')){
                        tempID.classList.remove('seat-selected');
                        tempID.classList.add('occupied-seat-background-color');
                    }
                }
            })
        }
        selecetdPrice = arrayOfSelectedMovie[0];
    }
    else{
        alert("Movie not Found!");
    }
    display();

}
function display(){
    let totalSeatsAndPrice = document.getElementById('your-total');
    totalSeatsAndPrice.textContent = `You have selected ${arrayOfSelectedMovie[1]} seats of a price of $${arrayOfSelectedMovie[0] * arrayOfSelectedMovie[1]}`;
}

//Book the seat functionality starts here
let bookSeat = document.getElementById('booked-button');
bookSeat.addEventListener('click', bookSeatFun);
function bookSeatFun(){
    if(arrayOfSelectedMovie[1] > 1){
        arrayOfSelectedMovie.forEach((value, index) => {
            if(index > 1){
                let getID = document.getElementById(value);
                if(getID.classList.contains('seat-selected')){
                    getID.classList.remove('seat-selected');
                    getID.classList.add('occupied-seat-background-color');
                }
            }
        });
    }
    else{
        alert('Please select Seat!');
    }
};