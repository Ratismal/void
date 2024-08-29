<script lang="ts">
	import { glyphs, type Glyph } from "$lib/store";

  export let glyph: Glyph;
  export let x: number;
  export let y: number;

  function toggleNotch(i: number) {
    return () => {
      glyph[i] = !glyph[i];

      $glyphs = $glyphs;
    }
  }
</script>

<div class="glyph">
  {#each glyph as notch, i}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="glyph-notch" class:active={notch} on:click|preventDefault={toggleNotch(i)}>

    </div>
  {/each}
</div>

<style lang="scss">

</style>