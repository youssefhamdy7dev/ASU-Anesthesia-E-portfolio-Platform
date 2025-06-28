import React, { useState } from "react";
import { axios } from "@/src/services";
import Loading from "@/src/components/Loading";
import Portfolio from "@/src/components/Portfolio";

export default function ViewCase() {
  const [isLoaded, setLoaded] = useState(false),
    [data, setData] = useState<any>([]);

  if (!isLoaded) {
    if (data.length === 0) {
      axios.get("/viewPrint").then(({ data }) => {
        setLoaded(true);
        setData(data);
      });
    }
  }
  return (
    <>{isLoaded ? <Portfolio data={data} /> : <Loading color={"primary"} />}</>
  );
}
