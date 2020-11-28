// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract MovieRating {
    
    address owner;
    
    struct Rating {
        uint totalRating;
        uint totalRater;
    }
    
    mapping(uint => Rating) public movieRatings;
    
    string[] internal movies;
    
    constructor(string[] memory _movieNames) public {
        owner = msg.sender;
        for(uint i = 0; i < _movieNames.length; i++) {
            movies.push(_movieNames[i]);
            movieRatings[i].totalRating = 0;
            movieRatings[i].totalRater = 0;
        }
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can add a movie");
        _;
    }
    
    modifier rateLimit(uint _rating) {
        require(_rating > 0 && _rating <= 5, "Rating should be between 1 to 5");
        _;
    }
    
    function add(string memory _movieName) public onlyOwner {
        uint  count = 0;
        count = movies.length;
        count++;
          
        movies.push(_movieName);
        movieRatings[count].totalRating = 0;
        movieRatings[count].totalRater = 0;
    }
    
    function rate(uint _movieId, uint _rating) public rateLimit(_rating) {
        movieRatings[_movieId].totalRating += _rating;
        movieRatings[_movieId].totalRater++;
    }
    
    function getMovies() public view returns(string[] memory) {
        return movies;
    }
}