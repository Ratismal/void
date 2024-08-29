<script lang="ts">
	import { maxColumns, maxRows, glyphs, translated, serialized } from "$lib/store";
  import GlyphComponent from './GlyphComponent.svelte';
  import './styles.scss';

  function importSerialize(e: InputEvent) {
    try {

      const value = (e.target as HTMLTextAreaElement).value;
      const parsed = JSON.parse(value);
      console.log('Updating to', parsed);
      $glyphs = parsed;
    } catch (err){
      console.error(err);
    }
  }

</script>

<main>
  <h1>Void Strangers Decoder</h1>

  <div class="input-group">
    <label>Max Rows
      <input bind:value={$maxRows}>
    </label>
    <label>Max Columns
      <input bind:value={$maxColumns}>
    </label>
  </div>

  <div class="translated">
    {$translated}
  </div>

  <div class="glyphs-wrapper">
    <div class="glyphs-rows">
      {#each $glyphs as row, x}
        <div class="glyphs-row">
          {#each row as glyph, y}
            <GlyphComponent {glyph} {x} {y}/>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <div>
    <textarea class="serialized" bind:value={$serialized} on:change={importSerialize}/>
  </div>
</main>
<style lang="scss">
  
</style>