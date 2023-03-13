import Head from "next/head";
import React from "react";

export default function CustomHead() {
  return (
    <Head>
      <title>VC Chronicles</title>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>"
      />
      <meta
        property="og:description"
        content="VC Chronicles allows founders to anonymously share their experiences with VCs."
      />
      <meta property="og:image" content="/preview.png" />
    </Head>
  );
}
