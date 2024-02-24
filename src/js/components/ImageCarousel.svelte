<script>
    export let item;
    let images = [];
    let currentImage;
    let currentImageIndex = 0;
    function setImage(){
        images.forEach((image)=>{
            if(image.classList.contains("selected-image")){
                image.classList.remove("selected-image")
            }
        })
        images[currentImageIndex].classList.add("selected-image");
        currentImage.src = images[currentImageIndex].src
    }
    function scrollCarousel(direction){
        let nextImageIndex = currentImageIndex+direction;
        if(nextImageIndex > images.length-1){
            nextImageIndex = 0;
        }
        if(nextImageIndex < 0){
            nextImageIndex = images.length-1
        }
        currentImageIndex = nextImageIndex;
        setImage()
    }
</script>
<img id="displayed-image" src={item.Images.PrimaryLarge} alt={item.Name} bind:this={currentImage}/>
{#if item.Images.ExtraImages}
<div id="carousel-container">
    <button class="arrow-button" id="carousel-back" on:click={()=>{scrollCarousel(-1)}}>&#10094;</button>
    <div id="product-image-carousel">
        <button class="image-button" on:click={()=>{
            currentImageIndex = 0;
            setImage()
        }}>
            <img class="carousel-item selected-image" src={item.Images.PrimaryLarge} alt={item.Name} bind:this={images[0]}/>
        </button>
        {#each item.Images.ExtraImages as image}
        <button class="image-button" on:click={()=>{
            currentImageIndex = item.Images.ExtraImages.indexOf(image)+1;
            setImage()
        }}>
            <img class="carousel-item" src={image.Src} alt={item.name} bind:this={images[item.Images.ExtraImages.indexOf(image)+1]}/>
        </button>
        {/each}
    </div>
    <button class="arrow-button" id="carousel-next" on:click={()=>{scrollCarousel(1)}}>&#10095;</button>
</div>
{/if}
<style>
    #carousel-container{
        display:flex;
        width:100%;
        overflow:hidden;
    }
    .arrow-button{
        padding:10px;
        margin:0;
        background-color:transparent;
        color:black;
        position:relative;
        transition: background-color .5s ease;
        z-index:1;
    }
    .arrow-button:hover{
        background-color: rgba(150,150,150,30%);
    }
    .arrow-button:active{
        filter:brightness(30%);
    }
    .image-button{
        margin:0;
        padding:0;
        background-color: transparent;
        flex-grow:0;
        flex-shrink:0;
        display:inline;
    }
    #product-image-carousel{
        position:relative;
        width:100%;
        overflow-x:auto;
        overflow-y:hidden;
        display:flex;
        flex-wrap:wrap;
        justify-content: center;
    }
    .carousel-item{
        height:70px;
        width:70px;
        opacity:50%;
        border:solid 1px darkgrey;
        padding:5px;
        margin: 5px;
        transition:.2s ease-in-out;
       -webkit-user-drag: none;
    }
    .carousel-item:hover{
        cursor: pointer;
        opacity:75%;
    }
    .selected-image{
        opacity:100%;
        border:solid 1px black;
    }
    .selected-image:hover{
        opacity:100%;
    }
</style>