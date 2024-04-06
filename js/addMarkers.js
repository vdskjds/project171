AFRAME.registerComponent("create-markers", {
  
    init:function(){
    var mainscene=document.querySelector("#main-scene");
    var toys = await 
    this.getAllToys()
    toys.map(toy=>{
        var marker = document.createElement("a-marker")
        marker.setAttribute("id", toy.id)
        marker.setAttribute("type", "pattern")
        marker.setAttribute("url", toy.marker_pattern_url)
        marker.setAttribute("cursor",{
            rayOrigin:"mouse"
        })
        marker.setAttribute("markerhandle",{})
        mainscene.appendChild(marker);
         
        var  model=document.createElement("a-entity")
        model.setAttribute("id", `model${toy.id}`)
        model.setAttribute("position", toy.model_geometry.position)
        model.setAttribute("rotation", toy.model_geometry.rotation)
        model.setAttribute("scale", toy.model_geometry.scale)
        model.setAttribute("gltf-model",`url(${toy.model_url})`)
        model.setAttribute("gesture-handler",{})
        model.setAttribute("animation-mixer",{})
        marker.appendChild(model);
        


     
    })
},  
    });
  