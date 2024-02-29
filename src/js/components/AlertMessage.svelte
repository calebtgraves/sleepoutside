<script>
    export let message;
</script>

<div class="alert-message">
    <p>{message}</p>
    <p>X</p>
</div>

<style>
    .alert-message {
        background-color: rgb(247, 188, 78);
        border: solid 1px orange;
        display: flex;
        justify-content: space-between;
    }

    .alert-message p {
        margin: 0;
        padding: 1rem;
    }
</style>