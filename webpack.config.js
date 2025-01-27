const { SourceMapConsumer } = require("source-map");
SourceMapConsumer.initialize({
  "lib/mappings.wasm": require.resolve("source-map/lib/mappings.wasm"),
});
