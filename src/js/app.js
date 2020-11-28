App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      alert('Install Metamask Chrome Extension to proceed further');
      console.error("User wallet not found");
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('MovieRating.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var MovieRatingArtifact = data;
      App.contracts.MovieRating = TruffleContract(MovieRatingArtifact);
    
      // Set the provider for our contract
      App.contracts.MovieRating.setProvider(App.web3Provider);
    
      // Use our contract to retrieve the movies
      return App.getMovies();
    });
  },

  getMovies: function() {
    var movieRatingInstance;

    App.contracts.MovieRating.deployed().then(function(instance) {
      movieRatingInstance = instance;
      return movieRatingInstance.getMovies.call();
    }).then(function(movies) {
      for (i = 0; i < movies.length; i++) {
        var petsRow = $('#moviesRow');
        var petTemplate = $('#movieTemplate');

        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('.input-rating').attr('data-id', data[i].id);
        petTemplate.find('.btn-rating').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
