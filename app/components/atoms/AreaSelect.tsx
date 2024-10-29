import { Select, SelectProps } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { SelectItem } from "~/infra/dtos/pagination-response.dto";

interface AreaSelectProps extends Omit<SelectProps, "data" | "onChange"> {
  queryId: string;
  area: string;
  label: string;
  placeholder: string;
  onChange: (value: string | undefined) => void;
}

export function AreaSelect({
  queryId,
  area,
  onChange,
  label = "Area",
  placeholder = "Pilih Area",
  ...props
}: AreaSelectProps) {
  const fetcher = useFetcher<SelectItem[]>();
  const [data, setData] = useState<{ value: string; label: string }[]>([]);
  const prevQueryId = useRef<number | string>("");

  useEffect(() => {
    const isInit = fetcher.state === "idle" && fetcher.data == null;
    const isChange = queryId !== prevQueryId.current;

    if (queryId && (isInit || isChange)) {
      prevQueryId.current = queryId;
      fetcher.load(`/api/select?type=${area}&query=${queryId}`);
    }
  }, [area, queryId, fetcher]);

  useEffect(() => {
    if (fetcher.data && fetcher.data) {
      setData(fetcher.data);
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data}
      searchable
      onChange={(value) => value && onChange(value)}
      disabled={fetcher.state === "loading" || !queryId}
      {...props}
    />
  );
}
