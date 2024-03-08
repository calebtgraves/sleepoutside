<script>
    export let orders = [];
    console.log(orders);
</script>

{#each orders as order}
    <div>
        <h2>Order Number: {order.id}</h2>
        <h3>Name: {order.fname} {order.lname}</h3>
        <h3>Order Total: ${order.orderTotal}</h3>
    </div>
{/each}