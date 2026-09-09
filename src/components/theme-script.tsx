/**
 * Blocking script that runs before first paint: marks the document as
 * JS-enabled (so scroll-reveal styles activate) and applies the stored theme.
 * Dark is the default; `.light` is only added when the visitor has explicitly
 * chosen the light theme.
 */
const script = `(function(){try{var d=document.documentElement;d.classList.add('js');if(localStorage.getItem('theme')==='light'){d.classList.add('light');}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
