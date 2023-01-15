class Hotel {
    constructor(name) {
        this.name = name;
        this.rooms = [];
    }
//New rooms can be added to the array
    addRoom(name, area) {
        this.rooms.push(new Room(name, area));
    }
}

class Room {
    constructor(name, area) {
        this.name = name;
        this.area = area;
    }
}
//Send http requests 
class HotelService {
    static url = 'https://ancient-taiga-31359.herokuapp.com/api/hotels';

    static getAllHotels() {
        return $.get(this.url);
    }

    static getHotel(id) {
        return $.get(this.url + `/${id}`);
    }
//Takes a class that has a name and an array.
    static createHotel(hotel) {
        return $.post(this.url, hotel);  //Post it to the api
    }

    static updateHotel(hotel) {
        return $.ajax({
            url: this.url + `/${hotel._id}`,
            dataType: 'json',
            data: JSON.stringify(hotel),
            contentType: 'application/json',
            type: 'PUT'
        });
    }
//Delete entities
    static deleteHotel(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        })
    }
}
//Dom Manager
class DOMManager {
    static hotels;

    static getAllHotels() {
        HotelService.getAllHotels().then(hotels => this.render(hotels));
    }
//Render Dom Method
static render(hotels) {
    
}

}
