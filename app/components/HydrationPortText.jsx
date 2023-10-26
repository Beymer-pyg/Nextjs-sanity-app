import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";

function HydrationPortText({ valuePort }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <>{isClient && <PortableText value={valuePort} />}</>;
}

export default HydrationPortText;
