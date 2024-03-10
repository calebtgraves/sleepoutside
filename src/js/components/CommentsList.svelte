<script>
    import { getLocalStorage, setLocalStorage } from "../utils.mjs"
    export let product
    let name = "";
    let commentBody = "";
    let productComments = []
    
    function getComments(){
        let comments = localStorage.getItem("so-comments");
        if(!comments){
            localStorage.setItem("so-comments","{}")
            return {}
        }else{
            let parsedComments = JSON.parse(comments)
            console.log(parsedComments)
            if(product.Id in parsedComments){
                productComments = parsedComments[product.Id]
            }
            console.log(productComments)
            return parsedComments;
        }
    }
    function handlePostComment(){
        if(name != "" && commentBody != ""){
            const comments = getComments()
            if(!(product.Id in comments)){
                comments[product.Id] = []
            }
            console.log(comments)
            comments[product.Id].push({name,commentBody})
            name = "";
            commentBody = "";
            localStorage.setItem("so-comments", JSON.stringify(comments));
            productComments = comments[product.Id]
        }
    }
    getComments();
</script>
<h2>Product Comments</h2>
<div id="product-comments-section">
    <section id="post-section">
        <h3>Make a comment</h3>
        <form>
            <input placeholder="Name" id="name-input" bind:value={name} />
            <textarea placeholder="Type your comment here..." id="comment-body" bind:value={commentBody} />
            <button on:click|preventDefault={handlePostComment}>Post</button>
        </form>
    </section>
    {#if productComments.length > 0}
        <section id="comments-section">
            {#each productComments as comment}
                <div class="comment">
                    <p class="comment-poster">{comment.name}</p>
                    <p>{comment.commentBody}</p>
                    {#if productComments.indexOf(comment) != productComments.length-1}
                    <hr/>
                    {/if}
                </div>
            {/each}
        </section>
    {:else}
        <h3 id="no-comments">There are currently no comments on this product.</h3>
    {/if}
</div>
<style>
    h2{
        margin-left:.5rem;
    }
    #no-comments{
        width:75%;
        margin-left:2rem;
        text-align:center;
    }
    #product-comments-section{
        display:flex;
        flex-direction: column;
    }
    #post-section{
        display:flex;
        flex-direction: column;
        width:75%;
        margin-left:2rem;
    }
    #post-section h3{
        text-align:center;
        margin-top:0;
    }
    textarea{
        margin-top:0;
        resize: vertical;
        height:4rem;
        max-height:8rem;
        grid-column:1/5;
        font-family:Arial, Helvetica, sans-serif;
        font-size:1rem;
    }
    input{
        grid-column:1/2;
        border:1px solid grey;
        font-size:1rem;
    }
    button{
        margin:0;
        font-size:.8rem;
        grid-column:4/5;
        grid-row:1/2;
        justify-self:flex-end;
    }
    form{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap:1rem;
    }
    #comments-section{
        width:75%;
        margin-bottom:1rem;
        margin-top:1rem;
        margin-left:2rem;
        max-height: 450px;
        overflow-y:auto;
        box-shadow: inset 0px 0px 29px -17px rgba(0,0,0,0.2);
        padding-bottom:1rem;
        padding-right:1rem;
    }
    .comment{
        width:100%;
        padding-left:1rem;
    }
    .comment p{
        font-size:1rem;
        margin-bottom:0;
    }
    .comment-poster{
        font-weight:bold;
    }
</style>