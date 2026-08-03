/**
 * Renders a schema.org object as a JSON-LD block.
 *
 * `<` is escaped because a string in the data containing `</script>` would
 * otherwise close the tag early — the one genuine injection risk in an inline
 * script, and cheap to close off.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
