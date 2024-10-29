import { Select, SelectProps } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { SelectItem } from "~/infra/dtos/pagination-response.dto";
import { useDebounce } from "@uidotdev/usehooks";

interface DptSelectProps extends Omit<SelectProps, "data" | "onChange"> {
  value: string;
  onChange: (value: string | undefined) => void;
}

export function DptSelect({ value, onChange, ...props }: DptSelectProps) {
  const fetcher = useFetcher<SelectItem[]>({
    key: "dpt-select",
  });
  const [data, setData] = useState<{ value: string; label: string }[]>([]);
  const prevQuery = useRef<number | string>("");
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  useEffect(() => {
    const isInit = fetcher.state === "idle" && fetcher.data == null;
    const isChange = debouncedSearchTerm !== prevQuery.current;
    if (debouncedSearchTerm && (isInit || isChange)) {
      prevQuery.current = debouncedSearchTerm;
      fetcher.load(
        `/api/select?type=dpt&query=${debouncedSearchTerm}&page=1&limit=10`
      );
    }
  }, [debouncedSearchTerm, fetcher]);

  useEffect(() => {
    if (fetcher.data && fetcher.data) {
      setData(fetcher.data);
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <Select
      label="Pilih DPT"
      placeholder="Cari nama DPT"
      data={data}
      searchable
      value={value}
      onSearchChange={setSearchValue}
      onChange={(value) => value && onChange(value)}
      // disabled={fetcher.state === "loading"}
      {...props}
    />
  );
}
