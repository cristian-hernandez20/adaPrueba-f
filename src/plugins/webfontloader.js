export async function loadFonts() {
  const webFontLoader = await import("webfontloader");

  webFontLoader.load({
    google: {
      families: ["Lato:500,700,900&display=swap"],
    },
  });
}
