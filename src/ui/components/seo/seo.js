export const Seo = ({ title, description }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
};
