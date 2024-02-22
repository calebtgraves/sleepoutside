<script>
    export let parent;
    export let page;
</script>

<p>{parent}{#if page} -> {page}{/if}</p>