var uid = null;

AFRAME.registerComponent("markerhandler", {
  init: async function () {
    
    //Get Table Number
    if (uid === null) {
      //call the function
      this.askuid();
    }

    //Get the dishes collection
    var toys = await this.gettoys();

    //makerFound Event
    this.el.addEventListener("markerFound", () => {
      if (uid !== null) {
        var markerId = this.el.id;
        this.handleMarkerFound(toys, markerId);
      }
    });
    //markerLost Event
    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },
  askuid: function () {
    var iconUrl = "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/hunger.png";
    // add swal with input
    swal({ icon: "warning", title: "Add user id", 
    content: { element: "input", attributes: { placeholder: "Type your user id", type: "number", min: 1 }}, 
    closeOnClickOutside: false,
})
.then((result) => {
  uid=result
   
})




  },

  handleMarkerFound: function (toys, markerId) {
    // Getting today's day
    var todaysDate = new Date();
    var todaysDay = todaysDate.getDay();

    // sunday - saturday : 0 - 6
    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    //Get the dish based on ID
    var toy = toys.filter(toy => toy.id === markerId)[0];

    //Check if the dish is available today
    if (toy.unavailable_days.includes(days[todaysDay])) {
      //write the code here
      swal({
        icon:"morning",
        title: "This crane serves "+ toy.toy_name + " unavailable for work.",
        text: "We recommend trying your work!",
        timer:2000,
      })
    }
    else{
      var model = document.querySelector(`#model-${toy.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.position);
      model.setAttribute("scale", toy.model_geometry.position);
      model.setAttribute("visible", true);

      var ingredientsContainer = document.querySelector(`#main-plane-${toy.id}`);
      ingredientsContainer.setAttribute("visible", true);

      var priceplane = document.querySelector(`#price-plane-${toy.id}`);
      priceplane.setAttribute("visible",true)

      var ratingButton = document.getElementById("rating-button");
      var orderButton = document.getElementById("order-button");

    }

      if (tableNumber != null) {
        //Handling Click Events
        ratingButton.addEventListener("click", function () {
          swal({
            icon: "warning",
            title: "Rate Dish",
            text: "Work In Progress"
          });
        });

        orderButtton.addEventListener("click", () => {
          var uid;
          uid <= 9 ? (uid = `T0${uid}`) : `T${uid}`;
          this.handleOrder(uid, toy);

         //add swal
         swal({
          
            icon:"morning",
            title: "order_placed",
            text: "thank you for placing order",
            timer:2000,
        
    
         })
        })
    }
  },
  handleOrder: function (uid, toy) {
    // Reading current table order details
    //write firebase query
    firebase .firestore() .collection("users") .doc(uid) .get() .then(doc => { var details = doc.data();

        if (details["current_orders"][toy.id]) {
          // Increasing Current Quantity
          details["current_orders"][toy.id]["quantity"] += 1;

          //Calculating Subtotal of item
          var currentQuantity = details["current_orders"][toy.id]["quantity"];

          details["current_orders"][toy.id]["subtotal"] =
            currentQuantity * toy.price;
        } else {
          details["current_orders"][toy.id] = {
            item: toy.toy_name,
            price: toy.price,
            quantity: 1,
            subtotal: toy.price * 1
          };
        }

        details.total_bill += toy.price;

        //Updating db
        firebase
          .firestore()
          .collection("users")
          .doc(doc.id)
          .update(details);
      });
  },
  //Function to get the dishes collection from db
  getAllToys: async function () {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  },
  handleMarkerLost: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  }
});
