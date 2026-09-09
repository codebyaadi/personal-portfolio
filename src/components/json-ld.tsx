/**
 * Renders a JSON-LD `<script>`. Server component — the object is serialised at
 * render time, never hydrated.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
