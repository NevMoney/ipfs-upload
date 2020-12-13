const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

let buffer;
let ipfsHash;

//Executed when page finish loading
$(document).ready(async () => {
  $("#read-container").hide();

  // this allows the website to use the metamask account
  const accounts = await ethereum.enable();

  web3 = new Web3(ethereum);

  toWei = (amount) => web3.utils.toWei(String(amount));
  fromWei = (amount) => Number(web3.utils.fromWei(amount)).toFixed(4);

  ethereum.on("accountsChanged", (_accounts) => {
    console.log("Account Changed!", accounts[0]);
    user = web3.utils.toChecksumAddress(_accounts[0]);
  });

  // User will be the first item in the accounts array
  user = web3.utils.toChecksumAddress(accounts[0]);
});

// adding input with uploaded file
// async function propertyInfo() {
  const data = JSON.stringify({
    // image: file, //would like to add upload image to the object to store
    address: document.getElementById(autocomplete), 
    bedrooms: document.getElementById(bedCount), 
    bathrooms: document.getElementById(bathCount), 
    yearBuilt: document.getElementById(yearBuilt), 
    houseSize: document.getElementById(houseSize), 
    lotSize: document.getElementById(lotSize), 
    parcelNumber: document.getElementById(parcel), 
    propertyType: document.getSelection, //this may not be accurate & DON"T KNOW WHY IT"S YELLOW!
    numberOfUnits: document.getElementById(mfUnits), 
    propertyLink: document.getElementById(zillow), 
  });

    //ipfsHash = await ipfs.add(data);
// }

const hashFile = (file) => {
  console.log(file);
  console.log(file.name);
  $("#fileUpload").hide(file.name);
  $("#fileName").show();
  $("#fileName>h4").html(`File Name: ${file.name}`);

  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onloadend = () => {
    buffer = Buffer(reader.result);
    console.log(buffer);
    const hash = window.web3.utils.sha3(buffer);
    console.log("hash", hash);
  };
};

const addToIpfs = async () => {
  console.log("adding to IPFS...");
  $("#upload").html("Uploading");

  // Nev added "data, before buffer"
  const added = await ipfs.add(data, buffer, {
    progress: (prog) => console.log(`received: ${prog}`),
  });

  $("#upload").hide();

  ipfsHash = added.cid.toString();

  const ipfsLink =
    "<a target='_blank' rel='noopener noreferrer' href='https://gateway.ipfs.io/ipfs/" +
    ipfsHash +
    "'>" +
    ipfsHash +
    "</a>";
  $("#ipfsResult").html(ipfsLink);
};

const showModal = (title, content) => {
  const modal = `
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold">${title}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              ${content}
            </p>
          </div>         
        </div>
      </div>
    `;

  $("#myModal").html(modal).modal("show");
};

$("#file").change((e) => {
  console.log(e.target.files[0]);
  hashFile(e.target.files[0]);
});

$("#upload").click(() => addToIpfs());

// Navigation
$("#readLink").click(() => {
  $("#upload-container").hide();
  $("#uploadLink").removeClass("active");

  $("#readLink").addClass("active");
  $("#read-container").show();
});

$("#uploadLink").click(() => {
  $("#read-container").hide();
  $("#readLink").removeClass("active");

  $("#uploadLink").addClass("active");
  $("#upload-container").show();
});

// $("#land").click(function(){
//   $("#land").prop("checked", true);
//   $("#SFR").prop("checked", false);
//   $("#condo").prop("checked", false);
//   $("#MFR").attr("checked", false);
//   $("#industrial").attr("checked", false);
//   $("#CRE").attr("checked", false);
//   $("#office").attr("checked", false);
//   $("#retail").attr("checked", false);
//   $("#mixed").attr("checked", false);
// });

// $("#SFR").click(() => {
//   $("#SFR").prop("checked", true);
//   $("#land").prop("checked", false); 
//   $("#condo").prop("checked", false);
//   $("#MFR").attr("checked", false);
//   $("#industrial").attr("checked", false);
//   $("#CRE").attr("checked", false);
//   $("#office").attr("checked", false);
//   $("#retail").attr("checked", false);
//   $("#mixed").attr("checked", false);
// });

