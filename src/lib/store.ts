import { writable, type Writable } from "svelte/store";

const state = {
  maxColumns: 6,
  maxRows: 6,
  glyphs: [] as Glyph[][]
}

export type Glyph = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean]

export const maxColumns = writable(6);
export const maxRows = writable(6);
export const glyphs: Writable<Glyph[][]> = writable([]);
export const translated = writable("");
export const serialized = writable("[]");

function createGlyph(): Glyph {
  return [false, false, false, false, false, false, false, false, false];
}

function updateGlyphs() {
  while (state.glyphs.length < state.maxRows) {
    state.glyphs.push([]);
  }

  if (state.glyphs.length > state.maxRows) {
    // console.log('Splicing rows', state.maxRows - 1, state.glyphs.length - state.maxRows);
    state.glyphs.splice(state.maxRows - 1, state.glyphs.length - state.maxRows);
  }

  state.glyphs.forEach(row => {
    while (row.length < state.maxColumns) {
      row.push(createGlyph());
    }

    if (row.length > state.maxColumns) {
      row.splice(state.maxColumns - 1, row.length - state.maxColumns);
    }
  });

  console.log(state.glyphs);

  glyphs.set(state.glyphs);
}

const bitMap = [
  0b000000000,
  0b001000000,
  0b010000000,
  0b000010000,
  0b000100000,
  0b000001000,
  0b000000100,
  0b000000001,
  0b000000010,
];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getGlyphValue(glyph: Glyph) {
  let value = 0;
  for (let i = 0; i < 9; i++) {
    if (glyph[i]) value |= bitMap[i];
  }

  return value;
}

function translateMessage() {
  const values = [];
  try {
    for (let x = state.maxColumns - 1; x >= 0; x--) {
      for (let y = 0; y < state.maxRows; y++) {
        const glyph = state.glyphs[y][x];
        if (!glyph[0]) continue;

        const value = getGlyphValue(glyph);
        values.push(value);
      }
    }
  } catch (err) {
    console.error(err);
  }

  console.log(values);

  translated.set(values.map(v => v <= 26 ? alphabet[v-1] : '?').join(''));
}

glyphs.subscribe((value) => {
  state.glyphs = value;

  serialized.set(JSON.stringify(state.glyphs));

  translateMessage();
})
maxColumns.subscribe((value) => {
  console.log('Updating maxColumns');
  state.maxColumns = value;
  updateGlyphs();
})
maxRows.subscribe((value) => {
  console.log('Updating maxRows');
  state.maxRows = value;
  updateGlyphs();
})