// $("#condo").click(() => {
//   $("#condo").prop("checked", true);
//   $("#land").prop("checked", false);
//   $("#SFR").prop("checked", false); 
//   $("#MFR").attr("checked", false);
//   $("#industrial").attr("checked", false);
//   $("#CRE").attr("checked", false);
//   $("#office").attr("checked", false);
//   $("#retail").attr("checked", false);
//   $("#mixed").attr("checked", false);
// });

// $("#MFR").click(() => {
//   $("#MFR").prop("checked", true);
//   $("#land").prop("checked", false);
//   $("#SFR").prop("checked", false);
//   $("#condo").prop("checked", false);
//   $("#industrial").attr("checked", false);
//   $("#CRE").attr("checked", false);
//   $("#office").attr("checked", false);
//   $("#retail").attr("checked", false);
//   $("#mixed").attr("checked", false);
// });

// $("#industrial").click(() => {
//   $("#industrial").prop("checked", true);
//   $("#land").prop("checked", false);
//   $("#SFR").prop("checked", false);
//   $("#condo").prop("checked", false);
//   $("#MFR").attr("checked", false);  
//   $("#CRE").attr("checked", false);
//   $("#office").attr("checked", false);
//   $("#retail").attr("checked", false);
//   $("#mixed").attr("checked", false);
// });

// $("#CRE").click(() => {
//   $("#CRE").prop("checked", true);
//   $("#land").prop("checked", false);
//   $("#SFR").prop("checked", false);
//   $("#condo").prop("checked", false);
//   $("#MFR").attr("checked", false);
//   $("#industrial").attr("checked", false);  
//   $("#office").attr("checked", false);
//   $("#retail").attr("checked", false);
//   $("#mixed").attr("checked", false);
// });

// $("#office").click(() => {
//   $("#office").prop("checked", true);
//   $("#land").prop("checked", false);
//   $("#SFR").prop("checked", false);
//   $("#condo").prop("checked", false);
//   $("#MFR").attr("checked", false);
//   $("#industrial").attr("checked", false);
//   $("#CRE").attr("checked", false); 
//   $("#retail").attr("checked", false);
//   $("#mixed").attr("checked", false);
// });

// $("#retail").click(() => {
//   $("#retail").prop("checked", true);
//   $("#land").prop("checked", false);
//   $("#SFR").prop("checked", false);
//   $("#condo").prop("checked", false);
//   $("#MFR").attr("checked", false);
//   $("#industrial").attr("checked", false);
//   $("#CRE").attr("checked", false);
//   $("#office").attr("checked", false);
//   $("#mixed").attr("checked", false);
// });

// $("#mixed").click(() => {
//   $("#mixed").prop("checked", true);
//   $("#land").prop("checked", true);
//   $("#SFR").prop("checked", false);
//   $("#condo").prop("checked", false);
//   $("#MFR").attr("checked", false);
//   $("#industrial").attr("checked", false);
//   $("#CRE").attr("checked", false);
//   $("#office").attr("checked", false);
//   $("#retail").attr("checked", false);
// });

// NOT WORKING! WHY???
$(document).ready(function(){
  $("#land").click(function(){
      $("#land").prop("checked", true);
  });
  $("#SFR").click(function(){
      $("#SFR").prop("checked", true);
  });
  $("#condo").click(function(){
    ("#condo").prop("checked", true);
  });
  $("#MFR").click(function(){
    ("#MFR").prop("checked", true);
  });
  $("#industrial").click(function(){
    ("#industrial").prop("checked", true);
  });
  $("#CRE").click(function(){
    ("#CRE").prop("checked", true);
  });
  $("#office").click(function(){
    ("#office").prop("checked", true);
  });
  $("#retail").click(function(){
    ("#retail").prop("checked", true);
  });
  $("#mixed").click(function(){
    ("#mixed").prop("checked", true);
  });
});

// adding Google Map functionality to address field
// NOT WORKING LOCALLY
let placeSearch;
let autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrtive_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

function initAutocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"), 
    {
      types: ['geocode']
    });
  autocomplete.setFields(["address_component"]);
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // get place details from the autocomplete object
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = "";
    document.getElementById(component).disabled = false;
  }

  // get each component of the address and fill in accurately
  for (var componentForm of place.address_components) {
    var addressType = component.types[0];

    if (componentForm[addressType]) {
      var val = component[componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }    
}

// use browser supported geo-locator
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy,
      });
      autocomplete.setBounts(circle.getBounts());
    });
  }
}